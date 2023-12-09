"use client";
import styles from "./properties.module.css";
import { futuna } from "../../../../../public/fonts/futura";
import { Card, Placeholder, Spinner } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";
import { Apartment } from "@/models/apartment";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { Suspense, useEffect, useRef, useState } from "react";
import { Building } from "@/models/building";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { AddResidentIcon } from "@/components/icons";
import { search } from "@/libs/utils";
import { motion } from "framer-motion";
interface Option {
  title: string;
  selections: string[];
  fieldName: string;
  onChange: (value: number) => void;
  data: string[];
}
const getSortOption = async ({
  onChange,
}: {
  onChange: (index: number, value: number) => void;
}) => {
  let apartmentSortOption = [
    {
      title: "Building",
      selections: ["Tất cả"],
      data: ["all"],
      fieldName: "buildingId",
      onChange: (value: number) => onChange(0, value),
    },
    {
      title: "Floor",
      selections: ["Tất cả"],
      data: ["all"],
      fieldName: "floorId",
      onChange: (value: number) => onChange(1, value),
    },
    {
      title: "Status",
      selections: ["None", "ACTIVE", "INACTIVE"],
      data: ["all", "active", "inactive"],
      fieldName: "status",
      onChange: (value: number) => onChange(2, value),
    },
  ] as Option[];

  await Promise.all([
    axios.get("/api/building").then((res) => {
      (res.data as Building[]).map((value, index) => {
        apartmentSortOption[0].selections.push(value.name);
        apartmentSortOption[0].data.push(value.building_id);
      });
    }),
    axios.get("/api/floor").then((res) => {
      (res.data as Building[]).map((value, index) =>
        apartmentSortOption[1].selections.push(value.name)
      );
    }),
  ]);
  return apartmentSortOption;
};
// eslint-disable-next-line @next/next/no-async-client-component
export default function Apartments() {
  const pathName = usePathname();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  //Handle if middleware not working
  const router = useRouter();
  if (!user.id) router.push("/home");
  const loadingMore = useRef({ isLoading: false, page: 1 });
  const [apartmentList, setApartmentList] = useState<Apartment[]>([]);
  const [apartmentSortOption, setApartmentSortOption] = useState<Option[]>([
    {
      title: "Building",
      selections: ["Tất cả"],
      data: ["all"],
      fieldName: "buildingId",
      onChange: () => {},
    },
    {
      title: "Floor",
      selections: ["Tất cả"],
      data: ["all"],
      fieldName: "floorId",
      onChange: () => {},
    },
    {
      title: "Status",
      selections: ["ACTIVE", "INACTIVE"],
      data: ["active", "inactive"],
      fieldName: "status",
      onChange: () => {},
    },
  ]);
  const [sortOptionList, setSortOptionList] = useState<number[]>([0, 0, 0]);
  const { isLoading, isError, data, refetch } = useQuery(
    "apartment",
    async () => {
      return await axios
        .get("/api/apartment?page=" + loadingMore.current.page)
        .then((res) => {
          const temp = { ...loadingMore.current };
          if ((res.data as Apartment[]).length == 0) temp.page = -1;
          temp.isLoading = false;
          loadingMore.current = temp;
          let result = [...apartmentList, ...(res.data as Apartment[])];
          setSortOptionList([...sortOptionList]);
          return result;
        });
    },

    {
      refetchOnWindowFocus: false,
    }
  );
  function handleChange(index: number, value: number): void {
    let temp = [...sortOptionList];
    temp[index] = value;
    setSortOptionList([...temp]);
  }
  useEffect(() => {
    getSortOption({ onChange: handleChange }).then((res) => {
      setApartmentSortOption(res);
    });
  }, []);
  useEffect(() => {
    if(!data)
      return;
    let result = [...data];
    if (apartmentSortOption)
      sortOptionList.forEach((value, index) => {
        if (apartmentSortOption[index].data[value] != "all")
          result = search(
            result,
            apartmentSortOption[index].fieldName,
            apartmentSortOption[index].data[value]
          );
          console.log(apartmentSortOption[index].data[value])
      });
    console.log(result)
    setApartmentList([...result]);
  }, [sortOptionList]);

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
      console.log("load more");
      handleScrollEnd();
    }
  });
  if (isLoading)
    return (
      <motion.div
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
      </motion.div>
    );
  if (isError)
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        Co loi
      </motion.div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={styles.main}
    >
      <div className={styles.container}>
        <div className={`${styles.itemContainer} ${styles.searchBarContainer}`}>
          <SearchBar className={styles.searchBar}></SearchBar>
        </div>
        {apartmentSortOption &&
          apartmentSortOption.map((value, index) => (
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
    </motion.div>
  );
}
const FilterButton = ({
  title,
  selections,
  onChange,
}: {
  title: string;
  selections: any[];
  onChange: (value: number) => void;
}): React.ReactNode => {
  return (
    <div className={`${styles.filter} ${futuna.className}`}>
      <p>{title}</p>
      <div>
        {selections.length != 0 ? (
          <select
            name={title}
            id={title}
            onChange={(e) => {
              e.preventDefault();
              onChange(Number.parseInt(e.target.value));
            }}
            style={{ borderStyle: "hidden" }}
          >
            {selections.map((value, index) => (
              <option key={index} value={index}>
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
  const pathName = usePathname();
  function handleRouting(route: string): void {
    router.push(pathName + `/${route}`);
  }
  return (
    <Card
      onClick={() => handleRouting(value.apartment_id + "?auth=true")}
      className={`${futuna.className} ${styles.gridItem}`}
      style={{ borderRadius: "10px", overflow: "hidden" }}
    >
      <Suspense
        fallback={<Placeholder as={Card.Img} animation="glow"></Placeholder>}
      >
        <Card.Img variant="top" src={value.images[0]} />
      </Suspense>
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
function setBuildings(buildingsData: any) {
  throw new Error("Function not implemented.");
}
