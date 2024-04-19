import { useNavigate } from "react-router-dom";
import Button from "../general/Button";
import { useEffect, useRef, useState } from "react";
import MobileNavbar from "./MobileNavbar";

const navbarItem = ["Home", "About", "Flow", "FAQ"];

export default function Navbar() {
  const [showBackground, setBackground] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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
      <nav
        className="sticky left-0 right-0 top-0 bg-white z-20 duration-200 transition-all"
        style={{ backgroundColor: showBackground ? "white" : "transparent" }}
      >
        <ul className="py-6 section flex justify-between items-center ">
          <p className="text-xl text-dark">
            We<span className="font-normal italic">can.</span>
          </p>

          <div className="flex gap-8 md:hidden">
            {navbarItem.map((item) => (
              <li className="relative text-sm text-dark hover:text-black hover:font-medium cursor-pointer">
                {item}
              </li>
            ))}
          </div>
          <Button
            variant="secondary"
            className="flex gap-4 px-6 py-2 items-center justify-center md:hidden"
            onClick={() => navigate("/register")}
          >
            Sign In
          </Button>
          <MobileNavbar />
        </ul>
      </nav>
    </>
  );
}
