"use client";
import { useRouter } from "next/navigation";
// import mainStyles from '../../page.module.css'
import styles from "./detail_staff.module.css";
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
const DetailStaff = () => {
        const whiteBackground = {
                backgroundColor: "white",
        };

        return (
                <main className={styles.main} style={whiteBackground}>
                        
                        <div className={styles.wapper}>
                                <p className={styles.headingXl}>Chi tiết nhân viên</p>

                                <Form className={styles.form}>
                                        <img  alt="Profile" src="/images/logos/Logo.png" height="250" className={styles.profileImage} />
                                        <ButtonComponent className={styles.creatBtn1}>Xóa</ButtonComponent>
                                        <ButtonComponent className={styles.creatBtn2}>Sửa</ButtonComponent>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label className={styles.label}>Họ và tên</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="Nguyễn Văn A..." />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className={styles.label}>Địa chỉ</Form.Label>
                                                <Form.Control size="lg" type="text" />
                                        </Form.Group>
                                        <Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className={styles.label}>Ngày sinh</Form.Label>
                                                        <Form.Control size="lg" type="date" placeholder="" />
                                                </Form.Group>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                                <Form.Label className={styles.label}>Số điện thoại</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="email" placeholder="" />
                                        </Form.Group>




                                </Form>
                        </div>


                </main>
        );
};
export default DetailStaff;