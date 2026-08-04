import dynamic from "next/dynamic";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Work } from "@/components/sections/Work";
import { GridBackground } from "@/components/ui/GridBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Decorative, pointer-only chrome — kept out of the initial chunk.
const IntroOverlay = dynamic(() =>
  import("@/components/ui/IntroOverlay").then((mod) => mod.IntroOverlay),
);
const MagneticCursor = dynamic(() =>
  import("@/components/ui/MagneticCursor").then((mod) => mod.MagneticCursor),
);

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-[var(--pill)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--pill-fg)]"
      >
        Skip to content
      </a>

      <IntroOverlay />
      <GridBackground />
      <ScrollProgress />
      <MagneticCursor />
      <Nav />

      <main id="main" className="flex-1">
        <div id="top" />
        <Hero />
        <About />
        <Experience />
        <Work />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
