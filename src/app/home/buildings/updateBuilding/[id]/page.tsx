"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "../../addBuilding/addBuilding.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import { futuna } from "../../../../../../public/fonts/futura";
import axios from "axios";
import { Building } from "@/models/building";
import { useQuery } from "react-query";
import toastMessage from "@/utils/toast";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
type FormValue = {
  name: string;
  address: string;
  maxFloor: string;
};
const UpdateBuilding = ({ params }: { params: { id: string } }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    address: "",
    maxFloor: "",
  });
  const [errors, setErrors] = useState<any>();
  const [building, setBuilding] = useState<Building>();
  const validation = () => {
    let err = {} as FormValue;

    if (formValue.name === "") {
      err.name = "Trường tên là bắt buộc!";
    }
    if (formValue.address === "") {
      err.address = "Trường địa chỉ là bắt buộc!";
    }
    if (formValue.maxFloor === "") {
      err.maxFloor = "Trường số tầng là bắt buộc!";
    }

    return err;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const data = {
        name: formValue.name,
        address: formValue.address,
        max_floor: formValue.maxFloor,
      };
      try {
        loadingFiler(document.body!);
        await axios.patch(`/api/building/${params.id}`, data);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Update successfully!" });
      } catch (error) {
        console.log(error);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "error", title: "Update faily!" });
      }
    }
  };
  //get detail building
  const retrieveBuilding = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get(`/api/building/${params.id}`);
      removeLoadingFilter(document.body!);
      const buildingData : Building = res.data;
      setBuilding(buildingData);
      const newformValue: any = {
        name: buildingData.name,
        address: buildingData.address,
        maxFloor: buildingData.max_floor,
      };
      setFormValue(newformValue);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!)
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "building",
    retrieveBuilding,
    {
      staleTime: Infinity,
    }
  );
  return (
    <main className={mainStyles.main}>
      <div className={styles.wapper}>
        <p className={clsx(utilStyles.headingXl, styles.title)}>
          Cập nhật thông tin tòa nhà
        </p>

        <Form className={clsx(styles.form, futuna.className)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>Tên</Form.Label>
            <Form.Control
              size="lg"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              placeholder="A01..."
            />
            {errors && errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Địa chỉ</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="address"
              value={formValue.address}
              onChange={handleChange}
            />
            {errors && errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Số tầng</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="maxFloor"
              onChange={handleChange}
              value={formValue.maxFloor}
              placeholder=""
            />
            {errors && errors.maxFloor && (
              <span className={styles.error}>{errors.maxFloor}</span>
            )}
          </Form.Group>
          <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
            Cập nhật
          </ButtonComponent>
        </Form>
      </div>
    </main>
  );
};

export default UpdateBuilding;
