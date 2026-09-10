import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HerniationType } from "./BrainHerniationVisualizer";
import { Rotate3D, ZoomIn, ZoomOut, Eye, Compass, RefreshCw, Maximize2 } from "lucide-react";

interface BrainHerniation3DCanvasProps {
  activeType: HerniationType;
  onSelectHotspot?: (label: string) => void;
}

export const BrainHerniation3DCanvas: React.FC<BrainHerniation3DCanvasProps> = ({
  activeType,
  onSelectHotspot
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const brainGroupRef = useRef<THREE.Group | null>(null);
  const pathologyGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [cameraView, setCameraView] = useState<"isometric" | "axial" | "coronal" | "base">("isometric");

  // Mouse interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.3, y: -0.6 });
  const currentRotation = useRef({ x: 0.3, y: -0.6 });
  const zoomLevel = useRef(26);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 420;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d); // Deep dark medical slate

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 5, zoomLevel.current);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous children
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // 3. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(20, 30, 25);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const blueBackLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    blueBackLight.position.set(-20, -10, -20);
    scene.add(blueBackLight);

    const redPathologyLight = new THREE.PointLight(0xef4444, 1.5, 30);
    redPathologyLight.position.set(5, 5, 5);
    scene.add(redPathologyLight);

    // 4. MAIN ANATOMICAL STRUCTURES
    const mainBrainGroup = new THREE.Group();
    brainGroupRef.current = mainBrainGroup;
    scene.add(mainBrainGroup);

    // A. Transparent Cranial Vault (Bản Sọ Trong Suốt)
    const skullGeom = new THREE.SphereGeometry(9.2, 32, 28);
    skullGeom.scale(1, 1.15, 1.25);
    const skullMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.14,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.8,
      wireframe: wireframeMode
    });
    const skullMesh = new THREE.Mesh(skullGeom, skullMat);
    skullMesh.position.set(0, 1.5, 0);
    mainBrainGroup.add(skullMesh);

    // B. Left & Right Cerebral Hemispheres (Hai Bán Cầu Đại Não)
    const hemisphereGeom = new THREE.SphereGeometry(7.2, 28, 24);
    hemisphereGeom.scale(0.85, 1.05, 1.18);

    const brainMatLeft = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.45,
      metalness: 0.05
    });
    const brainMatRight = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.05
    });

    // Left hemisphere
    const leftHemisphere = new THREE.Mesh(hemisphereGeom, brainMatLeft);
    leftHemisphere.position.set(-3.2, 2.2, 0);
    mainBrainGroup.add(leftHemisphere);

    // Right hemisphere
    const rightHemisphere = new THREE.Mesh(hemisphereGeom, brainMatRight);
    rightHemisphere.position.set(3.2, 2.2, 0);
    mainBrainGroup.add(rightHemisphere);

    // C. Falx Cerebri (Liềm Đại Não - Màng Cứng Dọc Giữa)
    const falxGeom = new THREE.PlaneGeometry(16, 8);
    const falxMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      metalness: 0.2
    });
    const falxMesh = new THREE.Mesh(falxGeom, falxMat);
    falxMesh.rotation.y = Math.PI / 2;
    falxMesh.position.set(0, 4.5, 0);
    mainBrainGroup.add(falxMesh);

    // D. Tentorium Cerebelli (Lều Tiểu Não)
    // Horizontal tent separating cerebrum from cerebellum, with tentorial incisura (notch)
    const tentoriumShape = new THREE.Shape();
    tentoriumShape.moveTo(-7.5, -7.5);
    tentoriumShape.lineTo(7.5, -7.5);
    tentoriumShape.lineTo(6.5, 6.5);
    // Incisura tentorii (Notch for midbrain)
    tentoriumShape.lineTo(2.2, 1.5);
    tentoriumShape.bezierCurveTo(1.8, -1.0, -1.8, -1.0, -2.2, 1.5);
    tentoriumShape.lineTo(-6.5, 6.5);
    tentoriumShape.closePath();

    const tentoriumGeom = new THREE.ShapeGeometry(tentoriumShape);
    const tentoriumMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      roughness: 0.3
    });
    const tentoriumMesh = new THREE.Mesh(tentoriumGeom, tentoriumMat);
    tentoriumMesh.rotation.x = Math.PI / 2;
    tentoriumMesh.position.set(0, -1.2, 1.2);
    mainBrainGroup.add(tentoriumMesh);

    // E. Brainstem: Midbrain, Pons, Medulla Oblongata
    // Midbrain (Trung não)
    const midbrainGeom = new THREE.CylinderGeometry(1.6, 1.5, 2.2, 16);
    const brainstemMat = new THREE.MeshStandardMaterial({
      color: 0xfbcfe8,
      roughness: 0.4
    });
    const midbrain = new THREE.Mesh(midbrainGeom, brainstemMat);
    midbrain.position.set(0, -1.0, 0.6);
    mainBrainGroup.add(midbrain);

    // Cerebral peduncles anterior bulges
    const peduncleL = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.6, 2.0, 12), brainstemMat);
    peduncleL.position.set(-0.9, -1.0, 1.4);
    mainBrainGroup.add(peduncleL);

    const peduncleR = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.6, 2.0, 12), brainstemMat);
    peduncleR.position.set(0.9, -1.0, 1.4);
    mainBrainGroup.add(peduncleR);

    // Pons (Cầu não) - ventral bulge
    const ponsGeom = new THREE.SphereGeometry(2.0, 16, 16);
    ponsGeom.scale(1.1, 0.9, 1.2);
    const pons = new THREE.Mesh(ponsGeom, brainstemMat);
    pons.position.set(0, -2.8, 0.8);
    mainBrainGroup.add(pons);

    // Medulla Oblongata (Hành não)
    const medullaGeom = new THREE.CylinderGeometry(1.3, 0.9, 2.8, 16);
    const medulla = new THREE.Mesh(medullaGeom, brainstemMat);
    medulla.position.set(0, -4.8, 0.4);
    mainBrainGroup.add(medulla);

    // F. Cerebellar Hemispheres & Tonsils
    const cerebellumGeom = new THREE.SphereGeometry(3.6, 20, 18);
    cerebellumGeom.scale(1.2, 0.85, 1.0);
    const cerebellumMat = new THREE.MeshStandardMaterial({
      color: 0xe0e7ff,
      roughness: 0.5
    });
    const cerebellumL = new THREE.Mesh(cerebellumGeom, cerebellumMat);
    cerebellumL.position.set(-3.2, -3.2, -1.5);
    mainBrainGroup.add(cerebellumL);

    const cerebellumR = new THREE.Mesh(cerebellumGeom, cerebellumMat);
    cerebellumR.position.set(3.2, -3.2, -1.5);
    mainBrainGroup.add(cerebellumR);

    // Cerebellar Tonsils (Hạnh nhân tiểu não ở cạnh lỗ chẩm)
    const tonsilGeom = new THREE.ConeGeometry(0.8, 1.8, 14);
    tonsilGeom.rotateX(Math.PI);
    const tonsilMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.3
    });
    const tonsilL = new THREE.Mesh(tonsilGeom, tonsilMat);
    tonsilL.position.set(-1.4, -5.2, -0.6);
    mainBrainGroup.add(tonsilL);

    const tonsilR = new THREE.Mesh(tonsilGeom, tonsilMat);
    tonsilR.position.set(1.4, -5.2, -0.6);
    mainBrainGroup.add(tonsilR);

    // G. Foramen Magnum Ring (Vành Lỗ Chẩm)
    const foramenRingGeom = new THREE.TorusGeometry(2.4, 0.25, 16, 32);
    const foramenRingMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      roughness: 0.2
    });
    const foramenRing = new THREE.Mesh(foramenRingGeom, foramenRingMat);
    foramenRing.rotation.x = Math.PI / 2;
    foramenRing.position.set(0, -5.8, 0.2);
    mainBrainGroup.add(foramenRing);

    // H. Cranial Nerve III (Dây Thần Kinh Vận Nhãn)
    const cn3CurveL = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.6, -1.0, 1.6),
      new THREE.Vector3(-1.8, -1.2, 3.2),
      new THREE.Vector3(-3.2, -0.8, 4.8)
    );
    const cn3GeomL = new THREE.TubeGeometry(cn3CurveL, 20, 0.16, 8, false);
    const cn3Mat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      roughness: 0.2
    });
    const cn3MeshL = new THREE.Mesh(cn3GeomL, cn3Mat);
    mainBrainGroup.add(cn3MeshL);

    // Right CN3 (Affected in Uncal herniation)
    const cn3CurveR = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.6, -1.0, 1.6),
      new THREE.Vector3(1.9, -1.4, 3.0),
      new THREE.Vector3(3.2, -0.8, 4.8)
    );
    const cn3GeomR = new THREE.TubeGeometry(cn3CurveR, 20, 0.22, 8, false);
    const cn3MeshR = new THREE.Mesh(cn3GeomR, cn3Mat);
    mainBrainGroup.add(cn3MeshR);

    // 5. DYNAMIC PATHOLOGY GROUP
    const pathologyGroup = new THREE.Group();
    pathologyGroupRef.current = pathologyGroup;
    mainBrainGroup.add(pathologyGroup);

    // 6. ANIMATION LOOP
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (isAutoRotate && !isDragging.current) {
        targetRotation.current.y += 0.005;
      }

      // Smooth damping
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;

      if (mainBrainGroup) {
        mainBrainGroup.rotation.x = currentRotation.current.x;
        mainBrainGroup.rotation.y = currentRotation.current.y;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = zoomLevel.current;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. WINDOW RESIZE HANDLER
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight || 420;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [wireframeMode]);

  // UPDATE 3D PATHOLOGY WHEN `activeType` CHANGES
  useEffect(() => {
    if (!pathologyGroupRef.current) return;
    const group = pathologyGroupRef.current;

    // Clear previous pathology meshes
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const redLesionMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x7f1d1d,
      roughness: 0.3
    });

    const edemaMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.45,
      roughness: 0.5
    });

    if (activeType === "subfalcine") {
      // Large Right Frontal Mass (EDH/SDH)
      const hematoma = new THREE.Mesh(new THREE.SphereGeometry(2.4, 20, 20), redLesionMat);
      hematoma.scale.set(1.4, 1.2, 1.0);
      hematoma.position.set(4.8, 3.8, 2.2);
      group.add(hematoma);

      // Edema ring
      const edema = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 16), edemaMat);
      edema.position.set(4.8, 3.8, 2.2);
      group.add(edema);

      // Cingulate Gyrus herniation vector pushing under Falx
      const arrowHelper = new THREE.ArrowHelper(
        new THREE.Vector3(-1, 0.1, 0).normalize(),
        new THREE.Vector3(3.0, 3.5, 0),
        4.2,
        0xf59e0b,
        1.2,
        0.8
      );
      group.add(arrowHelper);
    } else if (activeType === "uncal") {
      // Right Temporal mass pushing Uncus medially
      const hematoma = new THREE.Mesh(new THREE.SphereGeometry(2.2, 20, 20), redLesionMat);
      hematoma.scale.set(1.3, 1.0, 1.3);
      hematoma.position.set(5.2, 0.2, 1.5);
      group.add(hematoma);

      // Herniated Uncus (Hồi móc phòi qua khe lều)
      const uncusHerniation = new THREE.Mesh(new THREE.SphereGeometry(1.6, 18, 18), redLesionMat);
      uncusHerniation.scale.set(1.4, 0.9, 1.1);
      uncusHerniation.position.set(2.0, -1.0, 1.2);
      group.add(uncusHerniation);

      // Vector pointing directly at Midbrain & CN III
      const vector = new THREE.ArrowHelper(
        new THREE.Vector3(-1, -0.3, 0.1).normalize(),
        new THREE.Vector3(4.0, 0.0, 1.5),
        3.6,
        0xef4444,
        1.2,
        0.8
      );
      group.add(vector);

      // Compression marker on Midbrain (Kernohan notch on opposite side)
      const kernohan = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309 })
      );
      kernohan.position.set(-1.6, -1.0, 0.6);
      group.add(kernohan);
    } else if (activeType === "central") {
      // Bilateral downward vectors on Diencephalon & Thalamus
      const arrowL = new THREE.ArrowHelper(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(-1.8, 3.5, 0.5),
        4.0,
        0xef4444,
        1.2,
        0.7
      );
      const arrowR = new THREE.ArrowHelper(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(1.8, 3.5, 0.5),
        4.0,
        0xef4444,
        1.2,
        0.7
      );
      group.add(arrowL);
      group.add(arrowR);

      // Duret hemorrhages in Midbrain & Pons (Multi-dot bleeding)
      for (let i = 0; i < 6; i++) {
        const duret = new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b })
        );
        duret.position.set(
          (Math.random() - 0.5) * 1.2,
          -1.0 - Math.random() * 2.2,
          0.8 + (Math.random() - 0.5) * 0.8
        );
        group.add(duret);
      }
    } else if (activeType === "tonsillar") {
      // Downward displacement of Cerebellar Tonsils > 5mm through Foramen Magnum
      const tonsilProtrusionL = new THREE.Mesh(
        new THREE.ConeGeometry(0.9, 3.2, 16),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x7f1d1d })
      );
      tonsilProtrusionL.rotateX(Math.PI);
      tonsilProtrusionL.position.set(-1.4, -6.8, -0.4);
      group.add(tonsilProtrusionL);

      const tonsilProtrusionR = new THREE.Mesh(
        new THREE.ConeGeometry(0.9, 3.2, 16),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x7f1d1d })
      );
      tonsilProtrusionR.rotateX(Math.PI);
      tonsilProtrusionR.position.set(1.4, -6.8, -0.4);
      group.add(tonsilProtrusionR);

      // Severe downward arrows
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, -3.5, -0.5),
        4.2,
        0xdc2626,
        1.4,
        0.9
      );
      group.add(arrow);
    } else if (activeType === "transcalvarial") {
      // Craniectomy bone defect & Fungating mushroom brain tissue
      const fungus = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 20, 20),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x7f1d1d })
      );
      fungus.scale.set(1.4, 1.2, 1.2);
      fungus.position.set(8.6, 2.5, 1.2);
      group.add(fungus);

      // Skull cut ring
      const cutRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.0, 0.35, 12, 24),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0x78350f })
      );
      cutRing.rotation.y = Math.PI / 2;
      cutRing.position.set(7.8, 2.5, 1.2);
      group.add(cutRing);
    }
  }, [activeType]);

  // MOUSE & TOUCH DRAG ORBIT CONTROLS
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    targetRotation.current.y += deltaX * 0.01;
    targetRotation.current.x += deltaY * 0.01;

    // Limit pitch to prevent upside down flip
    targetRotation.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotation.current.x));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomLevel.current = Math.max(14, Math.min(42, zoomLevel.current + e.deltaY * 0.03));
  };

  // CAMERA PRESETS
  const setPreset = (view: "isometric" | "axial" | "coronal" | "base") => {
    setCameraView(view);
    setIsAutoRotate(false);
    if (view === "isometric") {
      targetRotation.current = { x: 0.35, y: -0.65 };
      zoomLevel.current = 26;
    } else if (view === "axial") {
      targetRotation.current = { x: Math.PI / 2 - 0.05, y: 0 };
      zoomLevel.current = 24;
    } else if (view === "coronal") {
      targetRotation.current = { x: 0.05, y: 0 };
      zoomLevel.current = 25;
    } else if (view === "base") {
      targetRotation.current = { x: -Math.PI / 2.5, y: 0 };
      zoomLevel.current = 22;
    }
  };

  return (
    <div className="relative w-full h-[450px] md:h-[500px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl select-none flex flex-col">
      {/* 3D Top Header Controls */}
      <div className="absolute top-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md pointer-events-auto">
          <Rotate3D className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold text-white font-mono">
            MÔ PHỎNG 3D WEBGL KHÔNG GIAN 3 CHIỀU
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
            THREE.JS
          </span>
        </div>

        {/* Camera Views Selector */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-md pointer-events-auto text-xs">
          <button
            onClick={() => setPreset("isometric")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              cameraView === "isometric"
                ? "bg-rose-600 text-white font-bold shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            3D Nghiêng
          </button>
          <button
            onClick={() => setPreset("axial")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              cameraView === "axial"
                ? "bg-rose-600 text-white font-bold shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Mặt Ngang (Axial)
          </button>
          <button
            onClick={() => setPreset("coronal")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              cameraView === "coronal"
                ? "bg-rose-600 text-white font-bold shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Mặt Trán (Coronal)
          </button>
          <button
            onClick={() => setPreset("base")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              cameraView === "base"
                ? "bg-rose-600 text-white font-bold shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Đáy Sọ / Lỗ Chẩm
          </button>
        </div>
      </div>

      {/* Main WebGL Canvas Mount */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing flex-1"
      />

      {/* 3D Bottom Floating Control Bar */}
      <div className="absolute bottom-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md text-xs text-slate-300 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
              isAutoRotate ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-400"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin" : ""}`} />
            <span>{isAutoRotate ? "Đang tự xoay 360°" : "Tạm dừng xoay"}</span>
          </button>

          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-2 py-1 rounded-lg text-xs transition-all ${
              wireframeMode ? "bg-sky-950 text-sky-300 border border-sky-800" : "bg-slate-800 text-slate-400"
            }`}
          >
            Khung sọ {wireframeMode ? "Lưới (Wireframe)" : "Trong suốt"}
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={() => {
              zoomLevel.current = Math.max(14, zoomLevel.current - 4);
            }}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              zoomLevel.current = Math.min(42, zoomLevel.current + 4);
            }}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Anatomical Legend */}
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md text-[11px] font-mono pointer-events-auto">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <span className="text-slate-300">Bán cầu não</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-slate-300">Lều tiểu não</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-300" />
            <span className="text-slate-300">Thân não</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Dây sọ III</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <span className="text-rose-400 font-bold">Khối choán chỗ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
