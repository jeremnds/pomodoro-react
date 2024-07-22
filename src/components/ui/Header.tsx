import { SiStagetimer } from "react-icons/si";
import Settings from "../Settings";

const Header = () => {
  return (
    <header>
      <menu>
        <ul className="flex items-center justify-between">
          <li className="flex items-center gap-2">
            <SiStagetimer />{" "}
            <span className="text-xl font-medium">Pomodoro</span>
          </li>
          <li>
            <Settings />
          </li>
        </ul>
      </menu>
      <hr className="h-px mt-6 mb-10 bg-transparent border-0 "></hr>
    </header>
  );
};

export default Header;
