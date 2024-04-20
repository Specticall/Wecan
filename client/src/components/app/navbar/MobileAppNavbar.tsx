import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";

const routes = [
  {
    text: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    route: ["/app/dashboard"],
  },
  {
    text: "My Diary",
    icon: <i className="bx bx-book-open"></i>,
    route: ["/app/diary"],
  },
  {
    text: "Task",
    icon: <i className="bx bx-task"></i>,
    route: ["/app/task/board", "/app/task", "/app/task/list"],
  },
  {
    text: "Statistics",
    icon: <i className="bx bx-line-chart"></i>,
    route: ["/app/statistics"],
  },
];

export default function MobileAppNavbar() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData } = useUser();
  return (
    <nav className="fixed z-20 top-4 right-4">
      {/* Trigger */}
      <i
        className="bx bx-menu text-xl rounded-full bg-white shadow-lg shadow-slate-300 p-4 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-200 z-20 relative cursor-pointer"
        onClick={() => setOpen((cur) => !cur)}
      ></i>
      {/* BG */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-10  duration-300 visible transition-all"
        )}
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
        onClick={() => setOpen(false)}
      ></div>
      {/* Content */}
      <div
        className="absolute bg-white rounded-xl z-20  px-3 top-0 right-0 transition-all duration-300 navigation origin-top-right"
        style={{ scale: open ? "1" : "0" }}
      >
        <h2 className="bg-white px-4 py-3 rounded-xl text-lg flex items-center justify-start mb-0">
          Wecan
        </h2>
        <div className="flex items-center gap-3 px-4 bg-white-soft rounded-lg p-2">
          <div className="h-8 aspect-square rounded-full overflow-hidden">
            {userData && userData.pictureURL ? (
              <img
                src={userData?.pictureURL}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : (
              <Skeleton
                width={"100%"}
                height={"100%"}
                className="translate-y-[-3px]"
              />
            )}
          </div>
          <p>{userData?.name || <Skeleton />}</p>
        </div>
        <ul className="rounded-xl flex-1 bg-white items-center justify-between  py-3 flex flex-col">
          <div className="flex flex-col bg-white-soft items-start justify-start w-fit rounded-lg px-2 py-2 gap-4">
            {routes.map((route) => {
              const isOnPath = route.route.some((route) =>
                pathname.includes(route)
              );
              return (
                <li
                  key={`${route.route}`}
                  className={clsx(
                    "flex px-4 py-2 items-center justify-start rounded-md gap-2 cursor-pointer transition-all duration-200 pr-24 hover:bg-slate-200 w-full",
                    isOnPath &&
                      "bg-white shadow-lg shadow-accent/10 rounded-md "
                  )}
                  onClick={() => navigate(route.route[0])}
                >
                  <div className="[&>i]:text-md [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                    {route.icon}
                  </div>
                  <p>{route.text}</p>
                </li>
              );
            })}
          </div>
        </ul>{" "}
      </div>
    </nav>
  );
}
