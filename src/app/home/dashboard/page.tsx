"use client";
import { useQuery } from "react-query";
import axios from "axios";
import classNames from 'classnames';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, CardBody, CardHeader, CardImg, Col, Container, Form, Row } from "react-bootstrap/";
import Card from 'react-bootstrap/Card';
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import dashboardStyles from "./dashboard.module.css";
import React, { useState } from "react";
import i18n from "@/app/i18next";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
type Employee = {
  name: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
};
export default function Dashboard() {
  const [showDialog, setShowDialog] = useState(false);
  const whiteBackground = {
    backgroundColor: "white",
  };
  const customCardStyle = {
    backgroundColor: "#d4e0ff",
  };
  const retrieveEmployee = async () => {
    try {
      loadingFiler(document.body!)
      const res = await axios.get("/api/employee");
      removeLoadingFilter(document.body!)
      setEmployees(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!)

      console.log(error);
    }
  };
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { isLoading, isError, data, refetch } = useQuery(
    "employee",
    retrieveEmployee,
    {
      staleTime: Infinity,
    }
  );

  return (
    <main className={dashboardStyles.main} style={whiteBackground}>
      <div>
        <div>
          <button onClick={() => i18n.changeLanguage("vi")}>Vi</button>
        </div>
      </div>
      <div className={classNames(dashboardStyles.wrapper, dashboardStyles.dashboardBackground)}>
        <h1 className={classNames(dashboardStyles.headingXl)}>Quản lí nhân viên</h1>
        <div className={classNames(dashboardStyles.header)}>
          <h1 className={classNames(dashboardStyles.headingLg)}>Danh sách nhân viên</h1>
          <ButtonComponent href="/home/dashboard/addemployee" className={classNames(dashboardStyles.addBtn)}>
            Tạo nhân viên
          </ButtonComponent>
          <form>
            <div className={classNames(dashboardStyles.search)}>
              <input type="search" placeholder='Nhập tên nhân viên' className={classNames(dashboardStyles.search)} />
              <button className={classNames(dashboardStyles.searchbutton)}>
                <AiOutlineSearch />
              </button>
            </div>
          </form>
        </div>
        <div className={classNames(dashboardStyles.card)}>

          <Row xs={1} md={2} className="g-4">
            {employees.map((employee, idx) => (
              <Col key={idx}>
                <Card style={customCardStyle}>
                  <CardImg alt="..." src="/images/logos/Logo.png" variant="top" height="250" />
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div className="profile-stat">
                            <span className="name">Họ và tên: {employee.name}</span>
                            <span className="description" style={{ marginBottom: '10px' }}>
                              {employee.name}
                            </span>
                            <div className="text-center">
                              <span className="birth">
                                Ngày sinh: <span className="font-weight-light">{employee.dateOfBirth}</span>
                              </span>
                              <div className="address">
                                Địa chỉ: <span className="ni location_pin mr-2">{employee.address}</span>
                              </div>
                              <div className="phonenumber">
                                Số điện thoại: <span className="ni location_pin mr-2">{employee.phoneNumber}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))}

          </Row>
        </div>
      </div>
    </main>
  );
}
