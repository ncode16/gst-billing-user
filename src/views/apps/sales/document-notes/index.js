// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'
import './notes.css'


// ** Utils
import { selectThemeColors } from '../../../../utility/Utils'

// ** Third Party Components
// import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col, Tooltip, Nav, NavItem, NavLink, Modal, ModalHeader } from 'reactstrap'
import { Select, Collapse, Upload, message, Drawer, Tabs, Card, Empty } from 'antd'
import { Option } from 'antd/es/mentions'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { Heart, Plus } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faInr, faCircleInfo, faArrowRight, faSignature } from '@fortawesome/free-solid-svg-icons'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'
import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons';

const { Panel } = Collapse

const defaultValues = {
    email: '',
    contact: '',
    company: '',
    fullName: '',
    username: '',
    country: null
}

const AddDocumentNotes = ({ documentNotesOpen, toggleDocumentNotes }) => {
    // ** States
    const [data, setData] = useState(null)
    const [plan, setPlan] = useState('basic')
    const [role, setRole] = useState('subscriber')
    const [selectedOption, setSelectedOption] = useState("");
    const [imageUrl, setImageUrl] = useState();
    const [active, setActive] = useState('1')
    const [mode, setMode] = useState('top');
    const handleModeChange = (e) => {
        setMode(e.target.value);
    };
    const [invoiceNotes, setInvoiceNotes] = useState(false);
    const [invoiceTerms, setInvoiceTerms] = useState(false);
    const [purchaseNotes, setPurchaseNotes] = useState(false);
    const [purchaseTerms, setPurchaseTerms] = useState(false);
    const [quotationNotes, setQuotationNotes] = useState(false);
    const [quotationTerms, setQuotationTerms] = useState(false);
    const [emailTemplates, setEmailTemplates] = useState(false);

    const showInvoiceNotes = () => {
        setInvoiceNotes(true);
    };
    const onInvoiceNotesClose = () => {
        setInvoiceNotes(false);
    };

    const showInvoiceTerms = () => {
        setInvoiceTerms(true);
    };
    const onInvoiceTermsClose = () => {
        setInvoiceTerms(false);
    };

    const showPurchaseNotes = () => {
        setPurchaseNotes(true);
    };
    const onPurchaseNotesClose = () => {
        setPurchaseNotes(false);
    };

    const showPurchaseTerms = () => {
        setPurchaseTerms(true);
    };
    const onPurchaseTermsClose = () => {
        setPurchaseTerms(false);
    };

    const showQuotationNotes = () => {
        setQuotationNotes(true);
    };
    const onQuotationNotesClose = () => {
        setQuotationNotes(false);
    };

    const showQuotationTerms = () => {
        setQuotationTerms(true);
    };
    const onQuotationTermsClose = () => {
        setQuotationTerms(false);
    };

    const showEmailTemplates = () => {
        setEmailTemplates(true);
    };
    const onEmailTemplatesClose = () => {
        setEmailTemplates(false);
    };

    // ** Store Vars
    const dispatch = useDispatch()

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

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

    const tabList = [
        {
            key: 'invoiceNotes',
            tab: 'Invoice Notes',
        },
        {
            key: 'invoiceTerms',
            tab: 'Invoice Terms',
        },
        {
            key: 'purchaseNotes',
            tab: 'Purchase Notes',
        },
        {
            key: 'purchaseTerms',
            tab: 'Purchase Terms',
        },
        {
            key: 'quotationNotes',
            tab: 'Quotation Notes',
        },
        {
            key: 'quotationTerms',
            tab: 'Quotation Terms',
        },
        {
            key: 'emailTemplates',
            tab: 'Email Templates',
        },
    ];

    const contentList = {
        invoiceNotes:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Invoice Notes.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showInvoiceNotes}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Invoice Notes</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Invoice Notes</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onInvoiceNotesClose}
                            open={invoiceNotes}
                        >
                            <div className='basic-details-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Label:</Label>
                                            <Input type='text' name='invoice_label' className='vendor-name' placeholder='Label' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Notes:</Label>
                                            <TextArea name='invoice_notes' placeholder='Notes' rows={7} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>,
        invoiceTerms:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Invoice Terms.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showInvoiceTerms}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Invoice Terms</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Invoice Terms</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onInvoiceTermsClose}
                            open={invoiceTerms}
                        >
                            <div className='basic-details-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Label:</Label>
                                            <Input type='text' name='invoice_label' className='vendor-name' placeholder='Label' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Terms:</Label>
                                            <TextArea name='invoice_notes' placeholder='Terms' rows={7} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>,
        purchaseNotes:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Purchase Notes.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showPurchaseNotes}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Purchase Notes</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Purchase Notes</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onPurchaseNotesClose}
                            open={purchaseNotes}
                        >
                            <div className='basic-details-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Label:</Label>
                                            <Input type='text' name='invoice_label' className='vendor-name' placeholder='Label' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Notes:</Label>
                                            <TextArea name='invoice_notes' placeholder='Notes' rows={7} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>,
        purchaseTerms:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Purchase Terms.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showPurchaseTerms}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Purchase Terms</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Purchase Terms</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onPurchaseTermsClose}
                            open={purchaseTerms}
                        >
                            <div className='basic-details-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Label:</Label>
                                            <Input type='text' name='invoice_label' className='vendor-name' placeholder='Label' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Terms:</Label>
                                            <TextArea name='invoice_notes' placeholder='Notes' rows={7} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>,
        quotationNotes:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Quotation Notes.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showQuotationNotes}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Quotation Notes</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Quotation Notes</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onQuotationNotesClose}
                            open={quotationNotes}
                        >
                            <div className='basic-details-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Label:</Label>
                                            <Input type='text' name='invoice_label' className='vendor-name' placeholder='Label' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Notes:</Label>
                                            <TextArea name='invoice_notes' placeholder='Notes' rows={7} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>,
        quotationTerms:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Quotation Terms.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showQuotationTerms}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Quotation Terms</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Quotation Terms</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onQuotationTermsClose}
                            open={quotationTerms}
                        >
                            <div className='basic-details-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Label:</Label>
                                            <Input type='text' name='invoice_label' className='vendor-name' placeholder='Label' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Terms:</Label>
                                            <TextArea name='invoice_notes' placeholder='Terms' rows={7} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>,
        emailTemplates:
            <div>
                <div className='note-heading'>
                    <span className='note-text'>Note: Active fields will be shown in the Email Templates.</span>
                </div>
                <div className='empty-text'>
                    <div className='empty-normal'>
                        <div className='no-data'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div style={{ marginTop: '24px' }}>
                        <button type='button' className='footer-button' onClick={showEmailTemplates}>
                            <span className='plus'><Plus size={17} /></span>
                            <span className='button-name'>New Email Templates</span>
                        </button>
                        <Drawer
                            title={<span className='add-item-heading-main-span'>
                                <span className='add-item-heading-span'>Add/Edit Email Templates</span>
                                <span>
                                    <Button color='primary' className='save-update-button'>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                </span>
                            </span>}
                            width={548}
                            closable={false}
                            onClose={onEmailTemplatesClose}
                            open={emailTemplates}
                        >
                            <div className='basic-details-card document-notes-card'>
                                <div className='basic-details-card-body'>
                                    <Form>
                                        <div>
                                            <Label className='basic-details-label'>Template Name:</Label>
                                            <Input type='text' name='template_name' className='vendor-name' placeholder='Template Name' />
                                        </div>
                                        <div className='field-down'>
                                            <Label className='basic-details-label'>Email Header:</Label>
                                            <ReactQuill style={{ height: '15%' }} placeholder='Email Header' />
                                        </div>
                                        <div className='field-down' style={{ marginTop: '50px' }}>
                                            <Label className='basic-details-label'>Email Text:</Label>
                                            <ReactQuill style={{ height: '15%' }} placeholder='Email Text' />
                                        </div>
                                        <div className='field-down' style={{ marginTop: '50px' }}>
                                            <Label className='basic-details-label'>Email Footer:</Label>
                                            <ReactQuill style={{ height: '15%' }} placeholder='Email Footer' />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className='button-position save-btn'>
                                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                                <button className='button-close' type='submit'>Close</button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>
    };

    const [activeTabKey1, setActiveTabKey1] = useState('invoiceNotes');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };

    return (
        <Modal
            isOpen={documentNotesOpen}
            toggle={toggleDocumentNotes}
            className='sidebar-sm'
            modalClassName='modal-slide-in'
            contentClassName='pt-0'
            style={{ width: '48%' }}
        >
            <div>
                <ModalHeader>
                    <span className='add-item-heading-main-span'>
                        <span className='add-item-heading-span'>Document Notes</span>
                    </span>
                </ModalHeader>
            </div>
            <div>
                <div className='basic-details-card'>
                    <div className='basic-details-card-body'>
                        <Card
                            style={{
                                width: '100%',
                            }}
                            tabList={tabList}
                            activeTabKey={activeTabKey1}
                            onTabChange={onTab1Change}
                        >
                            {contentList[activeTabKey1]}
                        </Card>
                    </div>
                </div>
            </div>
            <div className='button-position'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
            </div>
        </Modal>
    )
}

export default AddDocumentNotes
