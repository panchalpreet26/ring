import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// Preload global ring model
useGLTF.preload("/model/ring.glb");

function RotatingRing({ scrollYProgress }) {
  const { scene } = useGLTF("/model/ring.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.004;
  });

  const x = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.group
      ref={ref}
      scale={[0.6, 0.6, 0.6]}
      position-y={-0.3}
      position-x={x}
    >
      <primitive object={scene} />
    </motion.group>
  );
}

function RingCanvas({ scrollYProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <Suspense fallback={null}>
        <RotatingRing scrollYProgress={scrollYProgress} />
      </Suspense>
      <Environment preset="studio" />
    </Canvas>
  );
}

function Section({ title, content, button, reverse }) {
  return (
    <section
      className={`d-flex flex-column flex-md-row ${
        reverse ? "flex-md-row-reverse" : ""
      } align-items-center justify-content-between`}
      style={{
        height: "100vh",
        padding: "5rem 2rem",
        position: "relative",
        zIndex: 2,
        background: "rgba(0,0,0,0.9)",
        color: "white",
      }}
    >
      <div className="col-md-6 text-center text-md-start px-4">
        <h1 className="display-4 fw-bold">{title}</h1>
        <p className="lead my-3" style={{ whiteSpace: "pre-line" }}>{content}</p>
        {button && (
          <Link to={button.link} className="btn btn-warning btn-lg mt-3">
            {button.text}
          </Link>
        )}
      </div>
      <div className="col-md-6 d-none d-md-block" style={{ height: "60vh" }} />
    </section>
  );
}

function ProductSection() {
  const products = [
    {
      id: 1,
      name: "Eternal Gold Ring",
      image: "/model/ring1.jpeg",
      description: "A classic gold ring with a modern twist.",
    },
    {
      id: 2,
      name: "Diamond Halo",
      image: "/model/ring1.jpeg",
      description: "Brilliant diamond encircled by halo stones.",
    },
    {
      id: 3,
      name: "Rose Elegance",
      image: "/model/ring1.jpeg",
      description: "Romantic rose gold ring for every occasion.",
    },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "5rem 2rem",
        background: "black",
        color: "white",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Our Collection</h2>
        <p className="lead">Discover rings crafted for elegance and meaning.</p>
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-md-4 mb-5" key={product.id}>
            <div
              style={{
                width: "100%",
                height: "250px",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#222",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center mt-3 px-2">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <Link to="/ringviewer" className="btn btn-outline-light mt-2">
                Customize
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();

  return (
    <div style={{ position: "relative", overflowX: "hidden" }}>
      {/* Insert 3D Ring GLB model */}
      <RingCanvas scrollYProgress={scrollYProgress} />

      {/* Page Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Section
          title="Design Your Dream Ring"
          content="Elegant. Timeless. Uniquely Yours.\nDiscover the craftsmanship of personalized jewelry."
          button={{ text: "Customize Your Ring", link: "/ringviewer" }}
        />
        <Section
          title="Our Story"
          content="Rooted in tradition and inspired by innovation.\nCrafting fine jewelry for over 50 years."
          reverse
        />
        <ProductSection />
        <Section
          title="Why Choose Us?"
          content={`✔ Certified gemstones & eco-conscious metals\n✔ Lifetime warranty & global delivery\n✔ Secure transactions & easy returns`}
        />
        <Section
          title="Customer Reviews"
          content={`“A truly magical ring that made our engagement unforgettable!” – Emma R.\n“Flawless craftsmanship and excellent service.” – Arjun P.`}
          reverse
        />
        <Section
          title="Begin Your Story Today"
          content="Your perfect ring is just a click away."
          button={{ text: "Start Customizing", link: "/ringviewer" }}
        />
      </div>
    </div>
  );
}
