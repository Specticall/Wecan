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
      defaultValue={pathname.includes("list") ? "List" : "Board"}
    >
      <DropdownTrigger
        className="bg-white-soft rounded-full text-dark flex gap-2 items-center justify-center px-6 py-2 hover:bg-slate-200 transition-all duration-200"
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
        <DropdownItem itemValue="Board">Board</DropdownItem>
        <DropdownItem itemValue="List">List</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
