import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tracks } from "@/components/sections/Tracks";
import { Schedule } from "@/components/sections/Schedule";
import { Prizes } from "@/components/sections/Prizes";
import { Team } from "@/components/sections/Team";
import { Sponsors } from "@/components/sections/Sponsors";
import { InternBand } from "@/components/sections/InternBand";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Drift";

export default function HomePage() {
  return (
    <>
      <Reveal />
      <Drift />
      <Hero />
      <About />
      <Tracks />
      <Schedule />
      <Prizes />
      <Team />
      <Sponsors />
      <InternBand />
      <Faq />
    </>
  );
}
