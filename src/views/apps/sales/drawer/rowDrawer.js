import React from 'react'
import { useState } from 'react';
// custome component imort
import '../sales.css'
import '../media.css'
import '../master.css'
// font awesome imports
import { faAngleDown, faPenToSquare, faAngleRight, faIndianRupeeSign, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//react bootstrap import
import { Row, Col, Form } from 'react-bootstrap';
// react paginate import
import ReactPaginate from 'react-paginate'
//antd imports
import { Drawer, Pagination, Popover } from 'antd';
import RecordPayment from '../drawer/recordDrawer'
import PaymentMode from '../drawer/paymentdrawer'


const InvoiceDrawer = ({ rowDrawer, open }) => {

    const [openModel, setOpenModel] = useState({
        moreDetailOpen: false,
        recordPaymentDrawer: false,
        paymentModeToggle:false,
    })
    const detailOpen = () => {
        setOpenModel((prev) => ({ ...prev, moreDetailOpen: !openModel.moreDetailOpen }))
    }
    const recordPaymentOpen = () => {
        setOpenModel((prev) => ({ ...prev, recordPaymentDrawer: !openModel.recordPaymentDrawer }))
    }
    const paymentModeOpen = () => {
        setOpenModel((prev) => ({ ...prev, paymentModeToggle: !openModel.paymentModeToggle }))
    }



    return (
        <div className='row-drawer-component-main-div'>

            <Drawer
                width={'50%'}
                className='table-raw-drawer'
                title={<span className='invoice-heading-name-main-span'>
                    <span className='invoice-heading-name'>Invoice<span>#INV-5</span></span>
                    <span className='drawer-record-pending-btn-main-span'>
                        <button type='button' className='drawer-record-btn'> <span className='drawer-record-btn-name' onClick={recordPaymentOpen}>Record</span>
                            <span>
                                <FontAwesomeIcon className='drawer-record-rupee-icon' icon={faIndianRupeeSign} />
                            </span>
                            <span>
                                <FontAwesomeIcon className='drawer-record-arrow-icon' icon={faArrowDown} />
                            </span>
                        </button>
                        <button type='button' className='drawer-pending-btn'>pending</button>
                    </span>
                </span>}
                onClose={rowDrawer}
                open={open}
            >


                <div className='user-detail-div'>
                    <div className='company-name-more-detail-btn'>
                        <span className='company-name'>Abc Pvt Ltd</span>
                        <spna className='more-detail-btn' onClick={detailOpen}>{openModel.moreDetailOpen ? (<FontAwesomeIcon icon={faAngleDown} />) : (<span>More<FontAwesomeIcon icon={faAngleRight} /></span>)}</spna>
                    </div>
                    <div>
                        <span className='invoice-date-drawer'> Invoice Date:<span>20/05/2023

                            <Popover content={<div className='exclusive-notes'>
                                <Form.Control
                                    type='date'
                                    name='Change Document Date'
                                />
                                <button type='button' className='exclusive-save-button'>Save</button>
                            </div>} title='Change Document Date' trigger={'click'} placement='right'>
                                <button type='button' className='edit-invoice-date-btn'>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </Popover>




                        </span></span>
                        <span className='due-date-drawer'>Due Date:<span>20/05/2023


                            <Popover content={<div className='exclusive-notes'>
                                <Form.Control
                                    type='date'
                                    name='Change Due Date'
                                />
                                <button type='button' className='exclusive-save-button'>Save</button>
                            </div>} title='Change Due Date' trigger={'click'} placement='right'>
                                <button type='button' className='edit-invoice-date-btn'>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </Popover>


                        </span></span>
                        <p className='amount-drawer'><span className='rupee-sign-drawer'><FontAwesomeIcon icon={faIndianRupeeSign} /></span><span className='total-amount-drawer'>44.00</span></p>
                    </div>
                    {openModel.moreDetailOpen &&
                        <div className='customer-more-detail-drawer-div'>
                            <div className='customer-name-drawer-row-div'>
                                <Row className='customer-name-drawer-row'>
                                    <Col md='6' className='customer-name-drawer-col-1'>
                                        <th className='custemer-detail-th'>  Customer</th>
                                    </Col>
                                    <Col md='6' className='customer-name-drawer-col-2'><p className='customer-name-paragraph'>Rifakathusen</p></Col>
                                </Row>
                            </div>
                            <div className='gstin-drawer-row-div'>
                                <Row className='gstin-drawer-row'>
                                    <Col md='6' className='gstin-drawer-col-1'>
                                        <th className='custemer-detail-th'>GSTIN</th>
                                    </Col>
                                    <Col md='6' className='gstin-drawer-col-2'>
                                        <p className='gstin-paragraph'>TEST1234</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='phone-drawer-row-div'>
                                <Row className='phone-drawer-row'>
                                    <Col md='6' className='phone-drawer-col-1'>
                                        <th className='custemer-detail-th'>Phone</th>
                                    </Col>
                                    <Col md='6' className='phone-drawer-col-2'>
                                        <p className='mobile-number-paragraph'>9993335554</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='email-drawer-row-div'>
                                <Row className='email-drawer-row'>
                                    <Col md='6' className='email-drawer-col-1'>
                                        <th className='custemer-detail-th email-col'>Email</th>
                                    </Col>
                                    <Col md='6' className='email-drawer-col-2'>
                                        <p className='email-paragraph'>abc@gmail.com</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='billing-drawer-row-div'>
                                <Row className='billing-drawer-row'>
                                    <Col md='6' className='billing-drawer-col-1'>
                                        <th className='custemer-detail-th'>Billing Address</th>
                                    </Col>
                                    <Col md='6' className='billing-drawer-col-2'>
                                        <p className='billing-address-line'>Sameer-2 Residency</p>
                                        <p className='billing-address-line'>Near Royal Hotel, Sarkhej</p>
                                        <p className='billing-address-line'>Ahmedabad</p>
                                        <p className='billing-address-line'>363621</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='shipping-drawer-row-div'>
                                <Row className='shipping-drawer-row'>
                                    <Col md='6' className='Shipping-drawer-col-1'>
                                        <th className='custemer-detail-th'>Shipping Address</th>
                                    </Col>
                                    <Col md='6' className='shipping-drawer-col-2'>
                                        <p className='shipping-address-line'>Sameer-2 Residency</p>
                                        <p className='shipping-address-line'>Near Royal Hotel, Sarkhej</p>
                                        <p className='shipping-address-line'>Ahmedabad</p>
                                        <p className='shipping-address-line'>363621</p>
                                        <span>
                                            <button type='button' className='shipping-drawer-change-btn'>Change</button>
                                            <button type='button' className='shipping-drawer-edit-btn'>Edit</button>
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </div>}
                    <div className='drawer-table-div'>
                        <table className='drawer-table'>
                            <thead className='drawer-table-header'>
                                <tr className='drawer-table-row'>
                                    <th className='drawer-table-product-name-heading'>Product Name</th>
                                    <th className='drawer-table-quantity-heading'>Quantity</th>
                                    <th className='drawer-table-unit-price-heading'>Unit price</th>
                                    <th className='drawer-table-net-amount-heading'>Net Amount<span className='drawer-tableheading-tax span'>Tax(%)</span></th>
                                    <th className='drawer-table-total-heading'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='drawer-table-body-row'>
                                    <td className='drawer-table-product-td'><a className='drawer-table-product-td-link'>Cloth</a><span className='drawer-table-td-hsn-span'>HSN/SAC:</span></td>
                                    <td>2.00</td>
                                    <td>22.00</td>
                                    <td>44.00</td>
                                    <td className='drawer-table-total-amount-td'>44.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='drawer-table-total-amount-div'>
                        <Row>
                            <Col className='drawer-taxable-heading-col-1'>
                                <h6>Taxable Amount:</h6>
                            </Col>
                            <Col className='drawer-taxable-heading-col-2'>
                                <span className='taxable-amount-rupee'><FontAwesomeIcon icon={faIndianRupeeSign} /><span className='taxable-amount-total'>44.00</span></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='drawer-total-heading-col-1'>
                                <h4 className='drawer-total-amount-heading'>Total Amount:</h4>
                            </Col>
                            <Col className='drawer-total-heading-col-2'>
                                <span className='total-amount-rupee'><FontAwesomeIcon icon={faIndianRupeeSign} /><span className='total-amount-total'>44.00</span></span>
                            </Col>
                        </Row>
                    </div>
                    <div className='purchase-pagination'>
                        <Pagination defaultCurrent={1} total={85} defaultPageSize={100} />
                    </div>

                    <div className='drawer-bank-signature-notes-main-div'>
                        <div className='drawer-bank-div'>
                            <Row className='drawer-bank-row'>
                                <Col className='drawr-bankrow-col-1'>
                                    <th className='drawer-Payment-heading'>Payments</th>
                                </Col>
                                <Col className='drawr-bankrow-col-2'>
                                    <p className='cash-paragraph'>
                                        <button type='button' className='drawer-tds-form-btn' onClick={paymentModeOpen}>TDS</button>
                                    </p>
                                </Col>
                            </Row>
                        </div>

                        <div className='drawer-bank-div'>
                            <Row className='drawer-bank-row'>
                                <Col className='drawr-bankrow-col-1'>
                                    <th className='drawer-bank-heading'>Bank</th>
                                </Col>
                                <Col className='drawr-bankrow-col-2'>
                                    <p className='cash-paragraph'>Cash
                                        <Popover content={<div className='signature-select'>
                                            <Form.Select>
                                                <option value='test signature'>Bank</option>
                                            </Form.Select>
                                        </div>} title='Change Bank' trigger={'click'} placement='right'>
                                            <button type='button' className='drawer-bank-edit-btn'><span className='drawnk-edit-icon'><FontAwesomeIcon icon={faPenToSquare} /></span></button>
                                        </Popover>
                                    </p>
                                </Col>
                            </Row>
                        </div>

                        <div className='drawer-signature-div'>
                            <Row className='drawer-signature-row'>
                                <Col className='drawer-signature-row-col-1'>
                                    <th className='drawer-signature-heading'>Signature</th>
                                </Col>
                                <Col className='drawer-signature-row-col-2'>
                                    <p className='signature-paragraph'>Dynamic Signature
                                        <Popover content={<div className='signature-select'>
                                            <Form.Select>
                                                <option value='test signature'>test signature</option>
                                            </Form.Select>
                                        </div>} title='Change Signature' trigger={'click'} placement='right'>
                                            <button type='button' className='drawer-signature-edit-btn'><span className='drawer-bank-edit-icon'><FontAwesomeIcon icon={faPenToSquare} /></span></button>
                                        </Popover>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className='drawer-exclusive-notes-div'>
                            <Row className='drawer-exclusive-notes-row'>
                                <Col className='drawer-exclusive-notes-row-col-1'>
                                    <th className='drawer-exclusiv-notes-heading'>Exclusive Notes</th>
                                </Col>
                                <Col className='drawer-exclusive-notes-row-col-2'>
                                    <p className='exclusive-notes-paragraph'>Dynamic Notes
                                        <Popover content={
                                            <div className='exclusive-notes'>
                                                <Form.Control
                                                    as='textarea'
                                                    name='exclusive_notes'
                                                />
                                                <button type='button' className='exclusive-save-button'>Save</button>
                                            </div>
                                        } title='Exclusive Notes' trigger={'click'} placement='right'>
                                            <button type='button' className='drawer-exclusive-notes-edit-btn'>
                                                <span className='drawer-bank-edit-icon'><FontAwesomeIcon icon={faPenToSquare} /></span>
                                            </button>
                                        </Popover>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <RecordPayment recordDrawer={recordPaymentOpen} open={openModel.recordPaymentDrawer} />
                <PaymentMode toggleSidebar={paymentModeOpen} open={openModel.paymentModeToggle} />
            </Drawer >
        </div >

    )
}

export default InvoiceDrawer
