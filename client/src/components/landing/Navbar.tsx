import { useLocation, useNavigate } from "react-router-dom";
import Button from "../general/Button";
import Icons from "../general/Icon";
import { ReactNode, useEffect, useRef, useState } from "react";
import MobileNavbar from "./MobileNavbar";

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
      {/* --- */}
      <nav
        className="sticky left-0 right-0 top-0 bg-white z-20 duration-200 transition-all"
        style={{ backgroundColor: showBackground ? "white" : "transparent" }}
      >
        <ul className="py-6 section flex justify-between items-center ">
          <Icons icon="logo" />

          <div className="flex gap-4 md:hidden">
            <NavbarNavigator activeOn="/home/landing">Home</NavbarNavigator>
            <NavbarNavigator activeOn="/home/faq">FAQ</NavbarNavigator>
          </div>
          <Button
            variant="secondary"
            className="flex gap-4 px-2 py-2 pr-6 items-center justify-center md:hidden"
            onClick={() => navigate("/register")}
          >
            <i className="bx bxs-user bg-accent rounded-full aspect-square h-full flex items-center justify-center text-white p-[8px]"></i>
            Sign In
          </Button>
          <MobileNavbar />
        </ul>
      </nav>
    </>
  );
}

// IMPORTANT : Only used for this specific navbar component
export function NavbarNavigator({
  children,
  activeOn,
}: {
  children: ReactNode;
  activeOn: string;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = pathname.includes(activeOn);
  return (
    <li
      className="relative text-sm text-dark hover:text-black hover:font-medium cursor-pointer"
      style={
        isActive
          ? {
              fontWeight: "500",
              color: "black",
            }
          : undefined
      }
      onClick={() => {
        navigate(activeOn);
      }}
    >
      {children}
      {isActive && <div className="w-full bg-accent h-[2px]"></div>}
    </li>
  );
}
