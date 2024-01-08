import React from "react";

function Button({
   text,
   textColor,
   bgColor,
   Icon,
   onClick,
   fullWidth,
   underlineOnHover,
   className,
   width,
}) {
   return (
      <button
         type="button"
         className={`${width} px-2 py-2 ${className} ${textColor} ${bgColor} ${
            fullWidth && "w-full"
         } 
         outline-none rounded-[4px] ${underlineOnHover && "hover:underline"} 
         flex items-center justify-center`}
         onClick={onClick}
      >
         <span>{text}</span>
         <span>{Icon && <Icon />}</span>
      </button>
   );
}

export default Button;
