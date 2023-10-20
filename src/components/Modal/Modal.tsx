import clsx from 'clsx';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './Modal.module.scss'
const ModalComponent = ({show, setShow} : {
    show:boolean,
    setShow:Function
} ) => {    
    const handleClose = () => setShow(false);
  return (
    <Modal aria-labelledby="contained-modal-title-vcenter"
    centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title >Có chắc chắn xóa cư dân này?</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button className={clsx(styles.btn)} variant="secondary" onClick={handleClose}>
        Không
      </Button>
      <Button className={clsx(styles.btn)} variant="primary" onClick={handleClose}>
        xác nhận<nav></nav>
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent