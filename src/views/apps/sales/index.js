// ** React Imports
import { Fragment, useState } from 'react'
import './sales.css'
import { Play, Settings, Plus, Search } from 'react-feather'
// date picker package
import { DatePicker, Space, Drawer, Popover, Pagination, Dropdown, Popconfirm } from 'antd';
// import "antd/dist/antd.css";
// import { Popover, Button } from 'antd';
// ** Table Columns
import { data, reOrderColumns } from './data'
// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import ReactPaginate from 'react-paginate'
// Import navigate hook
import { useNavigate } from 'react-router-dom';
// import component
import SendEmail from './send-email';
import InvoiceDrawer from './drawer/rowDrawer';
import RecordPayment from './drawer/recordDrawer';
import PaymentMode from './drawer/paymentdrawer';
import CancelInvoice from './drawer/cancelInvoiceModal';
import PendingPopup from './drawer/pengingModel';


//react strap import
import { Row, Col } from 'react-bootstrap';

import DocumentSetting from './setting/document-setting';
// Font awesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faInr, faEye, faPaperPlane, faAngleDown, faPenToSquare, faClone, faReceipt, faFileSignature, faArrowUpFromBracket, faCircleMinus, faArrowDown, faInfoCircle, faFilter } from '@fortawesome/free-solid-svg-icons'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, TabContent, TabPane, Nav, NavItem, NavLink, Button, Input, InputGroup, InputGroupText, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { SupportAgent } from '@mui/icons-material';

