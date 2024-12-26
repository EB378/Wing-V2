"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

export default function AircraftOptions() {
  const t = useTranslations("AircraftOptions");

  const aircrafts = [
    {
      id: 1,
      name: "Cessna 172",
      description: t("aircraft1Description"),
      image: "/aircraft1.png"
    },
    {
      id: 2,
      name: "Piper PA-28",
      description: t("aircraft2Description"),
      image: "/aircraft2.png"
    },
    {
      id: 3,
      name: "Diamond DA40",
      description: t("aircraft3Description"),
      image: "/aircraft3.png"
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % aircrafts.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + aircrafts.length) % aircrafts.length);

  return (
    <section className="py-16 bg-neutral-900 text-white" id="aircraft-options">
      <h2 className="text-4xl text-center mb-12">{t("title")}</h2>
      <div className="relative w-4/5 mx-auto overflow-hidden">
        {/* Aircraft Slide */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {aircrafts.map((aircraft) => (
            <div key={aircraft.id} className="min-w-full text-center">
              <Image
                src={aircraft.image}
                alt={aircraft.name}
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-md mb-4"
              />
              <h3 className="text-xl font-bold">{aircraft.name}</h3>
              <p className="mt-2 text-gray-300">{aircraft.description}</p>
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl"
          aria-label="Previous Slide"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl"
          aria-label="Next Slide"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}