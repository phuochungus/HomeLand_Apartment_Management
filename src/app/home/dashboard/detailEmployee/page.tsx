"use client";
import { useRouter } from "next/navigation";
import styles from "./detailEmployee.module.css";
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
const DetailEmployee = () => {
        const whiteBackground = {
                backgroundColor: "white",
        };

        return (
                <main className={styles.main} style={whiteBackground}>

                        <div className={styles.wapper}>
                                <p className={styles.headingXl}>Chi tiết nhân viên</p>

                                <Form className={styles.form}> 
                                        <img alt="Profile" src="/images/logos/Logo.png" height="250" className={styles.profileImage} />
                                        <div  className={styles.Buttondiv}>
                                        <ButtonComponent className={styles.creatBtn1}>Xóa</ButtonComponent>
                                        <ButtonComponent className={styles.creatBtn2}>Sửa</ButtonComponent>
                                        </div>                                   
                                        <Form.Group className={styles.box} controlId="exampleForm.ControlInput1">
                                                <Form.Label className={styles.label}>Họ và tên</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="Nguyễn Văn A..." />
                                        </Form.Group>
                                        <Form.Group className={styles.box} controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className={styles.label}>Địa chỉ</Form.Label>
                                                <Form.Control size="lg" type="text" />
                                        </Form.Group>
                                        <Form.Group className={styles.box} controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className={styles.label}>Ngày sinh</Form.Label>
                                                <Form.Control size="lg" type="date" placeholder="" />
                                        </Form.Group>
                                     
                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}>Số điện thoại</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />
                                        </Form.Group>
                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="email" placeholder="" />
                                        </Form.Group>
                                </Form>
                        </div>


                </main>
        );
};
export default DetailEmployee;