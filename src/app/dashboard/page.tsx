"use client";
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


  const handleClose = () => setShowDialog(false);
  const handleShow = () => setShowDialog(true);
  return <main className={dashboardStyles.main} style={whiteBackground}>
     
    <div className={classNames(dashboardStyles.wrapper, dashboardStyles.dashboardBackground)}>
      <h1 className={classNames(dashboardStyles.headingXl)}>Quản lí nhân viên</h1>
      <div className={classNames(dashboardStyles.header)}>
        <h1 className={classNames(dashboardStyles.headingLg)}>Danh sách nhân viên</h1>
        <ButtonComponent href="/dashboard/addstaff" className={classNames(dashboardStyles.addBtn)}>
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
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx}>
              <Link href="/dashboard/detail_staff">
                <Card style={customCardStyle}
                
                 onMouseEnter={() => setHoveredCard(idx)}
                 onMouseLeave={() => setHoveredCard(null)}
                 className={idx === hoveredCard ? dashboardStyles.hoveredCard : dashboardStyles.card}
                  onClick={() => setShowDialog(true)} >
                  <CardImg
                    alt="..."
                    src="/images/logos/Logo.png"
                    variant="top"
                    height="250"
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
        {/* {showDialog && (
          <Modal
            show={showDialog}
            onHide={() => setShowDialog(false)}

          // Add modal content here
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body className={classNames(dashboardStyles.modalADE)}>
              <Container>
                <Row  className={classNames(dashboardStyles.rowcss)}>
                  <Col xs={12} md={8}>
                    .col-xs-12 .col-md-8
                  </Col>
                  <Col xs={6} md={4}>
                    .col-xs-6 .col-md-4
                  </Col>
                </Row>

                <Row>
                  <Col xs={6} md={4}>
                    .col-xs-6 .col-md-4
                  </Col>
                  <Col xs={6} md={4}>
                    .col-xs-6 .col-md-4
                  </Col>
                  <Col xs={6} md={4}>
                    .col-xs-6 .col-md-4
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )} */}
      </div>
    </div>

  </main>;
}

