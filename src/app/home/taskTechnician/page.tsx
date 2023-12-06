"use client";
import React, { FunctionComponent, useState } from "react";
import utilStyles from "@/styles/utils.module.scss";
import styles from "./taskTechnician.module.scss";
import tableStyles from "../../../styles/table.module.scss";
import modalStyles from "../../../styles/modal.module.scss";
import mainStyles from "../page.module.css";
import { futuna } from "../../../../public/fonts/futura";
import clsx from "clsx";
import { Modal, Table } from "react-bootstrap";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Tippy from "@tippyjs/react/headless";
import {
  AssignIcon,
  BillIcon,
  CloseIcon,
  DetailIcon,
  EditIcon,
  OptionIcon,
  PaidIcon,
  PlusIcon,
  RejectIcon,
  TrashIcon,
} from "@/components/icons";
import ModalComponent from "@/components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Images } from "../../../../public/images";
import toastMessage from "@/utils/toast";
import { Technician } from "@/models/technician";
import { UserProfile } from "@/libs/UserProfile";
import { Task } from "@/models/task";
import { type } from "os";
import { RepairInvoice } from "@/models/repairInvoice";
type InvoiceItem = {
  content: string;
  price: number;
};
const TaskTechnician = () => {
  const titleTable = [
    "Create Date",
    "Content",
    "Assigner email",
    "Status",
    "Invoice",
    "Action",
  ];
  const titleCreateInvoice = [
    {
      title: "Description",
      width: "50%",
    },
    {
      title: "Price",
      width: "40%",
    },
    {
      title: "Action",
      width: "10%",
    },
  ];
  const titleInvoice = [
    {
      title: "Description",
      width: "60%",
    },
    {
      title: "Price",
      width: "40%",
    },
  ];

  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [showModalCreateInvoice, setShowModalCreateInvoice] = useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState<RepairInvoice>();
  const [selectedId, setSelectedId] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<Array<InvoiceItem>>([
    {
      content: "",
      price: 0,
    },
  ]);
  // const [total, setTotal] = useState(0);
  let total = 0;
  invoiceItems.forEach((item) => {
    total += item.price;
  });
  const createInvoiceHandler = async (task_id: string) => {
    console.log(task_id);
    console.log(invoiceItems);
    try {
      await axios.post(`/api/repairInvoice/${task_id}`, invoiceItems);
      refetch()
      setShowModalCreateInvoice(false);
    } catch (err) {
      throw err;
    }
  };
  const handleShowCreateInvoice = async (id: string) => {
    setSelectedId(id);

    setShowModalCreateInvoice(true);
  };
  const handleShowInvoice = async (id: string) => {
    setSelectedId(id);
    try {
      loadingFiler(document.body!);
      const res = await axios.get(`/api/repairInvoice/${id}`);
      removeLoadingFilter(document.body!)
      const data: RepairInvoice = res.data;
      setInvoice(data);
      setShowModalInvoice(true);
    } catch (e) {
      removeLoadingFilter(document.body!)
      throw e;
    }
  };
  const doneTaskHandler = async (task_id: string) => {
    try {
      loadingFiler(document.body!);
      await axios.patch(`/api/task/${task_id}/done`);
      refetch();
      removeLoadingFilter(document.body!);
    } catch (e) {
      removeLoadingFilter(document.body!);
      throw e;
    }
  };

  const addLineHandler = () => {
    setInvoiceItems((prev) => [
      ...prev,
      {
        content: "",
        price: 0,
      },
    ]);
  };

  const removeLineHandler = (index: number) => {
    const list = [...invoiceItems];
    list.splice(index, 1);
    setInvoiceItems(list);
  };

  const contentChangeHandler = (value: string, index: number) => {
    const list = [...invoiceItems];
    list[index].content = value;
    setInvoiceItems(list);
  };
  const priceChangeHandler = (value: string, index: number) => {
    let newValue: number;
    if (value === "") newValue = 0;
    else newValue = Number.parseInt(value);
    const list = [...invoiceItems];
    list[index].price = newValue;
    setInvoiceItems(list);
  };
  const listOptions = [
    {
      title: "Detail",
      onClick: () => {},
    },
    {
      title: "Mark Done",
      onClick: doneTaskHandler,
    },
    {
      title: "Print Invoice",
      onClick: () => {},
    },
  ];
  const retrieveTasks = async () => {
    try {
      const user = UserProfile.getProfile();
      loadingFiler(document.body!);
      const res = await axios.get(`/api/task/technician/${user.id}`);
      removeLoadingFilter(document.body!);
      const tasksData: Array<Task> = res.data;
      setTasks(tasksData);
      return tasksData;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, refetch } = useQuery(
    "tasks-technician",
    retrieveTasks
  );
  return (
    <main className={clsx(mainStyles.main)}>
      <div className={clsx(styles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl, styles.title)}>
          Received Task
        </h1>
        <div className={clsx(styles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Task List</h1>
        </div>
        <div className="w-100 mt-5">
          <table className={clsx(tableStyles.table, futuna.className)}>
            <thead>
              <tr>
                {titleTable.map((title: String, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index): React.ReactNode => {
                const time = new Date(task.complain.created_at);
                const status = task.status.toLowerCase();
                const createAt = format(time, "dd-MM-yyyy HH:mm");
                const resident: Resident = task.complain.resident;
                return (
                  <tr key={index}>
                    <td width="20%">{createAt}</td>
                    <td width="30%">{task.complain.content}</td>
                    <td width="20%">{task.assigner.account.email}</td>

                    <td width="5%">
                      <span
                        className={clsx(styles.status, {
                          [styles.done]: status === "done",
                          [styles.pending]: status === "pending",
                          [styles.processing]: status === "processing",
                          [styles.cancel]: status === "cancel",
                        })}
                      >
                        {status}
                      </span>
                    </td>
                    <td width="20%">
                      {task.invoice ? (
                        <ButtonComponent
                          preIcon={<BillIcon width={16} height={16} />}
                          className={clsx(styles.cudBtn, styles.invoiceBtn)}
                          onClick={() => handleShowInvoice(task.task_id)}
                        >
                          Invoice
                        </ButtonComponent>
                      ) : (
                        <ButtonComponent
                          preIcon={<BillIcon width={16} height={16} />}
                          className={clsx(
                            styles.cudBtn,
                            styles.createInvoiceBtn
                          )}
                          onClick={() => handleShowCreateInvoice(task.task_id)}
                        >
                          Create Invoice
                        </ButtonComponent>
                      )}
                    </td>

                    <td style={{ textAlign: "center" }} width="5%">
                      <Tippy
                        placement="right-start"
                        offset={[0, 0]}
                        interactive
                        render={(attrs) => (
                          <div
                            className={clsx(
                              styles.tippyWrapper,
                              futuna.className
                            )}
                            {...attrs}
                          >
                            {listOptions.map((option, index) => {
                              return (
                                <span
                                  onClick={() => option.onClick(task.task_id)}
                                  className={styles.optionItem}
                                  key={index}
                                >
                                  {option.title}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      >
                        <div className={styles.optionBtn}>
                          <OptionIcon width={16} height={16} />
                        </div>
                      </Tippy>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      <Modal
        dialogClassName={clsx(
          modalStyles.modal,
          futuna.className,
          styles.modal
        )}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalCreateInvoice}
        onHide={() => setShowModalCreateInvoice(false)}
      >
        <Modal.Header className={modalStyles.modalHeader} closeButton>
          <Modal.Title className={modalStyles.titleModal}>
            Create Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.bodyModal}>
          <div className={styles.titleInvoice}>
            {titleCreateInvoice.map((item, index) => (
              <span style={{ width: item.width }} key={index}>
                {item.title}
              </span>
            ))}
          </div>
          <div className={styles.bodyInvoice}>
            {invoiceItems.map((item, index) => {
              return (
                <div className={styles.itemLine} key={index}>
                  <input
                    value={item.content}
                    className={styles.description}
                    onChange={(e) =>
                      contentChangeHandler(e.target.value, index)
                    }
                  />
                  <input
                    value={item.price}
                    className={styles.price}
                    onChange={(e) => priceChangeHandler(e.target.value, index)}
                  />

                  <div
                    onClick={() => removeLineHandler(index)}
                    className={styles.TrashIcon}
                  >
                    <TrashIcon width={16} height={16} />
                  </div>
                </div>
              );
            })}
          </div>
          <ButtonComponent
            onClick={addLineHandler}
            className={styles.addLineBtn}
            preIcon={<PlusIcon width={16} height={16} />}
          >
            Add Empty line
          </ButtonComponent>
          <div className={styles.total}>
            <span>Total</span>
            <span>{total} VND</span>
          </div>
        </Modal.Body>
        <Modal.Footer className={modalStyles.footerModal}>
          <ButtonComponent
            className={modalStyles.saveBtn}
            onClick={() => createInvoiceHandler(selectedId)}
          >
            Create Invoice
          </ButtonComponent>
        </Modal.Footer>
      </Modal>

      <Modal
        dialogClassName={clsx(
          modalStyles.modal,
          futuna.className,
          styles.modal
        )}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalInvoice}
        onHide={() => setShowModalInvoice(false)}
      >
        <Modal.Header className={modalStyles.modalHeader} closeButton>
          <Modal.Title className={modalStyles.titleModal}>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.bodyModal}>
        <div className={styles.invoice}>
          <div className={styles.titleInvoice}>
            {titleInvoice.map((item, index) => (
              <span style={{ width: item.width }} key={index}>
                {item.title}
              </span>
            ))}
          </div>
          <div className={styles.bodyInvoice}>
          
            {invoice?.items?.map((item, index) => {
              return (
                <div className={styles.itemLine} key={index}>
                  <span style={{ width: "60%" }} className={clsx(styles.line)}>
                    {item.content}
                  </span>
                  <span style={{ width: "40%" }} className={clsx(styles.line)}>
                    {item.price} VND
                  </span>
                </div>
              );
            })}
           
           
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <span>{total} VND</span>
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default TaskTechnician;
