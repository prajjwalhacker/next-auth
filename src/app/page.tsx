import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {


  const buttons = [
    {
      name: 'Login',
      title: 'Login',
      href: '/login',
    },
    {
      name: 'Signup',
      title: 'Signup',
      href: '/signup'
    },
  ]

  return (
    <div className="bg-primary-black h-screen overflow-hidden">
      <Navbar buttons={buttons}/>
      <Hero/>
    </div>
  );
}
