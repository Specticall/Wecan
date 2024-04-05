import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export type TitleConfig = {
  title: string;
  routes: {
    path: string;
    titlePath: string;
  }[];
};

/**
 * Watches the current route and match the html `<title/>` to it.
 * @returns
 */
export default function TitleWatcher({
  titleConfig,
}: {
  titleConfig: TitleConfig;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const targetRoute = titleConfig.routes.find(
      (route) => pathname === route.path
    );
    document.title = `${targetRoute?.titlePath || ""} ${titleConfig.title}`;
  }, [pathname, titleConfig.routes, titleConfig.title]);
  return <></>;
}
