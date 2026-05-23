"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export const MENU_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";

type MenuFoodImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export default function MenuFoodImage({ src, alt, ...props }: MenuFoodImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== MENU_IMAGE_FALLBACK) {
          setImgSrc(MENU_IMAGE_FALLBACK);
        }
      }}
    />
  );
}
