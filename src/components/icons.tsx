import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="url(#logo-gradient)" />
    </svg>
  );
}

export function SimpleCrown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 18h16v-4H4v4zM12 14V4M8.5 14L6 7m7 7l2.5-7M5 14l-3-4m17 4l3-4" />
      <circle cx="12" cy="3" r="1" fill="currentColor"/>
      <circle cx="5.5" cy="6" r="1" fill="currentColor"/>
      <circle cx="18.5" cy="6" r="1" fill="currentColor"/>
      <circle cx="2.5" cy="9" r="1" fill="currentColor"/>
      <circle cx="21.5" cy="9" r="1" fill="currentColor"/>
    </svg>
  );
}
