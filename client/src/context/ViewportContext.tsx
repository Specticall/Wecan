import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const breakPoints = {
  sm: 450,
  md: 600,
  lg: 900,
  xl: 1200,
  "2xl": 1400,
  "3xl": 1500,
} as const;

type TViewportContextValues = {
  viewport: TViewport;
  type: keyof typeof breakPoints;
};

type TViewport = {
  width: number;
  height: number;
};

function identifyBreakpointType(viewportWidth: number) {
  const breakpoints = Object.entries(breakPoints);

  const targetIndex = breakpoints.findIndex(
    (breakpoint, index, breakpointList) => {
      const limit = breakpoint[1];
      if (index === 0) return viewportWidth < limit;

      const minimum = breakpointList[index - 1][1];
      return minimum <= viewportWidth && viewportWidth <= limit;
    }
  );

  return breakpoints[
    targetIndex === -1 ? breakpoints.length - 1 : targetIndex
  ][0] as keyof typeof breakPoints;
}

const viewportContext = createContext<TViewportContextValues | null>(null);

/**
 * This provider is used to provide the viewport size and breakpoint type to the app.
 * It uses the window object to get the viewport size and updates the context whenever the window is resized.
 * The breakpoint type is calculated based on the viewport width and is used to determine the layout of the app.
 *
 * @returns
 */
export function ViewportProvider({ children }: { children: ReactNode }) {
  // Contains the current viewport size
  const [viewport, setViewport] = useState<TViewport>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  // Contains the current breakpoint type (defined at the top of the file)
  const [type, setType] = useState<keyof typeof breakPoints>(() =>
    identifyBreakpointType(window.innerWidth)
  );

  // Update the viewport size whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setType(identifyBreakpointType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport]);

  return (
    <viewportContext.Provider value={{ viewport, type }}>
      {children}
    </viewportContext.Provider>
  );
}

export function useViewport() {
  const context = useContext(viewportContext);
  if (!context)
    throw new Error(
      "Viewport context must be used inside of its provider's scope"
    );
  return context;
}
