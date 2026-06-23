//will have a table for detailed description for every main project 
import { Link } from "react-router-dom";

const ExpandedProjects = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-5 relative overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center z-10 max-w-xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white-50 text-xs md:text-sm font-semibold tracking-wider uppercase mb-6">
                    🚧 Page Status
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-white-50 to-[#b5d6f4] bg-clip-text text-transparent">
                    Work In Progress
                </h1>

                <p className="text-blue-50 text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
                    This section is currently under development. I'm crafting an immersive showcase for all projects and gaining experience. Stay tuned!
                </p>

                <div className="flex justify-center">
                    <Link to="/" className="skills-btn group">
                        <div className="skills-btn-bg" />
                        <span className="skills-btn-icon rotate-180 group-hover:-translate-x-1.5 transition-transform duration-300">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </span>
                        <span className="skills-btn-text">Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExpandedProjects;
