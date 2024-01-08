import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import Swal from "sweetalert2";

const Contact = () => {
   const [payload, setPayload] = useState({
      name: "",
      phone: "",
      content: "",
   });
   const handleSubmit = () => {
      Swal.fire({
         icon: "success",
         title: "Thành công!",
         text: "Tin đăng của bạn đã được cập nhật thành công.",
      }).then(() => {
         setPayload({
            name: "",
            phone: "",
            content: "",
         });
      });
   };
   return (
      <div>
         <h1 className="text-3xl font-bold pb-4">Liên hệ với chúng tôi</h1>
         <div className="flex gap-4  ">
            <div className="flex-1 text-white bg-gradient-to-br text-[1.2rem] from-blue-700 to-cyan-400 p-8 rounded-[40px] flex flex-col gap-4">
               <h1 className="font-semibold">Thông tin liên hệ</h1>
               <p>
                  Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn
                  PhongTro123.Com
               </p>
               <p>
                  <span className="font-semibold">Điện thoại: </span>0917 686 101
               </p>
               <p>
                  <span className="font-semibold">Email : </span>cskh.phongtro123@gmail.com
               </p>
               <p>
                  <span className="font-semibold">Zalo : </span>0917 686 101
               </p>
               <p>
                  <span className="font-semibold">Viper : </span>0917 686 101
               </p>
               <p>
                  <span className="font-semibold">Địa chỉ: </span>LD - 02.06, Toà nhà Lexington
                  Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
               </p>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-md p-8 text-[1.2rem]">
               <h1 className="font-semibold pb-4">Liên hệ trực tuyến</h1>
               <div className="text-[1.2rem] flex flex-col">
                  <InputForm
                     label="HỌ TÊN CỦA BẠN"
                     value={payload.name || ""}
                     setValue={setPayload}
                     type="name"
                  />
                  <span className="py-2"></span>
                  <InputForm
                     label="SỐ ĐIỆN THOẠI"
                     value={payload.phone || ""}
                     setValue={setPayload}
                     type="phone"
                  />
                  <span className="py-2"></span>
                  <label className="text-sm" htmlFor="content">
                     NỘI DUNG
                  </label>
                  <textarea
                     value={payload.content || ""}
                     id="content"
                     cols={30}
                     rows={4}
                     className="bg-[#e8f0fe] p-2 outline-none"
                     onChange={(e) => setPayload((prev) => ({ ...prev, content: e.target.value }))}
                     name="content"
                  />
                  <span className="py-2"></span>
                  <Button
                     text="Gửi liên hệ"
                     bgColor="bg-blue-500"
                     textColor="text-white"
                     fullWidth
                     onClick={handleSubmit}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Contact;
