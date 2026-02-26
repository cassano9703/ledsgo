import type { SVGProps } from "react";
import Image from "next/image";

export function Logo(props: { className?: string }) {
  return (
    <div className={`relative ${props.className || ''} overflow-hidden`}>
      <Image
        src="https://i.imgur.com/Xa1CLsJ.png"
        alt="Leds Go Logo"
        fill
        className="object-contain transform scale-[2.8]"
      />
    </div>
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

export function BarberKnife(props: SVGProps<SVGSVGElement>) {
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
      <path d="M7.22 12.39L4 14.8V18h3.2l2.39-3.22"/>
      <path d="M10.15 11.85L7.22 8.92a2.07 2.07 0 0 1 0-2.92l1.41-1.41a2.07 2.07 0 0 1 2.92 0l1.41-1.41a2.07 2.07 0 0 1 2.92 0l2.93 2.93"/>
      <path d="M19.09 18H21v-3.2l-1.39-1.39"/>
      <path d="M11.66 12.84L14.59 10a2.07 2.07 0 0 1 2.92 0l1.41 1.41a2.07 2.07 0 0 1 0 2.92l-2.93 2.93"/>
    </svg>
  );
}

export function CircleIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
