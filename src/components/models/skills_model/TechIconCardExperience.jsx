import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { techStackIcons } from "../../../constants";

const TechIconModel = ({ model }) => {
    const scene = useGLTF(model.modelPath);

    useEffect(() => {
        if (model.name === "Interactive Developer") {
            scene.scene.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === "Object_5") {
                        child.material = new THREE.MeshStandardMaterial({ color: "white" });
                    }
                }
            });
        }
    }, [scene, model.name]);

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
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight
                position={[10, 15, 10]}
                angle={0.3}
                penumbra={1}
                intensity={2}
            />
            <Environment preset="city" />

            <Suspense fallback={null}>
                <TechIconModel model={model} />
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
