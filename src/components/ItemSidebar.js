import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const { GrNext } = icons;

const notActive = "text-black";
const active = "text-orange-600";

const ItemSidebar = ({ title, content, isDouble, type, selected }) => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   // const [selectedItem, setSelectedItem] = useState("");

   const formatContent = () => {
      const evenEl = content?.filter((item, index) => index % 2 === 0);
      const oddEl = content?.filter((item, index) => index % 2 !== 0);
      const formatContent = oddEl?.map((item, index) => {
         return {
            right: item,
            left: evenEl?.find((item2, index2) => index2 === index),
         };
      });
      return formatContent;
   };

   const handleFilterPosts = (code) => {
      navigate({
         pathname: location?.pathname,
         search: createSearchParams({
            [type]: code,
         }).toString(),
      });
   };

   return (
      <div className="p-4 rounded-md bg-white w-full shadow-sm">
         <h3 className="text-xl font-semibold mb-4">{title}</h3>
         {!isDouble && (
            <div className="flex flex-col gap-2">
               {content?.length > 0 &&
                  content.map((item) => {
                     return (
                        <Link
                           to={`${formatVietnameseToString(item.value)}`}
                           key={item.code}
                           className={`flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed`}
                        >
                           <GrNext size={10} color="#ccc" />
                           <p>{item.value}</p>
                        </Link>
                     );
                  })}
            </div>
         )}
         {isDouble && (
            <div className="flex flex-col gap-2">
               {content?.length > 0 &&
                  formatContent(content).map((item, index) => {
                     return (
                        <div key={index} className="">
                           <div className=" flex items-center justify-around">
                              <div
                                 onClick={() => handleFilterPosts(item.left.code)}
                                 className={`flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed ${
                                    selected === item.left.code ? active : notActive
                                 }`}
                              >
                                 <GrNext size={10} color="#ccc" />
                                 <p>{item.left.value}</p>
                              </div>
                              <div
                                 className={`flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed ${
                                    selected === item.right.code ? active : notActive
                                 }`}
                                 onClick={() => handleFilterPosts(item.right.code)}
                              >
                                 <GrNext size={10} color="#ccc" />
                                 <p>{item.right.value}</p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
            </div>
         )}
      </div>
   );
};

export default memo(ItemSidebar);
