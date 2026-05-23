"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export default function Footer() {
  const instagramPhotos = [
    "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=400&q=80", // Coffee
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80", // Cappuccino
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80", // Espresso
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80", // Pouring coffee
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", // Latte art
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=400&q=80"  // Cafe scene
  ];

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      {/* Brand & Insta grid section */}
      <div className="container mx-auto px-6 max-w-6xl pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center border-b border-stone-200 dark:border-stone-800 pb-12">
          {/* Logo & About */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="text-3xl font-extrabold text-amber-500 tracking-wider">
              ملاذ كافيه
            </Link>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed max-w-sm">
              أهلاً بك في ملاذ، وجهتك الهادئة للاستمتاع بأجود أنواع البن والوجبات المصرية التقليدية بلمسة عصرية مبتكرة.
            </p>
            <div className="flex gap-4 text-stone-500 dark:text-stone-400">
              <a href="#" className="hover:text-amber-500 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors" aria-label="Twitter/X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Clean Gallery Grid */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">لمحات من ملاذ</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {instagramPhotos.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img
                    src={url}
                    alt={`Cafe image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 text-stone-600 dark:text-stone-400">
          {/* Column 1: Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-white text-base">روابط سريعة</h3>
            <ul className="text-sm space-y-2.5">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-500 transition-colors">من نحن</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-500 transition-colors">قائمة الطعام</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-amber-500 transition-colors">حجز طاولة</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Hours & Branches */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-white text-base">فروعنا وأوقات العمل</h3>
            <div className="text-sm space-y-3">
              <div className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-800 dark:text-stone-200">فرع القاهرة الجديدة</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">شارع التسعين الشمالي، التجمع الخامس</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-800 dark:text-stone-200">فرع المعادي</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">شارع 9، أمام محطة المترو</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-center pt-2">
                <Clock size={16} className="text-amber-500 shrink-0" />
                <span className="text-xs">يومياً من الساعة 8:00 صباحاً وحتى 11:00 مساءً</span>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-white text-base">النشرة البريدية</h3>
            <p className="text-sm leading-relaxed">
              اشترك في قائمتنا البريدية لتصلك أحدث العروض والفعاليات والخصومات الحصرية.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("تم الاشتراك بنجاح!"); }} className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition duration-300"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md transition duration-300 shrink-0"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 text-center text-xs text-stone-500 dark:text-stone-500">
          &copy; {new Date().getFullYear()} ملاذ كافيه. جميع الحقوق محفوظة. تم التطوير بكل حب ☕️
        </div>
      </div>
    </footer>
  );
}
