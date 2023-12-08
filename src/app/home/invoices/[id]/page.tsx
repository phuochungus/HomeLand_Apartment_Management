"use client";
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
import { ToastContainer } from "react-toastify";
import toastMessage from "../../../../utils/toast";
import { Invoice } from "../../../../models/invoice";
import { useRouter } from "next/router";
import { format } from "date-fns";
export default function Page({ params }: { params: { id: string } }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = async () => {
    await refetch();
    setShowModal(false);
  };

  const { isLoading, data, isError, refetch } = useQuery(
    "invoice",
    () =>
      axios.get("/api/invoice/" + params.id).then((res) => res.data as Invoice),
    {
      refetchOnWindowFocus: false,
    }
  );
  
  if (data != null) {
    return (
      <main className={styles.main} style={futuna.style}>
        <div>
          <Container>
            <Row className="align-items-center">
              <Col md="auto" className="align-self-stretch">
                <Image
                  loading="lazy"
                  width={250}
                  rounded
                  src={`https://imgs.search.brave.com/2ec7dbMPC48d2bieXN1dJNsWbdhSFZ3lmUSPNwScvCQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mdW55/bGlmZS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNC84/MF9DdXRlLUdpcmwt/UGljLVdXVy5GVU5Z/TElGRS5JTl8tMS0x/MDI0eDEwMjQuanBn`}
                />
              </Col>
              <Col className="align-self-stretch">
                <p>{data.servicePackage.name}</p>
                <p>{`Expired Date: ${data.servicePackage.expired_date} days`}</p>
                {/* <p>{`Expired At: ${format(expirationDate, "dd-MM-yyyy")}`}</p> */}
                <p>{`Per Unit Price: $${data.servicePackage.per_unit_price}`}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Thông tin đơn hàng</h2>
                <ul>
                  <li>Mã đơn hàng: {data.invoice_id}</li>
                  <li>
                    Ngày tạo:{" "}
                    {format(new Date(data.created_at), "yyyy-MM-dd HH:mm:ss")}
                  </li>
                  <li>Người mua: {data.buyer.profile.name}</li>
                  <li>Gói dịch vụ: {data.servicePackage.name}</li>
                  <li>
                    Hạn sử dụng:{" "}
                    {format(new Date(data.expired_at), "yyyy-MM-dd HH:mm:ss")}
                  </li>
                  <li>Số lượng: {data.amount}</li>
                  <li>Giá mỗi đơn vị: {data.servicePackage.per_unit_price}</li>
                  <li>Tổng tiền: {data.total}</li>
                  <li>Đã thanh toán: {data.amount}</li>
                  <li>Còn lại: {data.total - data.amount}</li>
                </ul>
              </Col>
              <Col md={6}>
                <h2>Thông tin gói dịch vụ</h2>
                <ul>
                  <li>ID: {data.servicePackage.servicePackage_id}</li>
                  <li>Dịch vụ: {data.servicePackage.service_id}</li>
                  <li>
                    Ngày tạo:{" "}
                    {format(new Date(data.created_at), "yyyy-MM-dd HH:mm:ss")}
                  </li>
                  <li>
                    Hạn sử dụng (ngày): {data.servicePackage.expired_date}
                  </li>
                </ul>

                <h2>Thông tin người mua</h2>
                <ul>
                  <li>ID: {data.buyer.id}</li>
                  <li>Vai trò: {data.buyer.role}</li>
                  {/* <li>Ngày tạo: {data.buyer.created_at}</li> */}
                  <li>Số điện thoại: {data.buyer.profile.phone_number}</li>
                  <li>
                    Ngày sinh:{" "}
                    {format(
                      new Date(data.buyer.profile.date_of_birth),
                      "yyyy-MM-dd HH:mm:ss"
                    )}
                  </li>
                </ul>
              </Col>
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
