import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { techStackIcons } from "../../../constants";

const TechIconModel = ({ model, isMobile }) => {
    const scene = useGLTF(model.modelPath);

    useEffect(() => {
        scene.scene.traverse((child) => {
            if (child.isMesh) {
                if (isMobile) {
                    const color = child.material.color || new THREE.Color("white");
                    child.material = new THREE.MeshBasicMaterial({ color: color });
                } else if (model.name === "Interactive Developer" && child.name === "Object_5") {
                    child.material = new THREE.MeshStandardMaterial({ color: "white" });
                }
            }
        });
    }, [scene, model.name, isMobile]);

    if (isMobile) {
        return (
            <group scale={model.scale} rotation={model.rotation}>
                <primitive object={scene.scene} />
            </group>
        );
    }

    return (
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <group scale={model.scale} rotation={model.rotation}>
                <primitive object={scene.scene} />
            </group>
        </Float>
    );
};

const TechIconCardExperience = ({ model }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <Canvas>
            <ambientLight intensity={isMobile ? 1.5 : 0.3} />
            {!isMobile && <directionalLight position={[5, 5, 5]} intensity={1} />}
            {!isMobile && (
                <spotLight
                    position={[10, 15, 10]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                />
            )}
            {!isMobile && <Environment preset="city" />}

            <Suspense fallback={null}>
                <TechIconModel model={model} isMobile={isMobile} />
            </Suspense>

            <OrbitControls enableZoom={false} enablePan={!isMobile} enableRotate={!isMobile} />
        </Canvas>
    );
};

// Preload all 3D models at the module level for instant loading
techStackIcons.forEach((tech) => {
    useGLTF.preload(tech.modelPath);
});

export default TechIconCardExperience;
