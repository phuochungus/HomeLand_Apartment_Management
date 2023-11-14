"use client";
import { useRouter } from "next/navigation";
import styles from "./detailEmployee.module.css";
import Form from 'react-bootstrap/Form';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { Images } from "../../../../../public/images";
import { format } from "date-fns";
import Image from "next/image";
import { ClassNames } from "@emotion/react";
import classNames from 'classnames';
import { toast, ToastContainer } from "react-toastify";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import axios from "axios";
import toastMessage from "@/utils/toast";
import ModalComponent from "@/components/Modal/Modal";
import { Employee } from "@/models/employee";
import { useQuery } from "react-query";
import { Col, Row } from "react-bootstrap";
import { Value } from "sass";
type FormValue = {
        name: string;
        dateOfBirth: string;
        gender: string;
        phoneNumber: string;
        avatarImg?: any;
        // frontImg: any;
        // backImg: any;
};

const DetailEmployee = ({ params }: { params: { id: string } }) => {
        const [showModal, setShowModal] = useState(false);
        // const deleleHandle = () => {
        //         setShowModal(true);
        // };
        const router = useRouter();
        const [selectedId, setSelectedId] = useState("");
        const [formValue, setFormValue] = useState({
                name: "",
                dateOfBirth: "",
                gender: "",
                phoneNumber: "",
                // frontImg: "",
                // backImg: ""
        });
        const deleleHandle = (id: string) => {
                setSelectedId(id);
                setShowModal(true);
        };
        const handleConfirmDelete = async (id: string) => {
                console.log(id);
                setShowModal(false);
                try {

                        await axios.delete(`/api/employee/${id}`);
                        toastMessage({ type: "success", title: "Delete successfully!" });

                        refetch();
                        setTimeout(() => {
                                router.push('/home/dashboard?auth=true');
                              }, 2000);
                } catch (err) {
                        toastMessage({ type: "errpr", title: "Delete faily!" });
                        console.log(err);
                }
        };
        const [employee, setEmployee] = useState<Employee>();
        const [errors, setErrors] = useState<any>();
        const [imagesKeys, setImagesKeys] = useState({ avatar: "", front: "", end: "" });
        const [frontImg, setFrontImg] = useState<any>();
        const [backImg, setBackImg] = useState<any>();
        const avatarRef = useRef<HTMLInputElement>(null);
        const handleAvatarClick = () => {
                avatarRef.current ? avatarRef.current.click() : console.error("error");
        };

        const handleFontImg = (e: any) => {
                if (e.target.files.length > 0) {

                        const newImageUrl = URL.createObjectURL(e.target.files[0]);


                        setFrontImg(newImageUrl);
                }
        };
        const handleBackImg = (e: any) => {
                if (e.target.files.length > 0) {

                        const newImageUrl = URL.createObjectURL(e.target.files[0]);


                        setBackImg(newImageUrl);
                }
        };

        const validation = () => {
                let err = {} as FormValue;

                const phonePattern =
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

                if (formValue.phoneNumber === "") {
                        err.phoneNumber = "Trường số điện thoại là bắt buộc!";
                } else if (!phonePattern.test(formValue.phoneNumber)) {
                        err.phoneNumber = "Số điện thoại không hợp lệ!";
                }
                // if (!frontImg) {
                //         err.frontImg = "Vui lòng chọn ảnh!";
                // }
                // if (!backImg) {
                //         err.backImg = "Vui lòng chọn ảnh!";
                // }
                return err;
        };
        // const BackImage = useMemo(() => {
        //         console.log(frontImg);
        //         console.log(employee?.profile.front_identify_card_photo_URL);
        //         return backImg ? (
        //                 <Image
        //                         onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
        //                         className={styles.img}
        //                         width={400}
        //                         height={140}
        //                         alt=""
        //                         src={URL.createObjectURL(backImg)}
        //                 />
        //         ) : (
        //                 <></>
        //         );
        // }, [backImg]);
        // const FrontImage = useMemo(() => {
        //         return frontImg ? (
        //                 <Image
        //                         onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
        //                         className={styles.img}
        //                         width={400}
        //                         height={140}
        //                         alt=""
        //                         src={URL.createObjectURL(frontImg)}
        //                 />
        //         ) : (
        //                 <></>
        //         );
        // }, [frontImg]);
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
        const retrieveEmployee = async () => {
                try {
                        loadingFiler(document.body!)
                        const res = await axios.get(`/api/employee/${params.id}`);
                        removeLoadingFilter(document.body!)
                        const employeeData = res.data as Employee;
                        setEmployee(employeeData);
                        console.log(res.data);
                        const newformValue: any = {
                                name: employeeData.profile.name,
                                dateofBirth: employeeData.profile.date_of_birth,
                                gender: employeeData.profile.gender,
                                phoneNumber: employeeData.profile.phone_number,
                                // frontImg: employeeData.profile.front_identify_card_photo_URL,
                                // backImg: employeeData.profile.back_identify_card_photo_URL,
                        };


                        setFormValue(newformValue);
                        return res.data;
                } catch (error) {
                        removeLoadingFilter(document.body!)
                        console.log(error);
                }
        };
        const { isLoading, isError, data, refetch } = useQuery(
                "employee",
                retrieveEmployee,
                {
                        staleTime: Infinity,
                }
        );
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
        const updateHandle = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('createHandle called');
                console.log('formValue:', formValue);
                const err = validation();
                setErrors(err);
                if (Object.keys(err).length === 0) {
                        try {
                                const data: any = {
                                        name: formValue.name,
                                        gender: formValue.gender,
                                        phone_number: formValue.phoneNumber,
                                        // frontImg: formValue.frontImg,
                                        // backImg: formValue.backImg,
                                };
                                // if (avatar) {
                                //         console.log(avatar);
                                //         data.avatar = avatar;
                                // }

                                loadingFiler(document.body!);
                                await axios.patch(`/api/employee/${params.id}`, JSON.stringify(data));
                                removeLoadingFilter(document.body!)
                                toastMessage({ type: "success", title: "Update successfully!" });
                        } catch (error) {
                                removeLoadingFilter(document.body!)
                                console.log(error);
                                toastMessage({ type: "error", title: "Update faily!" });
                        }
                }
        };

        return (
                <main className={styles.main} style={whiteBackground}>

                        <div className={styles.wapper}>
                                <p className={styles.headingXl}>Chi tiết nhân viên</p>
                                <Form className={styles.form} method="post">
                                        <Row>
                                                <Col xs={12} md={6}>
                                                        <Form.Group className={styles.box}>
                                                                <div className={styles.avatarLayout} style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Form.Label className={styles.label}>Ảnh đại diện:</Form.Label>
                                                                        {AvatarImage}
                                                                        <input
                                                                                disabled
                                                                                onChange={handleChangeAvatar}
                                                                                type="file"
                                                                                key={imagesKeys.avatar || ""}
                                                                                ref={avatarRef}
                                                                                style={{ display: "none" }}
                                                                        />
                                                                </div>
                                                        </Form.Group>
                                                </Col>
                                        </Row>

                                        <Form.Group className={styles.box} controlId="exampleForm.ControlInput1">
                                                <Form.Label className={styles.label}>Họ và tên</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="Nguyễn Văn A..." value={formValue.name} onChange={handleChange} name="name" />
                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Giới tính</Form.Label>

                                        </Form.Group>
                                        <div key={`inline-radio`} className={styles.box}>

                                                <Form.Check
                                                        checked={employee && employee.profile.gender === "male"}
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
                                                        checked={employee && employee.profile.gender === "female"}

                                                        value="female"
                                                        id={`inline-radio-2`}
                                                />

                                        </div>

                                        <Form.Group className={styles.box} controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className={styles.label}>Ngày sinh</Form.Label>
                                                <Form.Control size="lg" type="date" placeholder="" value={employee &&
                                                        format(new Date(employee.profile.date_of_birth), "yyyy-MM-dd")
                                                } onChange={handleChange} name="dateOfBirth" disabled />
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

                                                                size="lg"
                                                                key={imagesKeys.front || ""}
                                                                name="front"
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
                                                                        employee
                                                                                ? employee.profile.front_identify_card_photo_URL
                                                                                : ""
                                                                }
                                                        />

                                                </Form.Group>

                                        </div>
                                        <div className={styles.box}>
                                                <Form.Group className="mb-3">
                                                        <Form.Label className={classNames(styles.label, styles.required)}>
                                                                Ảnh sau CCCD
                                                        </Form.Label>
                                                        <Form.Control
                                                                accept="image/*"
                                                                onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                                                                name="back"

                                                                size="lg"
                                                                disabled
                                                                key={imagesKeys.end || ""}
                                                                type="file"
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
                                                                        employee
                                                                                ? employee.profile.back_identify_card_photo_URL
                                                                                : ""
                                                                }
                                                        />
                                                </Form.Group>
                                        </div>
                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        </Form.Group>

                                </Form>
                        </div>
                        <div className={styles.Buttondiv}>
                                <ButtonComponent onClick={() => deleleHandle(employee?.id || "")} className={styles.creatBtn1}>Xóa</ButtonComponent>
                                <ButtonComponent onClick={updateHandle} className={styles.creatBtn2}>Sửa</ButtonComponent>
                        </div>
                        {/* <ModalComponent
                                show={showModal}
                                title="Có chắc chắn xóa tòa này?"
                                handleConfirm={() => handleConfirmDelete()}
                                setShow={setShowModal}
                        /> */}
                        <ModalComponent
                                show={showModal}
                                title="Có chắc chắn xóa nhân viên này?"
                                handleConfirm={() => handleConfirmDelete(selectedId)}
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