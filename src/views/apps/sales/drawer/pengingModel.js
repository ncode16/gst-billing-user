import React from 'react'
//React Strap imports
import { Button, Table, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
//FontAwesomr imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
// custom components imports
import '../sales.css'
import '../media.css'
import '../master.css'

const PendingPopup = ({open, toggleSidebar}) => {
  return (
    <div>
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

export default PendingPopup
