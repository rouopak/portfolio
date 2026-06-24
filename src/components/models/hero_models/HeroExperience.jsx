import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Shaw } from "./Hollow_knight_hornet";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const FloatingShaw = () => {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Smooth sine-wave floating: amplitude 0.15, speed 1.2
            groupRef.current.position.y = -3 + Math.sin(clock.getElapsedTime() * 1.2) * 0.15;
        }
    });

    return (
        <group ref={groupRef} scale={2.5} position={[0.6, 0, 0]} rotation={[0, -60.5, 0]}>
            <Shaw />
        </group>
    );
};

const heroexperience = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <Canvas camera={{ fov: 50, position: [0, 2, 5] }}>
            <Suspense fallback={null}>
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={!isMobile}
                    autoRotate={isMobile}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
                <HeroLights />
                <Particles />
                <FloatingShaw />
            </Suspense>
        </Canvas>
    )
}

export default heroexperience
