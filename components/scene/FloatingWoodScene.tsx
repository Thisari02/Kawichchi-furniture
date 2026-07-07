import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WoodCube: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = 0.4 + Math.sin(t * 0.65) * 0.16;
    meshRef.current.rotation.y += 0.006;
    meshRef.current.position.y = Math.sin(t * 1.1) * 0.16;
  });

  return (
    <mesh ref={meshRef} castShadow rotation={[0.4, 0.5, 0]}>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        <meshStandardMaterial color="#8a6348" metalness={0.42} roughness={0.38} />
    </mesh>
  );
};

const FloatingWoodScene: React.FC = () => {
  return (
    <div className="absolute right-[4%] xl:right-[8%] bottom-[10%] hidden lg:block w-[230px] h-[230px] xl:w-[320px] xl:h-[320px] pointer-events-none opacity-80">
      <Canvas camera={{ position: [2.5, 2.2, 2.5], fov: 45 }} dpr={[1, 1.4]}>
        <ambientLight intensity={0.52} />
        <directionalLight position={[3, 4, 2]} intensity={1.05} />
        <pointLight position={[-2, -1.2, 2]} intensity={0.35} color="#c89a63" />
        <Suspense fallback={null}>
          <WoodCube />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingWoodScene;
