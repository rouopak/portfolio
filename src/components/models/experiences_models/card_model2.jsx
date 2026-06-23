import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment, Center } from "@react-three/drei";
import { Gun } from './Portalgun';
const Card_Model2 = () => {
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
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={3} castShadow />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="cyan" />
          <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
            <Center rotation={[0, -Math.PI / 6, 0]}>
              <Gun scale={0.007} />
            </Center>
          </Float>
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={-2} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Card_Model2;