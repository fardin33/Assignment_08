"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    badge: "☀️ Summer Mega Sale",
    title: "Summer Sale",
    highlight: "Up to 50% OFF",
    desc: "Grab sunglasses, skincare, outfits, and beach essentials before the heat gets higher.",
  },
  {
    badge: "🌊 Fresh Collection",
    title: "Hot Weather Picks",
    highlight: "New Arrivals",
    desc: "Light, stylish, and summer-ready products designed for your everyday comfort.",
  },
  {
    badge: "⚡ Limited Time",
    title: "Flash Deals",
    highlight: "Today Only",
    desc: "Special discounts on selected summer essentials. Don’t miss your favorite items.",
  },
];

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction === "next" ? 120 : -120,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === "next" ? -120 : 120,
    scale: 0.96,
    filter: "blur(8px)",
  }),
};

export default function SummerSaleBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setDirection("next");
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const slide = slides[current];

  return (
    <section
      className="mx-auto w-11/12 md:w-10/12 lg:md:w-11/13 xl:md:w-11/13 pt-25 pb-10  md:pt-25 lg:pt-30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative  overflow-hidden rounded-4xl bg-linear-to-br from-teal-950 via-teal-800 to-yellow-700 px-5 text-center text-white shadow-2xl min-h-150  md:min-h-150 md:px-12 lg:min-h-120 lg:px-15 xl:min-h-150">
        {/* Arrows Buttons : */}
        <button
          onClick={() => {
            setIsPaused(true);
            prevSlide();
          }}
          className="absolute left-4 bottom-8 z-20 rounded-full bg-white/15 p-2.5 backdrop-blur-md transition hover:bg-white/25 sm:left-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:p-3"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => {
            setIsPaused(true);
            nextSlide();
          }}
          className="absolute right-4 bottom-8 z-20 rounded-full bg-white/15 p-2.5 backdrop-blur-md transition hover:bg-white/25 sm:right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:p-3"
        >
          <ChevronRight size={22} />
        </button>

        {/* Content : */}
        <div className="relative z-10 flex min-h-155 items-center justify-center px-8 py-16 sm:min-h-165 sm:px-12 md:min-h-175 md:px-16">
          <div className="mx-auto flex min-h-117.5 max-w-3xl flex-col items-center justify-center px-4 sm:px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-yellow-200 backdrop-blur-md">
                  <ShoppingBag size={15} />
                  {slide.badge}
                </div>

                <h2 className="min-h-35 text-[33px] md:text-[55px] lg:text-[60px] font-black leading-tight sm:min-h-37.5  md:min-h-47.5 ">
                  {slide.title}
                  <span className="block text-yellow-400">
                    {slide.highlight}
                  </span>
                </h2>

                <p className="mt-3 min-h-17.5 max-w-2xl font-medium leading-7 text-white/75 text-base md:text-md lg:text-lg">
                  {slide.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination : */}
            <div className="mt-5 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsPaused(true);
                    setDirection(index > current ? "next" : "prev");
                    setCurrent(index);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-yellow-400"
                      : "w-2.5 bg-white/35"
                  }`}
                />
              ))}
            </div>
            {/* Shop Now Button : */}
            <button className="mt-10 rounded-full bg-yellow-400 px-8 py-4 text-sm font-black text-teal-900 shadow-xl shadow-yellow-500/20 transition hover:scale-105 hover:bg-yellow-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
