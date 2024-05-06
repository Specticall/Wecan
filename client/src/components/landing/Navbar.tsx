import { useEffect, useRef, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import GoogleLoginButton from "../auth/GoogleLoginButton";

const navbarItem = [
  {
    text: "Home",
    link: "#hero",
  },
  {
    text: "About",
    link: "#about-us",
  },
  {
    text: "Flow",
    link: "#how-it-works",
  },
  {
    text: "FAQ",
    link: "#FAQ",
  },
] as const;

/*
Landing page navbar component. Due to heavy changes in the UI layout on mobile, we also have a seperate component for that `<MobileNavbar/>`
*/
export default function Navbar() {
  const [showBackground, setBackground] = useState(false);

  // Use to cover the navbar with a white background when the user scrolls to certain position in the page.
  const boxRef = useRef<HTMLDivElement | null>(null);

  /*
  The strategy used here is by having a short <div> placed on the very top of every landing page element
  
      <div> --> Box (height ~ 1rem == 16px)
      <LandingPage> --> Actual page

  We can then attach the observer to the Box, then simply checks whenever it becomes out of view to show the background. This approach is better compared to having a scroll listener because we're minimizing the amount of event detection happening
  */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setBackground(!entry.isIntersecting);
      });
    });

    if (!boxRef.current) return;
    observer.observe(boxRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* --- Used for extra padding at the top ---*/}
      <div className="box h-[1rem]" ref={boxRef}></div>
      {/* Actual page */}
      <nav className="sticky left-0 right-0 top-0 z-20 duration-200 transition-all">
        {/* Background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: showBackground
              ? "rgba(255,255,255,0.5)"
              : "transparent",
            backdropFilter: showBackground ? "blur(1rem)" : "blur(0rem)",
          }}
        ></div>
        <ul className="py-4 section flex justify-between items-center  relative z-20">
          <p className="text-xl text-dark">
            We<span className="font-normal italic">can.</span>
          </p>

          <div className="flex gap-8 lg:hidden">
            {navbarItem.map((item) => (
              <a
                className="relative text-sm text-dark hover:text-black hover:font-medium cursor-pointer"
                key={item.text}
                href={item.link}
              >
                {item.text}
              </a>
            ))}
          </div>
          <GoogleLoginButton className="lg:hidden">
            <i className="bx bxl-google text-lg"></i>
            <p>Sign in</p>
          </GoogleLoginButton>
          <MobileNavbar />
        </ul>
      </nav>
    </>
  );
}
