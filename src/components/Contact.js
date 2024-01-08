import React from "react";
import { text } from "../ultils/dataContact";
import { Button } from "../components";

const Contact = () => {
   return (
      <div className="bg-white rounded-md shadow-md p-4 w-3/5 flex flex-col justify-center items-center gap-6">
         <img src={text.image} alt="thumbnal" className="w-full h-48 object-contain" />
         <p>{text.content}</p>
         <div className="flex items-center justify-around w-full">
            {text.contacts.map((item, index) => {
               return (
                  <div key={index} className="flex flex-col items-center justify-center">
                     <span className="text-orange-500 font-semibold">{item.text}</span>
                     <span className="text-blue-900  font-semibold">{item.phone}</span>
                     <span className="text-blue-900  font-semibold">{item.zalo}</span>
                  </div>
               );
            })}
         </div>
         <button
            type="button"
            className="text-blue-700 p-2 rounded-md border border-blue-700 hover:bg-blue-700 hover:text-white transition duration-300"
         >
            Gửi liên hệ
         </button>
      </div>
   );
};

export default Contact;
