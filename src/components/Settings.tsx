import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoSettingsOutline } from "react-icons/io5";
import SettingsContent from "./SettingsContent";

const Settings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" bg-transparent py-0.5 px-1 flex items-center gap-1 text-sm font-medium hover:bg-slate-500 transition-all duration-300 rounded-md">
          <span className="text-2xl text-white">
            <IoSettingsOutline />
          </span>
          Settings
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center uppercase text-slate-800">
            Settings
          </DialogTitle>
          <DialogDescription asChild className="">
            <hr className="h-px border-0 bg-slate-200 "></hr>
          </DialogDescription>
        </DialogHeader>
        <SettingsContent />
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
