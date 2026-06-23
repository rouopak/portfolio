const HeroLights = () => {
    return (
        <>
            {/* === BASE AMBIENT — dark moody violet base === */}
            <ambientLight intensity={0.2} color="#110820" />

            {/* === MAIN KEY — warm white directional, soft parallel rays from upper-front-right === */}
            <directionalLight
                position={[3, 6, 5]}
                color="#fff6ee"
                intensity={2.2}
            />

            {/* === SECONDARY FILL — cooler diffuse fill from the front-left, softens shadows === */}
            <directionalLight
                position={[-2, 2, 4]}
                color="#dde8ff"
                intensity={0.6}
            />

            {/* === FRONT WRAP — warm peach point, wraps around the cloak body === */}
            <pointLight
                position={[2.5, 0, 3]}
                color="#ffc89a"
                intensity={12}
                distance={9}
                decay={1.8}
            />

            {/* === LEFT RIM — electric violet directional, paints left silhouette edge === */}
            <directionalLight
                position={[-6, 2, 1]}
                color="#7c3aff"
                intensity={1.4}
            />

            {/* === BACK RIM — icy cyan directional, separates model from dark background === */}
            <directionalLight
                position={[0, 1, -6]}
                color="#00c4ff"
                intensity={0.9}
            />

            {/* === CLOAK ACCENT — deep warm red pooling on lower body === */}
            <pointLight
                position={[0.8, -2.6, 2]}
                color="#cc1500"
                intensity={14}
                distance={4}
                decay={1.8}
            />

            {/* === GROUND BOUNCE — faint cool underlight for depth === */}
            <pointLight
                position={[0.6, -5, 1.5]}
                color="#220044"
                intensity={8}
                distance={5}
                decay={2}
            />
        </>
    );
};

export default HeroLights;