"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Hero from "@/components/Hero";
import React from "react";
import { motion } from "framer-motion";
import Contact from "@/components/Contact";
import AircraftOptions from "@/components/AircraftOptions";

const Main = () => {
  const t = useTranslations("HomePage");

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen bg-gradient-to-tr from-blue-900 via-gray-800 to-blue-700 text-white overflow-hidden">
        <main className="w-full bg-neutral-900 relative">
          {/* Hero Section */}
          <Hero />

          {/* Problem-Solution Section */}
          <div className="relative px-6 sm:px-12 lg:px-24 mt-16 text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-12"
            >
              {t("Affordable Aircraft Rentals")}
              <span className="bg-blue-800 px-3 py-2 rounded-lg inline-block ml-2 shadow-md">
                {t("In Southern Finland")}
              </span>
            </motion.h2>

            {/* Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
            >
              {[
                { title: t("Flexible Booking"), detail: t("Choose rental times that fit your schedule") },
                { title: t("Cost-Effective Pricing"), detail: t("Enjoy premium services at affordable rates") },
                { title: t("Beautiful Destinations"), detail: t("Fly to stunning locations around Southern Finland") },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                  }}
                  className={`relative w-full max-w-[350px] p-6 ${
                    index === 0
                      ? "bg-gradient-to-b from-blue-700 to-indigo-900"
                      : index === 1
                      ? "bg-gradient-to-b from-indigo-800 to-blue-800"
                      : "bg-gradient-to-b from-blue-600 to-cyan-800"
                  } rounded-2xl shadow-2xl transition-transform duration-300`}
                >
                  <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-200 text-base leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call-to-Action */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideInRight}
            className="my-16 text-center px-6 sm:px-12 lg:px-24"
          >
            <h2 className="text-2xl sm:text-4xl font-bold">{t("Start Your Adventure Today")}</h2>
            <p className="my-4 text-lg sm:text-xl">{t("Discover the freedom of flight")}</p>
            <Link href="/book-flight">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xl rounded-full shadow-lg transition-transform"
              >
                {t("Book Now")}
              </motion.button>
            </Link>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="mt-16"
          >
            <AircraftOptions />
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Contact />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Main;