"use client";

import { useTranslations } from "next-intl";
import React, { FormEvent } from "react";
import { FaPhoneAlt, FaEnvelope, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const t = useTranslations("Contact");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f1363286-3773-4366-a303-f62f033511e6",
          name: formData.get("name"),
          email: formData.get("email"),
          reason: formData.get("reason"),
        }),
      });

      const result = await response.json();
      if (result.success) alert("Thank you for your submission!");
      else alert("Submission failed. Please try again.");
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="relative py-16 px-6 bg-gradient-to-b from-neutral-900 to-blue-900/80 text-white" id="contactsec">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl font-extrabold text-gray-800 text-center mb-6"
          >
            {t("title")}
          </motion.h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <input
                type="text"
                name="name"
                required
                placeholder=" "
                className="peer w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 outline-none transition"
              />
              <label className="absolute left-4 top-4 text-gray-500 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all peer-focus:top-4 peer-focus:text-sm">
                {t("name")}
              </label>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <input
                type="email"
                name="email"
                required
                placeholder=" "
                className="peer w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 outline-none transition"
              />
              <label className="absolute left-4 top-4 text-gray-500 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all peer-focus:top-4 peer-focus:text-sm">
                {t("emailentry")}
              </label>
            </motion.div>

            {/* Reason Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <textarea
                name="reason"
                rows={4}
                required
                placeholder=" "
                className="peer w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 outline-none transition"
              ></textarea>
              <label className="absolute left-4 top-4 text-gray-500 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all peer-focus:top-4 peer-focus:text-sm">
                {t("reason")}
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-all transform"
            >
              {t("send")}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h2 className="text-3xl font-extrabold text-yellow-400">{t("contact information")}</h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FaPhoneAlt className="text-yellow-400 text-2xl" />
              <a
                href="tel:+358442413840"
                className="text-lg hover:text-yellow-300 transition-all"
              >
                +358 44 2413 840
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FaEnvelope className="text-yellow-400 text-2xl" />
              <a
                href="mailto:ekoforge@gmail.com"
                className="text-lg hover:text-yellow-300 transition-all"
              >
                Air.rentals@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <FaBuilding className="text-yellow-400 text-2xl" />
              <p className="text-lg">Wing Aviators</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;