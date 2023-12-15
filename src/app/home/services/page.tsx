"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./services.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { useEffect, useMemo, useRef, useState } from "react";
import { Service } from "../../../models/service";
import { ToastContainer } from "react-toastify";
import { Contract } from "../../../models/contract";
import { motion } from "framer-motion";
import { search } from "../../../libs/utils";
import { set } from "date-fns";
import { useTranslation } from "react-i18next";
import { UserProfile } from "../../../libs/UserProfile";

export default function Services() {
  const [ServiceList, setServiceList] = useState<Service[]>([]);
  const loadingMore = useRef({ isLoading: false, page: 1 });
  const router = useRouter();
  const searchParam = useRef("");
  const [t, i18n] = useTranslation();

  const { isLoading, isError, data, refetch } = useQuery(
    "service",
    () =>
      axios.get("/api/service?page=" + loadingMore.current.page).then((res) => {
        const temp = { ...loadingMore.current };
        //if ((res.data as Service[]).length == 0) temp.page = -1;
        temp.isLoading = false;
        loadingMore.current = temp;
        let result = [...ServiceList, ...(res.data as Service[])];
        return result;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  async function handleScrollEnd() {
    if (!loadingMore.current.isLoading) {
      const temp = { ...loadingMore.current };
      temp.isLoading = true;
      temp.page = temp.page + 1;
      loadingMore.current = { ...temp };
      refetch();
    }
  }
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
  useEffect(() => {
    if (!data) return;
    let result = [...data];
    // if (apartmentSortOption)
    //   sortOptionList.forEach((value, index) => {
    //     if (apartmentSortOption[index].data[value] != "all")
    //       result = search(
    //         result,
    //         apartmentSortOption[index].fieldName,
    //         apartmentSortOption[index].data[value]
    //       );
    //       console.log(apartmentSortOption[index].data[value])
    //   });
    // if(searchParam.current != "")
    //   result = search(result, "name", searchParam)
    // setApartmentList([...result]);
    // if(searchParam.current != "")
    //   result = search(result, "name", searchParam)
    setServiceList([...result]);
  }, [data, searchParam.current]);
  function handleSearch(params: string): void {
    searchParam.current = params;
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={styles.main}
    >
      <div className={styles.container}>
        <div
          style={{ width: "85%" }}
          className={`${styles.itemContainer} ${styles.searchBarContainer}`}
        >
          <SearchBar
            placeholder="Search service here..."
            className={styles.searchBar}
            onSearch={handleSearch}
            style={{ width: "50%" }}
          ></SearchBar>
        </div>
        {UserProfile.getRole() == "admin" ? (
          <div
            className={styles.itemContainer}
            style={{
              height: "100%",
              width: "20%",
              padding: "0 1rem",
              alignItems: "center",
              alignContent: "center",
              margin: "auto",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              onClick={() => {
                router.push("/home/services/add?auth=true");
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              {t("add_service")}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.grid}>
        {ServiceList.map((value, index) => ServiceCard(value))}
      </div>
      {loadingMore.current.isLoading && loadingMore.current.page > 0 && (
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      )}
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
    </motion.div>
  );
}

const ServiceCard = (value: Service): React.ReactNode => {
  const router = useRouter();

  function handleRouting(route: string): void {
    router.push(route);
  }
  return (
    <Card
      onClick={() =>
        handleRouting("/home/" + "services/" + value.service_id + "?auth=true")
      }
      className={`${futuna.className} ${styles.gridItem}`}
      style={{ borderRadius: "10px", overflow: "hidden", maxWidth: "100%" }}
    >
      <Card.Img
        variant="top"
        style={{ height: "200px" }}
        src={
          value.imageURLs
            ? value.imageURLs[0]
            : "https://imgs.search.brave.com/2ec7dbMPC48d2bieXN1dJNsWbdhSFZ3lmUSPNwScvCQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mdW55/bGlmZS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNC84/MF9DdXRlLUdpcmwt/UGljLVdXVy5GVU5Z/TElGRS5JTl8tMS0x/MDI0eDEwMjQuanBn"
        }
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        {/* <Card.Title style={{ alignSelf: "start" }}>
          {value.rent}
          <span style={{ color: "grey" }}>{" /month"}</span>
        </Card.Title> */}
        <Card.Text>{value.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
