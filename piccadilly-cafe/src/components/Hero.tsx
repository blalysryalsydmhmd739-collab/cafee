"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/باريستا لابس كمامة.webp')",
          }}
        />
        <div className="absolute inset-0 bg-stone-950/70" />
      </div>

      {/* Cinematic Text Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center flex flex-col items-center justify-center h-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-block text-amber-500 font-bold uppercase tracking-wider text-xs md:text-sm bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            مرحباً بك في ملاذ كافيه
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight font-serif tracking-wide">
            حيث تلتقي عراقة النكهة <br />
            <span className="text-amber-500">بدفء الملاذ</span>
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg">
            نقدم لك تجربة استثنائية من القهوة المختصة والمأكولات المصرية التقليدية المحضرة بلمسة عصرية مبتكرة في أجواء تفوح بالفخامة والهدوء.
          </p>
        </motion.div>

        {/* Buttons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
        >
          <Link
            href="/menu"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/20 text-sm sm:text-base text-center"
          >
            اكتشف قائمتنا
          </Link>
          <Link
            href="/booking"
            className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold rounded-full border border-white/45 hover:border-white transition-all duration-300 text-sm sm:text-base text-center"
          >
            احجز طاولة الآن
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-stone-400 hover:text-white transition duration-300"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">اسحب للأسفل</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
