"use client";
import {
  About,
  Banner,
  Footer,
  Header,
  JoinCommunity,
  Properties,
  Services,
  TransitionPage,
} from "@/components";
import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("../components/Location").then((module) => module.Location),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <TransitionPage />
      <Header />
      <main>
        <Banner />
        <Properties />
        <div className="max-w-6xl mx-auto">
          <Services />
          <LocationMap />
          <About />
        </div>
        <JoinCommunity />
        <Footer />
      </main>
    </>
  );
}
