import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/general/Dropdown";
import { useUser } from "@/context/UserContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Task() {
  const { userData } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!userData) return;

  return (
    <main className="grid grid-cols-[1fr_1fr] grid-rows-[6.5rem_1fr] items-start dotted-grid gap-y-4">
      <div className="col-span-2 self-start justify-self-start pt-12 pb-6 mb-4 flex items-center gap-3">
        <h1 className="text-lg font-semibold">Tasks</h1>
        <div className="text-lg font-semibold">/</div>
        <Dropdown
          canUnselect={false}
          onSelect={(selection) => {
            if (!selection) return;
            navigate(`${selection?.toLowerCase()}`);
          }}
          defaultValue={pathname.includes("all") ? "All" : "Generator"}
        >
          <DropdownTrigger
            className="text-md font-semibold text-lighter flex gap-2 items-center justify-center"
            render={(selection) => {
              return (
                <>
                  <p className="">{selection}</p>
                  <i className="text-lg bx bx-chevron-down"></i>
                </>
              );
            }}
          ></DropdownTrigger>
          <DropdownContent className="[&>*]:pr-8">
            <DropdownItem itemValue="Generator">Generator</DropdownItem>
            <DropdownItem itemValue="All">All</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
      <Outlet />
    </main>
  );
}
