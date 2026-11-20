"use client"

import * as React from "react"
import Image from "next/image"

const companyLogos = [
  { name: "Google", src: "/logos/google.png" },
  { name: "Meta", src: "/logos/meta.png" },
  { name: "Apple", src: "/logos/apple.png" },
  { name: "Amazon", src: "/logos/amazon.png" },
  { name: "Netflix", src: "/logos/netflix.png" },
  { name: "Nvidia", src: "/logos/nvidia.png" },
  { name: "Microsoft", src: "/logos/microsoft.png" },
  { name: "Uber", src: "/logos/uber.png" },
  { name: "Airbnb", src: "/logos/airbnb.png" },
  { name: "Spotify", src: "/logos/spotify.png" },
  { name: "Adobe", src: "/logos/adobe.png" },
  { name: "Tesla", src: "/logos/tesla.png" },
]

export function BrandMarquee() {
  return (
    <section className="relative w-full border-y border-white/5 bg-[#030307]/80 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-[1320px] px-4 text-center sm:px-6 lg:px-8">
        <p className="font-space-mono text-xs uppercase tracking-[0.2em] text-white/50">
          Trusted by hiring teams from global leaders and high-growth innovators
        </p>

        {/* Marquee Container with edge fade masks */}
        <div className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16">
            {/* First sequence */}
            {companyLogos.map((company, index) => (
              <div
                key={`logo-1-${index}`}
                className="group flex h-10 w-28 shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:w-32"
              >
                <Image
                  src={company.src}
                  alt={company.name}
                  width={120}
                  height={36}
                  className="max-h-7 w-auto object-contain brightness-200 contrast-125 transition-all group-hover:brightness-100"
                />
              </div>
            ))}

            {/* Duplicate sequence for seamless loop */}
            {companyLogos.map((company, index) => (
              <div
                key={`logo-2-${index}`}
                aria-hidden="true"
                className="group flex h-10 w-28 shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:w-32"
              >
                <Image
                  src={company.src}
                  alt={company.name}
                  width={120}
                  height={36}
                  className="max-h-7 w-auto object-contain brightness-200 contrast-125 transition-all group-hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
