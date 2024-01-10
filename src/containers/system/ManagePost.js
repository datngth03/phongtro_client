import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Button, UpdatePost } from "../../components";
import { apiDeletePosts } from "../../services/post";
import Swal from "sweetalert2";

import "moment/locale/vi";

const ManagePost = () => {
   const dispatch = useDispatch();
   const { postsOfAdmin, dataEdit } = useSelector((state) => state.post);
   const [isEdit, setIsEdit] = useState(false);
   const [stateDelete, setStateDelete] = useState(false);
   const [posts, setPosts] = useState([]);
   const [status, setStatus] = useState("");

   useEffect(() => {
      setPosts(postsOfAdmin);
   }, [postsOfAdmin]);

   useEffect(() => {
      !dataEdit && setIsEdit(false);
   }, [dataEdit]);

   useEffect(() => {
      dispatch(actions.getPostsLimitAdmin());
   }, [dataEdit, stateDelete]);

   const checkStatus = (expired) => {
      const expiredDate = new Date(
         parseInt(expired.split("/")[2], 10),
         parseInt(expired.split("/")[1], 10) - 1,
         parseInt(expired.split("/")[0], 10)
      );
      const currentDate = new Date();
      return currentDate < expiredDate;
   };

   const handleDeletePost = async (postId) => {
      const response = await apiDeletePosts(postId);
      if (response?.data?.err === 0) {
         setStateDelete((prev) => !prev);
         Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Tin đăng của bạn đã được xoá thành công.",
         });
      } else {
         Swal.fire({
            icon: "error",
            title: "Thất bại!",
            text: "Đã xảy ra lỗi khi xoá. Vui lòng thử lại sau.",
         });
      }
   };

   useEffect(() => {
      if (status === 1) {
         const activePost = postsOfAdmin?.filter((item) =>
            checkStatus(item?.features?.expired.split(" ")[3])
         );
         setPosts(activePost);
      } else if (status === 2) {
         const expiredPost = postsOfAdmin?.filter(
            (item) => !checkStatus(item?.features?.expired.split(" ")[3])
         );
         setPosts(expiredPost);
      } else {
         setPosts(postsOfAdmin);
      }
   }, [status]);

   return (
      <div className="flex flex-col gap-6">
         <div className="py-4 border-b border-gray-200 flex justify-between items-center px-4">
            <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
            <select
               onChange={(e) => setStatus(+e.target.value)}
               className="outline-none border-gray-200 rounded-md border p-2"
               value={status}
            >
               <option value="0">Lọc theo trạng thái</option>
               <option value="1">Đang hoạt động</option>
               <option value="2">Đã hết hạn</option>
            </select>
         </div>
         <table className="w-full table-auto">
            <thead>
               <tr className="w-full flex">
                  <th className="p-2 border w-full flex-1">Mã tin</th>
                  <th className="p-2 border w-full flex-1">Ảnh đại diện</th>
                  <th className="p-2 border w-full flex-1">Tiêu đề</th>
                  <th className="p-2 border w-full flex-1">Giá</th>
                  <th className="p-2 border w-full flex-1">Ngày bắt đầu</th>
                  <th className="p-2 border w-full flex-1">Ngày hết hạn</th>
                  <th className="p-2 border w-full flex-1">Trạng thái</th>
                  <th className="p-2 border w-full flex-1">Tuỳ chọn</th>
               </tr>
            </thead>
            <tbody>
               {posts.length === 0 ? (
                  <tr>
                     <td className="p-4" colSpan={7}>
                        Bạn chưa có tin đăng nào! Đăng tin
                        <a href="/he-thong/tao-moi-bai-dang" className="text-blue-500">
                           &nbsp;tại đây
                        </a>
                        .
                     </td>
                  </tr>
               ) : (
                  posts.map((item) => {
                     return (
                        <tr key={item.id} className="w-full h-16 flex items-center">
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {item?.features?.code}
                           </td>
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {item?.images &&
                                 item.images.image &&
                                 JSON.parse(item.images.image)[0] && (
                                    <img
                                       src={JSON.parse(item.images.image)[0]}
                                       alt="avatar"
                                       className="w-10 h-10 object-cover rounded-md"
                                    />
                                 )}
                           </td>
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {item?.title.length < 20
                                 ? item?.title
                                 : `${item?.title.slice(0, 20)} ...`}
                           </td>
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {item?.attributes?.price}
                           </td>
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {item?.features?.created}
                           </td>
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {item?.features?.expired}
                           </td>
                           <td className="flex-1 px-2 h-full border flex justify-center items-center">
                              {checkStatus(item?.features?.expired.split(" ")[3])
                                 ? "Đang hoạt động"
                                 : "Đã hết hạn"}
                           </td>
                           <td className="flex-1 flex h-full border justify-center px-2 items-center gap-2">
                              <Button
                                 text="Sửa"
                                 bgColor="bg-secondary1"
                                 textColor="text-white"
                                 hoverBgColor="bg-overlay-70"
                                 onClick={() => {
                                    dispatch(actions.editData(item));
                                    setIsEdit(true);
                                 }}
                              />
                              <Button
                                 text="Xoá"
                                 bgColor="bg-secondary2"
                                 textColor="text-white"
                                 hoverBgColor="bg-overlay-70"
                                 onClick={() => {
                                    handleDeletePost(item.id);
                                 }}
                              />
                           </td>
                        </tr>
                     );
                  })
               )}
            </tbody>
         </table>
         {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
      </div>
   );
};

export default ManagePost;
