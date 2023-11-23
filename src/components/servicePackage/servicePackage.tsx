import * as React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { UserProfile } from "../../libs/UserProfile";

export interface IServicePackageProps {
  name: string;
  per_unit_price: number;
  expired_date: number;
}

export default function ServicePackage(props: IServicePackageProps) {
  return (
    <Container style={{ marginBottom: "20px" }}>
      <Row className="align-items-center">
        {/* <Col md="auto">
          <div style={{ width: "80px", borderRadius: "50%" }}>{props.img}</div>
        </Col> */}
        <Col>
          <h4>{props.name}</h4>
          <h4>
            {props.per_unit_price} VND / {props.expired_date} Days
          </h4>
        </Col>
        <Col md="auto">
          {UserProfile.getRole() == "resident" ? (
            <Button variant="info" style={{ alignItems: "center" }}>
              Buy
            </Button>
          ) : (
            <div className="d-flex">
              <Button
                // onClick={() => {
                //   router.push(
                //     "/home/contracts/updateContract/" +
                //       value.contract_id +
                //       "?auth=true"
                //   );
                // }}
                variant="warning"
              >
                Sửa
              </Button>

              <Button
                //onClick={() => deleteHandle(value.contract_id)}
                variant="danger"
                style={{ marginLeft: "20px" }}
              >
                Xóa
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
