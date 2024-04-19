import { useState } from "react";
import Button from "../general/Button";

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

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* === Trigger === */}
      <div className="hidden md:block" onClick={() => setIsOpen(true)}>
        <i className="bx bx-menu text-lg hover:text-accent cursor-pointer"></i>
      </div>
      {/* === Content === */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity duration-300 navigation"
        style={{
          opacity: isOpen ? "1" : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
        onClick={() => setIsOpen(false)}
      ></div>
      <nav
        className="fixed right-8 top-8 px-8 w-full max-w-[15rem] py-12 rounded-lg bg-white flex flex-col items-start gap-4 pt-12 transition-[scale] origin-top-right duration-300"
        style={{ scale: isOpen ? "1" : "0" }}
      >
        {navbarItem.map((item) => (
          <a
            className="relative text-sm text-dark hover:text-black hover:font-medium cursor-pointer"
            key={item.text}
            href={item.link}
          >
            {item.text}
          </a>
        ))}
        <div className="w-full h-[1px] bg-lighter mt-4"></div>
        <Button
          variant="secondary"
          className="flex gap-4 px-2 py-2 pr-6 items-center justify-center mt-3 w0-"
        >
          <i className="bx bxs-user bg-accent rounded-full aspect-square h-full flex items-center justify-center text-white p-[8px]"></i>
          Sign In
        </Button>
      </nav>
    </>
  );
}
