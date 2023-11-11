"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import dashboardStyles from "./dashboard.module.css";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AiOutlineSearch } from 'react-icons/ai'
import React, { ReactNode, useMemo, useState } from "react";
import Container from 'react-bootstrap/Container';
import { futuna } from "../../../../public/fonts/futura";
import {
  Button,
  CardHeader,
  CardBody,
  CardImg,
} from "react-bootstrap/";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import axios from "axios";
import { Employee } from "@/models/employee";
import { useQuery } from "react-query";
import { profile } from "console";

export default function Dashboard() {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(employeeList.length / 30) + 1;
  }, [employeeList]);
  const [emoloyee, setEmployee] = useState<Array<Employee>>([]);
  const [showDialog, setShowDialog] = useState(false);
  const whiteBackground = {
    backgroundColor: "#E8EAEC",
  };
  const customCardStyle = {
    backgroundColor: "white",

  }
  const retrieveEmployee = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/employee");
      removeLoadingFilter(document.body!);
      setEmployee(res.data);

      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);

      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "employee",
    retrieveEmployee,
    {
      staleTime: Infinity,
    }
  );

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [t, i18n] = useTranslation();

  return (<main className={dashboardStyles.main} style={whiteBackground}>
    <Container fluid>
      <div className={classNames(dashboardStyles.wrapper, dashboardStyles.dashboardBackground)}>
        <h1 className={classNames(dashboardStyles.headingXl)}>Quản lí nhân viên</h1>
        <div className={classNames(dashboardStyles.header)}>
          <h1 className={classNames(dashboardStyles.headingLg)}>Danh sách nhân viên</h1>
          <Row>
            <Col xs={12} md={6} className="d-flex">
              <ButtonComponent href="/home/dashboard/addemployee" className={classNames(dashboardStyles.addBtn)}>
                Tạo
              </ButtonComponent>
            </Col>
            <Col xs={12} md={6} className="ml-auto">
              <div className={classNames(dashboardStyles.searchContainer)}>
                <input type="search" placeholder='Nhập tên nhân viên' className={classNames(dashboardStyles.search)} />
                <button className={classNames(dashboardStyles.searchbutton)}>
                  <AiOutlineSearch />
                </button>
              </div>

            </Col>

          </Row>
        </div>
      

        <div className={classNames(dashboardStyles.carddiv)}>
          <Row xs={1} md={2} className="g-4">
            {emoloyee.map((employee, idx) => (
              <Col key={idx} sm={6} md={4} lg={3} className={dashboardStyles.col}>
                <Link href="/home/dashboard/detailEmployee" className={dashboardStyles.link}>
                  <Card style={customCardStyle}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={idx === hoveredCard ? dashboardStyles.hoveredCard : dashboardStyles.card}
                    onClick={() => setShowDialog(true)} >
                    <CardImg
                      alt="..."
                      src={employee.profile.avatar_photo}
                      variant="top"
                      height="250"
                      className="img-fluid"
                    ></CardImg>
                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div className="d-flex justify-content-between">
                      </div>
                    </CardHeader>
                    <CardBody className={classNames(dashboardStyles.ch)}>
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div className="profile-stat">
                              <span className="name no-underline">Họ và tên: </span>
                              <span className="description no-underline" style={{ marginBottom: '10px' }}>{employee.profile.name}</span>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <div className="text-center">
                        <span className="birth">
                          Ngày sinh: <span className="font-weight-light">{employee.profile.name}</span>
                        </span>
                        <div className="address">
                          Địa chỉ: <span className="ni location_pin mr-2">{employee.profile.name}</span>
                        </div>
                        <div className="phonenumber">
                          Số điện thoại: <span className="ni location_pin mr-2">{employee.profile.name}</span>
                        </div>
                        <div className="address">
                          Tòa nhà: <span className="ni location_pin mr-2">{employee.profile.name}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>


      </div>
    </Container>
  </main >
  );
}