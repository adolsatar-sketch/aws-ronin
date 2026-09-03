interface IconProps {
  className?: string;
}

const shared = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A single envelope stroke with an asymmetric fold, echoing the mark's angular swoosh. */
export function EmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...shared}>
      <path d="M6 11h28v18H6z" />
      <path d="M6 12.5 19.3 23.5c.4.35 1 .35 1.4 0L34 12.5" />
      <path d="M22 21.5 33.5 29.5" />
      <path d="M18 21.5 6.5 29.5" />
    </svg>
  );
}

/** A handset drawn as one continuous line, kept off-axis rather than perfectly symmetric. */
export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...shared}>
      <path d="M11.5 6c1.5 0 2 .5 2.5 1.8l1.8 4.6c.4 1-.1 1.9-.9 2.5l-2.2 1.6a17 17 0 0 0 9.2 9.2l1.6-2.2c.6-.8 1.5-1.3 2.5-.9l4.6 1.8c1.3.5 1.8 1 1.8 2.5v3.8c0 2-1.7 3.3-3.6 3-11-1.6-19.2-9.8-20.8-20.8-.3-1.9 1-3.6 3-3.6Z" />
    </svg>
  );
}

/** A minimal line-art take on Instagram — a rounded frame + aperture, not the stock glyph. */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...shared}>
      <rect x="6" y="6" width="28" height="28" rx="9" />
      <circle cx="20" cy="20" r="7" />
      <path d="M27 11.5h.03" strokeWidth={2.4} />
    </svg>
  );
}

/** The interactive-row arrow — a single angled stroke, matching Button.tsx's flip logic. */
export function RowArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...shared}>
      <path d="M5 12h13" />
      <path d="M13 6.5 18.5 12 13 17.5" />
    </svg>
  );
}
