import React, { useEffect, useState } from 'react'
import { ChevronLeft, HelpCircle, ChevronDown, MoreVertical, Edit, Trash, Plus, Trash2, PlusCircle, Play } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import '../css/purchase.css'
import { Col, Row, Label, CardBody, Button, Badge, Table, InputGroup } from 'reactstrap'
import { Settings } from 'react-feather'
import { selectThemeColors } from '../../../../utility/Utils'
import { DatePicker, Input, Select, Tooltip, Checkbox, InputNumber, Collapse, Switch, Upload, Dropdown, Tag } from 'antd'
import { QuestionCircleFilled, DownOutlined, UploadOutlined } from '@ant-design/icons'
import { Option } from 'antd/es/mentions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateVendor from '../vendor/create'
import AddBank from '../bank/index'
import AddSignature from '../signature/index'
import DocumentSettings from '../../../../components/CommonForm/document-setting'
import AddProduct from '../product/create'
import { faInr, faArrowUpFromBracket, faCirclePlay, faCirclePlus, faPencil, faPlus, faArrowRight, faGear, faBuildingColumns, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getVendorForDifferentUser, getEditVendor } from '../../../../api/vendor/index'
import { listProduct } from '../../../../api/product/index'
import { Form } from 'react-bootstrap'
import '../media.css'

