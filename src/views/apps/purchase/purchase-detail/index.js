// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'

import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import { Select, message, Upload, Collapse } from 'antd'
import { Option } from 'antd/es/mentions'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { Plus } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowRight, faPenToSquare, faInr, faAngleDown } from '@fortawesome/free-solid-svg-icons'
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

const { Panel } = Collapse

const PurchaseDetail = ({ open, toggleSidebar }) => {
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
                    <span className='add-item-heading-span'>Purchase #PINV-3</span>
                    <span>
                        <Button color='primary' className='save-update-button'>Pending</Button>
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
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <Collapse>
                                <Panel header={<div>
                                    <div>
                                        <span>More<FontAwesomeIcon icon={faAngleDown} /></span>
                                    </div>
                                    <Row>
                                        <Col md='12'>
                                            <div>
                                                <span>ABC Technologies</span>
                                            </div>
                                            <div>
                                                <span>Purchase Date</span>
                                                <span>15-May-2023</span>
                                                <span><FontAwesomeIcon icon={faPenToSquare} /></span>
                                                <span>Due Date:</span>
                                                <span>15-May-2023</span>
                                                <span><FontAwesomeIcon icon={faPenToSquare} /></span>
                                            </div>
                                            <div>
                                                <h6>
                                                    <FontAwesomeIcon icon={faInr} />1,000.00
                                                </h6>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>}>

                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </Form>
                <AddDocumentNotes documentNotesOpen={documentNotesOpen} toggleDocumentNotes={toggleDocumentNotes} />
                <div className='button-position'>
                    <Button color='primary' className='save-update-button'>Send Mail</Button>
                </div>
            </div>
        </Sidebar>
    )
}

export default PurchaseDetail
