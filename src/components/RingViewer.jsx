import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";

// Preload model for better performance
useGLTF.preload(process.env.PUBLIC_URL + "/model/ring.glb");

function Ring({ diamondColor, ringColor }) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/model/ring.glb");
  const ringRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.005; // subtle slow rotation
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.toLowerCase().includes("diamond")) {
          child.material.color.set(diamondColor);
        } else {
          child.material.color.set(ringColor);
        }
      }
    });
  }, [diamondColor, ringColor, scene]);

 return (
  <group ref={ringRef} position={[0, -0.7, 0]} scale={[0.8, 0.8, 0.8]}>
    <primitive object={scene} />
  </group>
);

}

export default function RingViewer() {
  const [diamondColor, setDiamondColor] = useState("#ffffff");
  const [ringColor, setRingColor] = useState("#d4af37");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #111 30%, #000 100%)",
        display: "flex",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        className="shadow"
        style={{
          width: "260px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.05)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div>
          <h5 className="text-light">Ring Color</h5>
          <input
            type="color"
            value={ringColor}
            onChange={(e) => setRingColor(e.target.value)}
            className="form-control form-control-color"
            title="Ring Color"
          />
        </div>
        <div>
          <h5 className="text-light">Diamond Color</h5>
          <input
            type="color"
            value={diamondColor}
            onChange={(e) => setDiamondColor(e.target.value)}
            className="form-control form-control-color"
            title="Diamond Color"
          />
        </div>
        <div>
          <p className="small text-light mt-4">
            Tip: Use bright colors like white or blue for the diamond to highlight brilliance.
          </p>
        </div>
      </div>

      {/* Main Viewer */}
      <div style={{ marginLeft: "260px", flexGrow: 1 }}>
        <h1 className="text-center pt-4 text-light fw-bold">Studio Preview</h1>
        <div style={{ height: "80vh", marginTop: "-20px" }}>
          <Canvas camera={{ position: [0, 0.5, 2.5], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight
              position={[5, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <Environment preset="studio" />
            <Ring diamondColor={diamondColor} ringColor={ringColor} />
            <ContactShadows
              position={[0, -0.2, 0]}
              opacity={0.6}
              scale={5}
              blur={1.5}
              far={2.5}
            />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2}
              maxDistance={3.5}
              autoRotate={false}
            />
          </Canvas>
        </div>

        <motion.div
          className="container my-5 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="fs-5 text-white">
            Welcome to your personal studio. Rotate, zoom, and preview your ring in a photoreal environment.
          </p>
          <p className="fs-6 text-light">
            Change colors, inspect materials, and visualize your perfect design under real lighting.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
