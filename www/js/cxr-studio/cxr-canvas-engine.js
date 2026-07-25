/**
 * cxr-canvas-engine.js — Chest X-Ray Pro Studio
 * Động cơ Xử Lý Hình Ảnh Canvas DICOM Chuyên Sâu (PACS / DICOM Canvas Engine).
 * Cung cấp: Window Level / Window Width (W/L), Edge Enhancement (Sharpening), Bone High Contrast Filter, Colormaps LUT.
 */

class CXRCanvasEngine {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    
    // Canvas dimensions (Standard DICOM resolution 600x620)
    this.width = 600;
    this.height = 620;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.borderRadius = '12px';
    this.canvas.style.display = 'block';

    if (this.container) {
      this.container.innerHTML = '';
      this.container.appendChild(this.canvas);
    }

    // Processing Settings
    this.windowWidth = 256; // [50..400]
    this.windowCenter = 128; // [20..220]
    this.edgeEnhance = false; // Sobel / Sharpen filter
    this.boneFilter = false;  // High-contrast bone emphasis
    this.colormap = 'grayscale'; // 'grayscale', 'invert', 'bone', 'hot'
  }

  /**
   * Process SVG element or Data URL onto Canvas with DICOM post-processing filters
   */
  processSVG(svgElement, callback) {
    if (!svgElement || !this.ctx) return;

    // Serialize SVG to XML string
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    // Convert SVG string to Blob Data URL
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // 1. Draw raw SVG onto Canvas
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(img, 0, 0, this.width, this.height);
      URL.revokeObjectURL(url);

      // 2. Extract ImageData for pixel-level DICOM processing
      let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
      
      // 3. Apply DICOM Filters Pipeline
      imageData = this.applyDICOMFilters(imageData);

      // 4. Put processed pixels back to Canvas
      this.ctx.putImageData(imageData, 0, 0);

      if (callback) callback();
    };
    img.src = url;
  }

  /**
   * Apply DICOM Pixel Filters: Windowing W/L, Edge Enhancement, Bone Filter, Colormaps
   */
  applyDICOMFilters(imageData) {
    const data = imageData.data;
    const len = data.length;

    const wWidth = this.windowWidth;
    const wCenter = this.windowCenter;
    const minVal = wCenter - wWidth / 2;
    const maxVal = wCenter + wWidth / 2;
    const factor = 255 / (maxVal - minVal || 1);

    // 1. Window Level / Window Width (W/L) Transformation & Colormaps
    for (let i = 0; i < len; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Convert to luminance intensity (0..255)
      let intensity = 0.299 * r + 0.587 * g + 0.114 * b;

      // Windowing W/L clip & stretch
      if (intensity <= minVal) intensity = 0;
      else if (intensity >= maxVal) intensity = 255;
      else intensity = (intensity - minVal) * factor;

      // Bone Filter Emphasis
      if (this.boneFilter) {
        if (intensity > 140) {
          intensity = Math.min(255, intensity * 1.25);
        } else {
          intensity = intensity * 0.75;
        }
      }

      // Apply Selected Colormap Look-Up Table (LUT)
      if (this.colormap === 'invert') {
        data[i] = 255 - intensity;
        data[i + 1] = 255 - intensity;
        data[i + 2] = 255 - intensity;
      } else if (this.colormap === 'bone') {
        // Bone DICOM LUT (Warm amber/bone tint)
        data[i] = Math.min(255, intensity * 1.1);
        data[i + 1] = Math.min(255, intensity * 0.95);
        data[i + 2] = Math.min(255, intensity * 0.8);
      } else if (this.colormap === 'hot') {
        // Hot Iron / Thermal Pseudocolor LUT
        data[i] = intensity < 128 ? intensity * 2 : 255;
        data[i + 1] = intensity < 128 ? 0 : (intensity - 128) * 2;
        data[i + 2] = intensity < 192 ? 0 : (intensity - 192) * 4;
      } else {
        // Standard Grayscale
        data[i] = intensity;
        data[i + 1] = intensity;
        data[i + 2] = intensity;
      }
    }

    // 2. Edge Enhancement (3x3 Laplacian Sharpening Convolution Matrix)
    if (this.edgeEnhance) {
      return this.applyConvolutionMatrix(imageData, [
        0, -1,  0,
       -1,  5, -1,
        0, -1,  0
      ]);
    }

    return imageData;
  }

  /**
   * Fast 3x3 Spatial Kernel Convolution (Sharpening / Sobel Edge Detection)
   */
  applyConvolutionMatrix(imageData, weights) {
    const src = imageData.data;
    const sw = imageData.width;
    const sh = imageData.height;

    // Create target output ImageData
    const output = this.ctx.createImageData(sw, sh);
    const dst = output.data;

    const side = Math.round(Math.sqrt(weights.length));
    const halfSide = Math.floor(side / 2);

    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        const dstOff = (y * sw + x) * 4;
        let r = 0, g = 0, b = 0;

        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scx = Math.min(sw - 1, Math.max(0, x + cx - halfSide));
            const scy = Math.min(sh - 1, Math.max(0, y + cy - halfSide));
            const srcOff = (scy * sw + scx) * 4;
            const wt = weights[cy * side + cx];

            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
          }
        }

        dst[dstOff] = Math.min(255, Math.max(0, r));
        dst[dstOff + 1] = Math.min(255, Math.max(0, g));
        dst[dstOff + 2] = Math.min(255, Math.max(0, b));
        dst[dstOff + 3] = src[dstOff + 3]; // Preserve Alpha
      }
    }

    return output;
  }
}
