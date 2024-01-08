import React, { useEffect, useState } from "react";
import { Sitem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const RelatedPost = ({ newPost }) => {
   const { newPosts, hotPosts } = useSelector((state) => state.post);
   const [posts, setPosts] = useState(newPost ? newPosts : hotPosts);
   const dispatch = useDispatch();

   useEffect(() => {
      newPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getHotPosts());
   }, []);
   useEffect(() => {
      newPost ? setPosts(newPosts) : setPosts(hotPosts);
   }, [newPosts, hotPosts]);

   return (
      <div className="w-full bg-white rounded-md p-4 shadow-sm">
         <h3 className="font-semibold text-xl mb-4">{newPost ? "Tin mới đăng" : "Tin nổi bật"}</h3>
         <div className="w-full flex flex-col gap-2">
            {posts?.map((item) => {
               return (
                  <Sitem
                     star={newPost ? 0 : item.star}
                     key={item.id}
                     title={item.title}
                     price={item?.attributes?.price}
                     createdAt={item.createdAt}
                     image={JSON.parse(item.images.image)}
                     newPost={newPost ? true : null}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default RelatedPost;
