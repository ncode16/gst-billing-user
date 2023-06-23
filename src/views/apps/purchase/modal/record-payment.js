import React,{useState} from 'react'
import { Drawer, Radio, Collapse } from 'antd'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInr } from '@fortawesome/free-solid-svg-icons'
import '../media.css'
import '../css/purchase.css'

const { Panel } = Collapse

const RecordPayment = ({open, toggleSidebar}) => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
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
                    <Collapse className='payment-details-collapse' bordered={false} defaultActiveKey={['1']}>
                        <Panel header={<span className='payment-details-header'>Payment Details</span>} key="1" className='payment-details-panel'>

                            <div className='discount-fild'>
                                <label>Amount to be Recorded (₹)</label>
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
                            <div className='bank-label'>
                                <label className='payment-type-label'>Bank</label>
                                <Form.Select>
                                    <option>ICICI Bank</option>
                                    <option>IDBI Bank</option>
                                </Form.Select>
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
                            <div className='vendor-sms'>
                                <label className='payment-type-label'>SMS to Vendors</label>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                />
                            </div>
                            <div className='vendor-email'>
                                <label className='payment-type-label'>E-mail to Vendors</label>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                />
                                <div className='total-amount-small-text'>
                                    <span className='email-small-text'>A E-Mail will be sent to the customer email:<span className='vendor-email-address'>prajapatimahin@gmail.com</span></span>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                    <div className='button-position'>
                        <Button color='primary' className='save-update-button'>Update Payment</Button>
                    </div>
                </Form>
            </div>
        </Drawer>
    )
}

export default RecordPayment