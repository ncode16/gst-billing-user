// ** React Import
import { useState, Fragment } from 'react'
import './create.css'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'


// ** Utils
import { selectThemeColors } from '../../../../utility/Utils'

// ** Third Party Components

import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// antd imports
import { Tooltip, Radio, InputNumber, Select, Collapse, Input, Switch, Upload, Drawer } from 'antd'
import { Option } from 'antd/es/mentions'
import TextArea from 'antd/es/input/TextArea'
import { PlusOutlined } from '@ant-design/icons';


// ** Reactstrap Imports
import { Button, Label, FormText, Form, Row, Col } from 'reactstrap'

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'


// React strap import
import { Card, CardHeader, CardTitle, TabContent, TabPane, Nav, NavItem, NavLink, InputGroup, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { Heart } from 'react-feather'

// React Quill rich editor import
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



// bottom toggle data
const { Panel } = Collapse;
const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null
}

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







const CreateProduct = ({ open, sidebarToggle, }) => {
  // image upload state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])

  // image upload data
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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








  // ** States
  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')
  const [active, setActive] = useState('1')
  //GST modal State
  const [isOpenModal, setIsOpenModal] = useState(false)


  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  // const [modalOpen, setModalOpen] = useState(false)
  // const toggleModal = () => setModalOpen(!modalOpen)

  // React quill rich editor state
  const [editor, setEditor] = useState('');

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

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
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      sidebarToggle()
      dispatch(
        addUser({
          role,
          avatar: '',
          status: 'active',
          email: data.email,
          currentPlan: plan,
          billing: 'auto debit',
          company: data.company,
          contact: data.contact,
          fullName: data.fullName,
          username: data.username,
          country: data.country.value
        })
      )
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  const showModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (

    <Sidebar
      size='lg'
      open={open}
      title={<span className='add-item-heading-main-span'><span className='add-item-heading-span'>Add Item</span><span><Button color='primary' className='add-item-btn'>Add Item</Button></span></span>}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={sidebarToggle}
      onClosed={handleSidebarClosed}
    >
      <div className='details-sidebar-main-div'>

        <Fragment >
          <Nav tabs className='main-fragment'>
            <NavItem>
              <NavLink
                className='details-nav-link'
                active={active === '1'}
                onClick={() => {
                  toggle('1')
                }}
              >
                Details
              </NavLink>
            </NavItem>
            <Tooltip placement="right" title={<small>It will be enabled once created the product. Click on Add Item and then Edit to add attachments.</small>} >
              <NavItem className='attachment-nav-item'>
                <NavLink className='attachment-nav-link' disabled
                  active={active === '2'}
                  onClick={() => {
                    toggle('2')
                  }}
                >
                  Attachment
                </NavLink>
              </NavItem>
            </Tooltip>
            {/* <NavItem>
            <NavLink disabled
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}>Disabled</NavLink>
          </NavItem> */}
            {/* <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}
            >
              Account
            </NavLink>
          </NavItem> */}
          </Nav>
          <TabContent className='py-50 detail-tab-contain' activeTab={active}>
            <TabPane tabId='1'>
              <Form>
                <div className='details-tab-main-div'>
                  <div className='basic-detail-heading-div'>
                    <h5 className='basic-detail-heading'>Basic Detail</h5>
                    <h6 className='add-custom-field-heading'> <FontAwesomeIcon className='plus-circle' icon={faCirclePlus} />Add Custom field</h6>
                  </div>

                  <div className='add-product-form-main-div'>
                    <div className='radio-btn-div'>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">Product</Radio.Button>
                        <Radio.Button value="b">Service</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className='item-input-div'>
                      <span className='text-danger'>*</span><span className='text-dark'>Item Name</span>
                      <Input type='text' className='item-name-input' placeholder='Enter Item Name' />
                    </div>

                    <div className='selling-price-div'>
                      <Row>
                        <Col md='6' className='selling-price-col-1'>
                          <span className='text-dark selling-price-label'>Selling Price</span>
                          <InputNumber className='selling-price-input' />
                        </Col>
                        <Col md='6' className='selling-price-col-2'>
                          <button type='button' className='add-gst-num-btn' onClick={showModal} >
                            Add GST Number
                          </button>

                        
                          <Modal isOpen={isOpenModal} toggle={showModal} className='modal-dialog-centered'>
                            <ModalHeader toggle={showModal} className='gst-modal-header'><span className='gst-modal-heading'>Add GSTIN</span></ModalHeader>
                            <ModalBody>
                              <Input type='text' className='gst-num-input' placeholder='Enter 15 digit GSTIN'/>
                              <Button color='primary' className='add-gst-modal-btn' onClick={showModal}>
                               Add GSTIN
                              </Button>
                            </ModalBody>
                            {/* <ModalFooter className='gst-modal-footer'>
                           {' '}
                            </ModalFooter> */}
                          </Modal>
                       

                          <span><small>Add GST Details to add tax for the products.</small></span>
                        </Col>
                      </Row>
                    </div>
                    <div className='primary-unit-main-div'>
                      <Row>
                        <Col md='6' className='primary-unit-col-1'>
                          <span className='text-dark primary-unit-label'>Primary Unit</span>
                          <Select allowClear>
                            <Option value='jjhh'>OTH OTHERS</Option>
                            <Option>PCS PIECES</Option>
                            <Option>NOS NUMBERS</Option>
                            <Option>KGS KILOGRAMS</Option>
                            <Option>UNT UNITS</Option>
                            <Option>BOX BOX</Option>
                            <Option>LTR LITRE</Option>
                            <Option>PAC PACKS</Option>
                          </Select>
                          <small className='text-dark gst-extra-text'>GST approved UQC codes.</small>
                        </Col>
                      </Row>

                    </div>
                  </div>

                  <div className='additional-information-heading-div'>
                    <span className='additional-information-heading-span'>Additional Information</span>
                    <span className='optional-span'>OPTIONAL</span>
                  </div>



                  <div className='additional-information-main-div'>
                    <div className='opening-quantity-div'>
                      <Row>
                        <Col md='6' className='additional-information-col-1'>
                          <span className='text-dark hsn-code-label-span'>HSN/SAC Code</span>
                          <span><Input type='text' className='hsn-input' placeholder='Enter HSN/sac Code' />
                            <span className='ant-input-group-addon'>
                              <button
                                onClick={showChildrenDrawer}
                                type='button' className='hsn-btn'>Search HSN codes</button></span></span>
                          <span className='hsn-extra-information'>Click here to check GST approved HSN/SAC codes.</span>
                        </Col>
                        <Drawer
                          title={<span className='search-hsn-heading'>Search HSN</span>}
                          width={320}
                          closable={false}
                          onClose={onChildrenDrawerClose}
                          open={childrenDrawer}
                        >
                          <div className='ant-drawer-body-div'>
                          <Input placeholder='HSN/SAC Code (Optional) ' className='search-hsn-input'  />
                        
                          <Button color='primary' className='add-hsn-btn'>Use this HSN</Button>
                          </div>
                        </Drawer>

                        <Col md='6' className='additional-information-col-2'>
                          <span className='text-dark purchase-price-label-span'>Purchase Price</span>
                          <span className='purchase-price-input-main-span'>
                            <InputNumber className='purchase-price-input' />
                            <span>
                              <Select className='purchase-price-select'>
                                <Option Selected value='without Tax'>without Tax</Option>
                                <Option value='with Tax'>with Tax</Option>
                              </Select>
                            </span>
                          </span>
                        </Col>
                      </Row>
                    </div>

                    <div className='barcode-category-main-div'>
                      <Row>
                        <Col md='6' className='barcode-category-col-1'>
                          <span className='text-dark barcode-label-span'>Barcode</span>
                          <span><Input type='text' className='barcode-input' placeholder='2356897412' /><span><button type='button' className='barcode-btn'><FontAwesomeIcon className='barcode-icon' icon={faWandMagicSparkles} />Auto Generate</button></span></span>
                        </Col>

                        <Col md='6' className='barcode-category-col-2'>
                          <span className='text-dark category-label-span'>Category</span>
                          <Select className='category-select' placeholder='Select Category'>
                            {/* <Option Selected value='without Tax'>without Tax</Option>
                                <Option value='with Tax'>with Tax</Option> */}
                          </Select>
                        </Col>
                      </Row>
                    </div>

                    <div className='product-image-main-div'>
                      <span className='text-dark product-image-label-span'>Product Image</span>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 5 ? null : uploadButton}
                      </Upload>
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                          alt="example"
                          style={{
                            width: '100%',
                          }}
                          src={previewImage}
                        />
                      </Modal>
                      <spna className='upload-image-extra-text'>&nbsp;Product images must be PNG or JPEG, recommended 1024<br /> &nbsp; px by 1024 px or 1:1 aspect ratio.</spna>
                    </div>

                    <div className='rich-editor-main-div'>

                      <span className='text-dark description-heading-span'>Description</span>
                      <div className='rich-edito-sub-div'>
                        <div>
                          <ReactQuill className='rich-editor-field' theme="snow" value={editor} onChange={setEditor} />;
                        </div>
                      </div>
                    </div>

                  </div>



                  <div className='opening-stock-heading-div'>
                    <span className='opening-stock-heading-span'>Opening Stock</span>
                    <span className='optional-span'>OPTIONAL</span>
                  </div>

                  <div className='opening-stock-main-div'>
                    <div className='opening-quantity-div'>
                      <Row>
                        <Col md='6' className='opening-quantity-col-1'>
                          <span className='text-dark opening-quantity-label-span'>Opening Quantity</span>
                          <InputNumber className='quantity-input' placeholder='eg. 10' />
                        </Col>
                        <Col md='6' className='opening-perchase-col-2'>
                          <span className='text-dark opening-perchase-label-span'>Opening Purchase Price (with tax)</span>
                          <InputNumber className='perchase-input' placeholder='eg. 100.00' />
                        </Col>
                      </Row>
                    </div>

                    <div className='opening-stock-div'>
                      <Row>
                        <Col md='6' className='opening-stock-col-1'>
                          <span className='text-dark opening-stock-label-span'>Opening Stock Value (with tax)</span>
                          <InputNumber className='stock-input' placeholder='eg. 100.00' />
                        </Col>
                      </Row>

                    </div>
                  </div>
                  <div className='more-details-section'>
                    <Collapse>
                      <Panel header={<div className='tags-text'><span>More Details?</span><p>Cess, Discount, Show Online, Inventory tracking, Low stock alerts etc.</p></div>} key="1">
                        <div className='discount-section'>
                          <Row>
                            <Col md='6'>
                              <div className='discount-fild'>
                                <label>Discount(%)</label>
                                <InputNumber addonAfter='%' className='discount-percent-input' type="text" placeholder='0' name="document_color" />
                              </div>
                            </Col>

                            <Col md='6'>
                              <div className='discount-fild'>
                                <label>Discount Amount</label>
                                <InputNumber addonAfter='₹' className='discount-percent-input' type="text" placeholder='0' name="document_color" />
                              </div>
                            </Col>
                          </Row>
                          <div className='show-discount-main-div'>
                            <span><b>Show Discount in</b></span>
                            <Radio.Group>
                              <Radio value={1}><b>Percentage</b></Radio>
                              <Radio value={2}><b>Amount</b></Radio>
                            </Radio.Group>
                            <span className='discount-type-information-span'>Discount will be shown based on the selected option and is applicable only for online store.</span>
                          </div>

                          <div className='low-stock-main-div'>
                            <Row>
                              <Col md='6' className='low-stock-col-1'>
                                <span><b>Low Stock Alert at</b></span>
                                <Input type='text' className='low-stock-text-input' placeholder='eg. 10' />
                                <span className='low-stock-information-span'>You will be notified once the stock reaches the minimum stock qty. (BETA)</span>
                              </Col>

                              <Col md='6' className='low-stock-col-2'>
                                <span><b>Show in Online Store</b></span>
                                <Switch className='show-online-store-switch' size='default' />
                                <span className='show-online-store-information-span'>Show or hide the product in catalogue/ online store</span>
                              </Col>
                            </Row>
                          </div>

                          <div className='not-for-sale-main-div'>
                            <Row>
                              <Col md='6' className='not-for-sale-col-1'>
                                <span><b>Show in Online Store</b></span>
                                <Switch className='not-for-sale-switch' size='default' />
                                <span className='not-for-sale-information-span'>Hides the item for sale and shows only while making a purchase. eg. Office equipment</span>
                              </Col>
                              {/* <Col md='6' className='not-for-sale-col-2'>
                            
                            </Col> */}
                            </Row>

                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </Form>
              <div className='button-position'>
                <Button color='primary' className='save-update-button'>Add Item</Button>
              </div>

            </TabPane>

            <TabPane tabId='2'>
              <p>12345</p>
            </TabPane>
          </TabContent>
        </Fragment>
      </div>

    </Sidebar >



  )
}

export default CreateProduct
