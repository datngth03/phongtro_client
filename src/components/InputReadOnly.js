import React from "react";
import { text } from "../ultils/constant";

const InputReadOnly = ({ label, value, direction }) => {
   return (
      <div className={`flex ${direction ? direction : "flex-col"}`}>
         <label className="font-medium flex-none w-48" htmlFor="exactly-address">
            {label}
         </label>
         <div className="flex-auto">
            <input
               type="text"
               id="exactly-address"
               readOnly
               className="border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full "
               value={value || ""}
            />
            {label === "Số điện thoại" ? (
               <small className="text-blue-500 cursor-pointer">Đổi số điện thoại</small>
            ) : (
               ""
            )}
         </div>
      </div>
   );
};

export default InputReadOnly;
