"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../page.module.css";
import residentStyles from "./resident.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import { clsx } from "clsx";
import Link from "next/link";
import Form from "react-bootstrap/Form";

export default function Residents() {
  const listOptions = [
    {
      value: 10,
      // handleActive: () => handleSetActive(10),
      // className: clsx({ active: maxPageDisplay === 10 }),
    },
    {
      value: 20,
      // handleActive: () => handleSetActive(20),
      // className: cx({ active: maxPageDisplay === 20 }),
    },
    {
      value: 50,
      // handleActive: () => handleSetActive(50),
      // className: cx({ active: maxPageDisplay === 50 }),
    },
    {
      value: 100,
      // handleActive: () => handleSetActive(100),
      // className: cx({ active: maxPageDisplay === 100 }),
    },
  ];
  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(residentStyles.wrapper)}>
        <h1 className={clsx(utilStyles.headingXl)}>Quản lí căn hộ</h1>
        <div className={clsx(residentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách cư dân</h1>
          <ButtonComponent className={clsx(residentStyles.addBtn)}>
            tạo cư dân
          </ButtonComponent>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <div className={clsx(residentStyles.perPage)}>
            <p>Show</p>
              <span>
              <Form.Select aria-label="Default select example">
                {listOptions.map(
                  (option, index): JSX.Element => (
                    <option key={index} value={index}>
                      {option.value}
                    </option>
                  )
                )}
              </Form.Select>
            </span>
            <p>Entries</p>

          </div>
          <p>
            Show
          
          </p>
        </div>
      </div>
    </main>
  );
}
