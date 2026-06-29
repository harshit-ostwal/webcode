"use client";
import { cn } from "@/shared/utils/cn";

function ImageComp({
  src,
  alt,
  width = 1920,
  height = 1080,
  className,
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover object-center select-none", className)}
      draggable={false}
      loading="eager"
      fetchPriority="high"
      {...props}
    />
  );
}

export { ImageComp };
