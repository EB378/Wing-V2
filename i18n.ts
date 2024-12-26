import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "fi"];

export default getRequestConfig(async ({ requestLocale }) => {
  // Ensure requestLocale is resolved properly
  const locale = await requestLocale;

  // Log for debugging
  console.log("Debug - requestLocale:", locale);

  // Fallback if locale is invalid
  if (!locale || !locales.includes(locale)) {
    console.warn("Invalid locale detected, showing 404 page.");
    notFound();
  }

  // Return messages dynamically based on locale
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});