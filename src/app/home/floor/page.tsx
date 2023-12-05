"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import buildingStyles from "./floor.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import clsx from "clsx";
import { createRef, useRef, useState } from "react";
import { futuna } from "../../../../public/fonts/futura";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ModalComponent from "@/components/Modal/Modal";
import SearchLayout from "@/components/searchLayout/searchLayout";
import { CloseIcon, DetailIcon, EditIcon } from "@/components/icons";
import { format } from "date-fns";
import { Building } from "@/models/building";
import { Floor } from "@/models/floor";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-bootstrap/lib/Navbar";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import toastMessage from "@/utils/toast";
import { ToastContainer } from "react-toastify";
export default function Dashboard() {
  const [t, i18n] = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [floor, setFloor] = useState<Array<Floor>>([]);
  const [selectedId, setSelectedId] = useState("");
  const searchRef = createRef<HTMLInputElement>();
  const titleTable = ["ID", "Tầng", "Tòa", "Số phòng"];
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const retrieveFloor = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/floor");
      removeLoadingFilter(document.body!);
      const floorData = res.data;
      setFloor(floorData);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "floor",
    retrieveFloor,
    {
      staleTime: Infinity,
    }
  );
  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      const res = await axios.get("/api/floor/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      setFloor(res.data);
    }
  };
  // const handleConfirmDelete = async (id: string) => {
  //   setShowModal(false);
  //   try {
  //     await axios.delete(`/api/building/${id}`);
  //     toastMessage({ type: "success", title: "Delete successfully!" });
  //     refetch();
  //   } catch (err) {
  //     toastMessage({ type: "error", title: "Delete faily!" });
  //     console.log(err);
  //   }
  // };

  const searchIconClick = async () => {
    const res = await axios.get("/api/floor/search", {
      params: {
        query: searchRef.current?.value,
      },
    });
    setFloor(res.data);
  };
  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(buildingStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl, buildingStyles.title)}>
          Quản lí tầng
        </h1>
        <div className={clsx(buildingStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách tầng</h1>
          <ButtonComponent
            href="/home/floor/addFloor?auth=true"
            //   preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(buildingStyles.addBtn, futuna.className)}
          >
            Tạo tầng
          </ButtonComponent>
        </div>
        <SearchLayout
          onKeydown={handleSearch}
          iconClick={searchIconClick}
          className={buildingStyles.searchLayout}
          placeHolder="Tìm tầng..."
          ref={searchRef}
        />
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
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {floor.map((floor, index): React.ReactNode => {
                return (
                  <tr key={index}>
                    <td style={{ width: "30%" }}>{floor.floor_id}</td>
                    <td style={{ width: "10%" }}>{floor.name}</td>
                    <td style={{ width: "20%" }}>{floor.building_id}</td>
                    <td style={{ width: "20%" }}>{floor.max_apartment}</td>

                    <td style={{ width: "17%" }}>
                      <div className="d-flex">
                        <ButtonComponent
                          preIcon={<EditIcon width={16} height={16} />}
                          className={clsx(
                            buildingStyles.cudBtn,
                            buildingStyles.editBtn
                          )}
                          href={`/home/floor/updateFloor/${floor.floor_id}/?auth=true`}
                        >
                          Sửa
                        </ButtonComponent>
                        <ButtonComponent
                          href={`/home/floor/detailFloor/${encodeURIComponent(floor.floor_id)}/?auth=true`}
                          preIcon={<DetailIcon width={16} height={16} />}
                          className={clsx(buildingStyles.cudBtn, buildingStyles.detailBtn)}
                        >
                          Chi tiết
                        </ButtonComponent>


                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      {/* <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa tòa này?"
        handleConfirm={() => handleConfirmDelete(selectedId)}
        setShow={setShowModal}
      /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
