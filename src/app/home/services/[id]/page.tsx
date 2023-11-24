"use client";
import { Service } from "@/models/service";
import styles from "./page.module.css";
import {
  Button,
  Carousel,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import Furniture from "../../../../components/apartmentDetail/furniture";
import { futuna } from "../../../../../public/fonts/futura";
import Resident from "../../../../components/apartmentDetail/resident";
import { useEffect, useState } from "react";
import { endpoint } from "@/constraints/endpoints";
import { useQuery } from "react-query";
import axios from "axios";

export default function Page({ params }: { params: { id: string } }) {
  // let service:service= JSON.parse("{'id':'123', 'name':'M}");
  //console.log(service);
  const [imageLoaded, setImageLoaded] = useState(true); // Set it to true by default

  const { isLoading, data, isError } = useQuery(
    "service",
    () =>
      axios.get("/api/service/" + params.id).then((res) => res.data as Service),
    {
      refetchOnWindowFocus: false,
    }
  );
  const residentInfo = [
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
    
  ];

  if (data != null) {
    return (
      <main className={styles.main} style={futuna.style}>
        <div>
          <Container className="p-lg-5">
            <Row>
              <Col>
                <h3>
                  <b>{data.name}</b>
                </h3>
                {/* <p className="">{data.address}</p> */}
              </Col>
              <Col className="text-end">
                <Button variant="warning">Edit</Button>{" "}
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Carousel>
                {data.imageURLs.map((value, index) => (
                  <Carousel.Item key={index} style={{ height: "500px" }}>
                    <Image
                      loading="lazy"
                      className=" img-fluid h-100 w-100"
                      src={value}
                      alt="images"
                      rounded
                    ></Image>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
            <Row>
              <h3 style={{ marginTop: "20px" }}>
                <b>Description</b>
              </h3>
              <p style={{ marginTop: "20px" }}>{data.description}</p>
            </Row>
            <Row>
              <h3 style={{ marginTop: "20px" }}>
                <b>Service Packages</b>
              </h3>
            </Row>

            <Row
              style={{
                backgroundColor: "rgba(40, 100, 255, 0.1)",
                border: "1px black solid",
                borderRadius: "20px",
                margin: "20px 0px",
                paddingTop: "20px ",
              }}
            >
              {residentInfo.map((value, index) => (
                <>
                  {index % 2 == 0 ? <Row></Row> : <></>}
                  <Col>
                    {" "}
                    <Resident
                      img={
                        imageLoaded ? (
                          <Image
                            loading="lazy"
                            src="/path/to/your/image.jpg" // Replace with your image link
                            alt="Description of the image"
                            width={300}
                            height={200}
                            onErrorCapture={() => setImageLoaded(false)}
                            onError={() => setImageLoaded(false)}
                          />
                        ) : (
                          <svg
                            width="48"
                            height="42"
                            viewBox="0 0 48 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24 0.9328C10.752 0.9328 0 10.007 0 21.1877C0 32.3685 10.752 41.4427 24 41.4427C37.248 41.4427 48 32.3685 48 21.1877C48 10.007 37.248 0.9328 24 0.9328ZM12.168 33.9078C13.2 32.0849 19.488 30.3025 24 30.3025C28.512 30.3025 34.824 32.0849 35.832 33.9078C32.568 36.0954 28.464 37.3917 24 37.3917C19.536 37.3917 15.432 36.0954 12.168 33.9078ZM39.264 30.9709C35.832 27.4465 27.504 26.2515 24 26.2515C20.496 26.2515 12.168 27.4465 8.736 30.9709C6.288 28.2567 4.8 24.8741 4.8 21.1877C4.8 12.2553 13.416 4.98379 24 4.98379C34.584 4.98379 43.2 12.2553 43.2 21.1877C43.2 24.8741 41.712 28.2567 39.264 30.9709ZM24 9.03478C19.344 9.03478 15.6 12.1945 15.6 16.124C15.6 20.0535 19.344 23.2132 24 23.2132C28.656 23.2132 32.4 20.0535 32.4 16.124C32.4 12.1945 28.656 9.03478 24 9.03478ZM24 19.1622C22.008 19.1622 20.4 17.8052 20.4 16.124C20.4 14.4428 22.008 13.0858 24 13.0858C25.992 13.0858 27.6 14.4428 27.6 16.124C27.6 17.8052 25.992 19.1622 24 19.1622Z"
                              fill="black"
                            />
                          </svg>
                        )
                      }
                    ></Resident>
                  </Col>
                  {index == residentInfo.length - 1 && index % 2 == 0 ? (
                    <Col></Col>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </Row>
          </Container>
        </div>
      </main>
    );
  }

  if (isLoading)
    return (
      <main className={styles.main} style={futuna.style}>
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
      </main>
    );
  if (isError)
    return (
      <main className={styles.main} style={futuna.style}>
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
      </main>
    );
  return <div></div>;
}
