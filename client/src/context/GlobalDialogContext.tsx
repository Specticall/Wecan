import { cn } from "@/lib/utils";
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  const [timeSinceOpened, setTimeSinceOpened] = useState(0);

  const [isShowing, setIsShowing] = useState<{
    name: string;
    selectedComponent?: ReactElement;
  }>({
    name: "",
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!options?.collapseWhenClickOutside) return;
      if (Date.now() - timeSinceOpened < 100) return;
      if (
        isShowing.selectedComponent &&
        !(e.target as HTMLDivElement).closest(".dialog-content")
      ) {
        closeDialog();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [
    isShowing.selectedComponent,
    timeSinceOpened,
    options?.collapseWhenClickOutside,
  ]);

  const showDialog = useCallback(
    (dialogName: string, context?: unknown) => {
      const selectedComponent = dialogComponents.find(
        (component) => component.name === dialogName
      );

      if (!selectedComponent)
        throw new Error(
          `Dialog with the name of ${dialogName} does not exist!`
        );

      if (context) setContextData(context);
      if (selectedComponent.options) setOptions(selectedComponent.options);

      setTimeSinceOpened(Date.now());

      setIsShowing((current) => {
        return {
          ...current,
          name: dialogName,
          selectedComponent: selectedComponent.component,
        };
      });
    },
    [dialogComponents]
  );

  const closeDialog = () => {
    setIsShowing({
      name: "",
    });
    setContextData({});
    setOptions(undefined);
    setTimeSinceOpened(0);
  };

  return (
    <GlobalDialogContext.Provider
      value={{ showDialog, closeDialog, contextData }}
    >
      <div
        className={cn(
          "fixed inset-0 z-[100] opacity-0 invisible bg-black/50 transition-all duration-400",
          isShowing.selectedComponent && "opacity-1 visible "
        )}
      ></div>

      <div
        className={cn(
          `dialog-content fixed top-[50%] left-[50%] translate-x-[-50%] invisible scale-90 translate-y-[-45%] duration-200 transition-all opacity-0 z-[102]`,
          isShowing.selectedComponent &&
            "opacity-1 visible scale-1 translate-y-[-50%]"
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
