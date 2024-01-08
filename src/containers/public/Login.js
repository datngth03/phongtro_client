import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";

const Login = () => {
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoggedIn, message, update } = useSelector((state) => state.auth);
   const [isRegister, setRegister] = useState(location.state?.flag);
   const [invalidField, setInvalidField] = useState([]);
   const [payload, setPayload] = useState({
      phone: "",
      password: "",
      name: "",
   });
   useEffect(() => {
      const resetPayload = location.state?.resetPayload;
      if (resetPayload) {
         setPayload(resetPayload);
      }
   }, [location.state?.resetPayload]);
   useEffect(() => {
      setRegister(location.state?.flag);
   }, [location.state?.flag]);

   useEffect(() => {
      isLoggedIn && navigate("/");
   }, [isLoggedIn, navigate]);

   useEffect(() => {
      message && Swal.fire("Oops !", message, "error");
      setPayload((prev) => ({
         ...prev,
         phone: "",
         password: "",
      }));
   }, [message, update]);
   const handleSubmit = async () => {
      // console.log(payload);
      let finalPayload = isRegister
         ? payload
         : {
              phone: payload.phone,
              password: payload.password,
           };
      let invalids = validate(finalPayload);
      if (invalids === 0)
         isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
   };
   const validate = (payload) => {
      let invalids = 0;
      let fields = Object.entries(payload);
      // console.log(fields);
      fields.forEach((item) => {
         if (item[1] === "") {
            setInvalidField((prev) => [
               ...prev,
               {
                  name: item[0],
                  message: "Bạn không được bỏ trống trường này.",
               },
            ]);
            invalids++;
         }
      });
      fields.forEach((item) => {
         switch (item[0]) {
            case "password":
               if (item[1].length < 6) {
                  setInvalidField((prev) => [
                     ...prev,
                     {
                        name: item[0],
                        message: "Mật khẩu phải có tối thiểu 6 kí tự.",
                     },
                  ]);
                  invalids++;
               }
               break;
            case "phone":
               if (!+item[1]) {
                  setInvalidField((prev) => [
                     ...prev,
                     {
                        name: item[0],
                        message: "Số điện thoại không hợp lệ.",
                     },
                  ]);
                  invalids++;
               }
               break;
            default:
               break;
         }
      });
      return invalids;
   };

   return (
      <div className="bg-[white] w-[600px] p-[30px] pb-[100px]  mx-auto my-0 shadow-md rounded-md">
         <h3 className="font-semibold text-2xl mb-3">
            {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
         </h3>
         <div className="w-full flex flex-col gap-3">
            {isRegister && (
               <InputForm
                  setInvalidFields={setInvalidField}
                  invalidFields={invalidField}
                  label={"Họ Tên"}
                  value={payload.name}
                  setValue={setPayload}
                  type={"name"}
               />
            )}
            <InputForm
               setInvalidFields={setInvalidField}
               invalidFields={invalidField}
               label={"Số Điện Thoại"}
               value={payload.phone}
               setValue={setPayload}
               type={"phone"}
            />
            <InputForm
               setInvalidFields={setInvalidField}
               invalidFields={invalidField}
               label={"Mật Khẩu"}
               value={payload.password}
               setValue={setPayload}
               type={"password"}
            />
            <Button
               text={isRegister ? "Đăng kí" : "Đăng nhập"}
               bgColor={"bg-secondary1"}
               textColor={"text-[white]"}
               fullWidth
               onClick={handleSubmit}
            />
         </div>
         <div className="flex justify-between items-center text-[blue] pt-4">
            {isRegister ? (
               <span className="text-sm text-black">
                  Bạn đã có tài khoản?{" "}
                  <span
                     onClick={() => {
                        location.state.flag = false;
                        setRegister(false);
                        setPayload({
                           phone: "",
                           password: "",
                           name: "",
                        });
                     }}
                     className="cursor-pointer hover:text-[red] text-[blue]"
                  >
                     Đăng nhập ngay
                  </span>
               </span>
            ) : (
               <>
                  <span className="cursor-pointer hover:text-[red] text-sm">
                     Bạn quên mật khẩu?
                  </span>
                  <span
                     onClick={() => {
                        location.state.flag = true;
                        setRegister(true);
                        setPayload({
                           phone: "",
                           password: "",
                           name: "",
                        });
                     }}
                     className="cursor-pointer hover:text-[red] text-sm"
                  >
                     Tạo tài khoản mới
                  </span>
               </>
            )}
         </div>
      </div>
   );
};

export default Login;
