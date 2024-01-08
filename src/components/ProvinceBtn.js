// ProvinceBtn.js

import React, { memo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from "../ultils/constant";

const ProvinceBtn = ({ name, image, provinceCode }) => {
   const navigate = useNavigate();
   const handleClick = () => {
      let titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ`;
      navigate(
         {
            pathname: path.SEARCH,
            search: createSearchParams({ provinceCode }).toString(),
         },
         { state: { titleSearch } }
      );
   };
   return (
      <div
         className="shadow-md overflow-hidden text-blue-700 cursor-pointer hover:text-orange-600 rounded-tl-md rounded-tr-md"
         onClick={handleClick}
      >
         <div className="relative">
            <img
               src={image}
               alt={name}
               className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md transition-transform transform hover:scale-110 duration-300"
            />
         </div>
         <div className="font-medium px-2 py-3 text-center">{name}</div>
      </div>
   );
};

export default memo(ProvinceBtn);
