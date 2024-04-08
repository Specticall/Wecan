import { cn } from "@/lib/utils";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type TGlobalDialogContextValues = {
  showDialog: (dialogName: string) => void;
  closeDialog: () => void;
};

export type DialogComponent = { name: string; component: ReactElement };
export type DialogComponentProps = DialogComponent[];

const GlobalDialogContext = createContext<TGlobalDialogContextValues | null>(
  null
);

export function GlobalDialogProvider({
  children,
  dialogComponents,
}: {
  children: ReactNode;
  dialogComponents: { name: string; component: ReactElement }[];
}) {
  const [isShowing, setIsShowing] = useState<{
    name: string;
    selectedComponent?: ReactElement;
  }>({
    name: "",
  });

  const showDialog = (dialogName: string) => {
    const selectedComponent = dialogComponents.find(
      (component) => component.name === dialogName
    )?.component;

    if (!selectedComponent)
      throw new Error(`Dialog with the name of ${dialogName} does not exist!`);

    setIsShowing((current) => {
      return { ...current, name: dialogName, selectedComponent };
    });
  };

  const closeDialog = () => {
    setIsShowing({
      name: "",
    });
  };

  return (
    <GlobalDialogContext.Provider value={{ showDialog, closeDialog }}>
      <div
        className={cn(
          `fixed opacity-0 invisible bg-black/60 inset-0 z-[100] transition-all duration-200`,
          isShowing.selectedComponent && "opacity-1 visible"
        )}
      ></div>
      <div
        className={cn(
          `fixed inset-0 z-[110] flex flex-col items-center justify-center invisible opacity-0 transition-all duration-200`,
          isShowing.selectedComponent && "opacity-1 visible"
        )}
      >
        {isShowing.selectedComponent}
      </div>
      {children}
    </GlobalDialogContext.Provider>
  );
}

export function DialogCollapse({
  children,
  ...props
}: { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const { closeDialog } = useGlobalDialog();

  return (
    <div {...props} onClick={closeDialog}>
      {children}
    </div>
  );
}

export function useGlobalDialog() {
  const context = useContext(GlobalDialogContext);
  if (!context)
    throw new Error(
      "useGlobalDialog and its components must be used inside of it's Provider's scope"
    );
  return context;
}
