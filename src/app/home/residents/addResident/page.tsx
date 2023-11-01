"use client";
import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./AddResident.module.scss";
import mainStyles from "../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import { FormGroup } from "react-bootstrap";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import { FaFontAwesome } from "react-icons/fa";
import { futuna } from "../../../../../public/fonts/futura";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Francois_One } from "next/font/google";
import { Images } from "../../../../../public/images";
import axios from "axios";
import { RedirectType, redirect } from "next/navigation";

type FormValue = {
  name: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  paymentInfo: string;
  email: string;
  frontImg: any;
  backImg: any;
  avatarImg?: any;
};
const AddResident = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    paymentInfo: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>();
  const [frontImg, setFrontImg] = useState<any>();
  const [backImg, setBackImg] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const avatarRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    avatarRef.current ? avatarRef.current.click() : console.error("error");
  };
  //layout back and front image
  const BackImage = useMemo(() => {
    return backImg ? (
      <Image
        onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
        className={styles.img}
        width={80}
        height={40}
        alt=""
        src={URL.createObjectURL(backImg)}
      />
    ) : (
      <></>
    );
  }, [backImg]);
  const FrontImage = useMemo(() => {
    return frontImg ? (
      <Image
        onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
        className={styles.img}
        width={80}
        height={40}
        alt=""
        src={URL.createObjectURL(frontImg)}
      />
    ) : (
      <></>
    );
  }, [frontImg]);
  const AvatarImage = useMemo(() => {
    return avatar ? (
      <Image
        onClick={handleAvatarClick}
        fill
        style={{ borderRadius: "3%" }}
        alt=""
        src={URL.createObjectURL(avatar)}
      />
    ) : (
      <Image
        onClick={handleAvatarClick}
        fill
        style={{ borderRadius: "3%" }}
        alt=""
        src={Images.uploadAvatar}
      />
    );
  }, [avatar]);
  const handleFontImg = (e: any) => {
    const file = e.target.files[0];

    setFrontImg(file);
  };
  const handleBackImg = (e: any) => {
    const file = e.target.files[0];
    setBackImg(file);
  };
  // validate when submit form
  const validation = () => {
    let err = {} as FormValue;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (formValue.name === "") {
      err.name = "Trường họ và tên là bắt buộc!";
    }
    if (formValue.dateOfBirth === "") {
      err.dateOfBirth = "Trường ngày sinh là bắt buộc!";
    }
    if (formValue.gender === "") {
      err.gender = "Trường giới tính là bắt buộc!";
    }
    if (formValue.email === "") {
      
    } else if (!emailPattern.test(formValue.email)) {
      err.email = "Email không hợp lệ!";
    }
    if (formValue.phoneNumber === "") {
      err.phoneNumber = "Trường số điện thoại là bắt buộc!";
    } else if (!phonePattern.test(formValue.phoneNumber)) {
      err.phoneNumber = "Số điện thoại không hợp lệ!";
    }
    if (formValue.paymentInfo === "") {
      err.paymentInfo = "Thông tin thanh toán là bắt buộc!";
    }
    if (!frontImg) {
      err.frontImg = "Vui lòng chọn ảnh!";
    }
    if (!backImg) {
      err.backImg = "Vui lòng chọn ảnh!";
    }
    return err;
  };
  //event when change input value
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      const newObj = { ...formValue, [e.target.name]: e.target.value };
      setFormValue(newObj);
    },
    [formValue]
  );
  //handle submit
  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const form = new FormData();
      form.append("name", formValue.name);
      form.append("date_of_birth", formValue.dateOfBirth);
      form.append("gender", formValue.gender);
      form.append("phone_number", formValue.phoneNumber);
      form.append("payment_info", formValue.paymentInfo);
      if(formValue.email !== "") 
      form.append("email", formValue.email);
      form.append("front_identify_card_photo", frontImg);
      form.append("back_identify_card_photo", backImg);
      if (avatar) {
        console.log(avatar);
        form.append("avatar_photo", avatar);
      }
      try {
        await axios
          .post("/api/resident", form)
          .then((response) => {
            toast.success("Create successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
           
          })
          .catch((e) =>
          {  
            console.log(e)
            toast.error("Create faily!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })}
          
          );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleChangeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <main className={mainStyles.main}>
      <div className={styles.wapper}>
        <p className={clsx(utilStyles.headingXl, styles.header)}>Tạo cư dân</p>
        <div className="d-inline-flex justify-content-between">
          <div className={styles.avatarLayout}>
            {AvatarImage}
            <input
              onChange={handleChangeAvatar}
              type="file"
              ref={avatarRef}
              style={{ display: "none" }}
            />
          </div>
          <Form className={clsx(styles.form, futuna.className)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={styles.label}>Họ và tên</Form.Label>
              <Form.Control
                size="lg"
                name="name"
                value={formValue.name}
                onChange={handleChange}
                type="text"
                placeholder="Nguyễn Văn A..."
              />
              {errors && errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label className={styles.label}>Giới tính</Form.Label>
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  inline
                  label="Nam"
                  style={{ fontSize: "1rem" }}
                  name="gender"
                  type="radio"
                  value="male"
                  onChange={handleChange}
                  id={`inline-radio-1`}
                />
                <Form.Check
                  inline
                  style={{ fontSize: "1rem" }}
                  label="Nữ"
                  name="gender"
                  type="radio"
                  onChange={handleChange}
                  value="female"
                  id={`inline-radio-2`}
                />
              </div>
              {errors && errors.gender && (
                <span className={styles.error}>{errors.gender}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                placeholder="abc@gmail.com..."
              />
              {errors && errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Số điện thoại</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                value={formValue.phoneNumber}
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
                size="lg"
                type="text"
                name="paymentInfo"
                onChange={handleChange}
                value={formValue.paymentInfo}
                placeholder=""
              />
              {errors && errors.paymentInfo && (
                <span className={styles.error}>{errors.paymentInfo}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ngày sinh</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                name="dateOfBirth"
                value={formValue.dateOfBirth}
                onChange={handleChange}
                placeholder=""
              />
              {errors && errors.dateOfBirth && (
                <span className={styles.error}>{errors.dateOfBirth}</span>
              )}
            </Form.Group>
            <div className="d-flex justify-content-around">
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Ảnh trước CCCD</Form.Label>
                <Form.Control
                  accept="image/*"
                  onChange={handleFontImg}
                  size="lg"
                  name="front"
                  type="file"
                  placeholder=""
                />
                {FrontImage}
                {errors && errors.frontImg && (
                  <span className={styles.error}>{errors.frontImg}</span>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Ảnh sau CCCD</Form.Label>
                <Form.Control
                  accept="image/*"
                  name="back"
                  onChange={handleBackImg}
                  size="lg"
                  type="file"
                  placeholder=""
                />
                {BackImage}
                {errors && errors.backImg && (
                  <span className={styles.error}>{errors.backImg}</span>
                )}
              </Form.Group>
            </div>

            <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
              Tạo
            </ButtonComponent>
          </Form>
        </div>
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
    </main>
  );
};

export default AddResident;
