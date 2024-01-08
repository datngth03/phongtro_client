import React, { useEffect, useState } from "react";
import { Button, Item } from "../../components";
import { getPosts, getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const List = ({ categoryCode }) => {
   const dispatch = useDispatch();
   const [searchParams] = useSearchParams();
   const { posts } = useSelector((state) => state.post);
   const [updateTime, setUpdateTime] = useState(null);
   const [active, setActive] = useState(true);

   const handleActive = () => {
      setActive((prev) => !prev);
   };

   const currentDate = new Date();
   useEffect(() => {
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
      setUpdateTime(formattedTime);
      let params = [];
      for (let entry of searchParams.entries()) {
         params.push(entry);
      }
      // console.log(params);
      let searchParamsObject = {};
      params?.forEach((i) => {
         if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
            searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
         } else {
            searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
         }
      });
      if (categoryCode) searchParamsObject.categoryCode = categoryCode;
      if (active === false) searchParamsObject.order = ["createdAt", "DESC"];
      dispatch(getPostsLimit(searchParamsObject));
   }, [searchParams, categoryCode, active]);
   return (
      <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
         <div className="flex items-center justify-between my-3">
            <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
            <span>
               Cập nhật: {updateTime} {updateTime && currentDate?.toLocaleDateString("vi-VN")}
            </span>
         </div>
         <div className="flex items-center gap-2 my-2">
            <span>Sắp xếp:</span>
            <Button
               bgColor={active === true ? "bg-blue-200" : "bg-gray-200"}
               text="Mặc định"
               className="hover:bg-blue-200"
               onClick={handleActive}
            />
            <Button
               bgColor={active === false ? "bg-blue-200" : "bg-gray-200"}
               text="Mới nhất"
               className="hover:bg-blue-200"
               onClick={handleActive}
            />
         </div>
         <div className="items">
            {posts?.length > 0 &&
               posts.map((item) => {
                  return (
                     <Item
                        key={item?.id}
                        address={item?.address}
                        attributes={item?.attributes}
                        description={JSON.parse(item?.description)}
                        images={JSON.parse(item?.images?.image)}
                        star={+item?.star}
                        title={item?.title}
                        user={item?.user}
                        id={item?.id}
                     />
                  );
               })}
         </div>
      </div>
   );
};

export default List;
