import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);
const experiences = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    useGSAP(() => {
        const isMobile = window.innerWidth <= 768;

        // Loop through each timeline individually and animate the height as the user scrolls
        // The timeline height should scale down from 1 to 0 from bottom to top, revealing the gradient line
        gsap.utils.toArray(".timeline").forEach((timeline) => {
            gsap.to(timeline, {
                scaleY: 0,
                transformOrigin: "bottom bottom",
                ease: "none",
                scrollTrigger: {
                    trigger: timeline,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                },
            });
        });

        // Loop through each expText element and animate them in as they enter the screen
        if (!isMobile) {
            gsap.utils.toArray(".expText").forEach((text) => {
                gsap.from(text, {
                    opacity: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 60%",
                        toggleActions: "play none none none",
                    },
                });
            });
        }
    }, []);

    return (
        <section
            id="experience"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Professional Work Experience"
                    sub="💼 My Career Overview"
                />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card) => (
                            <div key={card.title} className="exp-card-wrapper">
                                {!isMobile && (
                                    <div className="xl:w-2/6">
                                        {(() => {
                                            const Model = card.model;
                                            return <Model />;
                                        })()}
                                    </div>
                                )}
                                <div className={isMobile ? "w-full" : "xl:w-4/6"}>
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line w-1 h-full" />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo">
                                                <img src={card.logoPath} alt="logo" />
                                            </div>
                                            <div>
                                                <h1 className="font-semibold text-3xl">{card.title}</h1>
                                                <p className="my-5 text-white-50">
                                                    🗓️&nbsp;{card.date}
                                                </p>
                                                <p className="text-[#839CB5] italic">
                                                    Responsibilities
                                                </p>
                                                <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                                                    {card.responsibilities.map(
                                                        (responsibility, index) => (
                                                            <li key={index} className="text-lg">
                                                                {responsibility}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default experiences