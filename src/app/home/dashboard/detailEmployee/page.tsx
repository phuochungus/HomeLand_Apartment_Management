"use client";
import { useRouter } from "next/navigation";
import styles from "./detailEmployee.module.css";
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { Images } from "../../../../../public/images";
import Image from "next/image";
import { ClassNames } from "@emotion/react";
import classNames from 'classnames';
import { toast, ToastContainer } from "react-toastify";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import axios from "axios";
import toastMessage from "@/utils/toast";
import ModalComponent from "@/components/Modal/Modal";
type FormValue = {
        name: string;
        dateOfBirth: string;
        gender: string;
        phoneNumber: string;
        frontImg: any;
        backImg: any;
        avatarImg?: any;
};

const DetailEmployee = () => {
        const [showModal, setShowModal] = useState(false);
        const deleleHandle = () => {
                setShowModal(true);
        };
        const [formValue, setFormValue] = useState({
                name: "",
                dateOfBirth: "",
                gender: "",
                phoneNumber: "",
        });
        const [errors, setErrors] = useState<any>();
        const [imagesKeys, setImagesKeys] = useState({ avatar: "", front: "", end: "" });
        const [frontImg, setFrontImg] = useState<any>();
        const [backImg, setBackImg] = useState<any>();
        const avatarRef = useRef<HTMLInputElement>(null);
        const handleAvatarClick = () => {
                avatarRef.current ? avatarRef.current.click() : console.error("error");
        };
        const handleConfirmDelete = async () => {
                setShowModal(false);
                try {
                        await axios.delete(`/api/employee`);
                        toastMessage({ type: "success", title: "Delete successfully!" });
                        // refetch();
                } catch (err) {
                        toastMessage({ type: "error", title: "Delete faily!" });
                        console.log(err);
                }
        };
        const handleFontImg = (e: any) => {
                const file = e.target.files[0];

                setFrontImg(file);
        };
        const handleBackImg = (e: any) => {
                const file = e.target.files[0];
                setBackImg(file);
        };
        const validation = () => {
                let err = {} as FormValue;

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
                if (formValue.phoneNumber === "") {
                        err.phoneNumber = "Trường số điện thoại là bắt buộc!";
                } else if (!phonePattern.test(formValue.phoneNumber)) {
                        err.phoneNumber = "Số điện thoại không hợp lệ!";
                }
                if (!frontImg) {
                        err.frontImg = "Vui lòng chọn ảnh!";
                }
                if (!backImg) {
                        err.backImg = "Vui lòng chọn ảnh!";
                }
                return err;
        };
        const BackImage = useMemo(() => {
                return backImg ? (
                        <Image
                                onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                                className={styles.img}
                                width={400}
                                height={140}
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
                                width={400}
                                height={140}
                                alt=""
                                src={URL.createObjectURL(frontImg)}
                        />
                ) : (
                        <></>
                );
        }, [frontImg]);
        const [avatar, setAvatar] = useState<any>();
        const AvatarImage = useMemo(() => {
                return avatar ? (
                        <Image
                                onClick={handleAvatarClick}
                                fill
                                style={{ borderRadius: "60%" }}
                                alt=""
                                src={URL.createObjectURL(avatar)}
                        />
                ) : (
                        <Image
                                onClick={handleAvatarClick}
                                fill
                                style={{ borderRadius: "30%" }}
                                alt=""
                                src={Images.uploadAvatar}
                        />
                );
        }, [avatar]);
        const handleChangeAvatar = (e: any) => {
                const file = e.target.files[0];
                setAvatar(file);
        };
        const handleChange = useCallback(
                (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.value);
                        const newObj = { ...formValue, [e.target.name]: e.target.value };
                        setFormValue(newObj);
                },
                [formValue]
        );
        const whiteBackground = {
                backgroundColor: "white",
        };
        const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('createHandle called');
                console.log('formValue:', formValue);
                const err = validation();
                setErrors(err);
                if (Object.keys(err).length === 0) {
                        const form = new FormData();
                        form.append("name", formValue.name);
                        form.append("date_of_birth", formValue.dateOfBirth);
                        form.append("gender", formValue.gender);
                        form.append("phone_number", formValue.phoneNumber);
                        form.append("front_identify_card_photo", frontImg);
                        form.append("back_identify_card_photo", backImg);
                        if (avatar) {
                                console.log(avatar);
                                form.append("avatar_photo", avatar);
                        }
                        try {
                                loadingFiler(document.body!);
                                await axios
                                        .post("/api/employee", form)
                                        .then((response) => {
                                                setFormValue({
                                                        name: "",
                                                        dateOfBirth: "",
                                                        gender: "male",
                                                        phoneNumber: "",

                                                });
                                                setFrontImg(null);
                                                setBackImg(null);
                                                setAvatar(null)
                                                setImagesKeys({ avatar: Math.random().toString(36), front: Math.random().toString(36), end: Math.random().toString(36) });
                                                removeLoadingFilter(document.body!);
                                                toastMessage({ type: "success", title: "Create successfully!" });
                                        })
                                        .catch((e) => {
                                                removeLoadingFilter(document.body!);
                                                toastMessage({ type: "error", title: "Create faily!" });
                                        });
                        } catch (e) {
                                console.log(e);
                        }
                }
        };

        return (
                <main className={styles.main} style={whiteBackground}>

                        <div className={styles.wapper}>
                                <p className={styles.headingXl}>Chi tiết nhân viên</p>
                                <Form className={styles.form}>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Ảnh đại diện:</Form.Label>
                                                <div className={styles.avatarLayout}>
                                                        {AvatarImage}
                                                        <input
                                                                onChange={handleChangeAvatar}
                                                                type="file"
                                                                key={imagesKeys.avatar || ""}
                                                                ref={avatarRef}
                                                                style={{ display: "none" }}
                                                        />
                                                </div>

                                        </Form.Group>

                                        <Form.Group className={styles.box} controlId="exampleForm.ControlInput1">
                                                <Form.Label className={styles.label}>Họ và tên</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="Nguyễn Văn A..." value={formValue.name} onChange={handleChange} name="name" />
                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Giới tính</Form.Label>

                                        </Form.Group>
                                        <div key={`inline-radio`} className={styles.box}>

                                                <Form.Check
                                                        inline
                                                        label="Nam"
                                                        name="gender"
                                                        value="male"
                                                        type='radio'
                                                        id={`inline-radio-1`}
                                                />
                                                <Form.Check
                                                        inline
                                                        label="Nữ"
                                                        name="gender"
                                                        type='radio'
                                                        value="female"
                                                        id={`inline-radio-2`}
                                                />

                                        </div>
                                        <Form.Group className={styles.box} controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className={styles.label}>Ngày sinh</Form.Label>
                                                <Form.Control size="lg" type="date" placeholder="" value={formValue.dateOfBirth} onChange={handleChange} name="dateOfBirth" />
                                        </Form.Group>

                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}>Số điện thoại</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" value={formValue.phoneNumber} onChange={handleChange} name="phoneNumber" />
                                        </Form.Group>
                                        <div className={styles.box}>
                                                <Form.Group className="mb-3">
                                                        <Form.Label className={classNames(styles.label, styles.required)}>
                                                                Ảnh trước CCCD
                                                        </Form.Label>
                                                        <Form.Control
                                                                accept="image/*"
                                                                onChange={handleFontImg}
                                                                size="lg"
                                                                key={imagesKeys.front || ""}
                                                                name="front"
                                                                type="file"
                                                                placeholder=""
                                                        />
                                                        {FrontImage}

                                                </Form.Group>

                                        </div>
                                        <div className={styles.box}>
                                                <Form.Group className="mb-3">
                                                        <Form.Label className={classNames(styles.label, styles.required)}>
                                                                Ảnh sau CCCD
                                                        </Form.Label>
                                                        <Form.Control
                                                                accept="image/*"
                                                                name="back"
                                                                onChange={handleBackImg}
                                                                size="lg"
                                                                key={imagesKeys.end || ""}
                                                                type="file"
                                                                placeholder=""
                                                        />
                                                        {BackImage}

                                                </Form.Group>
                                        </div>
                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        </Form.Group>

                                </Form>
                        </div>
                        <div className={styles.Buttondiv}>
                                <ButtonComponent onClick={() => deleleHandle()} className={styles.creatBtn1}>Xóa</ButtonComponent>
                                <ButtonComponent onClick={createHandle} className={styles.creatBtn2}>Sửa</ButtonComponent>
                        </div>
                        <ModalComponent
                                show={showModal}
                                title="Có chắc chắn xóa tòa này?"
                                handleConfirm={() => handleConfirmDelete()}
                                setShow={setShowModal}
                        />

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
export default DetailEmployee;