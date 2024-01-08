import React, { memo } from "react";

function InputForm({ label, value, setValue, type, invalidFields, setInvalidFields, text }) {
   return (
      <div>
         <label className="text-sm" htmlFor="label">
            {label}
         </label>
         <input
            type="text"
            id="label"
            name="label"
            className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
            value={value}
            onChange={(e) => setValue((prev) => ({ ...prev, [type]: e.target.value }))}
            onFocus={() => setInvalidFields && setInvalidFields([])}
         />
         {invalidFields?.some((i) => i.name === type) && (
            <small className="text-red-500 italic">
               {invalidFields.find((i) => i.name === type)?.message}
            </small>
         )}
      </div>
   );
}

export default memo(InputForm);
