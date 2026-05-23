"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Highlights() {
  const cards = [
    {
      img: "https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?auto=format&fit=crop&w=800&q=80",
      title: "إفطار شرقي فاخر",
      desc: "طعمية ساخنة، فول مدمس بالخلطة الخاصة، وجبنة بالطماطم مع خبز بلدي طازج.",
      link: "/menu?category=breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
      title: "القهوة والمشروبات",
      desc: "من القهوة التركية المحوجة بالهيل إلى الشاي الكشري بالنعناع الطازج والمشروبات الشتوية.",
      link: "/menu?category=drinks",
    },
    {
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      title: "الحلويات الشرقية",
      desc: "طاجن أم علي الساخن بالمكسرات والقشطة، وأرز بلبن كريمي مزين بالفستق والزبيب.",
      link: "/menu?category=desserts",
    },
  ];

  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-bold uppercase tracking-wider text-xs md:text-sm">
            أبرز ما نقدمه
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white leading-tight font-serif">
            تذوق روائع ملاذ
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base">
            اخترنا لك بعناية باقة من أشهر نكهاتنا لنأخذك في رحلة طهي غنية بالنكهات والذكريات الجميلة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col bg-white dark:bg-stone-950 rounded-2xl shadow-md border border-stone-200/40 dark:border-stone-850/40 overflow-hidden hover:shadow-xl transition-all duration-500 group"
            >
              {/* Card Image Wrapper with Inner Zoom */}
              <div className="relative w-full h-72 overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-300" />
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-4 text-right">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    عرض القائمة <ArrowLeft size={14} className="mt-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
