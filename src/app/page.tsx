import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Games } from "@/components/games";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <div id="home" className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Skills />
        <Games />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
