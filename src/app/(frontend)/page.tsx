import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import {
  getAbout,
  getContact,
  getHero,
  getMarquee,
  getProjects,
  getServices,
} from "@/lib/data";

export default async function HomePage() {
  const [hero, marquee, services, featured, about, contact] = await Promise.all([
    getHero(),
    getMarquee(),
    getServices(),
    getProjects({ featured: true, limit: 6 }),
    getAbout(),
    getContact(),
  ]);

  return (
    <main>
      <Hero hero={hero} />
      <Marquee marquee={marquee} />
      <Services services={services} />
      <FeaturedWork projects={featured} />
      <About about={about} />
      <Contact contact={contact} />
    </main>
  );
}
