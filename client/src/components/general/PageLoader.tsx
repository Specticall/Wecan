import { useEffect, useRef } from "react";
import { useNavigation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export default function PageLoader() {
  const ref = useRef<null | LoadingBarRef>(null);
  const { state } = useNavigation();

  const startLoading = () => {
    ref.current?.continuousStart();
  };

  const completeLoading = () => {
    ref.current?.complete();
  };

  useEffect(() => {
    if (state === "loading") startLoading();
    if (state === "idle") completeLoading();
  }, [state]);

  // return <LoadingBar color="rgb(74 90 239)" ref={ref} />;
}
