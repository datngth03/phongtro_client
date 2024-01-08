import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anon-avatar.png";
import { useNavigate } from "react-router-dom";

import { blobToBase64 } from "../../src/ultils/fileToBase64.js";

const User = () => {
   const { currentData } = useSelector((state) => state.user);
   const avatarSrc = currentData?.avatar
      ? blobToBase64(currentData.avatar) || anonAvatar
      : anonAvatar;
   const navigate = useNavigate();

   const handleNavigate = () => {
      // Use the navigate function to redirect to the "/he-thong" route
      navigate("/he-thong");
   };
   return (
      <>
         {currentData && Object.keys(currentData).length > 0 && (
            <div className="flex items-center gap-2">
               <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-10 object-cover rounded-full h-10 border-2 shadow-md border-white cursor-pointer"
                  onClick={handleNavigate}
               />
               <div className="flex flex-col">
                  <span>
                     Xin chào, <span className="font-semibold">{currentData?.name}</span>
                  </span>
                  <span>
                     Mã tài khoản:{" "}
                     <span className="font-medium">{`${currentData?.id
                        ?.match(/\d/g)
                        .join("")
                        ?.slice(0, 6)}`}</span>
                  </span>
               </div>
            </div>
         )}
      </>
   );
};

export default User;
