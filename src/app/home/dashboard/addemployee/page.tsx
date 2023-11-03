"use client";
import { useRouter } from 'next/navigation';
// import mainStyles from '../../page.module.css'
import styles from "./addemployee.module.css";
import Form from 'react-bootstrap/Form';
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { useDropzone } from 'react-dropzone';
import React, { useState, useCallback, useRef, useMemo, ChangeEvent } from 'react';
import Image from "next/image";
import { Button } from 'react-bootstrap/lib/InputGroup';
import { Anybody } from 'next/font/google';
import axios from "axios";
import { Employee } from '@/models/employee';
import { useQuery } from "react-query";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Francois_One } from "next/font/google";
import { Images } from "../../../../../public/images";
interface File {
        preview: string
}
function getImageList(): string[] {
        const grid = document.getElementById("imageBlobGrid");
        const length = grid?.children.length;
        if (!length) return [];
        const result: string[] = [];
        for (let index = 0; index < length; index++) {
                const element = grid?.children.item(index);
                result.push((element as HTMLImageElement).src);
        }
        return result;
}

type FormValue = {
        name: string;
        dateOfBirth: string;
        gender: string;
        phoneNumber: string;
        avatarImg?: any;
};
const AddEmployee = () => {


        // const [selectedEmployeeLists, setSelectedList] = useState<Employee[]>([]);
        // const [employeeLists, setEmployeeLists] = useState<Employee[]>([]);
        // const { isLoading, isError, data } = useQuery("resident", () =>
        //         axios.get("/api/resident").then((res) => {
        //                 setEmployeeLists(res.data as Employee[]);
        //                 return res.data as Employee[];
        //         })
        // );
        const [avatar, setAvatar] = useState<any>();
        const [errors, setErrors] = useState<any>();
        const handleFileUpload = (file: any) => {
                setImage(file);
        };
        const whiteBackground = {
                backgroundColor: "white",
        };
        const [formValue, setFormValue] = useState({
                name: "",
                dateOfBirth: "",
                gender: "",
                phoneNumber: "",
        });
        // const [frontImg, setFrontImg] = useState<any>();
        // const [backImg, setBackImg] = useState<any>();
        const [image, setImage] = useState(null);
        const [Img, setImg] = useState<File>({ preview: "" })
        const handleImg = (e: any) => {
                const file = e.target.files[0];
                file.preview = URL.createObjectURL(file)

                setImg(file);
        }
        const handleAvatarClick = () => {
                avatarRef.current ? avatarRef.current.click() : console.error("error");
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
                return err;
        };
        const handleChange = useCallback(
                (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.value);
                        const newObj = { ...formValue, [e.target.name]: e.target.value };
                        setFormValue(newObj);
                },
                [formValue]
        );
        const avatarRef = useRef<HTMLInputElement>(null);

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
                        if (avatar) {
                                console.log(avatar);
                                form.append("avatar_photo", avatar);
                        }
                        try {
                                await axios
                                        .post("/api/emloyee", form)
                                        .then((response) => console.log("fdfs"))
                                        .catch((e) => console.log(e));
                        } catch (e) {
                                console.log(e);
                        }
                }
        };
        return (
                <main className={styles.main} style={whiteBackground}>

                        <div className={styles.wapper}>
                                <p className={styles.headingXl}>Thêm nhân viên</p>
                                {image && (
                                        <img
                                                src={URL.createObjectURL(image)}
                                                alt="Profile"
                                                className={styles.profileImage}
                                        />
                                )}
                                {/* <FileUploader onFileUpload={handleFileUpload} /> */}
                                <div className="d-flex justify-content-around">
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Ảnh đại diện</Form.Label>
                                                <Form.Control
                                                        size="lg"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImg}
                                                />
                                                {Img.preview !== "" && (
                                                        <div className={styles.roundImageWrapper}>
                                                                <Image
                                                                        onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                                                                        className={styles.roundImage}
                                                                        width={120}
                                                                        height={120}
                                                                        alt=""
                                                                        src={Img.preview}
                                                                />
                                                        </div>
                                                )}

                                        </Form.Group>
                                </div>


                                <Form className={styles.form} onSubmit={(e) => {

                                }}>
                                        <Form.Group className={styles.box} controlId="exampleForm.ControlInput1">
                                                <Form.Label className={styles.label}>Họ và tên</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" value={formValue.name} onChange={handleChange} name="name" />
                                                {errors && errors.name && (
                                                        <span className={styles.error}>{errors.name}</span>
                                                )}
                                        </Form.Group>

                                        <Form.Group className={styles.box} controlId="exampleForm.ControlTextarea1">
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

                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Số điện thoại</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" name="phoneNumber" value={formValue.phoneNumber} onChange={handleChange} />
                                                {errors && errors.phoneNumber  && (
                                                        <span className={styles.error}>{errors.phoneNumber}</span>
                                                )}
                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        
                                        </Form.Group>
                                        <div className={styles.button_wrapper}>
                                                <ButtonComponent onClick={createHandle} className={`${styles.creatBtn1} centered-button`}>Tạo</ButtonComponent>
                                        </div>

                                </Form>
                        </div >


                </main >
        );
};
export default AddEmployee;