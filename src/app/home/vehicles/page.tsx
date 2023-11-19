"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../page.module.css";
import vehicleStyles from "./vehicle.module.scss";
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
import {
  useState,
  ReactNode,
  createRef,
  useRef,
  KeyboardEvent,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import ModalComponent from "@/components/Modal/Modal";
import { usePathname, useRouter } from "next/navigation";
import { futuna } from "../../../../public/fonts/futura";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import PageIndicator from "@/components/pageIndicator/PageIndicator";
import { SortOrder } from "@/models/enums";
import { Vehicle } from "@/models/vehicle";
import { FaFacebookMessenger } from "react-icons/fa";
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
export default function Vehicles() {
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
  const [showLimit, setShowLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedId, setSelectedId] = useState("");
  const searchRef = createRef<HTMLInputElement>();
  const path = usePathname();
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const retrieveResidents = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/vehicle");
      removeLoadingFilter(document.body!);
      setVehicles(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "vehicles",
    retrieveResidents,
    {
      staleTime: Infinity,
    }
  );
  const titleTable = ["ID", "Loại xe", "Chủ sở hữu", "Thời hạn", "Tình trạng"];
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(data)
    if (e.currentTarget.value == "") setVehicles(data);
    else setVehicles(search(data, "licensePlate", e.currentTarget.value));
  };
  const handleConfirmDelete = async (id: string) => {
    loadingFiler(document.body!);
    setShowModal(false);
    await axios
      .delete(`/api/vehicle/${id}`)
      .then((res) => {
        toastMessage({ type: "success", title: "Delete successfully!" });
        refetch();
      })
      .catch((err) => {
        toastMessage({ type: "error", title: "Delete failed!" });
        console.log(err);
      });
    removeLoadingFilter(document.body!);
  };
  const handleShowLimit = (event: React.ChangeEvent) => {
    event.preventDefault();
    const value = (event.target! as HTMLSelectElement).value;
    setShowLimit(Number.parseInt(value));
  };
  const handlePageNumberChange = (value: number) => {
    if (Math.ceil(vehicles.length / showLimit) >= value) setPageNumber(value);
  };
  function handleChangeOrder(order: SortOrder, title: String) {
    throw new Error("Function not implemented.");
  }

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(vehicleStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl)}>
          Quản lí phương tiện đăng kí giữ xe
        </h1>
        <div className={clsx(vehicleStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách phương tiện</h1>
          <ButtonComponent
            href={`${path}/add`}
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(vehicleStyles.addBtn, futuna.className)}
          >
            Đăng kí phương tiện
          </ButtonComponent>
        </div>
        <div className="d-flex w-100 mt-3 justify-content-between">
          <div className={clsx(vehicleStyles.perPage)}>
            <span>Show</span>
            <span>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleShowLimit(e)}
              >
                {listOptions.map(
                  (option, index): JSX.Element => (
                    <option key={index} value={option.value}>
                      {option.value}
                    </option>
                  )
                )}
              </Form.Select>
            </span>
            <span>Entries</span>
          </div>
          <SearchLayout
            onChange={handleSearch}
            placeHolder="Tìm phương tiện..."
            ref={searchRef}
          />
        </div>
        <div className="w-100 mt-5">
          <Table
            className={clsx(vehicleStyles.tableResident, futuna.className)}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                {titleTable.map((title: String, index) => (
                  <th key={index}>
                    {title}{" "}
                    <SortIcon
                      width={12}
                      height={12}
                      onChangeOrder={(order) => {}}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles
                .slice(
                  (pageNumber - 1) * showLimit,
                  (pageNumber - 1) * showLimit + showLimit - 1
                )
                .map((vehicle, index): ReactNode => {
                  return (
                    <tr key={index}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.licensePlate}</td>
                      <td>{vehicle.status}</td>
                      <td>{vehicle.residentId}</td>
                      <td
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className="d-flex">
                          <ButtonComponent
                            preIcon={<EditIcon width={16} height={16} />}
                            className={clsx(
                              vehicleStyles.cudBtn,
                              vehicleStyles.editBtn
                            )}
                            href={`add`}
                          >
                            Sửa
                          </ButtonComponent>
                          <ButtonComponent
                            preIcon={
                              <FaFacebookMessenger width={16} height={16} />
                            }
                            className={clsx(
                              vehicleStyles.cudBtn,
                              vehicleStyles.notiBtn
                            )}
                          >
                            Send notification
                          </ButtonComponent>
                          <ButtonComponent
                            onClick={() => deleleHandle(vehicle.id)}
                            preIcon={<CloseIcon width={16} height={16} />}
                            className={clsx(
                              vehicleStyles.cudBtn,
                              vehicleStyles.deleteBtn
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
        {vehicles.length ? (
          <PageIndicator
            pageLength={Math.ceil(vehicles.length / showLimit)}
            currentPage={pageNumber}
            clickHandler={handlePageNumberChange}
          />
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            Nothing to show
          </div>
        )}
      </div>
      <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa phương tiện này này?"
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