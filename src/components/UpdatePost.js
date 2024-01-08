import React from "react";
import { useDispatch } from "react-redux";
import { CreatePost } from "../containers/system";
import { resetData } from "../store/actions";

const UpdatePost = ({ setIsEdit }) => {
   const dispatch = useDispatch();
   return (
      <div
         className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 flex justify-center"
         onClick={(e) => {
            e.stopPropagation();
            setIsEdit(false);
            dispatch(resetData());
         }}
      >
         <div
            className="max-w-[1100px] bg-white w-full overflow-y-auto"
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <CreatePost isEdit />
         </div>
      </div>
   );
};

export default UpdatePost;
