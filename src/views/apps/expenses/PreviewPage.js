import { useState } from 'react'
import './PreviewPage.css'
// ** Reactstrap Imports
import { Table,Modal, ModalHeader, ModalBody } from 'reactstrap'


const PreviewPage = ({ open, handlePreviewTemplate }) => {
    return (
        <>
            <Modal isOpen={open} toggle={handlePreviewTemplate} className='modal-dialog-centered'>
                <ModalHeader toggle={handlePreviewTemplate}>Mail Preview</ModalHeader>
                <ModalBody>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <p className='purchase-title'>from</p>
                            <hr />
                            Hello <span style={{ fontWeight: 600 }}>Afroj,</span>
                            <p className='purchase-title'>Payment Receipt for Payment #PAYOUT-39</p>
                            <div>
                                <p className='pdf-attach'>Please find the PDF attached to this email.</p>
                                <p className='total-amount'>TOTAL AMOUNT</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p className='pdf-attach'>Invoice#</p>
                                        <p className='pdf-attach'>Invoice Date</p>
                                    </div>                                  
                                </div>
                                <div className='view-document-button'>
                                <button type='button'>View Document</button>
                                </div>
                                <p className='pdf-attach'>If you have any questions, kindly reply all to this email</p>
                                <p className='purchase-title'>
                                    <div>
                                        <p>Regards,</p>                                
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}
export default PreviewPage;
