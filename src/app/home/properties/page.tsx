"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./properties.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Apartment } from "@/models/apartment";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { useEffect, useMemo, useState } from "react";
export default function Apartments() {
  const [apartmentList, setApartmentList] = useState<Apartment[]>([]);
  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(apartmentList.length / 30) + 1;
  }, [apartmentList]);
  const { isLoading, isError, data, refetch } = useQuery(
    "apartment",
    () =>
      axios.get("/api/apartment?page=" + page).then((res) => {
        setApartmentList([...apartmentList, ...(res.data as Apartment[])]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const apartmentSortOption = [
    {
      title: "Building",
      selections: [],
      onChange: () => {},
    },
    {
      title: "Floor",
      selections: [],
      onChange: () => {},
    },
    {
      title: "Status",
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
    <main className={styles.main}>
      <div className={styles.container}>
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "40%",
            borderStyle: "none",
            padding: "10px 0",
          }}
        >
          <SearchBar className={styles.searchBar}></SearchBar>
        </div>
        {apartmentSortOption.map((value, index) => (
          <div
            key={index}
            className={styles.itemContainer}
            style={{ height: "100%", width: "20%", padding: "0 1rem" }}
          >
            {FilterButton(value)}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {apartmentList.map((value, index) => ApartmentCard(value))}
      </div>
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
  selections: [] | never[];
  onChange: Function;
}): React.ReactNode => {
  return (
    <div className={`${styles.filter} ${futuna.className}`}>
      <p>{title}</p>
      <div>
        {selections.length != 0 ? (
          <select name={title} id={title} onChange={() => onChange()}>
            {selections.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        ) : (
          <p style={{ fontSize: "0.8rem" }}>Nothing to filter</p>
        )}
      </div>
    </div>
  );
};

const ApartmentCard = (value: Apartment): React.ReactNode => {
  const router = useRouter();

  function handleRouting(route: string): void {
    router.push(route);
  }
  return (
    <Card
      onClick={() =>
        handleRouting(
          "/home/" + "properties/" + value.apartment_id + "?auth=true"
        )
      }
      className={`${futuna.className} ${styles.gridItem}`}
      style={{ borderRadius: "10px", overflow: "hidden" }}
    >
      <Card.Img variant="top" src={value.images[0]} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Card.Title style={{ alignSelf: "start" }}>
          {value.rent}
          <span style={{ color: "grey" }}>{" /month"}</span>
        </Card.Title>
        <Card.Text>{value.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
