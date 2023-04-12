import {FC} from "react";
import {TheRegistrationInfo} from "./TheRegistrationInfo";
import {TheRegistrationButton} from "./TheRegistrationButton";

export const TheRegistration: FC = () => {
  return (
    <a
      href="/"
      className="bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white py-4 px-8 flex justify-between items-center flex-wrap gap-x-6 gap-y-2"
    >
      <TheRegistrationInfo/>
      <TheRegistrationButton/>
    </a>
  );
}
