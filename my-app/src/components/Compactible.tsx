import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useAnimation, useTransform, useInView } from 'motion/react';
import c1 from '../assets/c1.svg';
import c2 from '../assets/c2.svg';
import c3 from '../assets/c3.svg';
import c4 from '../assets/c4.svg';
import c5 from '../assets/c5.svg';
import c6 from '../assets/c6.svg';

const chains = [
  { src: c1, alt: 'Ethereum' },
  { src: c2, alt: 'Polygon' },
  { src: c3, alt: 'Optimism' },
  { src: c4, alt: 'OpenSea' },
  { src: c5, alt: 'Zapper' },
  { src: c6, alt: 'Starknet' },
];

const RollingGallery = ({
  autoplay = true,
  pauseOnHover = true,
  images = [],
  isInView
}) => {
  images = images.length > 0 ? images : chains;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  );
  
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Increased cylinder width for a wider appearance
  const cylinderWidth = isScreenSizeSm ? 1000 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.8; // Increased face width
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 25, // Slightly slower for a more majestic feel
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay && isInView) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, isInView]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay && isInView) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <motion.div 
      className="relative h-[400px] w-full overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Fixed gradient syntax */}
      <div
        className="absolute top-0 left-0 h-full w-[60px] z-10"
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,0) 0%, #000000 100%)"
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[60px] z-10"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0) 0%, #000000 100%)"
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[250px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((chain, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[10%] [backface-visibility:hidden] md:p-[8%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <div 
                className="flex-shrink-0 rounded-2xl p-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(192, 192, 192, 0.08) 100%)'
                }}
              >
                <div
                  className="rounded-[20px] h-32 w-32 flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <img
                    src={chain.src}
                    alt={chain.alt}
                    className="h-16 w-auto pointer-events-none transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Compactible = () => {
  const [textAnimationState, setTextAnimationState] = useState('initial');
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  
  useEffect(() => {
    if (isInView) {
      // Text pop-up animation sequence
      const textTimer = setTimeout(() => {
        setTextAnimationState('popup');
        setTimeout(() => {
          setTextAnimationState('settled');
        }, 800);
      }, 600);
      
      return () => {
        clearTimeout(textTimer);
      };
    } else {
      setTextAnimationState('initial');
    }
  }, [isInView]);

  return (
    <section ref={ref} className="bg-black py-28 relative overflow-hidden">
      {/* subtle background grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(192,192,192,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.03) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading with the gradient effect from HeroSection */}
        <motion.h2 
          className="text-center text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-20"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{
            animation: textAnimationState === 'popup' ? 'textPopUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' : 'none'
          }}
        >
          <div className="block">
            <span
              className="bg-clip-text text-transparent relative"
              style={{
                backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                backgroundSize: '300% 300%',
                animation: textAnimationState === 'settled' ? 'gradientShift 6s ease-in-out infinite' : 'none'
              }}
            >
              Compatible Crypto with Binance
            </span>
          </div>
        </motion.h2>

        {/* 3D Rolling Gallery */}
        <RollingGallery autoplay={true} pauseOnHover={true} isInView={isInView} />
      </div>

      {/* Add the animation styles */}
      <style>{`
        @keyframes textPopUp {
          0% { 
            transform: translateY(60px) scale(0.8); 
            opacity: 0; 
          }
          60% { 
            transform: translateY(-8px) scale(1.05); 
            opacity: 0.9; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Compactible;