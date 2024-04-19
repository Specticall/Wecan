import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/general/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";

export default function TaskNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
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
  );
}
