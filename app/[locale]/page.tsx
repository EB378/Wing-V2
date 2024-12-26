import { getMessages } from "next-intl/server";
import Main from "@/components/Main";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Define the type for messages
  interface Messages {
    NavbarLinks: {
      homeTitle: string;
    };
  }

  // Cast the messages safely
  const messages = (await getMessages({ locale })) as unknown as Messages;

  const title = messages.NavbarLinks.homeTitle;

  return {
    title,
  };
}



export default function Home() {

  return (
    <>
      <Navbar locale={""} />
      <Main/>
      <Footer locale={""} />
    </>
  );
}