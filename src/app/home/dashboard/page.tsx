"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import dashboardStyles from "./dashboard.module.css";
// import styles from "../page.module.css";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AiOutlineSearch } from 'react-icons/ai'
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { futuna } from "../../../../public/fonts/futura";
import {
  Button,
  CardHeader,
  CardBody,
  CardImg,
} from "react-bootstrap/";
export default function Dashboard() {
  const [showDialog, setShowDialog] = useState(false);
  const whiteBackground = {
    backgroundColor: "white",
  };
  const customCardStyle = {
    backgroundColor: "#d4e0ff",
  }
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [t, i18n] = useTranslation();

  return (<main className={dashboardStyles.main} style={whiteBackground}>
    <div>
      <div>
        <button onClick={() => i18n.changeLanguage("vi")}>Vi</button>
      </div>
    </div>
    <Container fluid>
      <div className={classNames(dashboardStyles.wrapper, dashboardStyles.dashboardBackground)}>
        <h1 className={classNames(dashboardStyles.headingXl)}>Quản lí nhân viên</h1>
        <div className={classNames(dashboardStyles.header)}>
          <h1 className={classNames(dashboardStyles.headingLg)}>Danh sách nhân viên</h1>
          <Row>
            <Col xs={12} md={6} className="d-flex">
              <ButtonComponent href="/home/dashboard/addemployee" className={classNames(dashboardStyles.addBtn, futuna.className)}>
                Tạo
              </ButtonComponent>
            </Col>
            <Col xs={12} md={6} className="ml-auto">
              <div className="input-group">
                <input type="search" placeholder='Nhập tên nhân viên' className={classNames(dashboardStyles.search)} />

                <div className="input-group-append">
                  <button className={classNames(dashboardStyles.searchbutton)}>
                    <AiOutlineSearch />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={classNames(dashboardStyles.card)}>
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx} sm={6} md={4} lg={3} className={dashboardStyles.col}>
                <Link href="/home/dashboard/detailEmployee">
                  <Card style={customCardStyle}

                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={idx === hoveredCard ? dashboardStyles.hoveredCard : dashboardStyles.card}
                    onClick={() => setShowDialog(true)} >
                    <CardImg
                      alt="..."
                      src="/images/logos/Logo@3x.png"
                      variant="top"
                      height="250"
                      className="img-fluid"
                    ></CardImg>
                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div className="d-flex justify-content-between">
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div className="profile-stat">
                              <span className="name">Họ và tên: </span>
                              <span className="description" style={{ marginBottom: '10px' }} >Võ Công Bình</span>
                            </div>

                          </div>
                        </div>
                      </Row>
                      <div className="text-center">
                        <span className="birth">
                          Ngày sinh: <span className="font-weight-light">tt/mm/yy</span>
                        </span>
                        <div className="address">
                          Địa chỉ: <span className="ni location_pin mr-2">xxxx</span>
                        </div>
                        <div className="phonenumber">
                          Số điện thoại: <span className="ni location_pin mr-2">xxxx</span>
                        </div>
                        <div className="address">
                          Tòa nhà: <span className="ni location_pin mr-2">xxxx</span>
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
  </main>
  );
}