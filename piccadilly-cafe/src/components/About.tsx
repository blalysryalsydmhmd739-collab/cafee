"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Flame, Utensils, Heart } from "lucide-react";
import Link from "next/link";

export default function About() {
  const features = [
    {
      icon: <Coffee className="w-8 h-8 text-amber-500" />,
      title: "قهوة طازجة مختصة",
      desc: "أفضل حبوب البن المحمصة الطازجة التي نختارها بعناية.",
    },
    {
      icon: <Flame className="w-8 h-8 text-amber-500" />,
      title: "نكهة مصرية أصيلة",
      desc: "توابل ومشروبات تقليدية بخلطاتنا السرية والدافئة.",
    },
    {
      icon: <Utensils className="w-8 h-8 text-amber-500" />,
      title: "مخبوزات ووجبات خفيفة",
      desc: "تشكيلة واسعة من المعجنات والأطباق المحضرة طازجة يومياً.",
    },
    {
      icon: <Heart className="w-8 h-8 text-amber-500" />,
      title: "مكونات طبيعية 100%",
      desc: "نلتزم بأعلى درجات الجودة والمكونات العضوية والصحية.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* About Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Image with Frame Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-r-3xl rounded-bl-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 bg-stone-100 dark:bg-stone-900 group">
              <Image
                src="/images/Limg-1.webp"
                alt="من نحن"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6 text-right"
          >
            <span className="text-amber-500 font-bold uppercase tracking-wider text-xs md:text-sm">
              قصتنا وهويتنا
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white leading-tight font-serif">
              عن ملاذ كافيه
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
              أهلاً بك في ملاذ، حيث تتلاقى روح الأصالة والضيافة المصرية مع النكهات الفريدة لتمنحك تجربة لا مثيل لها. 
              نحن لا نقدم مجرد كوب من القهوة، بل نقدم لك مساحة من السكينة والهدوء لتستمتع بلحظاتك الخاصة أو برفقة من تحب.
            </p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
              نحرص على استخدام أفضل المكونات الطازجة لنقدم لك أطباقاً ومخبوزات دافئة تحمل عبق التراث بلمسات عصرية مميزة، بجانب تشكيلة من المشروبات الباردة والساخنة التي تُعد خصيصاً لتناسب ذوقك الرفيع.
            </p>
            <div className="pt-4">
              <Link
                href="/menu"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/10 text-sm sm:text-base"
              >
                تصفح قائمة الطعام
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-stone-200 dark:border-stone-800">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="p-4 bg-amber-500/5 rounded-2xl mb-4 group-hover:bg-amber-500/10 transition-colors duration-300">
                {feature.icon}
              </div>
              <h4 className="font-bold text-stone-900 dark:text-white mb-2 text-base">
                {feature.title}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
