"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import buildingStyles from './building.module.scss'
import utilStyles from '@/styles/utils.module.scss'
import clsx from "clsx";
import { useState } from "react";
import { futuna } from "../../../../public/fonts/futura";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ModalComponent from "@/components/Modal/Modal";

import {
    
    CloseIcon,
    EditIcon,
    
  } from "@/components/icons";
import { format } from "date-fns";
import { Building } from "@/models/building";
export default function Dashboard() {
  const [t, i18n] = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [buildings, setBuildings] = useState<Array<Building>>([]);
  const titleTable = [
    "ID",
    "Tên",
    "Địa chỉ",
    "Số tầng",
    "ID người quản lí",
  ];
  const deleleHandle = () => {
    setShowModal(true);
  };
  return (
    <main className={clsx(styles.main)}>
    <div className={clsx(buildingStyles.wrapper)}>
      <h1 className={clsx(utilStyles.headingXl)}>Quản lí tòa nhà</h1>
      <div className={clsx(buildingStyles.header)}>
        <h1 className={clsx(utilStyles.headingLg)}>Danh sách tòa nhà</h1>
        <ButtonComponent
          href="/home/buildings/addBuilding?auth=true"
        //   preIcon={<AddResidentIcon width={24} height={24} />}
          className={clsx(buildingStyles.addBtn, futuna.className)}
        >
          Tạo tòa nhà
        </ButtonComponent>
      </div>
      <div className="w-100 mt-5">
        <Table
          className={clsx(buildingStyles.tableBuilding, futuna.className)}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              {titleTable.map((title: String, index) => (
                <th key={index}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buildings.map((building, index): React.ReactNode => {
            
              return (
                <tr key={index}>
                  <td>{building.building_id}</td>
                  <td>{building.name}</td>
                  <td>{building.address}</td>
                  <td>{building.max_floor}</td>
                  <td>{building.manager_id}</td>

                  <td style={{ width: 20 }}>
                    <div className="d-flex">
                      <ButtonComponent
                        preIcon={<EditIcon width={16} height={16} />}
                        className={clsx(
                            buildingStyles.cudBtn,
                            buildingStyles.editBtn
                        )}
                        href={`/home/buildings/updateBuilding/${building.building_id}/?auth=true`}
                      >
                        Sửa
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={deleleHandle}
                        preIcon={<CloseIcon width={16} height={16} />}
                        className={clsx(
                          buildingStyles.cudBtn,
                          buildingStyles.deleteBtn
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
