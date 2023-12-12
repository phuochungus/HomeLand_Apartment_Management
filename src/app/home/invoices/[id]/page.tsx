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
          <Container style={{ padding:"20px"}}>
            <Row>
              <Col md={6}>
                <h2>Thông tin đơn hàng</h2>
                <ul>
                  <li>Mã đơn hàng: {data.invoice_id}</li>
                  <li>
                    Ngày tạo:{" "}
                    {format(new Date(data.created_at), "HH:mm:ss dd-MM-yyyy")}
                  </li>
                  <li>Người mua: {data.buyer.profile.name}</li>
                  <li>Gói dịch vụ: {data.servicePackage.name}</li>
                  <li>
                    Hạn sử dụng:{" "}
                    {format(new Date(data.expired_at), "HH:mm:ss dd-MM-yyyy")}
                  </li>
                  <li>Số lượng: {data.amount}</li>
                  
                  <li>Giá mỗi đơn vị: {data.servicePackage.per_unit_price}</li>
                  <li>Tổng tiền: {data.total}</li>
                 </ul>
              </Col>
              <Col md={6}>
                <h2>Thông tin gói dịch vụ</h2>
                <ul>
                  <li>ID: {data.servicePackage.servicePackage_id}</li>
                  <li>Dịch vụ: {data.servicePackage.service_id}</li>
                  <li>
                    Ngày tạo:{" "}
                    {format(new Date(data.created_at), "HH:mm:ss dd-MM-yyyy")}
                  </li>
                  <li>
                    Hạn sử dụng (ngày): {data.servicePackage.expired_date}
                  </li>
                </ul>

                <h2>Thông tin người mua</h2>
                <ul>
                  <li>ID: {data.buyer.id}</li>
                  <li>Vai trò: {data.buyer.role}</li>
                  <li>Tên: {data.buyer.profile.name}</li>
                  <li>Số điện thoại: {data.buyer.profile.phone_number}</li>
                  <li>
                    Ngày sinh:{" "}
                    {format(
                      new Date(data.buyer.profile.date_of_birth),
                      "dd-MM-yyyy"
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
