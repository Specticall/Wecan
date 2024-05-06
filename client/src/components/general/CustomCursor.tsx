import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef } from "react";

export default function CustomCursor({
  children,
  className,
  offsetPx = 0,
  style,
  ...props
}: {
  children: ReactNode;
  className?: string;
  offsetPx?: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const posX = e.clientX;
      const posY = e.clientY;

      cursorRef.current.style.transform = `translate(${posX}px,${
        posY - window.innerHeight
      }px)`;
      // cursorRef.current.style.left = `${posX}px`;
      // cursorRef.current.style.top = `${posY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      {...props}
      className={cn(
        "pointer-events-none z-[1000] absolute bottom-0 left-0 overflow-hidden",
        className
      )}
      ref={cursorRef}
      style={{ ...style, transition: "0.2s transform " }}
    >
      {children}
    </div>
  );
}
