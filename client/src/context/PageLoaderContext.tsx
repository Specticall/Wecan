import { ReactNode, createContext, useContext, useRef, useState } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

type TPageLoaderContextValues = {
  startLoading: () => void;
  completeLoading: () => void;
};

const PageLoaderContext = createContext<TPageLoaderContextValues | null>(null);

/**
 * Used primarily to for page loading e.g. reloading saved login data
 *
 * Note: no longer use due to react query not supporting a page data loader feature similar to react router. This context was created with the intention of combining the tradinitional render-fetch and render-while-fetch however this caused alot of issues and was not used in the final version of the app.
 */
export function PageLoaderProvider({ children }: { children: ReactNode }) {
  const ref = useRef<null | LoadingBarRef>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
    ref.current?.continuousStart();
  };

  const completeLoading = () => {
    setIsLoading(false);
    ref.current?.complete();
  };

  return (
    <PageLoaderContext.Provider value={{ startLoading, completeLoading }}>
      <LoadingBar color="rgb(74 90 239)" ref={ref} />
      {!isLoading && children}
    </PageLoaderContext.Provider>
  );
}

export function usePageLoader() {
  const context = useContext(PageLoaderContext);
  if (!context)
    throw new Error(
      "usePageLoader must be used inside of it's Provider's scope"
    );
  return context;
}
