// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'

// ** Utils
import { selectThemeColors } from '../../../../utility/Utils'

// ** Third Party Components
// import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Input, Row, Col } from 'reactstrap'
import { Select, Collapse } from 'antd'
import { Option } from 'antd/es/mentions'
import { InputGroup, Form } from 'react-bootstrap'

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { Heart } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faInr } from '@fortawesome/free-solid-svg-icons'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'
import { CaretRightOutlined } from '@ant-design/icons';
import { addVendor } from '../../../../api/vendor/index'
import jwtDecode from 'jwt-decode'
import '../media.css'

const { Panel } = Collapse
// const { Option } = Select

const defaultValues = {
    vendor_name: '',
    vendor_country_code: '',
    vendor_phone: '',
    vendor_email: '',
    vendor_cc_emails: '{""}',
    gstin: '',
    company_name: '',
    billing_address: {
        address_line_one: '',
        address_line_two: '',
        city: '',
        state: '',
        pincode: '',
    },
    notes: '',
    tags: '',
    tds: false,
    tds_percentage: '',
    customer_id: 0,
    balance: '',
    vendor_debit_amount: null,
    vendor_credit_amount: null,
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
    // ** States
    const [data, setData] = useState(null)
    const [plan, setPlan] = useState('basic')
    const [role, setRole] = useState('subscriber')
    const [selectedOption, setSelectedOption] = useState("debit");
    const [tds, setTds] = useState(false);

    // ** Store Vars
    const dispatch = useDispatch()

    // ** Vars
    const {
        control,
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: "onChange",
        reValidateMode: "onChange",
    })

    // ** Function to handle form submit
    const onSubmit = (data) => {
        const decoded = localStorage.getItem('userDetails')
        const token = jwtDecode(decoded)
        const body = {
            vendor_name: data.vendor_name,
            vendor_phone: data.vendor_phone,
            vendor_country_code: data.vendor_country_code,
            vendor_email: data.vendor_email,
            vendor_cc_emails: data.vendor_cc_emails,
            gstin: data.gstin,
            company_name: data.company_name,
            billing_address: {
                address_line_one: data.billing_address.address_line_one,
                address_line_two: data.billing_address.address_line_two,
                city: data.billing_address.city,
                state: data.billing_address.state,
                pincode: data.billing_address.pincode,
            },
            notes: data.notes,
            tags: data.tags,
            tds: data.tds,
            tds_percentage: data.tds_percentage,
            customer_id: data.customer_id,
            balance: data.balance,
            vendor_debit_amount: data.vendor_debit_amount,
            vendor_credit_amount: data.vendor_credit_amount,
            user_id: token.user_id
        }
        console.log('fsdfds', data)
        addVendor(body).then((res) => {
            console.log('add-vendor', res)
            reset()
        }).catch((error) => {
            console.log('fdf', error?.response?.data?.message?.vendor_name?.message)
        })
    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            setValue(key, '')
        }
        setRole('subscriber')
        setPlan('basic')
    }

    const isDebit = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleTds = () => {
        if (tds === false) {
            setTds(true)
        } else {
            setTds(false)
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title={
                <span className='add-item-heading-main-span'>
                    <span className='add-item-heading-span'>Add Vendor</span>
                    <span>
                        <Button color='primary' className='save-update-button'>Save Vendor</Button>
                    </span>
                </span>
            }
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <div>
                <Form>
                    <div className='basic-details-header'>
                        <h6 className='basic-details'>
                            <span className='basic-details-text'>Basic Details</span>
                        </h6>
                        <a className='customer-link'><FontAwesomeIcon icon={faPlusCircle} />Link Customer</a>
                    </div>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <div>
                                <Label className='basic-details-label'><em>*</em> Name</Label>
                                <InputGroup>
                                    <Form.Control
                                        type='text'
                                        name='vendor_name'
                                        className='vendor-name'
                                        {...register('vendor_name', { required: true })}
                                    />
                                </InputGroup>
                                {errors.vendor_name && <span className='vendor-error'>Please Enter Vendor Name</span>}
                            </div>
                            <Row>
                                <Col md="6">
                                    <div className='vendor-phone-field'>
                                        <Label className='basic-details-label'>Phone</Label>
                                        <div style={{ display: 'flex' }} className='country-code'>
                                            <Form.Select name='vendor_country_code' className='country-code-select' {...register('vendor_country_code')} placeholder='Select State'>
                                                <option value='+91'>+91</option>
                                                <option value='+98'>+98</option>
                                                <option value='+94'>+94</option>
                                            </Form.Select>
                                            <div className='number-details'>
                                                <InputGroup>
                                                    <Form.Control
                                                        className='phone-number'
                                                        name='phone_number'
                                                        type='number'
                                                        {...register('vendor_phone')}
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div className='vendor-email-field'>
                                        <Label className='basic-details-label'>Email</Label>
                                        <InputGroup>
                                            <Form.Control
                                                type='text'
                                                name='vendor_email'
                                                placeholder='abc@gmail.com'
                                                className='vendor-name'
                                                {...register('vendor_email')}
                                            />
                                        </InputGroup>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <h6 className='company-details'>
                            <span className='basic-details-text'>Company Details</span>
                        </h6>
                    </div>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <Row>
                                <Col md="6">
                                    <Label className='basic-details-label'>Company</Label>
                                    <InputGroup>
                                        <Form.Control
                                            name='vendor_company'
                                            type='text'
                                            placeholder='ABC Technologies'
                                            className='vendor-name'
                                            {...register('company_name')}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md="6">
                                    <Label className='basic-details-label'>GSTIN</Label>
                                    <div className='gstin-details' style={{ display: 'flex' }}>
                                        <InputGroup>
                                            <Form.Control
                                                name='gstin'
                                                placeholder='27AADCB2230M1ZT'
                                                className='gstin'
                                                {...register('gstin')}
                                            />
                                        </InputGroup>
                                        <Button color='primary' className='fetch-details'>Fetch Details</Button>
                                    </div>
                                </Col>
                                <Col md="12" style={{ marginTop: '25px', marginBottom: '25px' }}>
                                    <Label className='basic-details-label'>Billing Address</Label>
                                    <Row>
                                        <Col md="6" className='billing-col'>
                                            <InputGroup>
                                                <Form.Control
                                                    name='vendor_address_one'
                                                    type='text'
                                                    placeholder='Address Line 1'
                                                    className='vendor-name'
                                                    {...register('billing_address.address_line_one')}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="6" className='billing-col'>
                                            <InputGroup>
                                                <Form.Control
                                                    name='vendor_address_two'
                                                    type='text'
                                                    placeholder='Address Line 2'
                                                    className='vendor-name'
                                                    {...register('billing_address.address_line_two')}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="6" className='billing-col'>
                                            <InputGroup>
                                                <Form.Control
                                                    name='city'
                                                    type='text'
                                                    placeholder='City'
                                                    className='vendor-name'
                                                    {...register('billing_address.city')}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="6" className='billing-col'>
                                            <Form.Select className='vendor-state' placeholder='Select State' {...register('billing_address.state')}>
                                                <option value='Gujarat'>Gujarat</option>
                                                <option value='Madhya Pradesh'>Madhya Pradesh</option>
                                                <option value='Rajasthan'>Rajasthan</option>
                                            </Form.Select>
                                        </Col>
                                        <Col md="6" className='billing-col'>
                                            <InputGroup>
                                                <Form.Control
                                                    name='pincode'
                                                    type='text'
                                                    placeholder='Pincode'
                                                    className='vendor-name'
                                                    {...register('billing_address.pincode')}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <h6 className='company-details'>
                            <span className='basic-details-text'>Optional Details</span>
                        </h6>
                    </div>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <Row>
                                <Col md='12'>
                                    <Label className='basic-details-label' style={{ marginTop: '15px' }}>Opening Balance</Label>
                                    <div style={{ display: 'flex', marginTop: '15px' }}>
                                        <div className='form-check debit-radio'>
                                            <input type='radio' id='ex1-active' name='ex1' value='debit' onChange={isDebit} defaultChecked />
                                            <Label className='form-check-label' for='ex1-active' style={{ marginLeft: '5px' }}>
                                                Debit
                                            </Label>
                                        </div>
                                        <div className='form-check'>
                                            <input type='radio' name='ex1' id='ex1-inactive' value='credit' onChange={isDebit} />
                                            <Label className='form-check-label' for='ex1-inactive' style={{ marginLeft: '5px' }}>
                                                Credit
                                            </Label>
                                        </div>
                                    </div>
                                    {selectedOption === "debit" ? <div style={{ marginTop: '25px' }}>
                                        <span className='debit-span'>
                                            <InputGroup>
                                                <Form.Control
                                                    type='text'
                                                    name='vendor_debit_amount'
                                                    placeholder='Enter Debit Amount'
                                                    className='debit-amount'
                                                    {...register('vendor_debit_amount', { valueAsNumber: true })}
                                                />
                                            </InputGroup>
                                            <div className='debit-div'>
                                                <label className='vendor-debit-label'>Vendor Pays You <FontAwesomeIcon icon={faInr} style={{ marginLeft: '4px', marginRight: '4px' }} /></label>
                                            </div>
                                        </span>
                                    </div> : <div style={{ marginTop: '25px' }}>
                                        <span className='debit-span'>
                                            <InputGroup>
                                                <Form.Control
                                                    type='text'
                                                    name='vendor_credit_amount'
                                                    placeholder='Enter Credit Amount'
                                                    className='debit-amount'
                                                    {...register('vendor_credit_amount', { valueAsNumber: true })}
                                                />
                                            </InputGroup>
                                            <div className='debit-div'>
                                                <label className='vendor-credit-label'>You pay the Vendor <FontAwesomeIcon icon={faInr} style={{ marginLeft: '4px', marginRight: '4px' }} /></label>
                                            </div>
                                        </span>
                                    </div>}
                                </Col>
                                <Col md='12'>
                                    <div style={{ marginTop: '25px' }}>
                                        <Label className='basic-details-label'>Balance</Label>
                                    </div>
                                    <InputGroup>
                                        <Form.Control
                                            type='number'
                                            disabled
                                            className='balance-disable'
                                            {...register('balance', { valueAsNumber: true })}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md='12'>
                                    <div style={{ marginTop: '25px' }}>
                                        <Label className='basic-details-label'>Linked Customer</Label>
                                    </div>
                                    <InputGroup>
                                        <Form.Control
                                            type='text'
                                            disabled
                                            className='balance-disable'
                                        />
                                    </InputGroup>
                                    <div className='change-customer'>
                                        <span style={{ fontSize: '11px' }}>Change Customer</span>
                                    </div>
                                </Col>
                                <Col md='6'>
                                    <div style={{ marginTop: '25px' }}>
                                        <Label className='basic-details-label'>TDS</Label>
                                        <div className='form-switch form-check-primary' style={{ marginLeft: '8px' }}>
                                            <Input type='switch' id='switch-primary' name='primary' onClick={handleTds} />
                                        </div>
                                        {tds && (<div>
                                            <label style={{ marginTop: '10px' }}>TDS Percentage</label>
                                            <Form.Select name='tds_percentage' className='tds-percentage' {...register('tds_percentage')}>
                                                <option value='10% 192A EPF premature withdrawal'>10% 192A EPF premature withdrawal</option>
                                            </Form.Select>
                                        </div>)}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className='more-details-section'>
                        <Collapse>
                            <Panel header={<div className='tags-text'><span>More Details?</span><p>Add CC Emails, Tags, Notes</p></div>} key="1">
                                <div className='discount-section'>
                                    <div className='discount-fild'>
                                        <label>Tags</label>
                                        <Form.Select className='react-select' {...register('tags')}>
                                            <option value='Afghanistan'>+91 Afghanistan</option>
                                            <option value='Afghanistan'>+91 Afghanistan</option>
                                        </Form.Select>
                                    </div>
                                    <div className='discount-fild'>
                                        <label>Notes</label>
                                        <InputGroup>
                                            <Form.Control
                                                as='textarea'
                                                name='reference'
                                                className='notes-textarea'
                                                placeholder='Notes'
                                                {...register('notes')}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className='discount-fild'>
                                        <label>CC Emails</label>
                                        <InputGroup>
                                            <Form.Control
                                                as='textarea'
                                                name='reference'
                                                className='notes-textarea'
                                                placeholder='Notes'
                                                {...register('notes')}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className='button-position'>
                        <Button color='primary' className='save-update-button' onClick={handleSubmit(onSubmit)}>Add Vendor</Button>
                        <button className='cancel-button'>Cancel</button>
                    </div>
                </Form>
            </div>
        </Sidebar>
    )
}

export default SidebarNewUsers
