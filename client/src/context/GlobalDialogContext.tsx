import { cn } from "@/lib/utils";
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type TGlobalDialogContextValues = {
  showDialog: (dialogName: string, context?: unknown) => void;
  closeDialog: () => void;
  contextData?: unknown;
};

export type DialogComponentOptions = {
  collapseWhenClickOutside?: boolean;
};
export type DialogComponent = {
  name: string;
  component: ReactElement;
  options?: DialogComponentOptions;
};
export type DialogComponentProps = DialogComponent[];

const GlobalDialogContext = createContext<TGlobalDialogContextValues | null>(
  null
);

export function GlobalDialogProvider({
  children,
  dialogComponents,
}: {
  children: ReactNode;
  dialogComponents: DialogComponent[];
}) {
  const [contextData, setContextData] = useState<unknown>({});
  const [options, setOptions] = useState<DialogComponentOptions | undefined>();

  const [isShowing, setIsShowing] = useState<{
    name: string;
    selectedComponent?: ReactElement;
  }>({
    name: "",
  });

  const showDialog = (dialogName: string, context?: unknown) => {
    const selectedComponent = dialogComponents.find(
      (component) => component.name === dialogName
    );

    if (!selectedComponent)
      throw new Error(`Dialog with the name of ${dialogName} does not exist!`);

    if (context) setContextData(context);
    if (selectedComponent.options) setOptions(selectedComponent.options);

    setIsShowing((current) => {
      return {
        ...current,
        name: dialogName,
        selectedComponent: selectedComponent.component,
      };
    });
  };

  const closeDialog = () => {
    setIsShowing({
      name: "",
    });
    setContextData({});
    setOptions(undefined);
  };

  return (
    <GlobalDialogContext.Provider
      value={{ showDialog, closeDialog, contextData }}
    >
      <div
        className={cn(
          "fixed inset-0 z-[100] opacity-0 invisible bg-black/50 flex flex-col items-center justify-center transition-all duration-400",
          isShowing.selectedComponent && "opacity-1 visible "
        )}
      >
        <div
          className={cn("absolute inset-0")}
          onClick={() => {
            if (options?.collapseWhenClickOutside) closeDialog();
          }}
        ></div>
        <div
          className={cn(
            `invisible scale-90 translate-y-[5%] duration-200 transition-all opacity-0`,
            isShowing.selectedComponent &&
              "opacity-1 visible scale-1 translate-y-0"
          )}
        >
          {isShowing.selectedComponent}
        </div>
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
