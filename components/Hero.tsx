"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const t = useTranslations("HomePage");

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textSlideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative w-full h-[45vh] overflow-hidden flex flex-col md:flex-row">
      {/* Background Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="absolute inset-0"
      >
        <Image
          src="/aircraft-hero-background.jpg" // Update to a relevant background image
          alt="Hero Background"
          fill
          className="object-cover blur-sm brightness-50"
        />
      </motion.div>

      <div className="relative flex flex-col md:flex-row justify-between items-center w-full h-full px-6 sm:px-12">
        {/* Hero Text */}
        <div className="z-10 max-w-[90%] md:max-w-[60%] text-left md:text-left mt-10 md:mt-0">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={textSlideIn}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md"
          >
            {t("Affordable Aircraft Rentals")}
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={textSlideIn}
            transition={{ delay: 0.3 }} // Slight delay for the subheading
            className="text-white md:w-[75%] leading-6 sm:text-xs md:text-md lg:text-xl mt-4 md:font-medium drop-shadow-md"
          >
            {t("Explore the beauty of Southern Finland from the skies")}
          </motion.p>
        </div>

        {/* CTA Section */}
        <div className="w-full md:w-[35%] h-auto md:h-[45vh]">
          {/* For Mobile: Thin Box */}
          <div className="flex md:hidden w-full bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg px-4 py-3 items-center justify-between mt-6">
            <Link href="/book-flight">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative px-4 py-2 bg-white text-black font-bold text-sm rounded-full shadow-lg overflow-hidden"
              >
                {t("Book Your Flight")}
              </motion.button>
            </Link>

            <Link href="#contactsec">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-transparent border border-white text-white font-bold text-sm rounded-full shadow-lg transition-transform"
              >
                {t("Contact Us")}
              </motion.button>
            </Link>
          </div>

          {/* For Desktop: Diagonal Banner */}
          <div className="hidden md:block w-full h-full bg-gradient-to-r from-blue-700 to-blue-500 -skew-x-45 transform md:translate-x-30">
            {/* Centered Buttons */}
            <div className="skew-x-45 h-full flex flex-inline justify-center items-center md:gap-2 lg:gap-6">
              <Link href="/book-flight">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative lg:px-6 lg:py-3 md:px-2 md:py-1 bg-white text-black font-bold md:text-sm lg:text-md rounded-full shadow-lg overflow-hidden border-2 border-transparent group"
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gradient animate-border group-hover:animate-border"></div>

                  <span className="relative z-10">{t("Book Your Flight")}</span>
                </motion.button>
              </Link>

              <Link href="#contactsec">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="lg:px-6 lg:py-3 md:px-2 md:py-1 bg-transparent border border-white text-white font-bold md:text-sm lg:text-md rounded-full shadow-lg transition-transform"
                >
                  {t("Contact Us")}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;