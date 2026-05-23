"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";

interface TestimonialItem {
  id: number;
  text: string;
  author: string;
  role: string;
  rating: number;
}

export default function Testimonial() {
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      text: "أفضل قهوة محوجة وفطور شرقي تناولته منذ فترة طويلة! الأجواء في ملاذ هادئة ودافئة للغاية، والتصميم كلاسيكي ومريح جداً للعمل أو القراءة. أنصح بشدة بزيارته.",
      author: "أحمد الشامي",
      role: "عميل دائم",
      rating: 5,
    },
    {
      id: 2,
      text: "المكان بالفعل اسم على مسمى، فهو 'ملاذ' حقيقي من صخب المدينة. طاجن أم علي هنا لا يُعلى عليه، ويأتيك ساخناً ومليئاً بالقشطة والمكسرات. الخدمة ممتازة والابتسامة لا تفارق الموظفين.",
      author: "سارة المهدي",
      role: "كاتبة وصانعة محتوى",
      rating: 5,
    },
    {
      id: 3,
      text: "كافيه راقي وجميل جداً، المشروبات الساخنة والشتوية مثل السحلب وحمص الشام مميزة للغاية ولها مذاق خاص. أحببت تفاصيل الجلوس الخارجي والهدوء التام في الموقد.",
      author: "كريم عبد العزيز",
      role: "مهندس معماري",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for right, 1 for left

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300 overflow-hidden relative">
      {/* Background soft gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 space-y-8">
        {/* Section Title */}
        <div className="space-y-3">
          <span className="text-amber-500 font-bold uppercase tracking-wider text-xs md:text-sm">
            آراء زوارنا
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white leading-tight font-serif">
            ماذا يقولون عن ملاذ؟
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[250px] flex items-center justify-center px-4 md:px-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6 max-w-3xl"
            >
              {/* Quote Icon */}
              <div className="flex justify-center text-amber-500/20 dark:text-amber-500/10">
                <Quote size={64} className="transform rotate-180" />
              </div>

              {/* Quote Text */}
              <p className="text-xl md:text-2xl font-semibold leading-relaxed text-stone-700 dark:text-stone-300 italic px-4">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              {/* Rating stars */}
              <div className="flex justify-center gap-1 text-amber-500 text-lg">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Author & Role */}
              <div>
                <h4 className="font-bold text-stone-900 dark:text-white text-lg">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handlePrev}
            className="p-3 bg-stone-100 hover:bg-amber-500 hover:text-white dark:bg-stone-900 dark:hover:bg-amber-500 text-stone-700 dark:text-stone-300 rounded-full shadow-md transition-all duration-300"
            aria-label="الرأي السابق"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-stone-100 hover:bg-amber-500 hover:text-white dark:bg-stone-900 dark:hover:bg-amber-500 text-stone-700 dark:text-stone-300 rounded-full shadow-md transition-all duration-300"
            aria-label="الرأي التالي"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-amber-500" : "w-2.5 bg-stone-200 dark:bg-stone-800"
              }`}
              aria-label={`الذهاب للرأي ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
