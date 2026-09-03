/**
 * Mobile Hero logo — deliberately not the desktop RoninHeroLogo. That
 * component's SVG stroke-draw/mask/scroll-linked motion is JS-driven and,
 * on some iOS in-app browsers (WhatsApp/Instagram's WKWebView included),
 * can end up permanently invisible if the JS that's supposed to reveal it
 * never runs cleanly. This renders the same logo asset already proven to
 * work in the header — a plain, eagerly-loaded `<img>`, visible from the
 * very first paint — and animates it with CSS keyframes only (see
 * hero-mobile-* in globals.css), so motion never depends on React,
 * Framer Motion, IntersectionObserver, or hover/pointer state.
 */
export function HeroLogoMobile() {
  return (
    <div className="relative flex flex-1 items-center justify-center py-10 md:hidden">
      <div className="relative w-[72vw] max-w-[380px]">
        <div
          aria-hidden="true"
          className="hero-mobile-logo-glow absolute inset-[-25%] rounded-full bg-ronin-red/30 blur-[60px]"
        />
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>, matching the header's proven logo rendering; must never be gated behind next/image lazy-loading or JS */}
          <img
            src="/images/logo/ronin-logo-1.svg"
            alt="Ronin"
            className="hero-mobile-logo-img relative z-10 h-auto w-full"
            style={{ opacity: 1, visibility: "visible", transform: "none" }}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <div
            aria-hidden="true"
            className="hero-mobile-logo-sweep pointer-events-none absolute inset-y-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
