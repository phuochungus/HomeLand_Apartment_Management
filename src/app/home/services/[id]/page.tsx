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
import { useEffect, useState } from "react";
import { endpoint } from "@/constraints/endpoints";
import { useQuery } from "react-query";
import axios from "axios";
import Resident from "../../../../components/apartmentDetail/resident";
import ServicePackage from "../../../../components/servicePackage/servicePackage";
import ServicePackageModal from "./addServicePackage";
import { ToastContainer } from "react-toastify";
import toastMessage from "../../../../utils/toast";
import StarRatings from "react-star-ratings";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";

export default function Page({ params }: { params: { id: string } }) {
  // let service:service= JSON.parse("{'id':'123', 'name':'M}");
  //console.log(service);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = async () => {
    setShowModal(false);
    await refetch();
  };

  const { isLoading, data, isError, refetch } = useQuery(
    "service",
    () =>
      axios.get("/api/service/" + params.id).then((res) => res.data as Service),
    {
      refetchOnWindowFocus: false,
    }
  );

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
                {data.imageURLs && data.imageURLs.length > 0 ? (
                  data.imageURLs.map((value, index) => (
                    <Carousel.Item key={index} style={{ height: "500px" }}>
                      <Image
                        loading="lazy"
                        className=" img-fluid h-100 w-100"
                        src={value}
                        alt="images"
                        rounded
                      ></Image>
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item style={{ height: "500px" }}>
                    <Image
                      loading="lazy"
                      className=" img-fluid h-100 w-100"
                      src={
                        "https://imgs.search.brave.com/2ec7dbMPC48d2bieXN1dJNsWbdhSFZ3lmUSPNwScvCQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mdW55/bGlmZS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNC84/MF9DdXRlLUdpcmwt/UGljLVdXVy5GVU5Z/TElGRS5JTl8tMS0x/MDI0eDEwMjQuanBn"
                      }
                      alt="images"
                      rounded
                    ></Image>
                  </Carousel.Item>
                )}
              </Carousel>
            </Row>
            <Row>
              <h3 style={{ marginTop: "20px" }}>
                <b>Description</b>
              </h3>
              <p style={{ marginTop: "20px" }}>{data.description}</p>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h3>
                  <b>Service Packages</b>
                </h3>
              </Col>
              <Col md="auto">
                <Button onClick={handleModalOpen}>Add</Button>
                <ServicePackageModal
                  show={showModal}
                  successMessage="Add service package successfully!"
                  serviceId={params.id}
                  handleClose={handleModalClose}
                />
              </Col>
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
              {data.servicePackages ? (
                data.servicePackages.map((value, index) => (
                  <>
                    {index % 2 == 0 ? <Row></Row> : <></>}
                    <Col>
                      {" "}
                      <ServicePackage
                        name={value.name}
                        per_unit_price={value.per_unit_price}
                        expired_date={value.expired_date}
                      ></ServicePackage>
                    </Col>
                    {index == data.servicePackages.length - 1 &&
                      index % 2 == 0 ? (
                      <Col></Col>
                    ) : (
                      <></>
                    )}
                  </>
                ))
              ) : (
                <></>
              )}
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h3>
                  <b>Feedback</b>
                </h3>
              </Col>
            </Row>
            <Row style={{
              backgroundColor: "rgba(40, 100, 255, 0.1)",
              border: "1px black solid",
              borderRadius: "20px",
              margin: "20px 0px",
              paddingTop: "20px ",
            }}
            >
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="5px"
              />
              <textarea
                className="form-control"
                style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "20px", marginRight: "10px", width: "90%" }}
                placeholder="Comment"
                rows={5}

              ></textarea>

              <ButtonComponent className={styles.creatBtn1}>
                Tạo
              </ButtonComponent>


            </Row>
          </Container>
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
