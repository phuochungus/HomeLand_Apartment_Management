"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./detailBuilding.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import residentStyles from '@/app/home/residents/resident.module.scss'
import pageStyles from '@/styles/page.module.scss';
import buildingStyles from "../../building.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { futuna } from "../../../../../../public/fonts/futura";
import axios from "axios";
import { Building } from "@/models/building";
import { useQuery } from "react-query";
import toastMessage from "@/utils/toast";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import { Button, Modal, Table} from "react-bootstrap";
import {
  AddResidentIcon,
  CloseIcon,
  DetailIcon,
  EditIcon,
} from "@/components/icons";
import ModalComponent from "@/components/Modal/Modal";
import { format } from "date-fns";
import { Manager } from "@/models/manager";

const DetailBuilding = ({ params }: { params: { id: string } }) => {
  // init modal add manager
  const [showModalManager, setShowModalManager] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [listChecked, setListChecked] = useState<String[]>([]);
  const [building, setBuilding] = useState<Building>();
  const [managers, setManagers] = useState<Array<Manager>>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
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
   //pagination
   const [totalPages, setTotalPages] = useState(0);
   const [maxPageDisplay, setMaxPageDisplay] = useState(10);
  const retrieveBuilding = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get(`/api/building/${params.id}`);
      removeLoadingFilter(document.body!);
      const buildingData = res.data as Building;
      console.log(buildingData);
      setBuilding(buildingData);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const pagination = async (page?: number, limit?: number) => {
    try {
      console.log(page, limit);
      loadingFiler(document.body!);
      const res = await axios.get("/api/manager", {
        params: {
          page,
          limit,
        },
      });
      removeLoadingFilter(document.body!);
      const data = res.data;
      setManagers(data.items);
      console.log(totalPages);
      setTotalPages(data.meta.totalPages);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);

      console.log(error);
    }
  };
  //handle check
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    let newList: String[];
    if (!checkAll) newList = managers.map((item) => item.id);
    else newList = [];
    setListChecked(newList);
  };
  const handleCheck = (id: string) => {
    const isCheck = listChecked?.includes(id);
    let newList: String[];
    if (isCheck) {
      newList = listChecked?.filter((item) => item !== id);
    } else newList = [...listChecked, id];
    if (newList.length === managers.length) {
      setCheckAll(true);
    } else setCheckAll(false);
    setListChecked(newList);
  };
  const titleTable = ["ID", "Name", "Phone Number", "Email", "Create At"];
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {
      await axios.post(`/api/building/${params.id}/deleteManager`, undefined, {
        params: {
          managerId: id,
        },
      });
      toastMessage({ type: "success", title: "Delete successfully!" });
      refetch();
    } catch (err) {
      toastMessage({ type: "errpr", title: "Delete faily!" });
      console.log(err);
    }
  };
  const handleSave = async () => {
    try {
      const res = await axios.post(
        `/api/building/${params.id}/addManagers`,
        undefined,
        {
          params: {
            managerIds: listChecked,
          },
          paramsSerializer: {
            indexes: null,
          },
        }
      );
      const updatedBuilding = res.data;
      if (updatedBuilding.managers) {
      }
      refetch();
      setListChecked([]);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setShowModalManager(false);
  };
  const handleShowManagerModal = async () => {
    const res = await axios.get("/api/manager");
    const data = res.data;
      setManagers(data.items);
       setTotalPages(data.meta.totalPages);
    setShowModalManager(true);
  };
  const { refetch } = useQuery("detail-building", retrieveBuilding, {
    staleTime: Infinity,
  });
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handleSetActive = (count: any) => {
    const limit: number = parseInt(count);
    setCurrentPage(1);
    setMaxPageDisplay(count);
    pagination(1, limit);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      pagination(currentPage - 1, maxPageDisplay);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      pagination(currentPage + 1, maxPageDisplay);
    }
  };
  return (
    <main className={mainStyles.main}>
      <div className={clsx(styles.wapper, futuna.className)}>
        <p className={clsx(utilStyles.headingXl, styles.title)}>
          Detail Information Of Building
        </p>
        <div className={styles.container}>
          <p>Detail Information</p>
          <table className={styles.tableInfo}>
            <tr>
              <td className="col-6">
                <label className="col-2">Id:</label>{" "}
                <span className="col-10 "> {building?.building_id}</span>
              </td>
              <td className="col-6">
                <label className="col-2">Name:</label>{" "}
                <span className="col-10">{building?.name}</span>
              </td>
            </tr>
            <tr>
              <td className="col-6">
                <label className="col-2">Address:</label>
                <span className="col-10">{" " + building?.address}</span>
              </td>
              <td className="col-6">
                <label className="col-2 ">Max floor:</label>
                <span className="col-10">{" " + building?.max_floor}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.managerList}>
          <div className="d-flex justify-content-between align-items-end">
            <span>List Of Manager</span>
            <ButtonComponent
              onClick={handleShowManagerModal}
              preIcon={<AddResidentIcon width={24} height={24} />}
              className={clsx(styles.addBtn, futuna.className)}
            >
              Add Manager
            </ButtonComponent>
          </div>
          {building?.managers && building.managers?.length > 0 ? (
            <Table
              className={clsx(styles.tableBuilding, futuna.className)}
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
                {building.managers.map((manager, index): React.ReactNode => {
                  const time = new Date(manager.created_at);
                  const createAt = format(time, "dd-MM-yyyy HH:mm:ss");
                  return (
                    <tr key={index}>
                      <td>{manager.id}</td>
                      <td>{manager.profile.name}</td>
                      <td>{manager.profile.phone_number}</td>
                      <td>{manager.account.email}</td>
                      <td>{createAt}</td>
                      {/* <td>{building.manager_id}</td> */}

                      <td>
                        <div className="d-flex justify-content-center">
                          <ButtonComponent
                            onClick={() => deleleHandle(manager.id)}
                            preIcon={<CloseIcon width={16} height={16} />}
                            className={clsx(
                              styles.cudBtn,
                              buildingStyles.deleteBtn
                            )}
                          >
                            Delete
                          </ButtonComponent>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "100px" }}>
             There is currently no manager in the building!
            </p>
          )}
        </div>
      </div>
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
      <ModalComponent
        show={showModal}
        title="Are you sure to delete this manager from the building?"
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
      <Modal
        dialogClassName={clsx(styles.modal, futuna.className)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalManager}
        onHide={() => setShowModalManager(false)}
      >
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title className={styles.titleModal}>
            Add manager to building
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bodyModal}>
          <h3 className={styles.bodyHeader}>List Of Manager</h3>
          <div className="d-flex w-100 mt-3 align-items-center justify-content-between">
          <div style={{marginTop: 0}} className={pageStyles.pageContainer}>
          <ButtonComponent
            onClick={handlePrevPage}
            className={pageStyles.changePageBtn}
          >
            Previous
          </ButtonComponent>
          <p>
            {currentPage}/{totalPages}
          </p>
          <ButtonComponent
            onClick={handleNextPage}
            className={pageStyles.changePageBtn}
          >
            Next
          </ButtonComponent>
        </div>
          <div className={clsx(residentStyles.perPage)}>
            <span>Show</span>
            <span>
              <Form.Select
                onChange={(e) => handleSetActive(e.target.value)}
                aria-label="Default select example"
              >
                {listOptions.map(
                  (option, index): JSX.Element => (
                    <option
                      className={clsx({
                        [residentStyles.active]:
                          maxPageDisplay === option.value,
                      })}
                      key={index}
                      value={option.value}
                    >
                      {option.value}
                    </option>
                  )
                )}
              </Form.Select>
            </span>
            <span>Entries</span>
          </div>

         
        </div>
          <Table
          style={{marginTop:20}}
            className={clsx(buildingStyles.tableBuilding, futuna.className)}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th style={{ width: 20 }}>
                  <input
                    type="checkbox"
                    checked={checkAll}
                    onChange={handleCheckAll}
                  />
                </th>
                {titleTable.map((title: String, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, index): React.ReactNode => {
                const time = new Date(manager.created_at);
                const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                return (
                  <tr key={index}>
                    <td>
                      <input
                        value={manager.id}
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.value)}
                        checked={listChecked.includes(manager.id)}
                      />
                    </td>
                    <td>{manager.id}</td>
                    <td>{manager.profile.name}</td>
                    <td>{manager.profile.phone_number}</td>
                    <td>{manager.account.email}</td>
                    <td>{createAt}</td>
                    {/* <td>{building.manager_id}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className={styles.footerModal}>
          <ButtonComponent className={styles.saveBtn} onClick={handleSave}>
            Save
          </ButtonComponent>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default DetailBuilding;
