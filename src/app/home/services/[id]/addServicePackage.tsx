// ServicePackageModal.tsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { futuna } from "../../../../../public/fonts/futura";
import styles from "./page.module.css";
import { loadingFiler, removeLoadingFilter } from "../../../../libs/utils";
import axios from "axios";
import { set } from "date-fns";
import toastMessage from "../../../../utils/toast";

interface ServicePackageModalProps {
  show: boolean;
  serviceId: string;
  successMessage: string;
  handleClose: () => void;
}

const ServicePackageModal: React.FC<ServicePackageModalProps> = ({
  show,
  serviceId,
  successMessage,
  handleClose,
}) => {
  const [name, setName] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [perUnitPrice, setPerUnitPrice] = useState("");
  function missingField(element: HTMLElement) {
    element.className = element.className.split("missing")[0];
    element.className += " " + styles.missing;
    element.onfocus = () => {
      element.className = element.className.split("missing")[0];
      element.onfocus = null;
    };
  }
  function validateData() {
    let flag: boolean = true;
    const field = ["serviceName", "expiredDate", "perUnitPrice"];
    field.forEach((element) => {
      const inputElement = document.getElementById(element) as HTMLInputElement;
      if (inputElement.value.length === 0) {
        missingField(inputElement);
        flag = false;
      }
    });
    return flag;
  }

  const handleSubmit = async () => {
    if (!validateData()) {
      removeLoadingFilter(document.body!);
      return;
    }
    const data = new FormData();
    data.append("name", name);
    data.append("expired_date", expiredDate);
    data.append("per_unit_price", perUnitPrice);
    data.append("service_id", serviceId);
    await axios
      .post("/api/servicePackage", data)
      .then((response) => {
        setName("");
        setExpiredDate("");
        setPerUnitPrice("");
        toastMessage({ type: "success", title: successMessage });
        handleClose();
      })
      .catch((err) => {
        toastMessage({ type: "error", title: err.response.data });
        console.log(err.response.data);
      });
  };
  return (
    <Modal style={futuna.style} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Service Package Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group style={{ marginTop: "20px" }} controlId="serviceName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }} controlId="expiredDate">
            <Form.Label>Expired Date</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter expired date"
              value={expiredDate}
              onChange={(e) => setExpiredDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }} controlId="perUnitPrice">
            <Form.Label>Per Unit Price (VND)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter per unit price (VND)"
              value={perUnitPrice}
              onChange={(e) => setPerUnitPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServicePackageModal;
function sentDataToService() {
  throw new Error("Function not implemented.");
}
