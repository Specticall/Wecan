import clsx from "clsx";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

type TDropdownContextValues = {
  isOpen: boolean;
  selectedValue?: string;
  handleClose: () => void;
  handleOpen: () => void;
  handleSelect: (itemValue: string) => void;
};

const DropdownContext = createContext<TDropdownContextValues | null>(null);

export function Dropdown({
  className,
  children,
  defaultValue,
  canUnselect = true,
  onSelect = () => {},
}: {
  className?: string;
  defaultValue?: string;
  children: ReactNode;
  canUnselect?: boolean;
  onSelect?: (selectedValue?: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSelect = (itemValue: string) => {
    setSelectedValue((current) =>
      itemValue === current && canUnselect ? undefined : itemValue
    );
    onSelect(
      itemValue === selectedValue && canUnselect ? undefined : itemValue
    );
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        selectedValue,
        handleClose,
        handleOpen,
        handleSelect,
      }}
    >
      <div
        className={twMerge(
          clsx("hidden fixed inset-0 z-50", isOpen && "block")
        )}
        onClick={handleClose}
      ></div>
      <div className={twMerge(clsx("relative", className))}>{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
  render,
  ...props
}: {
  children?: ReactNode;
  className?: string;
  render?: (selectedValue: string | undefined) => ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const { handleOpen, selectedValue } = useDropdown();

  return (
    <div
      className={twMerge(clsx("cursor-pointer", className))}
      onClick={handleOpen}
      {...props}
    >
      {render ? render(selectedValue) : children}
    </div>
  );
}

export function DropdownContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen } = useDropdown();

  return (
    <ul
      className={twMerge(
        clsx(
          "absolute bg-white rounded-sm top-[140%] left-[50%] translate-x-[-50%] p-2 scale-90 translate-y-[-5%] duration-200 transition-all opacity-0 z-[60] invisible",
          className,
          isOpen && "scale-100 opacity-100 translate-y-[0%] visible"
        )
      )}
    >
      {children}
    </ul>
  );
}

export function DropdownItem({
  children,
  className,
  itemValue,
}: {
  children: ReactNode;
  className?: string;
  itemValue: string;
}) {
  const { handleSelect, selectedValue } = useDropdown();
  const isSelected = selectedValue && selectedValue === itemValue;

  return (
    <li
      className={twMerge(
        clsx(
          "px-2 py-2 hover:bg-slate-200 active:bg-slate-300 rounded-sm cursor-pointer duration-75 transition-all",
          className,
          isSelected && "bg-slate-100"
        )
      )}
      onClick={() => handleSelect(itemValue)}
    >
      {children}
    </li>
  );
}

export function DropdownDecoration({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={twMerge(
        clsx(
          "px-2 py-2 rounded-sm cursor-pointer duration-75 transition-all",
          className
        )
      )}
    >
      {children}
    </li>
  );
}

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error(
      "Something wen't wrong with the dropdown component! (Dropdown Context is undefined)"
    );
  return context;
}
