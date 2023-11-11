"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../page.module.css";
import residentStyles from "../residents/resident.module.scss";
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
import { useState, useEffect, ReactNode, createRef } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { futuna } from "../../../../public/fonts/futura";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import { Manager } from "@/models/manager";

export default function Residents() {
  const [showModal, setShowModal] = useState(false);
  const [managers, setManagers] = useState<Array<Manager>>([]);
  const [selectedId, setSelectedId] = useState("");
  const searchRef = createRef<HTMLInputElement>();
  const listOptions = [
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 50,
    },
    {
      value: 100,
    },
  ];
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const retrieveManagers = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/manager");
      removeLoadingFilter(document.body!);
      setManagers(res.data);

      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);

      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "managers",
    retrieveManagers,
    {
      staleTime: Infinity,
    }
  );
  const titleTable = [
    "ID",
    "Tên",
    "Email",
    "Quản lí tòa",
    "Số điện thoại",
    "Ngày tạo",
  ];
  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      console.log("hah");
      try {
        const res = await axios.get("/api/manager/search", {
          params: {
            query: searchRef.current?.value,
          },
        });
        console.log(res.data);
        setManagers(res.data);
      } catch (e) {
        alert(e);
      }
    }
  };
  const searchIconClick = async () => {
    console.log("hah");
    try {
      const res = await axios.get("/api/manager/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      console.log(res.data);
      setManagers(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {

      await axios.delete(`/api/manager/${id}`);
      toastMessage({ type: "success", title: "Delete successfully!" });

      refetch();
    } catch (err) {
      toastMessage({ type: "errpr", title: "Delete faily!" });
      console.log(err);
    }
  };

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(residentStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl)}>Ban quản lí</h1>
        <div className={clsx(residentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách quản lí</h1>
          <ButtonComponent
            href="/home/managers/addManager?auth=true"
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(residentStyles.addBtn, futuna.className)}
          >
            Tạo người quản lí
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
          <SearchLayout
            onKeydown={handleSearch}
            iconClick={searchIconClick}
            placeHolder="Tìm người quản lí..."
            ref={searchRef}
          />
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
              {managers.map((manager, index): ReactNode => {
                const time = new Date(manager.created_at);
                const createAt = format(time, "yyyy-MM-dd HH:mm:ss");

                return (
                  <tr key={index}>
                    <td>{manager.id}</td>
                    <td>{manager.profile.name}</td>
                    <td>{manager.account?.email}</td>
                    <td>{manager.building? manager.building.name: ""}</td>
                    <td>{manager.profile.phone_number}</td>
                    <td>{createAt}</td>
                    <td style={{ width: 20 }}>
                      <div className="d-flex">
                        <ButtonComponent
                          preIcon={<EditIcon width={16} height={16} />}
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.editBtn
                          )}
                          href={`/home/managers/updateManager/${manager.id}/?auth=true`}
                        >
                          Sửa
                        </ButtonComponent>
                        <ButtonComponent
                          onClick={() => deleleHandle(manager.id)}
                          preIcon={<CloseIcon width={16} height={16} />}
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.deleteBtn
                          )}
                        >
                          Xóa
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
      <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa người quản lí này?"
        handleConfirm={() => handleConfirmDelete(selectedId)}
        setShow={setShowModal}
      />
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
