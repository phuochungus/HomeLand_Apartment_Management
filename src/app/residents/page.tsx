"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../page.module.css";
import residentStyles from "./resident.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import { clsx } from "clsx";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import SearchLayout from "@/components/searchLayout/searchLayout";
import {  AddResidentIcon, CloseIcon, EditIcon, SortIcon } from "@/components/icons";
import { useState } from "react";
import ModalComponent from "@/components/Modal/Modal";

export default function Residents() {
  const [showModal, setShowModal] = useState(false);
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
    
  }
  
  const titleTable = ["ID", "Tên", "Tài khoản", "Căn hộ", "Số điện thoại", "Ngày tạo"]
  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(residentStyles.wrapper)}>
        <h1 className={clsx(utilStyles.headingXl)}>Quản lí căn hộ</h1>
        <div className={clsx(residentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách cư dân</h1>
          <ButtonComponent href="/residents/addResident" preIcon = {<AddResidentIcon   width={24} height={24}/>} className={clsx(residentStyles.addBtn)}>
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
        <Table className={clsx(residentStyles.tableResident)} striped bordered hover>
      <thead>   
        <tr>
            {titleTable.map((title:String,index) => <th key={index}>{title} <SortIcon width={12} height={12}/></th>)}
          
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td style={{width : 20}}>
            <div className="d-flex">
                    <ButtonComponent preIcon={<EditIcon width={16} height={16}/>} className={clsx(residentStyles.cudBtn, residentStyles.editBtn)}>Sửa</ButtonComponent>
                    <ButtonComponent  onClick={deleleHandle} preIcon={<CloseIcon width={16} height={16}/>} className={clsx(residentStyles.cudBtn, residentStyles.deleteBtn)}>Xóa</ButtonComponent>
                    <ModalComponent show= {showModal} setShow={setShowModal}/>
                    
            </div>
          </td>

        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
        </div>
        
      </div>
    </main>
  );
}
