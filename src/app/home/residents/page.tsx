"use client";
import { QueryClient, QueryClientProvider } from "react-query";
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
import { futuna } from "../../../../public/fonts/futura";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import { useQuery } from "react-query";
import axios from "axios";

export default function Residents() {
  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState<Array<Resident>>([]);
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
  const retrieveResidents = async () => {
    try {
      const res = await axios.get('/api/resident')
      setResidents(res.data )
      console.log(res.data)
      return res.data;
    }
    catch(error){
      console.log(error)
    }
    

  } 
  const { isLoading, isError, data, refetch } = useQuery('residents', retrieveResidents)

  // useEffect(() => {
  //   const fetchApi = async () => {
  //   const data =  await residentService.getAllResident();
  //    setResidents(data);
  //   };

  //   fetchApi();
  // }, []);
  


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
            href="/home/residents/addResident?auth=true"
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(residentStyles.addBtn, futuna.className)}
          >
            Tạo cư dân
          </ButtonComponent>
        </div>
        <div className="d-flex w-100 mt-3 justify-content-between">
          <div className={clsx(residentStyles.perPage)}>
            <span>Show</span>
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
            <span>Entries</span>
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
                    <td>{resident.profile.name}</td>
                    <td>{resident.payment_info}</td>
                    <td>{resident.stay_at && resident.stay_at.name}</td>
                    <td>{resident.profile.phone_number}</td>
                    <td>{createAt}</td>
                    <td style={{ width: 20 }}>
                      <div className="d-flex">
                        <ButtonComponent
                          preIcon={<EditIcon width={16} height={16} />}
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.editBtn
                          )}
                          href={`/home/residents/updateResident/${resident.id}/?auth=true`}
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
