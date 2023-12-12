"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./contracts.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Button, Card, Spinner, Table, Toast } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Contract } from "@/models/contract";
import { useTranslation } from "react-i18next";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { format } from "date-fns";
import ModalComponent from "../../../components/Modal/Modal";
import toastMessage from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
export default function Contracts() {
  const [ContractList, setContractList] = useState<Contract[]>([]);
  const [t, i18n] = useTranslation();
  const router = useRouter();

  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(ContractList.length / 30) + 1;
  }, [ContractList]);
  const { isLoading, isError, data, refetch } = useQuery(
    "contract",
    () =>
      axios.get("/api/contract?page=" + page).then((res) => {
        setContractList(res.data as Contract[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState("");
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {
      await axios.delete(`/api/contract/${id}`);
      toastMessage({ type: "success", title: "Delete successfully!" });
      setContractList(ContractList.filter((item) => item.contract_id !== id));
    } catch (err) {
      toastMessage({ type: "error", title: "Delete fail!" });
      console.log(err);
    }
  };
  const deleteHandle = (id: string) => {
    console.log(id);
    setSelectedContractId(id);
    setShowModal(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom + 50 >= docHeight) {
        handleScrollEnd();
      }
    });
  }, []);

  const ContractSortOption = [
    {
      title: t("building"),
      selections: ["hello1", "hello2"],
      onChange: () => {},
    },
    {
      title: t("floor"),
      selections: [],
      onChange: () => {},
    },
    {
      title: t("apartment"),
      selections: [],
      onChange: () => {},
    },
    {
      title: t("status"),
      selections: [],
      onChange: () => {},
    },
  ];
  async function handleScrollEnd() {
    if (!loadingMore) {
      loadingMore = true;
      refetch();
      loadingMore = false;
    }
  }
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          margin: "50px 0px",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Spinner></Spinner>
      </div>
    );
  if (isError)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        Co loi
      </div>
    );
  return (
    <main className={styles.main} style={futuna.style}>
      <h1>{t("see_all_contract")}</h1>
      <div className={styles.container}>
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "35%",
            borderStyle: "none",
            padding: "10px 0",
            margin: 0,
          }}
        >
          <SearchBar
            className={styles.searchBar}
            placeholder={t("search_contract")}
          ></SearchBar>
        </div>
        {ContractSortOption.map((value, index) => (
          <div
            key={index}
            className={styles.itemContainer}
            style={{ height: "100%", width: "15%", padding: "0 1rem" }}
          >
            {FilterButton(value)}
          </div>
        ))}
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "15%",
            padding: "0 1rem",
            alignItems: "center",
            alignContent: "center",
            margin: "auto",
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              router.push("/home/contracts/add?auth=true");
            }}
            style={{ alignItems: "center", fontWeight: 600 }}
          >
            Add Contract
          </Button>
        </div>
      </div>
      <Table responsive="sm">
        <thead>
          <tr style={{ width: "100%" }}>
            <th>{t("ID")}</th>
            <th>{t("name")}</th>
            <th>{t("phone_number")}</th>
            <th>{t("apartment")}</th>
            <th>{t("status")}</th>
            <th>{t("create_at")}</th>
            <th>{t("expire_at")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ContractList.map((value, index): ReactNode => {
            return (
              <tr key={index} style={{ cursor: "pointer" }}>
                <td>{value.contract_id}</td>
                <td>{value.resident.profile.name}</td>
                <td>{value.resident.profile.phone_number}</td>
                <td>{value.apartment.name}</td>
                <td>{value.status}</td>
                <td>
                  {format(new Date(value.created_at), "HH:mm:ss dd-MM-yyyy")}
                </td>
                <td>
                  {value.expire_at?format(new Date(value.expire_at), "HH:mm:ss dd-MM-yyyy"):null}
                </td>{" "}
                <td style={{ width: 20 }}>
                  <div className="d-flex">
                    <Button
                      onClick={() => {
                        router.push(
                          "/home/contracts/update/" +
                            value.contract_id +
                            "?auth=true"
                        );
                      }}
                      variant="warning"
                    >
                      Sửa
                    </Button>

                    <Button
                      onClick={() => deleteHandle(value.contract_id)}
                      variant="danger"
                      style={{ marginLeft: "20px" }}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {loadingMore ? (
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner></Spinner>
        </div>
      ) : (
        <></>
      )}
      <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa hợp đồng này?"
        handleConfirm={() => handleConfirmDelete(selectedContractId)}
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

const FilterButton = ({
  title,
  selections,
  onChange,
}: {
  title: string;
  selections: string[];
  onChange?: (params: number) => void;
}): React.ReactNode => {
  return (
    <div
      className={`${styles.filter} ${futuna.className}`}
      style={{ zIndex: 2 }}
    >
      <p>{title}</p>
      <SearchDropdown
        title={"hello"}
        selections={selections}
        onChange={onChange}
        style={{ width: "100%" }}
      ></SearchDropdown>
    </div>
  );
};
