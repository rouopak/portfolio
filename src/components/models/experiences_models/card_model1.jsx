import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Center } from "@react-three/drei";
import { Duck } from './Gintamaduck';
const Card_Model1 = () => {
    return (
        <div className="
            w-full
            h-[450px]
            rounded-3xl
            border border-cyan-400/20
            bg-white/5
            backdrop-blur-md
            overflow-hidden
        ">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
                <Suspense fallback={null}>
                    {/* Dark purple ambient light to keep shadows colored but dark */}
                    <ambientLight intensity={0.3} color="#151030" />

                    {/* Cyan Key Light from the front-left */}
                    <directionalLight position={[-5, 5, 5]} intensity={4.5} color="#00f3ff" />

                    {/* Magenta Fill Light from the front-right */}
                    <directionalLight position={[5, 4, 3]} intensity={4.5} color="#ff007f" />

                    {/* Gold Rim/Back Light from behind the model */}
                    <spotLight position={[0, 8, -6]} intensity={6} color="#ffd700" angle={0.8} penumbra={0.8} />

                    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                        <group position={[0, -2.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
                            <Duck scale={0.5} />
                        </group>
                    </Float>
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={2} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Card_Model1;