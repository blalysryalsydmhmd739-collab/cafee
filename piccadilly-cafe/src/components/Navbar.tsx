"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ShoppingBag, Menu, X, Plus, Minus, Trash2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotalAmount } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/#about" },
    { name: "قائمة الطعام", href: "/menu" },
    { name: "حجز طاولة", href: "/booking" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-40 transition-all duration-500 top-0 ${
          isScrolled
            ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-md py-4 shadow-lg border-b border-stone-200/40 dark:border-stone-800/40"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-extrabold text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition duration-300 tracking-wider flex items-center gap-2"
          >
            <span className="font-serif">ملاذ</span>
            <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full font-sans font-normal">
              كافيه
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-amber-500 ${
                    isActive
                      ? "text-amber-500"
                      : isScrolled
                      ? "text-stone-800 dark:text-stone-200"
                      : "text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition duration-300 ${
                isScrolled
                  ? "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="تغيير المظهر"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Shopping Cart Icon & Badge */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={`relative p-2 rounded-full transition duration-300 ${
                isScrolled
                  ? "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="سلة المشتريات"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition duration-300 ${
                isScrolled
                  ? "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="فتح القائمة"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden bg-stone-900/95 backdrop-blur-lg pt-24 px-6 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-bold text-white hover:text-amber-400 block py-2 transition"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center text-stone-400 text-xs">
              ملاذ كافيه - أوقات عمل دافئة ولحظات لا تُنسى
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cart Sidebar/Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-stone-900 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-amber-500" size={24} />
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">سلة الطلبات</h3>
                  <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full font-bold">
                    {cartCount} طلب
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-stone-500 dark:text-stone-400 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items list */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-400">
                      <ShoppingBag size={48} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 dark:text-stone-200 text-lg">سلتك فارغة حالياً</h4>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                        تصفح القائمة وأضف بعض الأطباق أو المشروبات اللذيذة!
                      </p>
                    </div>
                    <Link
                      href="/menu"
                      onClick={() => setIsCartOpen(false)}
                      className="bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-amber-600 transition shadow-md"
                    >
                      اكتشف القائمة
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{item.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 bg-stone-200/50 dark:bg-stone-800 px-2 py-1 rounded-full border border-stone-200 dark:border-stone-700">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-600 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-stone-800 dark:text-stone-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="text-stone-600 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-4">
                  <div className="flex justify-between items-center text-stone-950 dark:text-stone-50">
                    <span className="font-semibold">المجموع الإجمالي</span>
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      £{cartTotalAmount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="flex items-center justify-center p-3 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 text-stone-500 transition"
                      title="مسح السلة"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => alert("شكراً لطلبك! سيتم نقلك لبوابة الدفع قريباً.")}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-full text-center shadow-lg transition duration-300"
                    >
                      تأكيد الطلب
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
