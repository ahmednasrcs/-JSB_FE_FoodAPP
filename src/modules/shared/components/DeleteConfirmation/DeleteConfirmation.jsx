import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noData from '/assets/FoodAppimages/delete.png'


const DeleteConfirmation = ({ show,deleteItem ,deletFun,handleClose}) => {

  
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                 </Modal.Header>
                <Modal.Body >
                    <div className=' text-center'>
                        <img src={noData} alt="noData" />
                        <h5>Delete This {deleteItem}</h5>
                        <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="outline-danger" onClick={deletFun}>
                        Delete This {deleteItem}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteConfirmation;
