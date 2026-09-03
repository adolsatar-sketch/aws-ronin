import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}

export function Button({ href, children, variant = "solid", className = "" }: ButtonProps) {
  const base =
    "cursor-hover group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide uppercase transition-transform duration-300 active:scale-[0.97]";
  const styles =
    variant === "solid"
      ? "bg-ronin-red text-ronin-white hover:-translate-y-0.5"
      : "border border-ronin-white/30 text-ronin-white hover:-translate-y-0.5 hover:border-ronin-red";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="relative z-10 inline-block ltr:hidden rtl:inline-block transition-transform duration-300 rtl:group-hover:-translate-x-1"
      >
        ←
      </span>
      <span
        aria-hidden="true"
        className="relative z-10 hidden ltr:inline-block transition-transform duration-300 ltr:group-hover:translate-x-1"
      >
        →
      </span>
      {variant === "solid" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-0 bg-ronin-red-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </Link>
  );
}
