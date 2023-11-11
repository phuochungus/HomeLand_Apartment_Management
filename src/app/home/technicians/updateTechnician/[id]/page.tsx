"use client";
import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import styles from "../../../residents/addResident/AddResident.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import { format } from "date-fns";
import clsx from "clsx";
import { futuna } from "../../../../../../public/fonts/futura";
import { useQuery } from "react-query";
import axios from "axios";
import toastMessage from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Technician } from "@/models/technician";
type FormValue = {
  gender: string;
  phoneNumber: string;
  email: string;
  avatarImg?: any;
};
const UpdateTechnician = ({ params }: { params: { id: string } }) => {
  const [formValue, setFormValue] = useState({
    gender: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>();
  const [technician, setTechnician] = useState<Technician>();
  const [avatar, setAvatar] = useState<any>();
  const avatarRef = useRef<HTMLInputElement>(null);
  let avatar_photo = technician?.account.avatarURL as string;
  const validation = () => {
    let err = {} as FormValue;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (formValue.gender === "") {
      err.gender = "Trường giới tính là bắt buộc!";
    }
    if (formValue.email === "") {
      err.email = "Trường email là bắt buộc!";
    } else if (!emailPattern.test(formValue.email)) {
      err.email = "Email không hợp lệ!";
    }
    if (formValue.phoneNumber === "") {
      err.phoneNumber = "Trường số điện thoại là bắt buộc!";
    } else if (!phonePattern.test(formValue.phoneNumber)) {
      err.phoneNumber = "Số điện thoại không hợp lệ!";
    }

    return err;
  };
  const retrieveTechnician = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get(`/api/technician/${params.id}`);
      removeLoadingFilter(document.body!);
      const technicianData = res.data as Technician;
      setTechnician(technicianData);
      const newformValue: any = {
        gender: technicianData.profile.gender,
        phoneNumber: technicianData.profile.phone_number,
        email: technicianData.account?.email,
      };

      setFormValue(newformValue);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "technician",
    retrieveTechnician,
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
          gender: formValue.gender,
          phone_number: formValue.phoneNumber,
          email: formValue.email,
          avatar_photo: avatar,
        };
        const form = new FormData();
        form.append("gender", formValue.gender);
        form.append("phone_number", formValue.phoneNumber);
        form.append("email", formValue.email);
        form.append("avatar_photo", avatar);
        form.append("_method", "PATCH");
        loadingFiler(document.body!);
        await axios.post(`/api/technician/${params.id}`, form);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Update successfully!" });
      } catch (error) {
        removeLoadingFilter(document.body!);
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
  const AvatarImage = useMemo(() => {
    return (
      <Image
        onClick={handleAvatarClick}
        fill
        style={{ borderRadius: "3%" }}
        alt=""
        onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
        className={styles.img}
        unoptimized={true}
        src={avatar ? URL.createObjectURL(avatar) : avatar_photo}
      />
    );
  }, [avatar, avatar_photo]);
  return (
    <main className={mainStyles.main}>
      <div className={clsx(styles.wapper, futuna.className)}>
        <p className={clsx(utilStyles.headingXl, styles.title)}>
          Chỉnh sửa thông tin nhân viên kĩ thuật
        </p>
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
          <Form method="post" className={clsx(styles.form, futuna.className)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={clsx(styles.label, styles.required)}>
                Họ và tên
              </Form.Label>
              <Form.Control
                value={technician && technician.profile.name}
                size="lg"
                disabled
                type="text"
                placeholder="Nguyễn Văn A..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={clsx(styles.label, styles.required)}>
                Giới tính
              </Form.Label>

              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  checked={formValue.gender === 'male'}
                  inline
                  onChange={handleChange}
                  label="Nam"
                  style={{ fontSize: "1rem" }}
                  name="gender"
                  type="radio"
                  value="male"
                  id={`inline-radio-1`}
                />
                <Form.Check
                  inline
                  label="Nữ"
                  style={{ fontSize: "1rem" }}
                  checked={formValue.gender === 'female'}
                  onChange={handleChange}
                  name="gender"
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
              <Form.Label className={clsx(styles.label, styles.required)}>
                Số điện thoại
              </Form.Label>
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
              <Form.Label className={clsx(styles.label, styles.required)}>
                Ngày sinh
              </Form.Label>
              <Form.Control
                value={
                  technician &&
                  format(new Date(technician.profile.date_of_birth), "yyyy-MM-dd")
                }
                size="lg"
                type="date"
                disabled
                placeholder=""
              />
            </Form.Group>
            <div className="d-flex justify-content-around">
              <Form.Group className="mb-3">
                <Form.Label className={clsx(styles.label, styles.required)}>
                  Ảnh trước CCCD
                </Form.Label>
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
                    technician ? technician.profile.front_identify_card_photo_URL : ""
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={clsx(styles.label, styles.required)}>
                  Ảnh sau CCCD
                </Form.Label>
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
                    technician ? technician.profile.back_identify_card_photo_URL : ""
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

export default UpdateTechnician;