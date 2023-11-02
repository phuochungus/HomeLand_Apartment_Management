"use client";
import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import styles from "./UpdateResident.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import { Resident } from "@/models/resident";
import { format } from "date-fns";
import clsx from "clsx";
import { futuna } from "../../../../../../public/fonts/futura";
import { Red_Hat_Display } from "next/font/google";
import { useQuery } from "react-query";
import axios from "axios";
import { Images } from "../../../../../../public/images";
import toastMessage from "@/utils/toast";
import { ToastContainer } from "react-toastify";
type FormValue = {
  phoneNumber: string;
  paymentInfo: string;
  email: string | undefined;
  avatarImg?: any;
};
const UpdateResident = ({ params }: { params: { id: string } }) => {
  const [formValue, setFormValue] = useState({
    phoneNumber: "",
    paymentInfo: "",
    email: undefined,
  });
  const [errors, setErrors] = useState<any>();
  const [resident, setResident] = useState<Resident>();

  const [avatar, setAvatar] = useState<any>();
  const avatarRef = useRef<HTMLInputElement>(null);
  let avatar_photo = resident?.profile.avatar_photo as string;
  const validation = () => {
    let err = {} as FormValue;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (formValue.email) {
      if (formValue.email === "") {
        err.email = "Trường email là bắt buộc!";
      } else if (!emailPattern.test(formValue.email)) {
        err.email = "Email không hợp lệ!";
      }
    }

    if (formValue.phoneNumber === "") {
      err.phoneNumber = "Trường số điện thoại là bắt buộc!";
    } else if (!phonePattern.test(formValue.phoneNumber)) {
      err.phoneNumber = "Số điện thoại không hợp lệ!";
    }
    if (formValue.paymentInfo === "") {
      err.paymentInfo = "Thông tin thanh toán là bắt buộc!";
    }

    return err;
  };
  const retrieveResident = async () => {
    try {
      
      const res = await axios.get(`/api/resident/${params.id}`);
      const residentData = res.data as Resident;
      setResident(residentData);
      const newformValue: any = {
        phoneNumber: residentData.profile.phone_number,
        paymentInfo: residentData.payment_info || "",
        email: residentData.account ? residentData.account.email : undefined,
      };
    

      setFormValue(newformValue);
      return res.data;
    } catch (error) {
    
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "resident",
    retrieveResident,
    {
      staleTime: Infinity,
    }
  );
  const updateHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        
        const data: any = {
          phone_number: formValue.phoneNumber,
          payment_info: formValue.paymentInfo,
        };
        if (formValue.email) {
          data.email = formValue.email;
        }
        await axios.patch(`/api/resident/${params.id}`, JSON.stringify(data));
      
        toastMessage({ type: "success", title: "Update successfully!" });
      } catch (error) {
      
        console.log(error);
        toastMessage({ type: "error", title: "Update faily!" });
      }
    }
  };
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      const newObj = { ...formValue, [e.target.name]: e.target.value };
      setFormValue(newObj);
    },
    [formValue]
  );
  const handleAvatarClick = () => {
    avatarRef.current ? avatarRef.current.click() : console.error("error");
  };
  const handleChangeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  // const AvatarImage = useMemo(() => {
  //   return (
  //     <Image
  //     onClick={handleAvatarClick}
  //     fill
  //     style={{ borderRadius: "3%" }}
  //     alt=""

  //     src={avatar ? URL.createObjectURL(avatar) : avatar_photo }
  //   />
  //   );
  // }, [avatar, avatar_photo]);
  return (
    <main className={mainStyles.main}>
      <div className={styles.wapper}>
        <p className={clsx(utilStyles.headingXl, styles.title)}>
          Chỉnh sửa thông tin cư dân
        </p>
        <div className="d-inline-flex justify-content-between">
          {/* <div className={styles.avatarLayout}>
            {AvatarImage}
            <input
              onChange={handleChangeAvatar}
              type="file"
              ref={avatarRef}
              style={{ display: "none" }}
            />
          </div> */}
          <Form method="post" className={clsx(styles.form, futuna.className)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={styles.label}>Họ và tên</Form.Label>
              <Form.Control
                value={resident && resident.profile.name}
                size="lg"
                disabled
                type="text"
                placeholder="Nguyễn Văn A..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.label}>Giới tính</Form.Label>

              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  checked={resident && resident.profile.gender === "male"}
                  inline
                  label="Nam"
                  style={{ fontSize: "1rem" }}
                  name="group1"
                  type="radio"
                  value="male"
                  disabled
                  id={`inline-radio-1`}
                />
                <Form.Check
                  inline
                  label="Nữ"
                  disabled
                  style={{ fontSize: "1rem" }}
                  checked={resident && resident.profile.gender === "female"}
                  name="group1"
                  type="radio"
                  value="female"
                  id={`inline-radio-2`}
                />
              </div>
            </Form.Group>
            {formValue.email && (
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Email</Form.Label>
                <Form.Control
                  value={formValue.email}
                  onChange={handleChange}
                  size="lg"
                  name="email"
                  type="email"
                  placeholder="abc@gmail.com..."
                />
                {errors && errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Số điện thoại</Form.Label>
              <Form.Control
                value={formValue.phoneNumber}
                onChange={handleChange}
                size="lg"
                name="phoneNumber"
                type="text"
                placeholder=""
              />
              {errors && errors.phoneNumber && (
                <span className={styles.error}>{errors.phoneNumber}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>
                Thông tin thanh toán
              </Form.Label>
              <Form.Control
                value={formValue.paymentInfo}
                onChange={handleChange}
                name="paymentInfo"
                size="lg"
                type="text"
                placeholder=""
              />
              {errors && errors.paymentInfo && (
                <span className={styles.error}>{errors.paymentInfo}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ngày sinh</Form.Label>
              <Form.Control
                value={
                  resident &&
                  format(new Date(resident.profile.date_of_birth), "yyyy-MM-dd")
                }
                size="lg"
                type="date"
                disabled
                placeholder=""
              />
            </Form.Group>
            <div className="d-flex justify-content-around">
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Ảnh trước CCCD</Form.Label>
                <Form.Control
                  accept="image/*"
                  size="lg"
                  disabled
                  type="file"
                  placeholder=""
                />

                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  unoptimized={true}
                  alt=""
                  src={
                    resident
                      ? resident.profile.front_identify_card_photo_URL
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Ảnh sau CCCD</Form.Label>
                <Form.Control
                  accept="image/*"
                  size="lg"
                  type="file"
                  disabled
                  placeholder=""
                />

                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  alt=""
                  unoptimized={true}
                  src={
                    resident
                      ? resident.profile.back_identify_card_photo_URL
                      : ""
                  }
                />
              </Form.Group>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ButtonComponent onClick={updateHandle} className={styles.creatBtn}>
              Cập nhật
            </ButtonComponent>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default UpdateResident;
