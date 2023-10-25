"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "@/app/page.module.css"
import residentStyles from "./resident.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import { clsx } from "clsx";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import SearchLayout from "@/components/searchLayout/searchLayout";
import {
  AddResidentIcon,
  CloseIcon,
  EditIcon,
  SortIcon,
} from "@/components/icons";
import { useState, useEffect, ReactNode } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { residentService } from "@/apiServices/residentService";
import { useRouter } from "next/navigation";
import { futuna } from "../../../public/fonts/futura";
import { GetStaticProps } from "next";
import { format } from "date-fns";
export interface Person {
  role: string;
  id: string;
  name: string;
  date_of_birth: Date;
  gender: string;
  front_identify_card_photo_URL: string;
  back_identify_card_photo_URL: string;
  phone_number: string;
  activated_at?: Date;
  email: string;
  deleted_at?: Date;
  stay_at?: string;
  created_at: Date;
}

export default function Residents() {
  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState<Array<Person>>([]);
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
  const deleleHandle = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const data = await residentService.getAllResident();
      setResidents(data);
    };

    fetchApi();
  }, []);

  const titleTable = [
    "ID",
    "Tên",
    "Tài khoản",
    "Căn hộ",
    "Số điện thoại",
    "Ngày tạo",
  ];
 
  //console.log(residents)

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(residentStyles.wrapper)}>
        <h1 className={clsx(utilStyles.headingXl)}>Quản lí căn hộ</h1>
        <div className={clsx(residentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách cư dân</h1>
          <ButtonComponent
            href="/residents/addResident"
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(residentStyles.addBtn, futuna.className)}
          >
            tạo cư dân
          </ButtonComponent>
        </div>
        <div className="d-flex w-100 mt-3 justify-content-between">
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
          <SearchLayout placeHolder="tìm dân cư..." />
        </div>
        <div className="w-100 mt-5">
          <Table
            className={clsx(residentStyles.tableResident, futuna.className)}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                {titleTable.map((title: String, index) => (
                  <th key={index}>
                    {title} <SortIcon width={12} height={12} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {residents.map((resident, index): ReactNode => {
                const time = new Date(resident.created_at);
                const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
               
                
                return (
                  <tr key={index}>
                    <td>{resident.id}</td>
                    <td>{resident.name}</td>
                    <td>{resident.gender}</td>
                    <td>{resident.stay_at}</td>
                    <td>{resident.phone_number}</td>
                    <td>{createAt}</td>
                    <td style={{ width: 20 }}>
                      <div className="d-flex">
                        <ButtonComponent
                          preIcon={<EditIcon width={16} height={16} />}
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.editBtn
                          )}
                          href={`/residents/updateResident/${resident.id}`}
                        >
                          Sửa
                        </ButtonComponent>
                        <ButtonComponent
                          onClick={deleleHandle}
                          preIcon={<CloseIcon width={16} height={16} />}
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.deleteBtn
                          )}
                        >
                          Xóa
                        </ButtonComponent>
                        <ModalComponent
                          show={showModal}
                          setShow={setShowModal}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </main>
  );
}
