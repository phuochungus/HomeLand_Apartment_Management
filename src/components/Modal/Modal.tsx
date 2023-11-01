import clsx from 'clsx';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './Modal.module.scss'
const ModalComponent = ({show, setShow, title, handleConfirm} : {
    show:boolean,
    setShow:Function,
    title: string,
    handleConfirm:() => Promise<void>
} ) => {    
    const handleClose = () => setShow(false);
  return (
    <Modal aria-labelledby="contained-modal-title-vcenter"
    centered show={show} onHide={handleClose}>
    <Modal.Header style={{backgroundColor:'var(--red)', color:'#fff'}} closeButton>
      <Modal.Title >{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>Khi xóa thì dữ liệu vẫn được lưu trữ trong database.</Modal.Body>
    <Modal.Footer>
      <Button className={clsx(styles.btn)} variant="secondary" onClick={handleClose}>
        Không
      </Button>
      <Button className={clsx(styles.btn)} variant="primary"  onClick={handleConfirm}>
        xác nhận<nav></nav>
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent