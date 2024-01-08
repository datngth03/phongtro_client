import React, { useState, useEffect } from "react";
import { InputReadOnly, InputFormUser, Button } from "../../components";
import { apiUploadImages, apiUpdateUser } from "../../services";
import { validate } from "../../ultils/Common/validateField";
import { fileToBase64, blobToBase64 } from "../../ultils/fileToBase64";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";

const EditAccount = () => {
   const dispatch = useDispatch();
   const [invalidFields, setInvalidFields] = useState([]);
   const { currentData } = useSelector((state) => state.user);
   const [payload, setPayload] = useState({
      name: currentData?.name || "",
      avatar: currentData?.avatar || "",
      zalo: currentData?.zalo || "",
      fbUrl: currentData?.fbUrl || "",
   });

   useEffect(() => {
      if (currentData?.avatar) {
         setPayload((prev) => ({
            ...prev,
            name: currentData?.name || "",
            avatar: blobToBase64(currentData.avatar) || "",
            zalo: currentData?.zalo || "",
            fbUrl: currentData?.fbUrl || "",
         }));
      }
   }, [currentData]);

   console.log(payload);
   const handleSubmit = async () => {
      const invalids = validate(payload, setInvalidFields);
      if (invalids === 0) {
         const response = await apiUpdateUser(payload);
         console.log(response);
         if (response.data?.err === 0) {
            Swal.fire({
               icon: "success",
               title: "Thành công!",
               text: "Thông tin của bạn đã được cập nhật thành công.",
            }).then(() => {
               dispatch(getCurrent());
            });
         } else {
            Swal.fire({
               icon: "error",
               title: "Thất bại!",
               text: "Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.",
            });
         }
      }
   };
   const handleChooseFile = () => {
      document.getElementById("avatar").click();
   };
   const handleUploadFile = async (e) => {
      const imageBase64 = await fileToBase64(e.target.files[0]);
      setPayload((prev) => ({
         ...prev,
         avatar: imageBase64,
      }));
   };
   // console.log(currentData);
   return (
      <div className="flex flex-col items-center">
         <h1 className="text-3xl w-full text-start py-4 border-b border-gray-200 font-medium pl-4">
            Chỉnh sửa thông tin cá nhân
         </h1>
         <div className="w-3/5 py-6 flex flex-col gap-4">
            <InputReadOnly
               direction="flex-row"
               label="Mã thành viên"
               value={currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}
            />
            <InputReadOnly direction="flex-row" label="Số điện thoại" value={currentData?.phone} />
            <InputFormUser
               name="name"
               setValue={setPayload}
               direction="flex-row"
               inValidFields={invalidFields}
               setInValidFields={setInvalidFields}
               label="Tên hiển thị"
               value={payload.name}
            />
            <InputFormUser
               name="fbUrl"
               setValue={setPayload}
               direction="flex-row"
               setInValidFields={setInvalidFields}
               label="facebook"
               value={payload.fbUrl}
            />
            <InputFormUser
               name="zalo"
               setValue={setPayload}
               direction="flex-row"
               inValidFields={invalidFields}
               setInValidFields={setInvalidFields}
               label="Zalo"
               value={payload.zalo}
            />

            <div className="flex pt-2">
               <label className="w-48 flex-none" htmlFor="password">
                  Mật khẩu
               </label>
               <small className="flex flex-auto cursor-pointer text-blue-500 h-12">
                  Đổi mật khẩu
               </small>
            </div>
            <div className="flex">
               <label className="w-48 flex-none" htmlFor="avatarimage">
                  Ảnh đại diện
               </label>
               <div>
                  <img
                     src={payload.avatar || anonAvatar}
                     alt="avatar"
                     className="h-28 w-28 rounded-full object-cover"
                     onClick={() => handleChooseFile()}
                  />
                  <input
                     onChange={handleUploadFile}
                     type="file"
                     id="avatar"
                     hidden
                     className="appearance-none my-4"
                  />
               </div>
            </div>
         </div>
         <Button
            text="Cập nhật"
            bgColor={"bg-secondary1"}
            textColor={"text-[white]"}
            width="w-3/5"
            onClick={handleSubmit}
         />
         <div className="h-48"></div>
      </div>
   );
};

export default EditAccount;
