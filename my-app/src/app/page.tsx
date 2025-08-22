// app/page.tsx
import Hero from "@/components/Home";
// import Logo from "@/components/Logo";
import Benefits from "@/components/Benefits";
import Growth from "@/components/Growth";
import Unlock from "@/components/Unlock";
import Selection from "@/components/Selection";
import May from "@/components/May";
import Stat from "@/components/Stat";
import Insight from "@/components/Insight";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Logo /> */}
      <Benefits />
      {/* <Growth /> */}
      <Unlock />
      <Selection />
      <May />
      <Stat />
      <Insight />
      <Testimonial />
    </>
  );
}
