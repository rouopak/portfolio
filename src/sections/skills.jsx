import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/skills_model/TechIconCardExperience";
import { techStackIcons } from "../constants";

const Skills = () => {
    useGSAP(() => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            // This animation is triggered when the user scrolls to the #skills wrapper
            // The animation starts when the top of the wrapper is at the center of the screen
            // The animation is staggered, meaning each card will animate in sequence
            // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
            gsap.fromTo(
                ".tech-card",
                {
                    // Initial values
                    y: 50, // Move the cards down by 50px
                    opacity: 0, // Set the opacity to 0
                },
                {
                    // Final values
                    y: 0, // Move the cards back to the top
                    opacity: 1, // Set the opacity to 1
                    duration: 1, // Duration of the animation
                    ease: "power2.inOut", // Ease of the animation
                    stagger: 0.2, // Stagger the animation by 0.2 seconds
                    scrollTrigger: {
                        trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
                        start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
                    },
                }
            );
        }
    });

    return (
        <div id="skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="How I Can Contribute & My Key Skills"
                    sub="🤝 What I Bring to the Table"
                />
                <div className="tech-grid">
                    {/* Loop through the techStackIcons array and create a component for each item. 
              The key is set to the name of the tech stack icon, and the classnames are set to 
              card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg 
              classes are only applied on larger screens. */}
                    {techStackIcons.map((techStackIcon) => (
                        <div
                            key={techStackIcon.name}
                            className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
                        >
                            {/* The tech-card-animated-bg div is used to create a background animation when the 
                  component is hovered. */}
                            <div className="tech-card-animated-bg" />
                            <div className="tech-card-content">
                                {/* The tech-icon-wrapper div contains the TechIconCardExperience component, 
                    which renders the 3D model of the tech stack icon. */}
                                <div className="tech-icon-wrapper">
                                    <TechIconCardExperience model={techStackIcon} />
                                </div>
                                {/* The padding-x and w-full classes are used to add horizontal padding to the 
                    text and make it take up the full width of the component. */}
                                <div className="padding-x w-full">
                                    {/* The p tag contains the name of the tech stack icon. */}
                                    <p>{techStackIcon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* This is for the img part */}
                    {/* {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <img src={techStackIcon.imgPath} alt="" />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))} */}
                </div>

                <div className="flex justify-center mt-20">
                    <Link to="/detailed_expertise" className="skills-btn group">
                        <div className="skills-btn-bg" />
                        <span className="skills-btn-text">See All My Skills</span>
                        <span className="skills-btn-icon group-hover:translate-x-1.5 transition-transform duration-300">
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
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Skills