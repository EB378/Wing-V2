"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-blue-900 text-white w-screen py-10">
      <div className="w-full px-6 lg:px-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 text-center md:text-left">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href={`/${locale}/`}>
              <Image
                src="/copyforge.webp" // Replace with your aircraft rental logo
                alt="Logo"
                width={220}
                height={80}
                className="h-10 mx-auto md:mx-0"
              />
            </Link>
            <p className="text-sm text-gray-300">
              {t("aboutText")}
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold">{t("navigation")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/book-flight" className="hover:underline">{t("book a flight")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/#aircraft-options`} className="hover:underline">{t("aircraft options")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/#testimonials`} className="hover:underline">{t("testimonials")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/#contactsec`} className="hover:underline">{t("contact")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">{t("socialmedia")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href="https://www.instagram.com/aircraft_rentals/" className="hover:underline">{t("instagram")}</Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/aircraft_rentals" className="hover:underline">{t("facebook")}</Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/aircraft-rentals" className="hover:underline">{t("linkedin")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">{t("company")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${locale}/about`} className="hover:underline">{t("about")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">{t("legal")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${locale}/terms`} className="hover:underline">{t("terms")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:underline">{t("privacy")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/license`} className="hover:underline">{t("license")}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Southern Finland Aircraft Rentals. {t("rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;