import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import ShowcaseCounter from "../components/showcase_components/showcase_counter";
import MoreProjectButton from "../components/showcase_components/more_project_button";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const rydeRef = useRef(null);
    const libraryRef = useRef(null);
    const ycDirectoryRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase flex-col mt-0! pt-0 md:pt-10">
            <div className="w-full max-w-7xl mx-auto">
                {/* About Me Section */}
                <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-12 gap-8">
                    <div className="xl:w-1/2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">Curated Works</h1>
                        <p className="text-[#a0a0a0] md:text-lg leading-relaxed max-w-xl">
                            I focus on building fluid, high-performance digital experiences where motion
                            meets utility. Each project is a deep dive into liquid minimalism, ensuring visual
                            clarity and technical precision.
                        </p>
                    </div>
                    <div className="flex gap-8 md:gap-12 pb-2">
                        <ShowcaseCounter number={3} text="Projects" suffix="+" />
                        <ShowcaseCounter number={0} prefix="0" text="WorkEx" />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-5">
                    {/* Left Project */}
                    <div ref={rydeRef} className="xl:col-span-8 bg-[#111111] rounded-2xl overflow-hidden group flex flex-col border border-white/5 transition-colors duration-500 hover:border-white/20">
                        <div className="relative grow min-h-[400px] xl:min-h-[500px]">
                            <img src="/images/project1.png" alt="Nebula Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            {/* Badge */}
                            <div className="absolute bottom-5 left-5 bg-[#1a1a1a]/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border border-white/10 text-white z-10">
                                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                Featured Work
                            </div>
                        </div>
                        <div className="p-6 md:p-8 bg-[#181818] z-10">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Nebula Dashboard</h2>
                            <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed">An immersive financial management platform designed for the next generation of digital assets. Built with a custom WebGL engine for real-time data visualization.</p>
                        </div>
                    </div>

                    {/* Right Projects */}
                    <div className="xl:col-span-4 flex flex-col gap-5">
                        <div ref={libraryRef} className="bg-[#111111] rounded-2xl overflow-hidden group flex-1 flex flex-col border border-white/5 transition-colors duration-500 hover:border-white/20">
                            <div className="relative h-48 md:h-60 xl:h-auto grow overflow-hidden">
                                <img src="/images/project2.png" alt="Vertex OS" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="p-6 bg-[#181818] z-10">
                                <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Vertex OS</h2>
                                <p className="text-[#a0a0a0] text-sm leading-relaxed">Experimental operating system UI for foldable devices.</p>
                            </div>
                        </div>
                        <div ref={ycDirectoryRef} className="bg-[#111111] rounded-2xl overflow-hidden group flex-1 flex flex-col border border-white/5 transition-colors duration-500 hover:border-white/20">
                            <div className="relative h-48 md:h-60 xl:h-auto grow overflow-hidden">
                                <img src="/images/project3.png" alt="Liquid Motion" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="p-6 bg-[#181818] z-10">
                                <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Liquid Motion</h2>
                                <p className="text-[#a0a0a0] text-sm leading-relaxed">A study on organic easing and physics-based interactions.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Explore Archive Section */}
                <div className="bg-[#181818] rounded-2xl p-6 md:p-10 flex flex-row justify-between items-center mt-5 border border-white/5 transition-colors duration-500 hover:border-white/20">
                    <div className="pr-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Explore the Archive</h2>
                        <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed">View 20+ additional projects including experiments, case studies, and brand identities.</p>
                    </div>
                    <Link to="/expanded_projects">
                        <MoreProjectButton />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AppShowcase;