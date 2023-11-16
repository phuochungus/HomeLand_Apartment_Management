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
import React, { ReactNode, createRef, useMemo, useState } from "react";
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
import SearchLayout from "@/components/searchLayout1/searchLayout";

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState("");
  const searchRef = createRef<HTMLInputElement>();
  const [imageLoaded, setImageLoaded] = useState(true);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(employeeList.length / 30) + 1;
  }, [employeeList]);
  const [employee, setEmployee] = useState<Array<Employee>>([]);
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
      console.log(res.data);
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
  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      console.log("hah");
      try {
        const res = await axios.get("/api/employee/search", {
          params: {
            query: searchRef.current?.value,
          },
        });
        console.log(res.data);
        setEmployee(res.data);
      } catch (e) {
        alert(e);
      }
    }
  };
  const renderGender = (gender: string) => {
    return gender === 'male' ? 'Nam' : 'Nữ';
  };
  const searchIconClick = async () => {
    console.log("hah");
    try {
      const res = await axios.get("/api/employee/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      console.log(res.data);
      setEmployee(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [t, i18n] = useTranslation();

  return (<main className={dashboardStyles.main} style={whiteBackground}>
    <Container fluid>
      <div className={classNames(dashboardStyles.wrapper, dashboardStyles.dashboardBackground)}>
        <h1 className={classNames(dashboardStyles.headingXl)}>Quản lí nhân viên</h1>
        <div className={classNames(dashboardStyles.header)} style={{ display: 'flex', alignItems: 'center' }}>
          <h1 className={classNames(dashboardStyles.headingLg)}>Danh sách nhân viên</h1>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>

            <ButtonComponent href="/home/dashboard/addemployee?auth=true" className={classNames(dashboardStyles.addBtn)}>
              Tạo
            </ButtonComponent>

            </div>
            <SearchLayout
              onKeydown={handleSearch}
              iconClick={searchIconClick}
              placeHolder="Nhập tên nhân viên"
              ref={searchRef}
            />
          </div>


          <div className={classNames(dashboardStyles.carddiv)}>
            <Row xs={1} md={2} className="g-4">
              {employee.map((employee, idx): ReactNode => {
                const dateOfBirth = new Date(employee.profile.date_of_birth);
                const employeeName = employee.profile.name.toLowerCase(); 
                const searchTerm = searchRef.current?.value.toLowerCase();
                if (searchTerm && employeeName.includes(searchTerm)) {
                }
                return (
                  <Col key={idx} sm={6} md={4} lg={3} className={dashboardStyles.col}>
                    <Link href={`/home/dashboard/${employee.id}/?auth=true`} className={dashboardStyles.link}>
                      <Card style={customCardStyle}
                        onMouseEnter={() => setHoveredCard(idx)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={idx === hoveredCard ? dashboardStyles.hoveredCard : dashboardStyles.card}
                        onClick={() => setShowDialog(true)} >

                        <CardImg
                          alt="..."
                          onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                          src={
                            employee.profilePictureURL
                          }
                          // src="..\images\logos\Logo@3x.png"
                          variant="top"
                          height="250"
                          className="img-fluid"
                          style={{ objectFit: 'cover', height: '250px',borderRadius: "60%", padding:'20px' }}
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
                                  <span className="name no-underline">Tên: </span>
                                  <span className="description no-underline" style={{ marginBottom: '10px' }}>{employee.profile.name}</span>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <span className="birth">
                              Ngày sinh: <span className="ni location_pin mr-2">{dateOfBirth.toLocaleDateString('en-CA')}</span>

                            </span>
                            <div className="address">

                            Giới tính: <span className="ni location_pin mr-2">{renderGender(employee.profile.gender)}</span>
                            </div>
                            <div className="phonenumber">
                              Số điện thoại: <span className="ni location_pin mr-2">{employee.profile.phone_number}</span>
                            </div>

                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>


        </div>
    </Container>
  </main >
  );
}