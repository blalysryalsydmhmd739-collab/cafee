"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Sofa, User, Mail, Phone, MessageSquare, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

interface BookingData {
  date: string;
  time: string;
  guests: string;
  seating: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingData>({
    date: "",
    time: "",
    guests: "2",
    seating: "indoor",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<BookingData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof BookingData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<BookingData> = {};
    
    // Validate Date
    if (!formData.date) {
      newErrors.date = "يرجى تحديد تاريخ الحجز.";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "لا يمكن حجز تاريخ في الماضي.";
      }
    }

    // Validate Time
    if (!formData.time) {
      newErrors.time = "يرجى تحديد وقت الحجز.";
    }

    // Validate Guests
    if (!formData.guests || parseInt(formData.guests) < 1) {
      newErrors.guests = "يرجى اختيار عدد ضيوف صالح.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<BookingData> = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "الاسم الكامل مطلوب.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "يجب أن يكون الاسم 3 أحرف على الأقل.";
    }

    // Validate Email
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "صيغة البريد الإلكتروني غير صالحة.";
    }

    // Validate Phone
    if (!formData.phone) {
      newErrors.phone = "رقم الهاتف مطلوب.";
    } else if (!/^[0-9+() \-]{8,20}$/.test(formData.phone)) {
      newErrors.phone = "يرجى إدخال رقم هاتف صالح.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      // Complete booking
      setStep(3);
    }
  };

  const seatingOptions = [
    { id: "indoor", name: "داخلي (أجواء كلاسيكية)" },
    { id: "outdoor", name: "خارجي (في الهواء الطلق)" },
    { id: "window", name: "بجوار النافذة (إطلالة مميزة)" },
    { id: "vip", name: "صالون كبار الشخصيات VIP" },
  ];

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-6 max-w-4xl pt-32 pb-24 flex-grow flex items-center justify-center">
        <div className="w-full bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-stone-200/40 dark:border-stone-850/40 overflow-hidden flex flex-col lg:flex-row min-h-[550px] transition-colors">
          
          {/* Left Side: Info and Decor */}
          <div className="lg:w-2/5 bg-amber-500 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Soft background shape */}
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            
            <div className="space-y-6 relative z-10 text-right">
              <span className="text-xs uppercase tracking-widest font-bold bg-white/20 px-3 py-1 rounded-full">
                حجز طاولات مباشر
              </span>
              <h2 className="text-3xl font-extrabold leading-tight font-serif">
                احجز ملاذك الخاص
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                استمتع بأسعد الأوقات مع عائلتك أو أصدقائك في ملاذ كافيه. احجز طاولتك الآن بكل سهولة ودعنا نهيئ لك الأجواء المثالية.
              </p>
            </div>

            <div className="space-y-4 pt-12 lg:pt-0 relative z-10 text-right text-xs text-white/90">
              <div className="flex gap-2 items-center justify-end">
                <span>تأكيد حجز فوري عبر البريد الإلكتروني</span>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <div className="flex gap-2 items-center justify-end">
                <span>إمكانية تعديل أو إلغاء الحجز مجاناً</span>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <div className="flex gap-2 items-center justify-end">
                <span>أماكن جلوس خاصة ومريحة للعائلات</span>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Side: Step-by-Step Form */}
          <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            
            {/* Step Indicators */}
            {step < 3 && (
              <div className="flex items-center justify-between mb-8 border-b border-stone-100 dark:border-stone-800 pb-4">
                <span className="text-xs font-bold text-stone-400 dark:text-stone-500">
                  الخطوة {step} من 2
                </span>
                <div className="flex gap-1.5">
                  <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-8 bg-amber-500" : "w-2.5 bg-stone-200 dark:bg-stone-850"}`} />
                  <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? "w-8 bg-amber-500" : "w-2.5 bg-stone-200 dark:bg-stone-850"}`} />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-right"
                >
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">تفاصيل الحجز</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">حدد التاريخ، الوقت وعدد الضيوف لبدء حجز طاولة.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                        تاريخ الحجز
                        <Calendar size={14} className="text-amber-500" />
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right ${
                          errors.date ? "border-red-500" : "border-stone-250 dark:border-stone-800"
                        }`}
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Time */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                          توقيت الحضور
                          <Clock size={14} className="text-amber-500" />
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right ${
                            errors.time ? "border-red-500" : "border-stone-250 dark:border-stone-800"
                          }`}
                        >
                          <option value="">اختر الوقت</option>
                          <option value="08:00">8:00 صباحاً</option>
                          <option value="09:30">9:30 صباحاً</option>
                          <option value="11:00">11:00 صباحاً</option>
                          <option value="13:00">1:00 ظهراً</option>
                          <option value="14:30">2:30 ظهراً</option>
                          <option value="16:00">4:00 عصراً</option>
                          <option value="18:00">6:00 مساءً</option>
                          <option value="19:30">7:30 مساءً</option>
                          <option value="21:00">9:00 مساءً</option>
                          <option value="22:30">10:30 مساءً</option>
                        </select>
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                      </div>

                      {/* Guests */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                          عدد الأفراد
                          <Users size={14} className="text-amber-500" />
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-250 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right"
                        >
                          <option value="1">فرد واحد</option>
                          <option value="2">فردين</option>
                          <option value="3">3 أفراد</option>
                          <option value="4">4 أفراد</option>
                          <option value="5">5 أفراد</option>
                          <option value="6">6 أفراد</option>
                          <option value="8">8 أفراد</option>
                          <option value="10">10 أفراد أو أكثر</option>
                        </select>
                        {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleNext}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      متابعة الحجز
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5 text-right"
                >
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">البيانات الشخصية</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">أدخل تفاصيل التواصل وتفضيل الجلسة لتأكيد الحجز.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Seating Preference */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                        تفضيل الجلسة
                        <Sofa size={14} className="text-amber-500" />
                      </label>
                      <select
                        name="seating"
                        value={formData.seating}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-250 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right"
                      >
                        {seatingOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                        الاسم الكامل
                        <User size={14} className="text-amber-500" />
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="أدخل اسمك بالكامل"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right ${
                          errors.name ? "border-red-500" : "border-stone-250 dark:border-stone-800"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                          رقم الهاتف
                          <Phone size={14} className="text-amber-500" />
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="مثال: 01xxxxxxxxx"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right ${
                            errors.phone ? "border-red-500" : "border-stone-250 dark:border-stone-800"
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                          البريد الإلكتروني
                          <Mail size={14} className="text-amber-500" />
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right ${
                            errors.email ? "border-red-500" : "border-stone-250 dark:border-stone-800"
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 justify-end">
                        ملاحظات خاصة (اختياري)
                        <MessageSquare size={14} className="text-amber-500" />
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="أي تفضيلات أو طلبات خاصة بحجزك..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-250 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-right resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/3 border border-stone-250 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight size={16} />
                      السابق
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      إتمام وتأكيد الحجز
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6 py-6"
                >
                  <div className="flex justify-center text-green-500">
                    <CheckCircle size={64} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-stone-900 dark:text-white leading-tight">
                      تم تأكيد حجزك بنجاح!
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">
                      شكراً لك يا {formData.name}. تم إرسال تفاصيل الحجز وتذكرة التأكيد إلى بريدك الإلكتروني.
                    </p>
                  </div>

                  {/* Summary card */}
                  <div className="bg-stone-50 dark:bg-stone-850 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 text-right space-y-4 max-w-sm mx-auto text-sm">
                    <h4 className="font-bold text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-800 pb-2 text-center">
                      ملخص تفاصيل الحجز
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex justify-between">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{formData.date}</span>
                        <span className="text-stone-400">تاريخ الحجز</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{formData.time}</span>
                        <span className="text-stone-400">توقيت الحضور</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{formData.guests} أفراد</span>
                        <span className="text-stone-400">عدد الحضور</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">
                          {seatingOptions.find((o) => o.id === formData.seating)?.name.split(" ")[0]}
                        </span>
                        <span className="text-stone-400">المقعد المفضل</span>
                      </div>
                      {formData.notes && (
                        <div className="border-t border-stone-200 dark:border-stone-850 pt-2 text-xs">
                          <span className="text-stone-400 block mb-1">ملاحظاتك:</span>
                          <span className="text-stone-600 dark:text-stone-300 italic">{formData.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setStep(1);
                        setFormData({
                          date: "",
                          time: "",
                          guests: "2",
                          seating: "indoor",
                          name: "",
                          email: "",
                          phone: "",
                          notes: "",
                        });
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-8 py-3 rounded-full transition duration-300"
                    >
                      حجز طاولة أخرى
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
