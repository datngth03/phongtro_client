import React from "react";
import anonAvatar from "../assets/anon-avatar.png";
import icons from "../ultils/icons";
import { Button } from "./";

const { BsDot, BsTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ user: { name, phone, zalo } }) => {
   return (
      <div className="w-full bg-[#febb02] rounded-md flex flex-col items-center p-4">
         <img src={anonAvatar} alt="" className="w-20 h-20 rounded-[50%]" />
         <span className="text-2xl font-semibold p-2">{name}</span>
         <span className="flex font-semibold p-2 items-center">
            <span>
               <BsDot style={{ color: "#00ff00", fontSize: "2rem" }} />
            </span>
            <span>Đang hoạt động</span>
         </span>
         <a
            href={`tel:${phone}`}
            className="bg-[#13BB7B] text-2xl text-white font-semibold flex items-center justify-center w-full gap-2 rounded-md py-2"
         >
            <BsTelephoneFill />
            {phone}
         </a>
         <a
            target="blank"
            href={`https://zalo.me/${zalo}`}
            className="bg-[white] text-2xl border-[0.1rem] border-black font-semibold flex items-center justify-center w-full gap-2 rounded-md py-1 mt-2 text-blue-600"
         >
            <SiZalo size={40} />
         </a>
      </div>
   );
};

export default BoxInfo;
