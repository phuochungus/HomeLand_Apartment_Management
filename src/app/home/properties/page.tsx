"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./properties.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Apartment } from "@/models/apartment";
import axios from "axios";
import { useQuery } from "react-query";

export default function Apartments() {
  const apartmentList  :Apartment[] = [];
  const { isLoading, isError, data } = useQuery("apartment", () =>
    axios.get("/api/apartment?page=1").then((res) => res.data as Apartment[])
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
          <div className={styles.searchBar}>
            <form
              className={futuna.className}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                padding: "0 1rem",
              }}
            >
              <input
                type="search"
                id="search"
                style={{
                  height: "100%",
                  borderStyle: "none",
                  flexGrow: "1",
                  padding: "0 10px",
                }}
              ></input>
              <button style={{ width: "fit-content" }}>
                <FaSearch></FaSearch>
              </button>
            </form>
          </div>
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
        {data!.map((value, index) =>
          ApartmentCard(value)
        )}
      </div>
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
          <p>Nothing to filter</p>
        )}
      </div>
    </div>
  );
};

const ApartmentCard = (value:Apartment): React.ReactNode => {
  const router = useRouter();

  function handleRouting(route: string): void {
    router.push(route);
  }
  return (
    <Card
      onClick={() =>
        handleRouting("/home/" + "properties/" + value.apartment_id + "?auth=true")
      }
      className={`${futuna.className} ${styles.gridItem}`}
      style={{ borderRadius: "10px" , overflow: "hidden",}}
    >
      <Card.Img
        variant="top"
        src={value.images[0]}
      />
      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
        <Card.Title style={{ alignSelf: "start" }}>{value.rent}</Card.Title>
        <Card.Text>{value.name}</Card.Text>
        <Card.Text className={styles.blockWithText}>
          {value.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
