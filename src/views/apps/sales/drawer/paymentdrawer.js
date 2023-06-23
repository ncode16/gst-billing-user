// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Button } from 'reactstrap'
import { Radio, Collapse, Drawer, Dropdown } from 'antd'
import '../../../../@core/scss/react/libs/flatpickr/flatpickr.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInr, faEye, faEnvelope, faClone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../media.css'
import '../master.css'
import '../sales.css'
import { Form, InputGroup } from 'react-bootstrap'
import SendEmail from '../send-email/index'

const { Panel } = Collapse

const PaymentMode = ({ open, toggleSidebar }) => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [emailOpen, setEmailOpen] = useState(false)
    const toggleEmail = () => setEmailOpen(!emailOpen)

    const items = [
        {
            label: <a style={{ color: 'black', fontWeight: 600 }}><FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '8px', color: '#25d366' }} />Whatsapp</a>,
            key: '0',
        },
        {
            label: <a style={{ color: 'black', fontWeight: 600 }} onClick={toggleEmail}><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', color: '#2754ff' }} />Email</a>,
            key: '1',
        },
        {
            label: <a style={{ color: 'black', fontWeight: 600 }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '8px', color: '#6e6e73' }} />Copy link</a>,
            key: '2',
        },
    ];

    return (
        <Drawer
            title={
                <div className='record-payment-header-div'>
                    <span className='payment-tab'>
                        <span className='payment-record-title'>Record Payment for </span>
                        <span className='payment-pinv'>PINV-3</span>
                        <p className='payment-sub-tab'>
                            15 May 2023
                            <span className='payment-last-date'>, Due on 15 May 2023</span>
                        </p>
                    </span>
                    <Button color='primary' className='save-update-button'>Update Payment</Button>
                </div>
            }
            onClose={toggleSidebar}
            open={open}
            className='record-payment-form-wrapper'
        >
            <div className='ant-drawer-body-main-div'>
                <Form>
                    <div className='company-amount-header'>
                        <h6 className='company-header'>
                            <span className='company-name'>ABC Technologies</span>
                        </h6>
                        <span className='balance-title'>
                            <p className='balance-rupee-title'>
                                <span className='balance-name'>Balance</span>
                                <span className='balance-amount'><FontAwesomeIcon icon={faInr} />2000</span>
                            </p>
                        </span>
                    </div>
                    <div className='payment-mode-card'>
                        <button type='button' className='view-button'>
                            <FontAwesomeIcon icon={faEye} />
                            <span className='view-receipt'>View Receipt</span>
                        </button>
                        <Dropdown menu={{
                            items
                        }} trigger={['click']}>
                            <button type='button' className='send-button'>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                <span style={{ marginLeft: '4px', display: 'inline' }}>Send</span>
                            </button>
                        </Dropdown>
                        {/* <DropdownButton title={<span><FontAwesomeIcon icon={faPaperPlane} />
                            <span className='view-receipt'>Send</span></span>}>
                            <Dropdown.Item><FontAwesomeIcon icon={faWhatsapp} style={{ marginRight: '8px', color: '#25d366' }} />Whatsapp</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </DropdownButton> */}
                        <div className='discount-fild'>
                            <label className='amount-label'>Amount (₹)</label>
                            <InputGroup>
                                <Form.Control
                                    addonAfter='%'
                                    className='discount-percent-input'
                                    type="number"
                                    placeholder='0'
                                    name="document_color"
                                />
                            </InputGroup>
                            <div className='total-amount-small-text'>
                                <span>Total Amount ₹ 1000</span>
                            </div>
                        </div>
                        <div className='discount-fild'>
                            <label className='payment-date-label'>Payment Date</label>
                            <InputGroup>
                                <Form.Control
                                    className='discount-percent-input'
                                    type="date"
                                />
                            </InputGroup>
                        </div>
                        <div className='payemnt-type-main'>
                            <label className='payment-type-label'>Payment Type</label>
                        </div>
                        <div className='payment-type-radio'>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>UPI</Radio>
                                <Radio value={2}>Cash</Radio>
                                <Radio value={3}>Card</Radio>
                                <Radio value={4}>Net Banking</Radio>
                                <Radio value={5}>Cheque</Radio>
                                <Radio value={6}>EMI</Radio>
                            </Radio.Group>
                        </div>
                        <div className='payment-notes-label'>
                            <label className='payment-type-label'>Notes</label>
                            <InputGroup>
                                <Form.Control
                                    className='discount-percent-input'
                                    as="textarea"
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <div className='settle-main'>
                        <h6 className='settle-header'>
                            <span className='settle-document-title'>Settled Documents</span>
                        </h6>
                    </div>
                    <div className='payment-mode-card'>
                        <table className='table-main'>
                            <thead>
                                <tr>
                                    <th className='table-head-cell'>Date</th>
                                    <th className='table-head-cell'>Serial Number</th>
                                    <th className='table-head-cell'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='table-data-cell'>15/05/2023</td>
                                    <td className='table-data-cell'>PINV-2</td>
                                    <td className='table-data-cell'>800.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='button-position'>
                        <Button color='primary' className='save-update-button'>Update Payment</Button>
                    </div>
                </Form>
                <SendEmail open={emailOpen} toggleSidebar={toggleEmail} />
            </div>
        </Drawer>
    )
}

export default PaymentMode