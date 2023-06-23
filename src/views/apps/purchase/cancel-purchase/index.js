// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Button, Table, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '../css/purchase.css'
import '../../../../@core/scss/react/libs/flatpickr/flatpickr.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import '../media.css'
import { Form } from 'react-bootstrap'
import { CaretRightOutlined } from '@ant-design/icons';

const CancelPurchase = ({ open, toggleSidebar }) => {
    return (
        <div className='purchase-content'>
            <Modal
                isOpen={open}
                toggle={toggleSidebar}
                className='modal-dialog-centered purchase-content'
            >
                <ModalHeader className='faInfoCircle' toggle={toggleSidebar}><FontAwesomeIcon icon={faInfoCircle} />  Are You Sure Want to delete?</ModalHeader>
                <ModalBody>
                    <table className='table text-center mt-3'>
                        <thead >
                            <tr className='Delete-pop-up-thead'>
                                <th>Date</th>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className='Delete-pop-up'>
                            <tr>
                                <td>15 May 2023</td>
                                <td>PINV-3</td>
                                <td>aditya</td>
                                <td>1000</td>
                                <td>pending</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-light' color='light' onClick={toggleSidebar}>
                        Close
                    </Button>{' '}
                    <Button className='btn-danger' color='danger' type='button'>
                        Delete
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CancelPurchase