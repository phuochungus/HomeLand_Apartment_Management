"use client";
import { useRouter } from 'next/navigation';
import mainStyles from '../../page.module.css'
import styles from "./addstaff.module.css";
import Form from 'react-bootstrap/Form';
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { useDropzone } from 'react-dropzone';
import React, { useState, useCallback } from 'react';
import Image from "next/image";
import { Button } from 'react-bootstrap/lib/InputGroup';
interface File {
        preview: string
}
// const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
//         const onDrop = useCallback((acceptedFiles: File[]) => {
//                 const file = acceptedFiles[0];
//                 onFileUpload(file);
//         }, []);

//         const { getRootProps, getInputProps } = useDropzone({ onDrop });

//         return (
//                 <div className={styles.dropzone} {...getRootProps()}>
//                         <input {...getInputProps()} />
//                         <p>Kéo và thả tệp hoặc nhấn vào đây để chọn tệp</p>
//                 </div>
//         );
// };  

const addstaff = () => {
        const router = useRouter();
        const handleClose = () => {
                router.push('/dashboard');
        };
        const handleFileUpload = (file: any) => {
                setImage(file);
        };
        const whiteBackground = {
                backgroundColor: "white",
        };
        const [image, setImage] = useState(null);
        const [Img, setImg] = useState<File>({ preview: "" })
        const handleImg = (e: any) => {
                const file = e.target.files[0];
                file.preview = URL.createObjectURL(file)

                setImg(file);
        }

        return (
                <main className={mainStyles.main} style={whiteBackground}>
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
                                        <Form.Group className="mb-3">
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



                                <Form className={styles.form}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label className={styles.label}>Họ và tên</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className={styles.label}>Số CCCD</Form.Label>
                                                <Form.Control size="lg" type="text" />
                                        </Form.Group>

                                        <Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className={styles.label}>Ngày sinh</Form.Label>
                                                        <Form.Control size="lg" type="date" placeholder="" />
                                                </Form.Group>
                                        </Form.Group>
                                        <Form.Label className={styles.label}>Giới tính</Form.Label>

                                        <div key={`inline-radio`} className="mb-3">

                                                <Form.Check
                                                        inline
                                                        label="Nam"
                                                        name="group1"
                                                        type='radio'
                                                        id={`inline-radio-1`}
                                                />
                                                <Form.Check
                                                        inline
                                                        label="Nữ"
                                                        name="group1"
                                                        type='radio'
                                                        id={`inline-radio-2`}
                                                />

                                        </div>

                                        <Form.Group className="mb-3">
                                                <Form.Label className={styles.label}>Số điện thoại</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="email" placeholder="" />
                                        </Form.Group>

                                        <ButtonComponent className={styles.creatBtn1}>Tạo</ButtonComponent>






                                </Form>
                        </div>


                </main >
        );
};
export default addstaff;