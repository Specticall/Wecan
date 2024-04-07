import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TPopupContextValues = {
  notify: (message: string) => void;
};

const PopupContext = createContext<TPopupContextValues | null>(null);

export default function PopupProvider({
  children,
  suspendDuration = 2000,
}: {
  children: ReactNode;
  suspendDuration?: number;
}) {
  const [message, setMessage] = useState("Default Popup Message");

  // Used to differentiate calls from `notify()`. Without this, a call from `notify()` with the same message won't trigger the timeout effect.
  const [id, setId] = useState(0);

  const [show, setShow] = useState(false);

  // Suspends / display the popup for a specified amount of time.
  useEffect(() => {
    const suspend = setTimeout(() => {
      setShow(false);
    }, suspendDuration);

    return () => {
      clearTimeout(suspend);
    };
  }, [suspendDuration, message, id]);

  /**
   * Displays the popup window with the message inside.
   */
  const notify = (message: string) => {
    setMessage(message);
    setId(Math.random());
    setShow(true);
  };

  return (
    <PopupContext.Provider value={{ notify }}>
      <div
        className="fixed bottom-0 left-[50%] translate-x-[-50%] z-[100] translate-y-[-2rem] text-body bg-main px-12 py-3 rounded-md font-body shadow-lg shadow-main/30 transition-all duration-500"
        style={{
          translate: show ? "0 0" : "0 300%",
        }}
      >
        {message}
      </div>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context)
    throw new Error("usePopup can't be used outside of its provider's scope");
  return context;
}
