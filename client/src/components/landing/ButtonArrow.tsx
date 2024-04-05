import { ReactNode } from "react";
import Button from "../general/Button";

export default function ButtonArrow({ children }: { children: ReactNode }) {
  return (
    <Button className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center mx-auto mt-8 group">
      <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.75rem] rounded-full overflow-hidden relative">
        <i className="bx bx-right-arrow-alt  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
        <i className="bx bx-right-arrow-alt  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
      </div>
      {children}
    </Button>
  );
}
