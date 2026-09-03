import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <div className={`mx-auto max-w-5xl px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-16 ${className}`}>
      {eyebrow && (
        <FadeIn as="p" className="mb-4 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
          {eyebrow}
        </FadeIn>
      )}
      <RevealText as="h1" className="font-display text-5xl leading-[0.95] font-bold text-ronin-white sm:text-6xl md:text-7xl">
        {title}
      </RevealText>
      {subtitle && (
        <FadeIn delay={0.2} as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-ronin-white/70">
          {subtitle}
        </FadeIn>
      )}
    </div>
  );
}
