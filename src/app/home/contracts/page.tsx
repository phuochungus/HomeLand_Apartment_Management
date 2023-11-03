"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./contracts.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Button, Card, Spinner, Table, Toast } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { useEffect, useMemo, useState } from "react";
import { Contract } from "@/models/contract";
import { useTranslation } from "react-i18next";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
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
        setContractList([...ContractList, ...(res.data as Contract[])]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
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
      await refetch();
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
            style={{ height: "100%", width: "20%", padding: "0 1rem" }}
          >
            {FilterButton(value)}
          </div>
        ))}
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "20%",
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
            style={{ alignItems: "center" }}
          >
            Add Contract
          </Button>
        </div>
      </div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>{t("ID")}</th>
            <th>{t("name")}</th>
            <th>{t("phone_number")}</th>
            <th>{t("apartment")}</th>
            <th>{t("create_at")}</th>
            <th>{t("expire_at")}</th>
          </tr>
        </thead>
        <tbody>
          {ContractList.map((value, index) => (
            <tr key={index}>
              <td>{value.contract_id}</td>
              <td>{value.contract_id}</td>
              <td>{value.contract_id}</td>
              <td>{value.contract_id}</td>
              <td>{value.created_at.toString()}</td>
              <td>{value.expire_at.toString()}</td> <td></td>
            </tr>
          ))}
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
  onChange?: (params: string) => void;
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
