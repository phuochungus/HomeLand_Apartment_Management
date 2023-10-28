"use client";
import React, { useEffect, useState } from "react";
import styles from "./UpdateResident.module.scss";
import mainStyles from "@/app/page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import { residentService } from "@/apiServices/residentService";
import { Person } from "@/models/person";
import { format } from "date-fns";
import clsx from "clsx";
import { futuna } from "../../../../../../public/fonts/futura";
const UpdateResident = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Person>();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fontImg, setFrontImg] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const resident: Person = await residentService.getResidentById(params.id);
      setData(resident);
      setEmail(resident.email);
      setPhoneNumber(resident.phone_number);
    };
    fetchApi();
  }, [params.id]);
  const updateHandle = async () => {
    const data = {
      email,
      phone_number: phoneNumber,
    };

    try {
      await residentService.updateResident(data, params.id);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <main className={mainStyles.main}>
      <div className={styles.wapper}>
        <p className={utilStyles.headingXl}>Chỉnh sửa thông tin cư dân</p>
        <Form method="post" className={clsx(styles.form, futuna.className)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>Họ và tên</Form.Label>
            <Form.Control
              value={data && data.name}
              size="lg"
              disabled
              type="text"
              placeholder="Nguyễn Văn A..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className={styles.label}>Số CCCD</Form.Label>
            <Form.Control value={"fdsf"} size="lg" type="text" disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.label}>Giới tính</Form.Label>

            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                checked={data && data.gender === "male"}
                inline
                label="Nam"
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
                checked={data && data.gender === "female"}
                name="group1"
                type="radio"
                value="femmale"
                id={`inline-radio-2`}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              type="email"
              placeholder="abc@gmail.com..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Phone number</Form.Label>
            <Form.Control
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="lg"
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Ngày sinh</Form.Label>
            <Form.Control
              value={data && format(new Date(data.date_of_birth), "yyyy-MM-dd")}
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
                src={data ? data.front_identify_card_photo_URL : ""}
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
                src={data ? data.back_identify_card_photo_URL : ""}
              />
            </Form.Group>
          </div>
        </Form>
        <ButtonComponent onClick={updateHandle} className={styles.creatBtn}>
          Cập nhật
        </ButtonComponent>
      </div>
    </main>
  );
};

export default UpdateResident;
