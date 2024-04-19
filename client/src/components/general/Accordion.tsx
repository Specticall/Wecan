import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode, createContext, useContext, useState } from "react";

type PropsWithClassNameAndChildren<T = unknown> = T & {
  children: ReactNode;
  className?: string;
};

type TAccordionContextValues = {
  toggleAccordion: (index: string) => void;
  isOpen: string | undefined;
};

type TAccordionItemContextValues = {
  key: string;
};

// Stores the overal state of the component
const AccordionContext = createContext<null | TAccordionContextValues>(null);

// Used to pass key identifiers
const AccordionItemContext = createContext<null | TAccordionItemContextValues>(
  null
);

/**
 * Accordion component. Use this as the parent element of an accordion component
 * @returns
 * 
 * @example
 *<Accordion>
      <AccordionItem itemKey="question-one">
        <AccordionHeading>How can I request a refund?</AccordionHeading>
        <AccordionContent>Refunds are...</AccordionContent>
      </AccordionItem>
      <AccordionItem itemKey="question-two">
        <AccordionHeading>Can I purchase more than once?</AccordionHeading>
        <AccordionContent>You can buy an...</AccordionContent>
      </AccordionItem>
  </Accordion>
 */
export function Accordion({
  children,
  className,
}: PropsWithClassNameAndChildren) {
  const [isOpen, setIsOpen] = useState<TAccordionContextValues["isOpen"]>();

  const toggleAccordion = (index: string) => {
    setIsOpen((cur) => (cur === index ? undefined : index));
  };

  return (
    <AccordionContext.Provider
      value={{
        toggleAccordion,
        isOpen,
      }}
    >
      <ul className={twMerge("max-w-[40rem] flex flex-col", className)}>
        {children}
      </ul>
    </AccordionContext.Provider>
  );
}

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error(
      "Something wen't wrong with the accordiong component! (Accordion Context is undefined)"
    );
  return context;
}

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context)
    throw new Error(
      "Something wen't wrong with the accordiong component! (Accordion Item Context is undefined)"
    );
  return context;
}

/**
 * Wrapper of an accordion component item
 * @param itemKey unique identifer for the component
 * @returns
 */
export function AccordionItem({
  children,
  className,
  itemKey,
}: PropsWithClassNameAndChildren<{ itemKey: string }>) {
  return (
    <AccordionItemContext.Provider value={{ key: itemKey }}>
      <li className={twMerge("cursor-pointer", className)}>{children}</li>
    </AccordionItemContext.Provider>
  );
}

/**
 * Reveals the content when pressed, only use this as children of `<AccordionItem/>`
 * @param chevronColor
 * @returns
 */
export function AccordionHeading({
  children,
  className,
  chevronColor = "rgba(55, 55, 55, 1)",
}: PropsWithClassNameAndChildren<{
  chevronColor?: string;
}>) {
  const { key } = useAccordionItem();
  const { toggleAccordion, isOpen } = useAccordion();
  return (
    <header
      className={twMerge("flex justify-between items-center py-6", className)}
      onClick={() => {
        toggleAccordion(key);
      }}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={chevronColor}
        className={twMerge(
          clsx(isOpen === key && "rotate-180"),
          "transition-transform duration-300"
        )}
      >
        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
      </svg>
    </header>
  );
}

/**
 * Contains the content of an accordion, collapsed by default
 *
 * @returns
 */
export function AccordionContent({
  children,
  className,
}: PropsWithClassNameAndChildren) {
  const { key } = useAccordionItem();
  const { isOpen } = useAccordion();
  return (
    <div
      className={twMerge(
        "grid",
        clsx(isOpen === key ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
      )}
      style={{
        transition: "grid 400ms",
      }}
    >
      <div className="overflow-hidden">
        <div className={twMerge("pb-6", className)}>{children}</div>
      </div>
    </div>
  );
}
