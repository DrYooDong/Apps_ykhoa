# CliniPortal Asset Repositories

This directory contains all static assets for the CliniPortal ecosystem, organized into specialized repositories.

## 📦 Repository Structure

### 1. 🎨 Logos (`/logos`)
- **Main Logos**: Full logo, icon-only, text-only variants (SVG/PNG)
- **Module Logos**: Specific branding for 6 main modules
- **Favicons & App Icons**: Multi-size icons for browsers and PWA
- **Dark/Light Mode**: Automatic theme switching support
- *Documentation*: `LOGO_USAGE.md`

### 2. 🔹 Icons (`/icons`)
- **Count**: 50+ medical-specific SVG icons
- **Categories**: Tools, Pharmacology, Skills, Approach, Physiology, EBM
- **Features**: CSS variable-based coloring for Dark Mode support
- **Format**: Inline SVG ready for direct embedding

### 3. 🎬 Lottie Animations (`/lottie`)
- **Count**: 65+ JSON animations
- **Use Cases**: Loading states, empty states, success/error feedback, module illustrations
- **Theme Support**: Light/Dark mode variants
- **Catalog**: `animations-catalog.json` for easy searching

### 4. 🔘 Button Effects (`/buttons`)
- **Count**: 20+ CSS hover effects
- **Types**: Slide, Glow, Pulse, Ripple, 3D Push, Medical Pulse
- **Performance**: GPU-accelerated (transform/opacity only)
- **Demo**: `demo-buttons.html` for live preview
- **Integration**: Copy-paste CSS classes ready

### 5. 🔷 Geometry & Shapes (`/geometry`)
- **Layout Blocks**: Container shapes, grid builders, section dividers
- **Medical Patterns**: Stylized anatomical patterns, DNA helices, cell structures
- **3D Isometric**: Medical equipment, building blocks for infographics
- **Theme Support**: CSS variables for color switching

### 6. 🌊 Background Effects (`/backgrounds`)
- **Gradients**: Medical-themed color schemes
- **Patterns**: Subtle repeating textures, dot grids, wave patterns
- **Animations**: Gentle moving backgrounds for loading/hero sections
- **Effects**: Glassmorphism, blur overlays, mesh gradients
- **Dark Mode**: Optimized dark variants

### 7. 📊 Dynamic Charts (`/charts`)
- **Type**: Pure JavaScript charting library (no external dependencies)
- **Chart Types**: Line, Bar, Gauge, Radar, Area charts
- **Medical Presets**: Vital signs, lab results, drug concentration curves
- **Features**: Smooth animations, responsive design, Dark Mode support
- **Files**: `pure-charts.js`, `medical-chart-presets.css`, `demo-charts.html`

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to assets
cd assets

# Browse specific repositories
cd logos      # Brand assets
cd icons      # SVG icons
cd lottie     # Animations
cd buttons    # Button effects
cd geometry   # Shapes & patterns
cd backgrounds # Background effects
cd charts     # Chart library
```

## 🎯 Usage Guidelines

1. **Theme Switching**: All assets use CSS variables (`--primary-color`, `--bg-color`, etc.) for automatic Light/Dark mode adaptation.
2. **Performance**: Optimized for web - SVGs are minified, animations are lightweight.
3. **Consistency**: Follow the design system defined in each repository's README.
4. **Attribution**: Some Lottie animations may require attribution - check individual file metadata.

## 📝 Documentation

Each sub-repository contains:
- `README.md`: Detailed usage instructions
- `demo-*.html`: Interactive previews (where applicable)
- Source files (SVG, JSON, CSS, JS)

## 🔄 Updates

Assets are versioned and updated regularly. Check the `CHANGELOG.md` in each sub-directory for recent additions.

---

**CliniPortal** - Empowering Clinical Excellence Through Technology
