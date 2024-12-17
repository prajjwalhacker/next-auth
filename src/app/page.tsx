import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <div className="bg-primary-black h-screen overflow-hidden">
      <Navbar/>
      <Hero/>
    </div>
  );
}
