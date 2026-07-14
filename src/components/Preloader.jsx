import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const text = "Rupak Sharma.";
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef(null);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 110); // 110ms typing speed
      return () => clearTimeout(timeout);
    } else {
      // Wait a brief moment, then fade and slide up out of view
      const timeout = setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            // Re-enable scrolling
            document.body.style.overflow = "";
            onCompleteRef.current();
          }
        });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  // Synchronized underline loading progress calculation
  const progressPercent = (displayText.length / text.length) * 100;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
    >
      <div className="flex flex-col items-start px-6 max-w-lg w-full">
        {/* Typewriter Text with cursor */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-white select-none pb-4 font-sans flex items-center h-[50px] md:h-[80px]">
          <span>{displayText}</span>
          <span className="animate-cursor-blink text-white ml-1.5 inline-block w-[3px] h-[32px] md:h-[48px] bg-white"></span>
        </h1>

        {/* Underline as Loading Bar */}
        <div className="w-full h-[3px] bg-[#1c1c21] rounded-full overflow-hidden mt-1 relative">
          <div
            className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_12px_rgba(255,255,255,1)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
