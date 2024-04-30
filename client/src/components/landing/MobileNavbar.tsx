import { useState } from "react";
import Button from "../general/Button";
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

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* === Trigger === */}
      <div className="hidden lg:block" onClick={() => setIsOpen(true)}>
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
        className="fixed right-8 top-8 px-8 w-full max-w-[15rem] py-8 rounded-lg bg-white flex flex-col items-start gap-4 pt-12 transition-[scale] origin-top-right duration-300 z-20"
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
        <GoogleLoginButton className="[&&&]:w-full [&&&]:items-center [&:last-child]:mx-auto">
          <i className="bx bxl-google text-lg"></i>
          <p>Sign in</p>
        </GoogleLoginButton>
      </nav>
    </>
  );
}
