// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Row, Col, Card, Button, InputGroup, InputGroupText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '../css/purchase.css'
import '../../../../@core/scss/react/libs/flatpickr/flatpickr.scss'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { data, reOrderColumns } from './data'
import ReactPaginate from 'react-paginate'
import { Play, Settings, Plus, Search, Filter } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import DocumentSettings from '../setting/document-setting'
import SendEmail from '../send-email/index'
import { DatePicker, Space, Pagination, Modal, Dropdown, Drawer, Collapse, Radio, Popconfirm, Tree } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faInr, faEye, faPaperPlane, faAngleDown, faPenToSquare, faClone, faReceipt, faFileSignature, faArrowUpFromBracket, faCircleMinus, faArrowDown, faFilter } from '@fortawesome/free-solid-svg-icons'
import '../media.css'
import { Form, FormCheck } from 'react-bootstrap'
import { CaretRightOutlined } from '@ant-design/icons';
import CancelPurchase from '../cancel-purchase/index'
import PaymentMode from '../modal/payment-mode'
import PurchaseDetail from '../modal/purchase-detail'
import RecordPayment from '../modal/record-payment'

const { Panel } = Collapse;

const PurchaseList = () => {
    // ** State
    const [active, setActive] = useState('1')
    const [open, setOpen] = useState(false);
    const { RangePicker } = DatePicker

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    const [currentPage, setCurrentPage] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const [emailOpen, setEmailOpen] = useState(false)
    const toggleEmail = () => setEmailOpen(!emailOpen)

    const [purchaseDetailOpen, setPurchaseDetailOpen] = useState(false)
    const togglePurchaseDetail = () => setPurchaseDetailOpen(!purchaseDetailOpen)

    const [recordPayment, setRecordPayment] = useState(false)
    const toggleRecordPayment = () => setRecordPayment(!recordPayment)

    const [openModel, setOpenModel] = useState({
        centeredModal: false,
        paymentModeDrawer: false,
        rowDrawerOpen: false,
    })

    const rowModel = () => {
        console.log("test")
        setOpenModel((prev) => ({ ...prev, centeredModal: !openModel.centeredModal }))
    }

    const paymentModeModel = () => {
        console.log("test")
        setOpenModel((prev) => ({ ...prev, paymentModeDrawer: !openModel.paymentModeDrawer }))
    }

    const navigate = useNavigate()
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    const handlePurchase = () => {
        navigate('/apps/purchases/create')
    }

    const CustomPagination = () => (
        <ReactPaginate
            nextLabel=''
            breakLabel='...'
            previousLabel=''
            pageRangeDisplayed={2}
            forcePage={currentPage}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            pageCount={Math.ceil(data.length / 7) || 1}
            onPageChange={page => handlePagination(page)}
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        />
    )

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
            label:
                <Popconfirm
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

    const [billFilterOpen, setBillFilterOpen] = useState(false);

    const handleMenuClick = (e) => {
        if (e.key === '5') {
            setBillFilterOpen(false);
        }
    };

    const handleOpenChange = (flag) => {
        setBillFilterOpen(flag);
    };

    const rowDrawer = (htmlElement) => {
        console.log(htmlElement.tagName, "tagName");
        const buttonName = htmlElement.textContent;
        const buttonList = [
            "View",
            "UPI",
            "TDS",
            "paid",
            "Cash",
            "pending",
            "Send",
            "SMS",
            "Send SMS",
            "Close",
            "Send SMS",
            "Whatsapp",
            "Email",
            "Copy link",
            "Edit",
            "Download",
            "Duplicate",
            "Thermal Print",
            "Convert to Sales Return",
            "Cancel Invoice",
        ];
        if (
            !buttonList.includes(buttonName) &&
            htmlElement.tagName !== "BUTTON" &&
            htmlElement.tagName !== "A" &&
            htmlElement.tagName !== "svg" &&
            htmlElement.tagName !== "DIV" &&
            htmlElement.tagName !== "path"
        ) {
            setOpenModel((prev) => ({
                ...prev,
                rowDrawerOpen: !openModel.rowDrawerOpen,
            }));
        }
    };

    return (
        <div className='card card-box'>
            <div className='purchase-button'>
                <h3 className='purchase-header'>Purchases<span className='play-icon'><Play /></span></h3>
                <div className='purchase-header-button'>
                    <button className='document-button' onClick={toggleSidebar}><Settings />Document Settings</button>
                    <Button className='ms-2' color='primary' onClick={() => handlePurchase()}>
                        <Plus size={15} />
                        <span className='align-middle ms-50'>Create Purchase</span>
                    </Button>
                </div>
            </div>
            <Fragment>
                <Nav tabs className='purchase-tab'>
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
                        <NavLink
                            active={active === '3'}
                            onClick={() => {
                                toggle('3')
                            }}
                        >
                            Pending
                        </NavLink>
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
                <div className='search-group'>
                    <InputGroup className='input-group-merge'>
                        <InputGroupText>
                            <Search size={14} />
                        </InputGroupText>
                        <Input placeholder='Search by transaction, customers, invoice#...' />
                    </InputGroup>
                    <Space direction="vertical" size={12}>
                        <RangePicker />
                    </Space>
                </div>
                <TabContent className='py-50' activeTab={active}>
                    <TabPane tabId='1'>
                        <div style={{ marginTop: '8px', marginBottom: '24px' }}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className='table-head'>Amount</th>
                                        <th className='table-head'>Status</th>
                                        <th className='table-head'>Mode</th>
                                        <th className='table-head new'>
                                            <div className='vendor-table-header'>
                                                <Dropdown
                                                    trigger='click'
                                                    menu={{
                                                        items: [
                                                            {
                                                                label: (<Form.Check type='checkbox' label='Cash' />),
                                                                key: '0'
                                                            },
                                                            {
                                                                label: (<Form.Check type='checkbox' label='Card' />),
                                                                key: '1'
                                                            },
                                                            {
                                                                label: (<Form.Check type='checkbox' label='Net banking' />),
                                                                key: '2'
                                                            },
                                                            {
                                                                label: (<Form.Check type='checkbox' label='UPI' />),
                                                                key: '3'
                                                            },
                                                            {
                                                                label:
                                                                    <div className='purchase-bill-filter'>
                                                                        <button type='button' className='bill-reset-filter-button'>Reset</button>
                                                                        <button type='button' className='bill-ok-filter-button'>Ok</button>
                                                                    </div>,
                                                                key: '4'
                                                            },
                                                        ],
                                                        onClick: handleMenuClick,
                                                    }}
                                                    open={billFilterOpen}
                                                    onOpenChange={handleOpenChange}
                                                >
                                                    <FontAwesomeIcon icon={faFilter} />
                                                </Dropdown>
                                                <span className='vendor-label-span'>Bill #</span>
                                            </div>
                                        </th>
                                        <th className='table-head'>
                                            <div className='vendor-table-header'>
                                                <FontAwesomeIcon icon={faFilter} />
                                                <span className='vendor-label-span'>Vendor</span>
                                            </div>
                                        </th>
                                        <th className='table-head'>Supplier Details</th>
                                        <th className='table-head'>Date/ <span style={{ fontSize: '8px' }}>Updated Time</span></th>
                                        <th className='table-head'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f0f0f0' }} className='purchase-table-row' onClick={(e) => rowDrawer(e.target)}>
                                        <td className='table-data'>
                                            <span>
                                                <a className='purchase-amount'><FontAwesomeIcon icon={faInr} />800.00</a>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <Button color='success' className='payment-status'>paid</Button>
                                        </td>
                                        <td className='table-data'>
                                            <Button type='button' className='payment-mode' onClick={paymentModeModel}>UPI</Button>
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
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>123456</span>
                                        </td>
                                        <td className='table-data'>
                                            <span style={{ color: '#1d1d1f', fontSize: '14px' }}>04 Apr 2023</span>
                                            <span style={{ fontSize: '9px' }}>
                                                <p style={{ marginBottom: '0px', marginTop: '0px' }}>04 Apr 23, 12:52 PM</p>
                                            </span>
                                        </td>
                                        <td className='table-data'>
                                            <div style={{ display: 'flex' }}>
                                                <button type='button' className='record-payment-button' onClick={toggleRecordPayment}>
                                                    <FontAwesomeIcon icon={faInr} className='inr-icon' />
                                                    <FontAwesomeIcon icon={faArrowDown} className='arrow-down-icon' />
                                                </button>
                                                <button type='button' className='view-button'>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span style={{ marginLeft: '4px', display: 'inline' }}>View</span>
                                                </button>
                                                <Dropdown menu={{
                                                    items,
                                                }} trigger={['click']}>
                                                    <a>
                                                        <button className='send-button' type='button' onClick={() => setPurchaseDetailOpen(false)}>
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
                                                                <span className='align-middle' style={{ color: '#e11900' }} onClick={rowModel}><FontAwesomeIcon icon={faCircleMinus} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Cancel Purchase</span>
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
                                        <p className='breakdown-color'>View Total Breakdown</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </TabContent>
                <TabContent className='py-50' activeTab={active}>
                    <TabPane tabId='2'>
                        <div>
                            <p>Paid content</p>
                        </div>
                    </TabPane>
                </TabContent>
                <DocumentSettings open={sidebarOpen} toggleSidebar={toggleSidebar} />
                <SendEmail open={emailOpen} toggleSidebar={toggleEmail} />
                <RecordPayment open={recordPayment} toggleSidebar={toggleRecordPayment} />
                <PurchaseDetail open={openModel.rowDrawerOpen} toggleSidebar={rowDrawer} />
                <CancelPurchase open={openModel.centeredModal} toggleSidebar={rowModel} />
                <PaymentMode open={openModel.paymentModeDrawer} toggleSidebar={paymentModeModel} />
            </Fragment>
        </div>
    )
}
export default PurchaseList
