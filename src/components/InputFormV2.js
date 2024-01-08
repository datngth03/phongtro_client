import React, { useState } from "react";

const InputFormV2 = ({
   label,
   unit,
   value,
   setValue,
   name,
   small,
   inValidFields,
   setInValidFields,
   direction,
}) => {
   const [isInputFocused, setIsInputFocused] = useState(false);

   const handleFocus = () => {
      setIsInputFocused(true);
      setInValidFields([]);
   };

   const handleBlur = () => {
      setIsInputFocused(false);
      setValue((prev) => ({
         ...prev,
         [name]: prev[name] === "" && unit !== undefined ? 0 : prev[name],
      }));
   };

   const handleChange = (e) => {
      const inputValue = e.target.value;
      setValue((prev) => ({ ...prev, [name]: inputValue }));
   };
   return (
      <div className={`flex ${direction ? direction : "flex-col"}`}>
         <label className="w-48 flex-none" htmlFor="title">
            {label}
         </label>
         <div className="flex flex-auto items-center">
            <input
               type="text"
               id=" title"
               className={`${
                  unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
               } outline-none border flex-auto border-gray-300 p-2`}
               value={isInputFocused ? (value === 0 ? "" : value) : value}
               onFocus={handleFocus}
               onBlur={handleBlur}
               onChange={handleChange}
            />
            {unit && (
               <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200">
                  {unit}
               </span>
            )}
         </div>
         {small && <small className="opacity-70 whitespace-nowrap">{small}</small>}

         {inValidFields?.some((item) => item.name === name) && (
            <small className="text-red-500 block w-full">
               {inValidFields?.find((item) => item.name === name)?.message}
            </small>
         )}
      </div>
   );
};

export default InputFormV2;
