import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseCounter = ({ number, prefix = "", suffix = "", text }) => {
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let obj = { val: 0 };
    
    const tl = gsap.to(obj, {
      val: number,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        setCount(Math.round(obj.val));
      }
    });

    return () => {
      tl.kill();
    };
  }, [number]);

  // Format to string with prefix and suffix
  const formattedNumber = `${prefix}${count}${suffix}`;

  return (
    <div ref={counterRef} className="flex flex-col items-start border-l border-white-50/20 pl-4">
      <div className="text-3xl md:text-4xl font-bold">{formattedNumber}</div>
      <div className="text-white-50 text-xs md:text-sm uppercase tracking-wider">{text}</div>
    </div>
  );
};

export default ShowcaseCounter;
