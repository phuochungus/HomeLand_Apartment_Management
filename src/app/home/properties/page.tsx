"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./properties.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Apartments() {
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
        {Array.from(Array(9).keys()).map((value, index) =>
          ApartmentCard(index)
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

const ApartmentCard = (index: number): React.ReactNode => {
  const router = useRouter();

  function handleRouting(route: string): void {
    router.push(route);
  }
  return (
    <Card
      onClick={() =>
        handleRouting("/home/" + "properties/" + index + "?auth=true")
      }
      className={`futuna.className ${styles.gridItem}`}
      style={{ borderRadius: "10px" }}
    >
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <Card.Title style={{ alignSelf: "start" }}>Card Title</Card.Title>
        <Card.Text>
          {`Some quick example text to build on the card title and make up the
          bulk of the card's content.`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
