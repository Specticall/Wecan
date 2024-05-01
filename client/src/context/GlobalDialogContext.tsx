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

const ANIMATION_DURATION_MS = 200;

type TGlobalDialogContextValues = {
  showDialog: (dialogName: string, context?: unknown) => void;
  closeDialog: (options?: { persistBackground?: boolean }) => Promise<void>;
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

/*
 * GlobalDialogProvider is a context provider that provides a function to display a dialog component.
 * The dialog component is displayed at the center of the screen and can be closed by clicking outside the dialog component.
 *
 * This component behaves in a similar way to react router's browserRouter in which we pass in an array of elements that we want to display as dialog components.
 *
 * In the future, this component can be extended to support many more features and perhaps get turned into a custom library itself.
 */
export function GlobalDialogProvider({
  children,
  dialogComponents,
}: {
  children: ReactNode;
  dialogComponents: DialogComponent[];
}) {
  // Context data that we can pass into a dialog component.
  // In this application, this context is mainly used to display task details in the `TaskDetailDialog` component.
  // When the user selects a sepcific task, the details from that task if first passed into this context then to the dialog component itself.
  const [contextData, setContextData] = useState<unknown>({});

  // The options that can be passed into a dialog component.
  const [options, setOptions] = useState<DialogComponentOptions | undefined>();

  // This state is used to keep track of the time when the dialog was opened. Mainly to prevent the dialog from being closed the moment it is opened.
  const [timeSinceOpened, setTimeSinceOpened] = useState(0);

  // The dialog component that is currently being displayed. Dialog selection is uesd by passing a key (string) that we have defined in the `dialogComponents` array.
  const [isShowing, setIsShowing] = useState<{
    name: string;
    selectedComponent?: ReactElement;
  }>({
    name: "",
  });

  // This state is used to keep track of the background overlay that is displayed when a dialog is opened. Mainly used when the user turns on the `persistBackground` option when closing a dialog.
  const [showBackground, setShowBackground] = useState(false);

  // Handles click outside the component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!options?.collapseWhenClickOutside) return;

      // Make sure a few milliseconds have passed since the dialog was opened to prevent the dialog from closing the moment it is opened.
      if (Date.now() - timeSinceOpened < 100) return;

      // Closes the dialog when the user clicks outside the dialog component.
      if (
        (isShowing.selectedComponent || showBackground) &&
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
    showBackground,
  ]);

  // Displays a dialog component by passing in the key (string) that we have defined in the `dialogComponents` array.
  const showDialog = useCallback(
    (dialogName: string, context?: unknown) => {
      // 1. Find the dialog component that matches the key (string) that we have defined in the `dialogComponents` array.
      const selectedComponent = dialogComponents.find(
        (component) => component.name === dialogName
      );

      // 2. Throw an error if the user made an error by passing a dialog component string that does not exist.
      if (!selectedComponent)
        throw new Error(
          `Dialog with the name of ${dialogName} does not exist!`
        );

      // 3. If provided, set the context data and options that we have defined in the `dialogComponents` array.
      if (context) setContextData(context);
      if (selectedComponent.options) setOptions(selectedComponent.options);

      // 4. Set the time when the dialog was opened.
      setTimeSinceOpened(Date.now());

      // 5. Set the dialog component that will be displayed.
      setIsShowing((current) => {
        return {
          ...current,
          name: dialogName,
          selectedComponent: selectedComponent.component,
        };
      });

      // 6. Display the background overlay.
      setShowBackground(true);
    },
    [dialogComponents]
  );

  const closeDialog = (options?: { persistBackground?: boolean }) => {
    return new Promise<void>((resolve) => {
      // 1. Restore the initial state of the dialog component.
      setIsShowing({
        name: "",
      });
      setContextData({});
      setOptions(undefined);

      // 2. If the user does not want to persist the background overlay, remove it.
      if (!options?.persistBackground) {
        setTimeSinceOpened(0);
        setShowBackground(false);
      }

      // 3. Resolve the promise after the animation duration has passed. This is primarily used to be able to asynchronously perform animations while waiting the for close animation to finish.
      setTimeout(() => {
        resolve();
      }, ANIMATION_DURATION_MS);
    });
  };

  return (
    <GlobalDialogContext.Provider
      value={{ showDialog, closeDialog, contextData }}
    >
      <div
        className={cn(
          "fixed inset-0 z-[100] opacity-0 invisible bg-black/50 transition-all duration-400",
          (isShowing.selectedComponent || showBackground) &&
            "opacity-1 visible "
        )}
      ></div>

      <div
        className={cn(
          `dialog-content fixed top-[50%] left-[50%] translate-x-[-50%] invisible scale-90 translate-y-[-45%] transition-all opacity-0 z-[102]`,
          isShowing.selectedComponent &&
            "opacity-1 visible scale-1 translate-y-[-50%]"
        )}
        style={{
          transitionDuration: `${ANIMATION_DURATION_MS}ms`,
        }}
      >
        {isShowing.selectedComponent}
      </div>
      {children}
    </GlobalDialogContext.Provider>
  );
}

export function DialogCollapse({
  children,
  disabled,
  onClick = () => {},
  ...props
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { closeDialog } = useGlobalDialog();

  return (
    <button
      disabled={disabled}
      {...props}
      onClick={(e) => {
        closeDialog();
        onClick(e);
      }}
    >
      {children}
    </button>
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