const TabsBasic = () => {

    // Date picker variable
    const { RangePicker } = DatePicker;

    // declare navigate hook
    const navigate = useNavigate()
    // ** State
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    // ** States
    const [currentPage, setCurrentPage] = useState(0)
    const [show, setShow] = useState(false);

    const [emailOpen, setEmailOpen] = useState(false)
    const toggleEmail = () => setEmailOpen(!emailOpen)

    const showItem = () => {
        if (show == false) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    // const [recordPayment, setRecordPayment] = useState(false)
    // const toggleRecordPayment = () => setRecordPayment(!recordPayment)

    // const [click, setClick] = useState(true);
    // const drawerClose = () => {
    //     setClick(false)
    // }
    // const [openModel, setOpenModel] = useState({
    //     centeredModal: false,
    //     paymentModeDrawer: false
    // })



    const [openModel, setOpenModel] = useState({
        rowDrawerOpen: false,
        moreDetailOpen: false,
        rpButtonDrawerOpen: false,
        recordPayment: false,
        paymentModeDrawer: false,
        centeredModal: false,
        pendingPopupBar: false,
    })

    const recordDrawer = () => {

        setOpenModel((prev) => ({ ...prev, recordPayment: !openModel.recordPayment }))
    }
    const rowDrawer = (htmlElement) => {
        const buttonName = htmlElement.textContent;
        const buttonList=["View", "UPI", "TDS" , "paid", "Cash", "pending", "Send"]
        if (!buttonList.includes(buttonName)) {
            setOpenModel((prev) => ({ ...prev, rowDrawerOpen: !openModel.rowDrawerOpen }))
        }
    }

    const paymentModeModel = () => {
        setOpenModel((prev) => ({ ...prev, paymentModeDrawer: !openModel.paymentModeDrawer }))
    }

    const rowModel = () => {
        console.log("test")
        setOpenModel((prev) => ({ ...prev, centeredModal: !openModel.centeredModal }))
    }

    const openPending = () => {
        setOpenModel((prev) => ({ ...prev, pendingPopupBar: !openModel.pendingPopupBar }))
    }

    const viewButtonHandler = () => {
        setOpenModel((prev) => ({ ...prev, centeredModal: false }))
        console.log("view button handler")
    }


    // const contentDIV = (
    //     <div>
    //         <h6>Greeting from GeeksforGeeks.</h6>
    //         <h8>Work Hard!</h8>
    //     </div>
    // );










    // const [invoiceDatePopover, setInvoiceDatePopover] = useState(false);
    // const openInvoicePopover = () => {
    //     setInvoiceDatePopover(!invoiceDatePopover)
    // }

    // const [dueDatePopover, setDueDatePopover] = useState(false);
    // const openDuePopover = () => {
    //     setDueDatePopover(!dueDatePopover)
    // }

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
            label: <Popconfirm
                title={<p>
                    Hello!
                    <br />
                    Thank you for your purchase at HINDUSTAN COPPER LIMITED.
                    <br />
                    Invoice No: PINV-3
                    <br />
                    Total: Rs 1000
                    <br />
                    Link: https://swipe.pe/n/view/purchases/ozwxefaemx
                    <p className='copy-link'>Copy Link?</p>
                </p>}
                okText="Send SMS"
                cancelText="Close"
            >
                <a style={{ color: 'black', fontWeight: 600 }}><FontAwesomeIcon icon={faComments} style={{ marginRight: '8px', color: '#fc3654' }} />SMS</a>
            </Popconfirm>,
            key: '2',
        },
        {
            label: <a style={{ color: 'black', fontWeight: 600 }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '8px', color: '#6e6e73' }} />Copy link</a>,
            key: '3',
        },
    ];
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }
    // ** Custom Pagination
    // const CustomPagination = () => (
    // <ReactPaginate
    //     nextLabel=''
    //     breakLabel='...'
    //     previousLabel=''
    //     pageRangeDisplayed={2}
    //     forcePage={currentPage}
    //     marginPagesDisplayed={2}
    //     activeClassName='active'
    //     pageClassName='page-item'
    //     breakClassName='page-item'
    //     nextLinkClassName='page-link'
    //     pageLinkClassName='page-link'
    //     breakLinkClassName='page-link'
    //     previousLinkClassName='page-link'
    //     nextClassName='page-item next-item'
    //     previousClassName='page-item prev-item'
    //     pageCount={Math.ceil(data.length / 7) || 1}
    //     onPageChange={page => handlePagination(page)}
    //     containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    // />
    // )
    return (
        <div className='card p-2 mt-2'>
            <div className='head-div'>
                <h3 className='heading-sales'>Sales<span className='play-icon'><Play /></span></h3>
                <div className='purchase-header-button'>
                    <button className='settings' onClick={toggleSidebar}>
                        <span className='settings-icon'> <Settings size={15} /></span>
                        Document Settings</button>
                    <Button className='ms-2' color='primary' onClick={() => {
                        navigate('/apps/sales/invoice/create')
                    }} >
                        <Plus size={20} />
                        <span className='align-middle ms-50'>Create Invoice</span>
                    </Button>
                </div>
            </div>
            <Fragment>
                <Nav tabs className='tabs'>
                    <NavItem>
                        <NavLink
                            active={active === '1'}
                            onClick={() => {
                                toggle('1')
                            }}
                        >
                            All Transactions
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '2'}
                            onClick={() => {
                                toggle('2')
                            }}
                        >

                            Paid
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={active === '3'}
                            onClick={() => {
                                toggle('3')
                            }}>Pending</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '4'}
                            onClick={() => {
                                toggle('4')
                            }}
                        >
                            Cancelled
                        </NavLink>
                    </NavItem>
                </Nav>
                <div className='search-date'>
                    <InputGroup className='input-group-merge'>
                        <InputGroupText>
                            <Search size={14} />
                        </InputGroupText>
                        <Input placeholder='search faq...' className='form-control' />
                    </InputGroup>
                    <Space direction="vertical" size={12}>
                        <RangePicker className='ant-picker-1' />
                    </Space>
                </div>
                <TabContent className='py-50' activeTab={active}>
                    <TabPane tabId='1'>
                        <div style={{ marginTop: '8px', marginBottom: '24px' }}>
                            <Table responsive>
                                <thead className='table-head-list'>
                                    <tr>
                                        <th className='table-head'>Amount</th>
                                        <th className='table-head'>Status</th>
                                        <th className='table-head'>Mode</th>
                                        <th className='table-head'><span className='filter-span'><FontAwesomeIcon icon={faFilter} /></span>Bill # </th>
                                        <th className='table-head'><span className='filter-span'><FontAwesomeIcon icon={faFilter} /></span>Customer</th>
                                        {/* <th className='table-head'>Supplier Details</th> */}
                                        <th className='table-head'>Date/ <span style={{ fontSize: '8px' }}>Updated Time</span></th>
                                        <th className='table-head'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr onClick={(e) => rowDrawer(e.target)} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td className='table-data'>
                                            <span>
                                                <a className='purchase-amount'><FontAwesomeIcon icon={faInr} />800.00</a>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <Popover content={<div className='pending-popup-main-div'>
                                                <div className='pending-popup-greeting-div'>
                                                    <span className='exclamatory-svg'><FontAwesomeIcon icon={faInfoCircle} /></span>
                                                    <span>Hello</span>
                                                </div>
                                                <div className='pending-popup-greeting-message-div'>
                                                    <span className='pending-popup-greeting-message'>
                                                        This is a friendly reminder that you have a pending payment of Rs 41.80 under invoice no. INV-6
                                                    </span>
                                                </div>
                                                <div className='pending-payment-link-div'>
                                                    <span className='pending-payment-link'>
                                                        Pay: https://swipe.pe/n/view/sales/GxQkkiZdNJ
                                                    </span>
                                                </div>
                                                <div className='pending-payment-send-option-span'>
                                                    <span className='pending-payment-suggetion-span'>
                                                        -Sent using Swipe
                                                    </span>
                                                    <span className='pending-payment-send-btn'>
                                                        <button type='button' className='pending-payment-send-sms-btn'>Send on SMS</button>
                                                        <button type='button' className='pending-payment-send-whatsapp-btn'>Send on Whatsapp</button>
                                                        <button type='button' className='pending-payment-send-email-btn' onClick={toggleEmail}>Send on Email</button>
                                                    </span>

                                                </div>

                                            </div>}
                                                trigger="click"
                                            // title="Sample Popover Title"
                                            >
                                                <Button onClick={openPending} color='success' className='payment-status'>paid</Button>
                                            </Popover>


                                            {/* <Popover>

                                                <Button onClick={openPending} color='success' className='payment-status'>paid</Button>
                                            </Popover> */}
                                        </td>
                                        <td className='table-data'>
                                            <Button onClick={(e) => paymentModeModel(e.target)} color='success' className='payment-mode' >UPI</Button>
                                            {/* onClick={rpButtonDrawer} */}
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>PINV-2</span>
                                            <span style={{ color: '#6e6e73' }}>
                                                <p style={{ fontSize: '9px', marginBottom: '0px', marginTop: '0px' }}>Mahin Prajapati</p>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>ABC Technologies</span>
                                        </td>
                                        {/* <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>123456</span>
                                        </td> */}
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>04 Apr 2023</span>
                                            <span style={{ fontSize: '9px' }}>
                                                <p style={{ marginBottom: '0px', marginTop: '0px' }}>04 Apr 23, 12:52 PM</p>
                                            </span>
                                        </td>
                                        <td className='table-data last-td' style={{ textAlign: 'end' }}>
                                            <div style={{ display: 'flex' }}>
                                                <button type='button' className='record-payment-button' onClick={recordDrawer}>
                                                    <FontAwesomeIcon icon={faInr} className='inr-icon' />
                                                    <FontAwesomeIcon icon={faArrowDown} className='arrow-down-icon' />
                                                </button>
                                                <button className='view-button' onClick={() => viewButtonHandler()}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span style={{ marginLeft: '4px', display: 'inline' }}>View</span>
                                                </button>
                                                <Dropdown menu={{
                                                    items,
                                                }} trigger={['click']}>
                                                    <a>
                                                        <button className='send-button'>
                                                            <FontAwesomeIcon icon={faPaperPlane} />
                                                            <span style={{ marginLeft: '4px', display: 'inline' }}>Send</span>
                                                        </button>
                                                    </a>
                                                </Dropdown>
                                                <div className='action-icon'>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Edit</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Download</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Duplicate</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faReceipt} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Thermal Print</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faFileSignature} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Convert to Purchase Return</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span onClick={rowModel} className='align-middle' style={{ color: '#e11900' }}><FontAwesomeIcon icon={faCircleMinus} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Cancel Invoice</span>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='purchase-pagination'>
                                <Pagination defaultCurrent={1} total={85} defaultPageSize={100} />
                            </div>
                        </div>
                        <div className='total-main'>
                            <div className='total-down'>
                                <div style={{ backgroundColor: '#fff', paddingRight: '16px', paddingLeft: '16px', marginBottom: '8px' }}>
                                    <div className='demo'>
                                        <div className='total-card'>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Total</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#f3faf6', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Paid</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#fef8f3', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Pending</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>0.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <button type='button' className='breakdown-color' onClick={showItem}>View Total Breakdown</button>
                                    </div>
                                    {show ? <button className='cash-btn'><span className='cash-span'>Cash</span> ₹ 1005.00 </button> : null}

                                </div>
                            </div>
                        </div>
                    </TabPane>














                    <TabPane tabId='2'>
                        <div style={{ marginTop: '8px', marginBottom: '24px' }}>
                            <Table responsive>
                                <thead className='table-head-list'>
                                    <tr>
                                        <th className='table-head'>Amount</th>
                                        <th className='table-head'>Status</th>
                                        <th className='table-head'>Mode</th>
                                        <th className='table-head'>Bill #</th>
                                        <th className='table-head'>Customer</th>
                                        {/* <th className='table-head'>Supplier Details</th> */}
                                        <th className='table-head'>Date/ <span style={{ fontSize: '8px' }}>Updated Time</span></th>
                                        <th className='table-head'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td className='table-data'>
                                            <span>
                                                <a className='purchase-amount'><FontAwesomeIcon icon={faInr} />800.00</a>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-status'>paid</Button>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-mode'>UPI</Button>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>PINV-2</span>
                                            <span style={{ color: '#6e6e73' }}>
                                                <p style={{ fontSize: '9px', marginBottom: '0px', marginTop: '0px' }}>Mahin Prajapati</p>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>ABC Technologies</span>
                                        </td>
                                        {/* <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>123456</span>
                                        </td> */}
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>04 Apr 2023</span>
                                            <span style={{ fontSize: '9px' }}>
                                                <p style={{ marginBottom: '0px', marginTop: '0px' }}>04 Apr 23, 12:52 PM</p>
                                            </span>
                                        </td>
                                        <td className='table-data last-td' style={{ textAlign: 'end' }}>
                                            <div style={{ display: 'flex' }}>
                                                <button className='view-button'>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span style={{ marginLeft: '4px', display: 'inline' }}>View</span>
                                                </button>
                                                <Dropdown menu={{
                                                    items,
                                                }} trigger={['click']}>
                                                    <a>
                                                        <button className='send-button'>
                                                            <FontAwesomeIcon icon={faPaperPlane} />
                                                            <span style={{ marginLeft: '4px', display: 'inline' }}>Send</span>
                                                        </button>
                                                    </a>
                                                </Dropdown>
                                                <div className='action-icon'>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Edit</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Download</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Duplicate</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faReceipt} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Thermal Print</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faFileSignature} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Convert to Purchase Return</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ color: '#e11900' }}><FontAwesomeIcon icon={faCircleMinus} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Cancel Purchase</span>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='purchase-pagination'>
                                <Pagination defaultCurrent={1} total={85} defaultPageSize={100} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div style={{ backgroundColor: '#fff', paddingRight: '16px', paddingLeft: '16px', marginBottom: '8px' }}>
                                    <div className='demo'>
                                        <div className='total-card'>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Total</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#f3faf6', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Paid</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#fef8f3', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Pending</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>0.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <button type='button' className='breakdown-color' onClick={showItem}>View Total Breakdown</button>
                                    </div>
                                    {show ? <button className='cash-btn'><span className='cash-span'>Cash</span> ₹ 1005.00 </button> : null}

                                </div>
                            </div>
                        </div>
                    </TabPane>

















                    <TabPane tabId='3'>
                        <div style={{ marginTop: '8px', marginBottom: '24px' }}>
                            <Table responsive>
                                <thead className='table-head-list'>
                                    <tr>
                                        <th className='table-head'>Amount</th>
                                        <th className='table-head'>Status</th>
                                        <th className='table-head'>Mode</th>
                                        <th className='table-head'>Bill #</th>
                                        <th className='table-head'>Customer</th>
                                        {/* <th className='table-head'>Supplier Details</th> */}
                                        <th className='table-head'>Date/ <span style={{ fontSize: '8px' }}>Updated Time</span></th>
                                        <th className='table-head'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td className='table-data'>
                                            <span>
                                                <a className='purchase-amount'><FontAwesomeIcon icon={faInr} />800.00</a>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-status'>paid</Button>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-mode'>UPI</Button>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>PINV-2</span>
                                            <span style={{ color: '#6e6e73' }}>
                                                <p style={{ fontSize: '9px', marginBottom: '0px', marginTop: '0px' }}>Mahin Prajapati</p>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>ABC Technologies</span>
                                        </td>
                                        {/* <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>123456</span>
                                        </td> */}
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>04 Apr 2023</span>
                                            <span style={{ fontSize: '9px' }}>
                                                <p style={{ marginBottom: '0px', marginTop: '0px' }}>04 Apr 23, 12:52 PM</p>
                                            </span>
                                        </td>
                                        <td className='table-data last-td' style={{ textAlign: 'end' }}>
                                            <div style={{ display: 'flex' }}>
                                                <button className='view-button'>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span style={{ marginLeft: '4px', display: 'inline' }}>View</span>
                                                </button>
                                                <Dropdown menu={{
                                                    items,
                                                }} trigger={['click']}>
                                                    <a>
                                                        <button className='send-button'>
                                                            <FontAwesomeIcon icon={faPaperPlane} />
                                                            <span style={{ marginLeft: '4px', display: 'inline' }}>Send</span>
                                                        </button>
                                                    </a>
                                                </Dropdown>
                                                <div className='action-icon'>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Edit</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Download</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Duplicate</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faReceipt} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Thermal Print</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faFileSignature} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Convert to Purchase Return</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ color: '#e11900' }}><FontAwesomeIcon icon={faCircleMinus} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Cancel Purchase</span>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='purchase-pagination'>
                                <Pagination defaultCurrent={1} total={85} defaultPageSize={100} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div style={{ backgroundColor: '#fff', paddingRight: '16px', paddingLeft: '16px', marginBottom: '8px' }}>
                                    <div className='demo'>
                                        <div className='total-card'>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Total</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#f3faf6', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Paid</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#fef8f3', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Pending</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>0.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <button type='button' className='breakdown-color' onClick={showItem}>View Total Breakdown</button>
                                    </div>
                                    {show ? <button className='cash-btn'><span className='cash-span'>Cash</span> ₹ 1005.00 </button> : null}

                                </div>
                            </div>
                        </div>
                    </TabPane>




















                    <TabPane tabId='4'>
                        <div style={{ marginTop: '8px', marginBottom: '24px' }}>
                            <Table responsive>
                                <thead className='table-head-list'>
                                    <tr>
                                        <th className='table-head'>Amount</th>
                                        <th className='table-head'>Status</th>
                                        <th className='table-head'>Mode</th>
                                        <th className='table-head'>Bill #</th>
                                        <th className='table-head'>Customer</th>
                                        {/* <th className='table-head'>Supplier Details</th> */}
                                        <th className='table-head'>Date/ <span style={{ fontSize: '8px' }}>Updated Time</span></th>
                                        <th className='table-head'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td className='table-data'>
                                            <span>
                                                <a className='purchase-amount'><FontAwesomeIcon icon={faInr} />800.00</a>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-status'>paid</Button>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-mode'>UPI</Button>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>PINV-2</span>
                                            <span style={{ color: '#6e6e73' }}>
                                                <p style={{ fontSize: '9px', marginBottom: '0px', marginTop: '0px' }}>Mahin Prajapati</p>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>ABC Technologies</span>
                                        </td>
                                        {/* <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>123456</span>
                                        </td> */}
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>04 Apr 2023</span>
                                            <span style={{ fontSize: '9px' }}>
                                                <p style={{ marginBottom: '0px', marginTop: '0px' }}>04 Apr 23, 12:52 PM</p>
                                            </span>
                                        </td>
                                        <td className='table-data last-td' style={{ textAlign: 'end' }}>
                                            <div style={{ display: 'flex' }}>
                                                <button className='view-button'>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span style={{ marginLeft: '4px', display: 'inline' }}>View</span>
                                                </button>
                                                <Dropdown menu={{
                                                    items,
                                                }} trigger={['click']}>
                                                    <a>
                                                        <button className='send-button'>
                                                            <FontAwesomeIcon icon={faPaperPlane} />
                                                            <span style={{ marginLeft: '4px', display: 'inline' }}>Send</span>
                                                        </button>
                                                    </a>
                                                </Dropdown>
                                                <div className='action-icon'>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Edit</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Download</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Duplicate</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faReceipt} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Thermal Print</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ fontWeight: 600, color: '#1d1d1f' }}><FontAwesomeIcon icon={faFileSignature} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Convert to Purchase Return</span>
                                                            </DropdownItem>
                                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                                <span className='align-middle' style={{ color: '#e11900' }}><FontAwesomeIcon icon={faCircleMinus} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Cancel Purchase</span>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='purchase-pagination'>
                                <Pagination defaultCurrent={1} total={85} defaultPageSize={100} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div style={{ backgroundColor: '#fff', paddingRight: '16px', paddingLeft: '16px', marginBottom: '8px' }}>
                                    <div className='demo'>
                                        <div className='total-card'>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Total</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#f3faf6', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Paid</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>1,800.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ borderColor: '#e8e8ed', backgroundColor: '#fef8f3', borderRadius: '10px', border: '1px solid #f0f0f0', marginRight: '16px', marginBottom: '23px' }}>
                                            <div className='total-card-body'>
                                                <span style={{ color: '#3a3a3c', fontWeight: 500, marginRight: '8px' }}>Pending</span>
                                                <span style={{ color: '#000' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />
                                                    <span style={{ fontWeight: 600 }}>0.00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <button type='button' className='breakdown-color' onClick={showItem}>View Total Breakdown</button>
                                    </div>
                                    {show ? <button className='cash-btn'><span className='cash-span'>Cash</span> ₹ 1005.00 </button> : null}

                                </div>
                            </div>
                        </div>
                    </TabPane>
                </TabContent>



                <RecordPayment recordDrawer={recordDrawer} open={openModel.recordPayment} />
                <InvoiceDrawer rowDrawer={rowDrawer} open={openModel.rowDrawerOpen} />
                <DocumentSetting toggleSidebar={toggleSidebar} open={sidebarOpen} />
                <SendEmail toggleSidebar={toggleEmail} open={emailOpen} />
                <PaymentMode toggleSidebar={paymentModeModel} open={openModel.paymentModeDrawer} />
                <CancelInvoice toggleSidebar={rowModel} open={openModel.centeredModal} />
                {/* <PendingPopup toggleSidebar={openPending} open={openModel.pendingPopupBar}/> */}



            </Fragment>
        </div>
    )
}
export default TabsBasic