const { TextArea } = Input
const { Panel } = Collapse
const CreatePurchase = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const showItem = () => {
        if (show == false) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    const backToList = () => {
        navigate('/apps/purchases/list')
    }
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const [bankOpen, setBankOpen] = useState(false)
    const toggleBank = () => setBankOpen(!bankOpen)

    const [signatureOpen, setSignatureOpen] = useState(false)
    const toggleSignature = () => setSignatureOpen(!signatureOpen)

    const [documentOpen, setDocumentOpen] = useState(false)
    const toggleDocument = () => setDocumentOpen(!documentOpen)

    const [productOpen, setProductOpen] = useState(false)
    const toggleProduct = () => setProductOpen(!productOpen)

    const [tooltipOpen, setTooltipOpen] = useState(false)
    const [vendorList, setVendorList] = useState(false)
    const [getVendorId, setVendorId] = useState([])
    const [productData, setProductData] = useState([])
    const [getEditVendorId, setEditVendorId] = useState("");
    const [getVendorInfo, setVendorInfo] = useState({});



    const text = <span><small>Search your existing customers using the search box below.<br />
        Please click on <b>Add New vendor</b> to add a new customer.</small></span>;

    const productText = <span><small>Search your existing products using the search box below.<br />
        Please click on <b>Add New Product</b> to add a new product.</small></span>

    const extraDiscountTax = <span>Extra discount is directly deducted to the total invoice amount. It does not affect the <b>tax calculations</b>. To affect tax calculation give product level discount.</span>

    const bankText = <span><small>Select existing Bank details using the below dropdown.<br />
        Please click on <b>Add New Bank</b> to add new Bank details.</small></span>

    const selectBox = () => (
        <div className='notes-select'>
            <Select
                style={{ width: '290px' }}
                name="product_id"
                placeholder='Search or scan barcode for existing products'
            />
        </div>
    )

    const notesButton = () => (
        <div style={{ padding: '4px 4px 4px 4px' }}>
            <button className='add-notes-button'>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '4px' }} />
                <span>Add New Notes</span>
                <span className='pro-button'>PRO</span>
            </button>
        </div>
    )

    const termsButton = () => (
        <div>
            <Button color='primary' className='add-terms-button'>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '4px' }} />
                <span>Add New Terms</span>
                <span className='pro-button'>PRO</span>
            </Button>
        </div>
    )

    const getVendorData = async () => {
        await getVendorForDifferentUser().then((response) => {
            console.log('jjjjjjj', response);
            setVendorList(response?.data?.data)
        })
    }

    const getProductData = async () => {
        await listProduct().then((response) => {
            console.log('jjjjjjj', response);
            setProductData(response?.data?.data)
        })
    }

    const getVendorInfoHandler = (vendorId) => {
        setEditVendorId(vendorId);
        const getVendorDetail = getEditVendor(vendorId);
        getVendorDetail.then((response) => {
            console.log('get edit vendor data', response)
            if (response.status === 200) {
                setVendorInfo(response?.data?.data);
                toggleSidebar(true)
            }
        });
    };

    useEffect(() => {
        getVendorData()
        getProductData()
    }, [])

    const [discount, setDiscount] = useState(0)

    const handleDiscount = () => {
        setDiscount(discount)
    }

    return (
        <div className='card card-box'>
            <div className='purchase-top-title'>
                <h3 className='create-purchase-header'><ChevronLeft onClick={() => backToList()} />Create Purchase
                </h3>
                <div className='pinv-text'>
                    <span><Input type="text" value="PINV-" className='pinv-text' /></span>
                    <span><Input type="number" value="1" /></span>
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '4px' }}>
                <div className='purchase-without-gst' style={{ paddingLeft: '8px' }}>
                    <Checkbox>Create Purchase Without GST</Checkbox>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <a onClick={toggleDocument} className='settings-icon'><FontAwesomeIcon icon={faGear} style={{ marginRight: '8px', fontWeight: 900 }} />Settings</a>
                </div>
            </div>
            {/* <div className='form-check form-check-inline gst-checkbox'>
                <Input type='checkbox' defaultChecked id='basic-cb-checked' />
                <Label for='basic-cb-checked' className='form-check-label' style={{ marginRight: '680px' }}>
                    Create Purchase Without GST
                </Label>
                <div>
                    <button className='document-button'><Settings />Settings</button>
                </div>
            </div> */}
            <Form>
                <div className='purchase-card-box'>
                    <Row>
                        <Col className='mb-1' xl='4' md='6' sm='12'>
                            <h6 style={{ display: 'flex' }}>
                                <span className='vendor-label'>Select Vendor</span>
                                <span className='question-icon'>
                                    <Tooltip placement="top" title={text}>
                                        <QuestionCircleFilled />
                                    </Tooltip>
                                </span>
                                <button className='add-vendor' type='button' onClick={() => {
                                    toggleSidebar()
                                    setEditVendorId("")
                                }}>
                                    Add New Vendor?
                                </button>
                            </h6>
                            {/* <Select
                                style={{ width: '100%' }}
                                name="vendor_id"
                                placeholder='Search existing Vendors, Company Name, GSTIN, tags...'
                                dropdownRender={() => {
                                    {
                                        vendorData && vendorData.map((item) => {
                                            return (
                                                <div>
                                                    <div className='vendor-data'>
                                                        <span>{item?.vendor_name}</span>
                                                        <span className='vendor-amount'><FontAwesomeIcon icon={faInr} style={{ marginRight: '4px', fontSize: '12px' }} />0.00</span>
                                                    </div>
                                                    <Button color='primary' type='button' style={{ width: '100%' }} onClick={toggleSidebar}><Plus size={15} />Add New Vendor</Button>
                                                </div>

                                            )
                                        })
                                    }
                                }}
                            /> */}
                            <Form.Select placeholder='Search existing Vendors, Company Name, GSTIN, tags...' onClick={(e) => setVendorId((prev) => [...prev, Number(e.target.value)])}>
                                {vendorList && vendorList.map((item) => {
                                    return (
                                        <option value={item?.vendor_id}>{item?.vendor_name}</option>
                                    )
                                })}
                            </Form.Select>
                            {vendorList && vendorList.map((item) => {
                                return (
                                    <span className='vendor-span-name'>
                                        {getVendorId.includes(item?.vendor_id) && (<Tag closable onClick={() =>
                                            getVendorInfoHandler(
                                                item?.vendor_id
                                            )
                                        }>
                                            {item?.vendor_name}
                                        </Tag>)}
                                    </span>
                                    // <span className='vendor-tag'>
                                    //     <span className='vendor-for-user'>{item?.vendor_name}</span>
                                    //     <span className='vendor-close'><FontAwesomeIcon icon={faXmark} size={20} /></span>
                                    // </span>
                                )
                            })}
                            {/* <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                isClearable={false}
                            /> */}
                        </Col>
                        <Col className='mb-1 vendor-label-main' xl='4' md='6' sm='12'>
                            <div className='vendor-label-box'>
                                <Label className='vendor-label'>
                                    Purchase Date
                                </Label>
                                <DatePicker />
                            </div>
                            <div className='vendor-label-box'>
                                <h6 style={{ display: 'flex' }}>
                                    <span className='vendor-label'>Due Date</span>
                                    <span className='question-icon'>
                                        <Tooltip placement="top" title='The invoice due date is the date on which you expect to receive payment from your customer.'>
                                            <QuestionCircleFilled />
                                        </Tooltip>
                                    </span>
                                </h6>
                                <DatePicker />
                            </div>
                        </Col>
                        <Col className='mb-1' xl='4' md='6' sm='12'>
                            <h6 style={{ display: 'flex' }}>
                                <span className='vendor-label'>Reference</span>
                                <span className='question-icon'>
                                    <Tooltip placement="top" title='Reference is commonly used to save information like Purchase Order Number, Eway Bill Number, Sales Person names, Shipment Number etc...'>
                                        <QuestionCircleFilled />
                                    </Tooltip>
                                </span>
                            </h6>
                            <TextArea name='reference' placeholder='Any text, PO Number etc... (Optional)' className='reference-textarea' />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-1' xl='4' md='6' sm='12'>
                            <h6>
                                <span className='vendor-label'>Select Company Shipping Address</span>
                            </h6>
                            <Select
                                style={{ width: '100%' }}
                                name="vendor_id"
                            />
                            {/* <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                isClearable={false}
                            /> */}
                        </Col>
                        <Col className='mb-1' xl='4' md='6' sm='12'>
                            <div>
                                <Label className='vendor-label'>
                                    Supplier Invoice Date
                                </Label>
                                <DatePicker className='supplier-date' />
                            </div>
                        </Col>
                        <Col className='mb-1' xl='4' md='6' sm='12'>
                            <Label className='vendor-label'>
                                Supplier Invoice Serial No.
                            </Label>
                            <TextArea name='reference' placeholder='(Optional)' className='reference-textarea' />
                        </Col>
                    </Row>
                </div>
                <div className='show-checkbox'>
                    <div className='show-checkbox-box'>
                        <div className='show-checkbox-fild'>
                            <Checkbox />
                            <Label for='basic-cb-checked' className='form-check-label' style={{ marginLeft: '10px' }}>
                                Show description
                            </Label>
                        </div>
                        <div className='show-checkbox-fild show-items'>
                            <Checkbox />
                            <Label for='basic-cb-checked' className='form-check-label' style={{ marginLeft: '10px' }}>
                                Show items in reverse order
                            </Label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#86868b', marginRight: '15px' }}>
                            <Label for='basic-cb-checked' className='form-check-label'>
                                Change Discount Type
                            </Label>
                            <Dropdown placement='bottomRight' menu={{
                                items: [
                                    {
                                        key: '0',
                                        label: 'Price With Tax'
                                    },
                                    {
                                        key: '1',
                                        label: 'Unit Price'
                                    },
                                    {
                                        key: '2',
                                        label: 'Net Amount'
                                    },
                                    {
                                        key: '3',
                                        label: 'Total Amount'
                                    },
                                ]
                            }}>
                                <button type='button' className='down-arrow-btn'>
                                    <ChevronDown size={20} className='down-arrow' />
                                </button>
                            </Dropdown>
                            <span className='beta-tooltip'>
                                <Tooltip placement="top" title='This feature is in BETA. You can help us by reporting any issues by clicking the help button.'>
                                    BETA
                                </Tooltip>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='product-card-box'>
                    <Form style={{ display: 'flex' }}>
                        <Row>
                            <Col className='select-products'>
                                <h6 style={{ display: 'flex' }}>
                                    <span className='vendor-label'>Select Products</span>
                                    <span className='question-icon'>
                                        <Tooltip placement="top" title={productText}>
                                            <QuestionCircleFilled />
                                        </Tooltip>
                                    </span>
                                    <button className='add-vendor' type='button' onClick={toggleProduct}>Add New Product?</button>
                                </h6>
                                <div className='search-product'>
                                    <span className='search-existing-products'>
                                        <Select
                                            style={{ width: '450px' }}
                                            dropdownRender={() => (
                                                <div>
                                                    <Button color='primary' type='button' style={{ width: '100%' }} onClick={toggleProduct}><Plus size={15} />Add New Product</Button>
                                                </div>
                                            )}
                                        />
                                    </span>
                                    <span className='select-category'>
                                        <Select
                                            placeholder='Select Category'
                                        >
                                            <Option value='V1'>V1</Option>
                                            <Option value='V2'>V2</Option>
                                        </Select>
                                    </span>
                                </div>
                            </Col>
                            <Col>
                                <div className='quantity-bar'>
                                    <h6 className='vendor-label'>Quantity</h6>
                                    <InputNumber style={{ width: '135px' }} placeholder='Qty' />
                                </div>
                            </Col>
                            {/* <Col> */}
                            {/* </Col> */}
                        </Row>
                        <div className='add-to-bill-btn'>
                            <Button color='primary' className='bill-button'>
                                <Plus size={15} />
                                <span>Add to Bill</span>
                            </Button>
                        </div>
                    </Form>
                    <div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className='product-table-head'>Product Name</th>
                                    <th className='product-table-head'>Quantity</th>
                                    <th className='product-table-head'>Unit Price</th>
                                    <th className='product-table-head'>Price with Tax</th>
                                    <th className='product-table-head'>Discount (Total Amount)</th>
                                    <th className='product-table-head'>Net Amount</th>
                                    <th className='product-table-head'>Total</th>
                                    <th className='product-table-head'></th>
                                </tr>
                            </thead>
                            {productData.length > 0 ? productData.map((item) => {
                                return (
                                    <tbody className='product-table-body'>
                                        {/* <div className='table-expand'>
                                <div className='empty'>
                                    <div className='empty-image'>
                                        <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" style={{ height: '100%' }} />
                                    </div>
                                    <div style={{ color: '#1d1d1f' }}>
                                        <span style={{ fontSize: '19px', fontWeight: 500 }}>Search existing products to add to this list or add new product to get started! 🚀🚀🚀</span>
                                    </div>
                                    <div style={{marginTop: '16px'}}>
                                        <Button className='button-action' color='primary'>
                                            <Plus size={15} />
                                            <span className='align-middle'>Add New Product</span>
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
                                        <tr>
                                            <td>
                                                <a>
                                                    <span className='align-middle' style={{ fontWeight: 600 }}>{item?.item_name}</span>
                                                    <p style={{ margin: 0, padding: 0 }}>
                                                        <span style={{ fontSize: '10px', fontWeight: 600, color: 'green' }}>Avl Qty: {item?.opening_quantity}</span>
                                                    </p>
                                                </a>
                                            </td>
                                            <td style={{ display: 'flex' }}>
                                                <Input type="text" value="1" style={{ height: '30px' }} />
                                                <div><span>{item?.primary_unit.slice(0, 3)}</span></div>
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type='number'
                                                    value={item?.purchase_price}
                                                />
                                                {discount > 0 ? <div>aftre disc: {item?.purchase_price - item?.purchase_price * discount / 100}</div> : null}
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type='number'
                                                    value={item?.purchase_price}
                                                />
                                                {discount > 0 ? <div>aftre disc: {item?.purchase_price - item?.purchase_price * discount / 100}</div> : null}
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type='number'
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                />
                                            </td>
                                            <td>{item?.purchase_price * 2}.00</td>
                                            <td>{item?.purchase_price * 2}</td>
                                            <td>
                                                <button className='product-delete'><Trash2 size={12} /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }) :
                                <div className='table-expand'>
                                    <div className='empty'>
                                        <div className='empty-image'>
                                            <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" style={{ height: '100%' }} />
                                        </div>
                                        <div style={{ color: '#1d1d1f' }}>
                                            <span style={{ fontSize: '19px', fontWeight: 500 }}>Search existing products to add to this list or add new product to get started! 🚀🚀🚀</span>
                                        </div>
                                        <div style={{ marginTop: '16px' }}>
                                            <Button type='button' className='button-action' color='primary' onClick={toggleProduct}>
                                                <Plus size={15} />
                                                <span className='align-middle'>Add New Product</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Table>
                        <div className='table-footer'>
                            <Row>
                                <Col md="12" style={{ textAlign: 'right' }}>
                                    <div style={{ marginRight: '2px' }}>
                                        <span style={{ color: '#86868b', fontSize: '11px' }}>Items / Qty </span>
                                        <span style={{ color: '#86868b', fontSize: '11px' }}>0 / 0.000</span>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <h6 className='discount-font'>
                                        Apply discount(%) to all items?
                                        <span className='question-icon'>
                                            <Tooltip placement="top" title='This discount % will be applied to all products and overwrite any individual product discount.'>
                                                <QuestionCircleFilled />
                                            </Tooltip>
                                        </span>
                                    </h6>
                                    <div style={{ marginLeft: '8px', marginBottom: '8px' }}>
                                        <InputNumber style={{ border: '2px solid green' }} />
                                    </div>
                                </Col>
                                <Col md="8">
                                    <button className='additional-charges'><PlusCircle />Additional Charges</button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div>
                    <Row className='notes-row'>
                        <Col md='6'>
                            <Collapse collapsible='header' style={{ backgroundColor: '#f5f5f7' }}>
                                <Panel header={<div>Notes<span className='notes-icon'>
                                    <Tooltip placement="top" title='For the same notes to reflect on all invoices, fill in the notes in Settings --> Notes and Terms --> Customer notes'>
                                        <QuestionCircleFilled />
                                    </Tooltip>
                                </span></div>} key="1" extra={selectBox()}>
                                    <TextArea name='reference' placeholder='Notes' rows={4} />
                                </Panel>
                            </Collapse>
                            <div style={{ marginBottom: '24px', marginTop: '24px' }}>
                                <Collapse collapsible='header' style={{ backgroundColor: '#f5f5f7' }}>
                                    <Panel header={<div>Terms & Conditions<span className='notes-icon'>
                                        <Tooltip placement="top" title='For the same terms to reflect on all invoices, fill in the terms in Settings --> Notes and Terms --> Customer Terms and Conditions'>
                                            <QuestionCircleFilled />
                                        </Tooltip>
                                    </span></div>} key="1" extra={selectBox()}>
                                        <TextArea name='reference' placeholder='Terms And Condition' rows={4} />
                                    </Panel>
                                </Collapse>
                            </div>
                            <div style={{ marginBottom: '16px', marginTop: '24px' }}>
                                <h6 style={{ color: '#6e6e73' }}>
                                    Attach Files
                                    <span className='notes-icon'>
                                        <Tooltip placement="top" title='You can attach up to 3 files (3 MB each) to each transaction you create.'>
                                            <QuestionCircleFilled />
                                        </Tooltip>
                                    </span>
                                </h6>
                                <div>
                                    <Input type='file' multiple style={{ display: 'none' }} />
                                    <div>
                                        <Upload>
                                            <button className='attach-file-icon'><FontAwesomeIcon icon={faArrowUpFromBracket} style={{ color: '#6e6e73' }} /> Attached File (Max:3)</button>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className='total-card'>
                                <div className='total-card-body'>
                                    <Row className='total-row'>
                                        <Col md="12">
                                            <Row className='row'>
                                                <Col md="12" style={{ flexDirection: 'row-reverse', display: 'inline-flex' }}>
                                                    <span style={{ textAlign: 'right' }}>
                                                        <h6 className='extra-font'>
                                                            Extra Discount
                                                            <span className='notes-icon'>
                                                                <Tooltip placement="top" title={extraDiscountTax}>
                                                                    <QuestionCircleFilled />
                                                                </Tooltip>
                                                            </span>
                                                        </h6>
                                                        <InputNumber style={{ width: '200px', marginBottom: '8px' }} />
                                                        {/* <Select>
                                                        <Option value='%'>%</Option>
                                                        <Option value='₹'>₹</Option>
                                                    </Select> */}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='tax-amount-text' md="6" style={{ textAlign: 'left' }}>
                                            <h6 style={{ color: '#6e6e73' }}>Taxable Amount:</h6>
                                            <h6 style={{ color: '#6e6e73' }}>Total Tax</h6>
                                            <h6>
                                                <span style={{ color: '#6e6e73' }}>
                                                    Round Off
                                                    <Switch size="small" defaultChecked style={{ marginLeft: '8px' }} />
                                                </span>
                                            </h6>
                                            <h6 className='amount-text'>Total Amount:</h6>
                                            <h6 style={{ color: '#6e6e73' }}>Total Discount:</h6>
                                        </Col>
                                        <Col className='tax-amount-text' md="6" style={{ textAlign: 'right' }}>
                                            <h6>
                                                <span style={{ color: '#6e6e73' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ color: '#6e6e73', marginRight: '4px' }} />0
                                                </span>
                                            </h6>
                                            <h6>
                                                <span style={{ color: '#6e6e73' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ color: '#6e6e73', marginRight: '4px' }} />0.00
                                                </span>
                                            </h6>
                                            <h6>
                                                <span style={{ color: '#6e6e73' }}>
                                                    0.00
                                                </span>
                                            </h6>
                                            <h6>
                                                <span className='amount-text'>
                                                    <FontAwesomeIcon icon={faInr} style={{ marginRight: '4px' }} />0.00
                                                </span>
                                            </h6>
                                            <h6>
                                                <span style={{ color: '#6e6e73', fontWeight: '700' }}>
                                                    <FontAwesomeIcon icon={faInr} style={{ color: '#6e6e73', marginRight: '4px' }} />0.00
                                                </span>
                                            </h6>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{ marginBottom: '8px', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                                <h6 style={{ marginBottom: '0px', fontSize: '15px', color: '#1d1d1f' }}>
                                    <span style={{ color: '#6e6e73', fontWeight: '600', paddingLeft: '8px', marginRight: '8px' }}>
                                        Add payment (Payment Notes, Amount and Mode)
                                    </span>
                                </h6>
                            </div>
                            <div className='bank-card'>
                                <div className='bank-card-body'>
                                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                                        <h6>
                                            <span style={{ marginRight: '4px' }}>Select Bank</span>
                                            <span className='bank-icon'>
                                                <Tooltip placement="top" title={bankText}>
                                                    <QuestionCircleFilled />
                                                </Tooltip>
                                            </span>
                                        </h6>
                                        <button className='signature-button' type='button' onClick={toggleBank}>
                                            <br />
                                            <FontAwesomeIcon icon={faBuildingColumns} style={{ fontSize: '19px', marginRight: '8px' }} />
                                            <span style={{ display: 'inline-block', fontSize: '19px', fontWeight: 600 }}>Add Bank to Invoice (Optional)</span>
                                            <br />
                                            <br />
                                        </button>
                                        {/* <Select style={{ width: '100%' }}>
                                            <Option value='ICICI Bank'>ICICI Bank</Option>
                                            <Option value='IDBI Bank'>IDBI Bank</Option>
                                        </Select> */}
                                    </div>
                                    <div className='mark-as-text'>
                                        <span style={{ marginBottom: '16px', fontWeight: 500, float: 'right' }}>
                                            <Checkbox style={{ marginRight: '8px' }} />
                                            <span>Mark as fully paid</span>
                                        </span>
                                    </div>
                                    <div className='cash-filter'>
                                        <InputGroup>
                                            <Row style={{ marginRight: '-3px', marginLeft: '-3px' }}>
                                                <Col className='bank-column'>
                                                    <InputNumber style={{ width: '100%' }} placeholder='Enter Amount' />
                                                </Col>
                                                <Col className='bank-column'>
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value='UPT'>UPI</Option>
                                                        <Option value='Cash'>Cash</Option>
                                                    </Select>
                                                </Col>
                                                <Col className='bank-column'>
                                                    <Input placeholder='Notes like Advance Received, UTR Number etc..' style={{
                                                        height: '32px',
                                                        fontSize: '13px',
                                                        width: '220px'
                                                    }} />
                                                </Col>
                                            </Row>
                                        </InputGroup>
                                        <p style={{ color: '#6e6e73', fontSize: '14px', textAlign: 'right' }}>
                                            <span style={{ marginRight: '8px', marginLeft: '4px' }}>Balance Amount</span>
                                            <span style={{ marginRight: '8px' }}>
                                                <FontAwesomeIcon icon={faInr} style={{ fontSize: '12px', marginRight: '4px' }} />0.00
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <span style={{ marginBottom: '16px' }}>
                                            <Switch size="small" onClick={showItem} />
                                            <span style={{ color: '#3a3a3c', marginLeft: '5px' }}>TDS applicable ?</span>
                                            {show &&
                                                (<div className='tds-switch-sub-div'>
                                                    <Select className='tds-percent-select'>
                                                        <Option>abc</Option>
                                                        <Option>def</Option>
                                                        <Option>ghi</Option>
                                                        <Option>jkl</Option>
                                                        <Option>mno</Option>
                                                        <Option>pqr</Option>
                                                        <Option>stu</Option>
                                                        <Option>vwx</Option>
                                                    </Select>
                                                    <InputNumber disabled className='tds-input-num' />
                                                </div>)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '8px', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                                <h6 style={{ marginBottom: '0px' }}>
                                    <span style={{ color: '#6e6e73', fontWeight: '600', paddingLeft: '8px', marginRight: '8px', display: 'flex' }}>
                                        Select Signature
                                        <span>
                                            <Tooltip placement='right' title='Watch Full Demo'>
                                                <FontAwesomeIcon icon={faCirclePlay} style={{ marginLeft: '5px', color: '#fd3995', marginTop: '2px' }} />
                                            </Tooltip>
                                        </span>
                                    </span>
                                </h6>
                                <button type='button' className='add-signature-button' onClick={toggleSignature}>
                                    <FontAwesomeIcon icon={faCirclePlus} style={{ marginRight: '5px' }} />
                                    <span>Add New Signature</span>
                                </button>
                            </div>
                            <div className='bank-card'>
                                <div className='bank-card-body'>
                                    <Row>
                                        <Col>
                                            <div style={{ marginBottom: '8px' }}>
                                                <button className='signature-button' type='button' onClick={toggleSignature}>
                                                    <br />
                                                    <FontAwesomeIcon icon={faPencil} style={{ fontSize: '19px', marginRight: '8px' }} />
                                                    <span style={{ display: 'inline-block', fontSize: '19px', fontWeight: 600 }}>Add Signature to Invoice (Optional)</span>
                                                    <br />
                                                    <br />
                                                </button>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <h6>Signature on the document</h6>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    <div className='save-button-border'>
                        <div style={{ padding: '19px 22px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ marginLeft: 'auto', float: 'right', display: 'flex' }}>
                                    <button className='save-print-button'>Save and Print</button>
                                    <Button color='primary' className='save-button'>Save <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '2px' }} /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            <CreateVendor
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
                getVendorInfo={getVendorInfo}
                getEditVendorId={getEditVendorId}
                setEditVendorId={setEditVendorId}
                setVendorInfo={setVendorInfo}
            />
            <AddBank open={bankOpen} toggleSidebar={toggleBank} />
            <AddSignature open={signatureOpen} toggleSidebar={toggleSignature} />
            <DocumentSettings open={documentOpen} toggleSidebar={toggleDocument} />
            <AddProduct open={productOpen} toggleSidebar={toggleProduct} />
        </div>
    )
}

export default CreatePurchase