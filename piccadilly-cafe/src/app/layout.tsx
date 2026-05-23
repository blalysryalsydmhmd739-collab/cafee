import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";

config.autoAddCss = false; 

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: '--font-cairo',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ملاذ كافيه | قهوة مختصة ومأكولات مصرية فاخرة",
  description: "مرحباً بك في ملاذ كافيه، الملاذ الهادئ والفاخر للاستمتاع بالقهوة المختصة والمأكولات المصرية التقليدية بلمسة عصرية مبتكرة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${cairo.variable} font-arabic overflow-x-hidden`}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
