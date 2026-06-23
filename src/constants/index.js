import Card_Model1 from "../components/models/experiences_models/card_model1";
import Card_Model2 from "../components/models/experiences_models/card_model2";
import Card_Model3 from "../components/models/experiences_models/card_model3";

const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
];

const navLinks = [
    {
        name: "Projects",
        link: "#work",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },
];
const expCards = [
    {
        model: Card_Model1,
        logoPath: "/images/logo1.png",
        title: "Software Developer",
        date: "January 2024 - Present",
        responsibilities: [
            "Built and deployed full-stack web applications from concept to implementation.",
            "Developed responsive user interfaces and interactive user experiences.",
            "Worked with modern web technologies to create scalable and maintainable solutions.",
            "Implemented APIs, state management, and database integrations.",
            "Focused on performance optimization, clean code practices, and user-centric design.",
        ],
    },
    {
        model: Card_Model2,
        logoPath: "/images/logo2.png",
        title: "Smart India Hackathon 2025",
        date: "September 2025",
        responsibilities: [
            "Led a team shortlisted among the Top 10 teams selected to represent JSSATE Noida for SIH 2025.",
            "Spearheaded solution ideation, product planning, and project execution.",
            "Collaborated with team members to transform a problem statement into a practical software solution.",
            "Managed project direction, team coordination, and presentation strategy throughout the competition.",
            "Demonstrated leadership, problem-solving, and product development skills in a national-level innovation challenge.",
        ],
    },
    {
        model: Card_Model3,
        logoPath: "/images/logo3.png",
        title: "IEEE Student Member",
        date: "October 2024 - February 2026",
        responsibilities: [
            "Participated in technical workshops, events, and community initiatives.",
            "Collaborated with student teams to support event planning and execution.",
            "Contributed to the planning and coordination of student-led hackathon initiatives.",
            "Developed leadership, communication, and organizational skills through active involvement in club activities.",
        ],
    },
];

const techStackIcons = [
    {
        name: "React Developer",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        rotation: [0, 0, 0],
    },
    {
        name: "Python Developer",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
    },
    {
        name: "Backend Developer",
        modelPath: "/models/node-transformed.glb",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Interactive Developer",
        modelPath: "/models/three.js-transformed.glb",
        scale: 0.05,
        rotation: [0, 0, 0],
    },
    {
        name: "Project Manager",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
    },
];
const socialImgs = [
    {
        name: "linkedin",
        imgPath: "/images/linkedin.png",
        link: "https://www.linkedin.com/in/rooopak/",
    },
    {
        name: "github",
        imgPath: "/images/github.png",
        link: "https://github.com/rouopak",
    },
    {
        name: "leetCode",
        imgPath: "/images/leetCode.png",
        link: "https://leetcode.com/u/P5bCajrsMq/",
    },
];
export { words, navLinks, expCards, techStackIcons, socialImgs };