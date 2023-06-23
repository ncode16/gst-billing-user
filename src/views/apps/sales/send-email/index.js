// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'
import './email.css'

import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap'
import { Select, message, Upload } from 'antd'
import { Option } from 'antd/es/mentions'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { Plus } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddDocumentNotes from '../document-notes/index'

const { Dragger } = Upload

const defaultValues = {
    email: '',
    contact: '',
    company: '',
    fullName: '',
    username: '',
    country: null
}

const toolbarOptions = [
    [{ 'header': [false, 2, 3, 4] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
];

const countryOptions = [
    { label: 'Australia', value: 'Australia' },
    { label: 'Bangladesh', value: 'Bangladesh' },
    { label: 'Belarus', value: 'Belarus' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'Canada', value: 'Canada' },
    { label: 'China', value: 'China' },
    { label: 'France', value: 'France' },
    { label: 'Germany', value: 'Germany' },
    { label: 'India', value: 'India' },
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'Israel', value: 'Israel' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Korea', value: 'Korea' },
    { label: 'Mexico', value: 'Mexico' },
    { label: 'Philippines', value: 'Philippines' },
    { label: 'Russia', value: 'Russia' },
    { label: 'South', value: 'South' },
    { label: 'Thailand', value: 'Thailand' },
    { label: 'Turkey', value: 'Turkey' },
    { label: 'Ukraine', value: 'Ukraine' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'United States', value: 'United States' }
]

const checkIsValid = data => {
    return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SendEmail = ({ open, toggleSidebar }) => {
    // ** States
    const [data, setData] = useState(null)
    const [plan, setPlan] = useState('basic')
    const [role, setRole] = useState('subscriber')
    const [selectedOption, setSelectedOption] = useState("");
    const [imageUrl, setImageUrl] = useState();

    // ** Store Vars
    const dispatch = useDispatch()

    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    // ** Function to handle form submit

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

    const text = <span><small>A UPI ID or VPA (Virtual Payment Address) is a unique ID that is used to make UPI payments in place of bank account details.<br />
        This UPI ID will be used to generate <b>Dynamic QR codesr</b> on the invoices and bills.</small></span>;

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [carbonCopy, setCarbonCopy] = useState(false)
    const [blindCarbonCopy, setBlindCarbonCopy] = useState(false)
    const [centeredModal, setCenteredModal] = useState(false)

    const handleCarbonCopy = () => {
        setCarbonCopy(true)
    }

    const handleBlindCarbonCopy = () => {
        setBlindCarbonCopy(true)
    }

    const handlePreviewTemplate = () => {
        setCenteredModal(!centeredModal)
    }

    const [documentNotesOpen, setDocumentNotesOpen] = useState(false)
    const toggleDocumentNotes = () => setDocumentNotesOpen(!documentNotesOpen)

    return (
        <Sidebar
            size='lg'
            open={open}
            title={
                <span className='add-item-heading-main-span'>
                    <span className='add-item-heading-span'>Send Email</span>
                    <span>
                        <Button color='primary' className='save-update-button'>Send Mail</Button>
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
                    <div className='basic-details-card main-form'>
                        <div className='basic-details-card-body'>
                            <div className='to-email'>
                                <Label className='basic-details-label'>To</Label>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {carbonCopy ? null : (<span className='cc-email' onClick={handleCarbonCopy}>CC</span>)}
                                    {blindCarbonCopy ? null : <span className='bcc-email' onClick={handleBlindCarbonCopy}>BCC</span>}
                                </div>
                            </div>
                            <Select mode='tags' style={{ width: '100%' }} placeholder='To' />
                            {carbonCopy ? <div className='send-email-field subject'>
                                <Label className='basic-details-label'>CC</Label>
                                <Select mode='tags' style={{ width: '100%' }} placeholder='CC' />
                            </div> : null}
                            {blindCarbonCopy ? <div className='send-email-field subject'>
                                <Label className='basic-details-label'>BCC</Label>
                                <Select mode='tags' style={{ width: '100%' }} placeholder='BCC' />
                            </div> : null}
                            <div className='send-email-field subject'>
                                <Label className='basic-details-label'>Subject</Label>
                                <Input type='text' placeholder='Subject' name='email_subject' className='vendor-name' />
                            </div>
                        </div>
                    </div>
                    <div className='basic-details-header'>
                        <h6 className='basic-details'>
                            <span className='basic-details-text'>Email Body</span>
                        </h6>
                        <a className='customer-link' onClick={toggleDocumentNotes}><FontAwesomeIcon icon={faPlusCircle} />Add/Select Template</a>
                    </div>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <div>
                                <Label className='basic-details-label'>Email Template</Label>
                                {/* <div>
                                    <Button color='primary'>Add Template</Button>
                                </div> */}
                                <Select
                                    style={{ width: '100%' }}
                                    dropdownRender={() => (
                                        <div>
                                            <Button color='primary' style={{ width: '100%' }}><Plus size={15} />Add New Template</Button>
                                        </div>
                                    )}
                                />
                               
                                <div className='email-template-text'>
                                    <span style={{ fontSize: '12px' }}>(Only available on web)</span>
                                    <a className='preview-template' onClick={handlePreviewTemplate}>Preview Template</a>

                                    </div>
                                    <div>

                                        <div className='field-down' style={{ marginTop: '5px' }}>
                                            <Label className='basic-details-label'>Email Footer:</Label>
                                            <ReactQuill style={{ height: '15%' }} placeholder='Email Footer' />
                                        </div>
                                       
                                    </div>

                                    <div>
                                    <div className='field-down' style={{ marginTop: '50px' }}>
                                            <Label className='basic-details-label email-body-label'>Email Footer:</Label>
                                            <ReactQuill style={{ height: '15%' }} placeholder='Email Footer' />
                                        </div>
                                    </div>

                                    <div>
                                    <div className='field-down' style={{ marginTop: '50px' }}>
                                            <Label className='basic-details-label email-footer-label'>Email Footer:</Label>
                                            <ReactQuill style={{ height: '15%' }} placeholder='Email Footer' />
                                        </div>
                                    </div>



                                    <Modal isOpen={centeredModal} toggle={handlePreviewTemplate} className='modal-dialog-centered'>
                                        <ModalHeader toggle={handlePreviewTemplate}>Mail Preview</ModalHeader>
                                        <ModalBody>
                                            <div className='basic-details-card'>
                                                <div className='basic-details-card-body'>
                                                    <p className='purchase-title'>Purchase from ABC Technologies</p>
                                                    <hr />
                                                    Hello <span style={{ fontWeight: 600 }}>Mahin,</span>
                                                    <p className='purchase-title'>Thank you for your business!</p>
                                                    <div>
                                                        <p className='pdf-attach'>Please find the PDF attached to this email.</p>
                                                        <p className='total-amount'>TOTAL AMOUNT</p>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div>
                                                                <p className='pdf-attach'>Invoice#</p>
                                                                <p className='pdf-attach'>Invoice Date</p>
                                                            </div>
                                                            <div>
                                                                <p className='pdf-attach'>PINV-2</p>
                                                                <p className='pdf-attach'>Invoice Date</p>
                                                            </div>
                                                        </div>
                                                        <Button color='primary'>View Document</Button>
                                                        <p className='pdf-attach'>If you have any questions, kindly reply all to this email</p>
                                                        <p className='purchase-title'>
                                                            <div>
                                                                <p>Regards,</p>
                                                                <strong>ABC Company</strong>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                </div>
                            
                            <div className='send-email-field'>
                                <Label className='basic-details-label email-attachments'>Upload Attachments</Label>
                                <div className='upload-header'>
                                    <Dragger className='dragger'>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                            banned files.
                                        </p>
                                    </Dragger>
                                    
                                </div>
                                <small className='file-upload-extra-detail-span'>*PDF Attachment will be sent along with the email by default.</small>
                            </div>
                        </div>
                    </div>
                </Form>
                <AddDocumentNotes documentNotesOpen={documentNotesOpen} toggleDocumentNotes={toggleDocumentNotes} />
                <div className='button-position'>
                    <Button color='primary' className='save-update-button'>Save & Update<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} /></Button>
                </div>
            </div>
        </Sidebar>
    )
}

export default SendEmail
