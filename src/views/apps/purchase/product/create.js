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
import { Button, Label, FormText, Row, Col } from 'reactstrap'

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'


// React strap import
import { Card, CardHeader, CardTitle, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// React Bootstrap import
import { InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { Heart } from 'react-feather'
import { addProduct } from '../../../../api/product/index'

// React Quill rich editor import
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../media.css'

// bottom toggle data
const { Panel } = Collapse;
const defaultValues = {
  item_name: '',
  item_type: '',
  sell_price: 0,
  tax: 0,
  is_price_with_tax: false,
  primary_unit: '',
  hsn_code: '',
  barcode: '',
  purchase_price: 0,
  product_image: '',
  description: '',
  opening_quantity: 0,
  opening_purchase_price: 0,
  opening_stock_value: 0,
  discount: 0,
  discount_amount: 0,
  show_discount_in: '',
  cess: 0,
  minimum_stock_quantity: 0,
  show_online: false,
  not_for_sale: false,
}

const CreateProduct = ({ open, toggleSidebar, }) => {
  // image upload state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])
  const [getImage, setImage] = useState("");

  // image upload data
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // const handleCancel = () => setPreviewOpen(false);
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  // };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const imageUploader = async (e) => {

    setImage(e.target.files[0]);
    // setPreviewImage(e.target.files[0]);
    const file = e.target.files[0];

    if (file.name.match(/\.(jpg|jpeg|png)$/)) {
      const base64 = await convertBase64(file);
      // setShowImage(base64);
      setImage(e.target.files[0]);

    } else {
      setImage("Invalid Image");
      return false;
    }
  };
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
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
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

  const showModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onSubmit = (data) => {
    console.log('fdfd', data)
    const formData = new FormData();
    formData.append('item_name', data.item_name);
    formData.append('item_type', data.item_type);
    formData.append('sell_price', Number(data.sell_price));
    formData.append('tax', data.tax);
    formData.append('is_price_with_tax', data.is_price_with_tax);
    formData.append('primary_unit', data.primary_unit);
    formData.append('hsn_code', data.hsn_code);
    formData.append('barcode', data.barcode);
    formData.append('purchase_price', data.purchase_price);
    formData.append('product_image', getImage);
    formData.append('description', data.description);
    formData.append('opening_quantity', Number(data.opening_quantity));
    formData.append('opening_purchase_price', Number(data.opening_purchase_price));
    formData.append('opening_stock_value', Number(data.opening_stock_value));
    formData.append('discount', Number(data.discount));
    formData.append('discount_amount', Number(data.discount_amount));
    formData.append('show_discount_in', data.show_discount_in);
    formData.append('cess', Number(data.cess));
    formData.append('minimum_stock_quantity', Number(data.minimum_stock_quantity));
    formData.append('show_online', data.show_online);
    formData.append('not_for_sale', data.not_for_sale);
    console.log('fsdfds', formData.get('item_name'))
    addProduct(formData).then((res) => {
      console.log('add-product', res)
      reset()
    }).catch((error) => {
      console.log('fdf', error?.response?.data?.message?.vendor_name?.message)
    })
  }

  return (

    <Sidebar
      size='lg'
      open={open}
      title={<span className='add-item-heading-main-span'><span className='add-item-heading-span'>Add Item</span><span><Button color='primary' className='add-item-btn'>Add Item</Button></span></span>}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
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
              <Form onSubmit={handleSubmit(onSubmit)}>
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
                      <InputGroup>
                        <Form.Control
                          type='text'
                          name='item_name'
                          placeholder='Enter Item Name'
                          {...register('item_name')}
                        />
                      </InputGroup>
                    </div>

                    <div className='selling-price-div'>
                      <Row>
                        <Col md='6' className='selling-price-col-1'>
                          <span className='text-dark selling-price-label'>Selling Price</span>
                          <InputGroup>
                            <Form.Control
                              type='number'
                              name='sell_price'
                              placeholder='Enter Selling Price'
                              className='selling-price-input'
                              {...register('sell_price')}
                            />
                            <Form.Select className='with-tax' {...register('is_price_with_tax')}>
                              <option value='with Tax'>with Tax</option>
                              <option value='without Tax'>without Tax</option>
                            </Form.Select>
                          </InputGroup>
                        </Col>
                        <Col md='6' className='selling-price-col-2'>
                          <button type='button' className='add-gst-num-btn' onClick={showModal} >
                            Add GST Number
                          </button>


                          <Modal isOpen={isOpenModal} toggle={showModal} className='modal-dialog-centered'>
                            <ModalHeader toggle={showModal} className='gst-modal-header'><span className='gst-modal-heading'>Add GSTIN</span></ModalHeader>
                            <ModalBody>
                              <InputGroup>
                                <Form.Control
                                  type='number'
                                  className='gst-num-input'
                                  placeholder='Enter 15 digit GSTIN'
                                />
                              </InputGroup>
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
                          <Form.Select allowClear {...register('primary_unit')}>
                            <option value='OTH OTHERS'>OTH OTHERS</option>
                            <option value='PCS PIECES'>PCS PIECES</option>
                            <option value='NOS NUMBERS'>NOS NUMBERS</option>
                            <option value='KGS KILOGRAMS'>KGS KILOGRAMS</option>
                            <option value='UNT UNITS'>UNT UNITS</option>
                            <option value='BOX BOX'>BOX BOX</option>
                            <option value='LTR LITRE'>LTR LITRE</option>
                            <option value='PAC PACKS'>PAC PACKS</option>
                            <option value='EACH EACH'>EACH EACH</option>
                            <option value='MTR METERS'>MTR METERS</option>
                            <option value='SET SETS'>SET SETS</option>
                            <option value='SQF SQUARE FEET'>SQF SQUARE FEET</option>
                            <option value='POCH POUCH'>POCH POUCH</option>
                            <option value='BTL BOTTLES'>BTL BOTTLES</option>
                            <option value='BAG BAGS'>BAG BAGS</option>
                            <option value='CASE CASE'>CASE CASE</option>
                            <option value='LAD LADI'>LAD LADI</option>
                            <option value='JAR JARS'>JAR JARS</option>
                            <option value='PET PETI'>PET PETI</option>
                            <option value='FT FEET'>FT FEET</option>
                            <option value='GMS GRAMS'>GMS GRAMS</option>
                            <option value='TBS TABLETS'>TBS TABLETS</option>
                            <option value='STRP STRIPS'>STRP STRIPS</option>
                            <option value='ROL ROLLS'>ROL ROLLS</option>
                            <option value='COIL COIL'>COIL COIL</option>
                            <option value='DOZ DOZEN'>DOZ DOZEN</option>
                            <option value='QTL QUINTAL'>QTL QUINTAL</option>
                            <option value='PRS PAIRS'>PRS PAIRS</option>
                            <option value='NONE NONE'>NONE NONE</option>
                            <option value='BOR BORA'>BOR BORA</option>
                            <option value='PAIR PAIR'>PAIR PAIR</option>
                            <option value='DAY DAYS'>DAY DAYS</option>
                            <option value='MTS METRIC TON'>MTS METRIC TON</option>
                            <option value='SQM SQUARE METERS'>SQM SQUARE METERS</option>
                            <option value='CTN CARTONS'>CTN CARTONS</option>
                            <option value='LOT LOT'>LOT LOT</option>
                            <option value='PLT PLATES'>PLT PLATES</option>
                            <option value='TON TONNES'>TON TONNES</option>
                            <option value='PERSON PERSONS'>PERSON PERSONS</option>
                            <option value='MTH MONTH'>MTH MONTH</option>
                            <option value='SHEETS SHEETS'>SHEETS SHEETS</option>
                            <option value='CAN CANS'>CAN CANS</option>
                            <option value='BDL BUNDLES'>BDL BUNDLES</option>
                            <option value='COPY COPY'>COPY COPY</option>
                            <option value='MLT MILLILITRE'>MLT MILLILITRE</option>
                            <option value='IN INCHES'>IN INCHES</option>
                            <option value='TIN TIN'>TIN TIN</option>
                            <option value='KIT KIT'>KIT KIT</option>
                            <option value='PAD PAD'>PAD PAD</option>
                            <option value='CPS CAPSULES'>CPS CAPSULES</option>
                            <option value='HRS HOURS'>HRS HOURS</option>
                            <option value='KME KILOMETRE'>KME KILOMETRE</option>
                            <option value='MLG MILLIGRAM'>MLG MILLIGRAM</option>
                            <option value='TUB TUBES'>TUB TUBES</option>
                            <option value='BARREL BARREL'>BARREL BARREL</option>
                            <option value='RFT RUNNING FOOT'>RFT RUNNING FOOT</option>
                            <option value='CBM CUBIC METER'>CBM CUBIC METER</option>
                            <option value='HEGAR HANGER'>HEGAR HANGER</option>
                            <option value='DRM DRUM'>DRM DRUM</option>
                            <option value='GLS GLASSES'>GLS GLASSES</option>
                            <option value='PRT PORTION'>PRT PORTION</option>
                            <option value='RMT RUNNING METER'>RMT RUNNING METER</option>
                            <option value='VIAL VIALS'>VIAL VIALS</option>
                            <option value='BCK BUCKETS'>BCK BUCKETS</option>
                            <option value='YRS YEARS'>YRS YEARS</option>
                            <option value='CFT CUBIC FOOT'>CFT CUBIC FOOT</option>
                            <option value='MAN_DAY MAN-DAYS'>MAN_DAY MAN-DAYS</option>
                            <option value='REEL REEL'>REEL REEL</option>
                            <option value='BUN BUNCHES'>BUN BUNCHES</option>
                            <option value='PATTA PATTA'>PATTA PATTA</option>
                            <option value='AMP AMPOULE'>AMP AMPOULE</option>
                            <option value='TKT TICKET'>TKT TICKET</option>
                            <option value='CTS CARATS'>CTS CARATS</option>
                            <option value='BLISTER BLISTER'>BLISTER BLISTER</option>
                            <option value='CCM CUBIC CENTIMETER'>CCM CUBIC CENTIMETER</option>
                            <option value='HOLES HOLES'>HOLES HOLES</option>
                            <option value='REAM REAM'>REAM REAM</option>
                            <option value='BRASS BRASS'>BRASS BRASS</option>
                            <option value='PADS PADS'>PADS PADS</option>
                            <option value='RIM RIM'>RIM RIM</option>
                            <option value='KW KILOWATT'>KW KILOWATT</option>
                            <option value='W WATT'>W WATT</option>
                            <option value='NIGHT NIGHTS'>NIGHT NIGHTS</option>
                            <option value='LINES LINES'>LINES LINES</option>
                            <option value='LGTH LENGTH'>LGTH LENGTH</option>
                            <option value='TRIP TRIP'>TRIP TRIP</option>
                            <option value='LPSM LUMPSUM'>LPSM LUMPSUM</option>
                            <option value='WDTH WIDTH'>WDTH WIDTH</option>
                            <option value='MINS MINUTES'>MINS MINUTES</option>
                            <option value='BAL BALE'>BAL BALE</option>
                            <option value='GRS GROSS'>GRS GROSS</option>
                            <option value='THD THOUSANDS'>THD THOUSANDS</option>
                            <option value='SAC SACHET'>SAC SACHET</option>
                            <option value='MM MILLIMETER'>MM MILLIMETER</option>
                            <option value='KLR KILOLITER'>KLR KILOLITER</option>
                            <option value='CUFT CUBIC FEET'>CUFT CUBIC FEET</option>
                            <option value='SEC SECONDS'>SEC SECONDS</option>
                            <option value='CMS CENTIMETER'>CMS CENTIMETER</option>
                            <option value='YDS YARDS'>YDS YARDS</option>
                            <option value='SQIN SQUARE INCHES'>SQIN SQUARE INCHES</option>
                            <option value='UGS US GALLONS'>UGS US GALLONS</option>
                            <option value='BOU BILLIONS OF UNITS'>BOU BILLIONS OF UNITS</option>
                            <option value='WEEK WEEKS'>WEEK WEEKS</option>
                            <option value='ANA AANA'>ANA AANA</option>
                            <option value='TGM TEN GROSS'>TGM TEN GROSS</option>
                            <option value='GGR GREAT GROSS'>GGR GREAT GROSS</option>
                            <option value='CHUDI CHUDI'>CHUDI CHUDI</option>
                            <option value='SQY SQUARE YARDS'>SQY SQUARE YARDS</option>
                            <option value='BKL BUCKLES'>BKL BUCKLES</option>
                            <option value='CNT CENTS'>CNT CENTS</option>
                            <option value='CFM CUBIC FEET PER MINUTE'>CFM CUBIC FEET PER MINUTE</option>
                            <option value='GYD GROSS YARDS'>GYD GROSS YARDS</option>
                          </Form.Select>
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
                          <span className='hsn-field bar-code-text'>
                            <InputGroup className='hsn-input-field'>
                              <Form.Control
                                type='text'
                                className='hsn-input'
                                placeholder='Enter HSN/sac Code'
                                {...register('hsn_code')}
                              />
                            </InputGroup>
                            <span className='ant-input-group-addon'>
                              <button
                                onClick={showChildrenDrawer}
                                type='button' className='hsn-btn'>Search HSN codes</button>
                            </span>
                          </span>
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
                            <Input placeholder='HSN/SAC Code (Optional) ' className='search-hsn-input' />

                            <Button color='primary' className='add-hsn-btn'>Use this HSN</Button>
                          </div>
                        </Drawer>

                        <Col md='6' className='additional-information-col-2'>
                          <span className='text-dark purchase-price-label-span'>Purchase Price</span>
                          <span className='purchase-price-input-main-span'>
                            <InputGroup>
                              <Form.Control
                                type='number'
                                className='purchase-price-input'
                                {...register('purchase_price')}
                              />
                            </InputGroup>
                            <span>
                              <Form.Select className='purchase-price-select' {...register('is_price_with_tax')}>
                                <option Selected value='without Tax'>without Tax</option>
                                <option value='with Tax'>with Tax</option>
                              </Form.Select>
                            </span>
                          </span>
                        </Col>
                      </Row>
                    </div>

                    <div className='barcode-category-main-div'>
                      <Row>
                        <Col md='6' className='barcode-category-col-1'>
                          <span className='text-dark barcode-label-span'>Barcode</span>
                          <span className='hsn-field sac-bar-code'>
                            <InputGroup className='hsn-input-field'>
                              <Form.Control
                                type='text'
                                className='barcode-input'
                                placeholder='2356897412'
                                {...register('barcode')}
                              />
                            </InputGroup>
                            <span>
                              <button type='button' className='barcode-btn'><FontAwesomeIcon className='barcode-icon' icon={faWandMagicSparkles} />Auto Generate</button></span></span>
                        </Col>

                        <Col md='6' className='barcode-category-col-2'>
                          <span className='text-dark category-label-span'>Category</span>
                          <Form.Select className='category-select' placeholder='Select Category'>
                            {/* <Option Selected value='without Tax'>without Tax</Option>
                                <Option value='with Tax'>with Tax</Option> */}
                          </Form.Select>
                        </Col>
                      </Row>
                    </div>

                    <div className='product-image-main-div'>
                      <span className='text-dark product-image-label-span'>Product Image</span>
                      <Form.Control type='file' {...register('product_image')} onChange={imageUploader}>

                      </Form.Control>
                      {/* <Upload
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
                          onChange={imageUploader}
                          {...register('product_image')}
                        />
                      </Modal> */}
                      <spna className='upload-image-extra-text'>&nbsp;Product images must be PNG or JPEG, recommended 1024<br /> &nbsp; px by 1024 px or 1:1 aspect ratio.</spna>
                    </div>

                    <div className='rich-editor-main-div'>

                      <span className='text-dark description-heading-span'>Description</span>
                      <div className='rich-edito-sub-div'>
                        <div>
                          <ReactQuill name='description' className='rich-editor-field' theme="snow" value={editor} onChange={setEditor} {...register('description')}/>
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
                          <InputGroup>
                            <Form.Control
                              type='number'
                              className='quantity-input'
                              placeholder='eg. 10'
                              {...register('opening_quantity')}
                            />
                          </InputGroup>
                        </Col>
                        <Col md='6' className='opening-perchase-col-2'>
                          <span className='text-dark opening-perchase-label-span'>Opening Purchase Price (with tax)</span>
                          <InputGroup>
                            <Form.Control
                              type='number'
                              className='perchase-input'
                              placeholder='eg. 100.00'
                              {...register('opening_purchase_price')}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                    </div>

                    <div className='opening-stock-div'>
                      <Row>
                        <Col md='6' className='opening-stock-col-1'>
                          <span className='text-dark opening-stock-label-span'>Opening Stock Value (with tax)</span>
                          <InputGroup>
                            <Form.Control
                              type='number'
                              className='stock-input'
                              placeholder='eg. 100.00'
                              {...register('opening_stock_value')}
                            />
                          </InputGroup>
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
                                <InputGroup>
                                  <Form.Control
                                    addonAfter='%'
                                    className='discount-percent-input'
                                    type="number"
                                    placeholder='0'
                                    name="document_color"
                                    {...register('discount')}
                                  />
                                </InputGroup>
                              </div>
                            </Col>

                            <Col md='6'>
                              <div className='discount-fild'>
                                <label>Discount Amount</label>
                                <InputGroup>
                                  <Form.Control
                                    addonAfter='₹'
                                    className='discount-percent-input'
                                    type="number"
                                    placeholder='0'
                                    name="document_color"
                                    {...register('discount_amount')}
                                  />
                                </InputGroup>
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
                                <span><b>Cess</b></span>
                                <InputGroup>
                                  <Form.Control
                                    type='number'
                                    className='low-stock-text-input'
                                    placeholder='eg. 10'
                                    {...register('cess')}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md='6' className='low-stock-col-1'>
                                <span><b>Low Stock Alert at</b></span>
                                <InputGroup>
                                  <Form.Control
                                    type='number'
                                    className='low-stock-text-input'
                                    placeholder='eg. 10'
                                    {...register('minimum_stock_quantity')}
                                  />
                                </InputGroup>
                                <span className='low-stock-information-span'>You will be notified once the stock reaches the minimum stock qty. (BETA)</span>
                              </Col>
                            </Row>
                          </div>

                          <div className='not-for-sale-main-div'>
                            <Row>
                              <Col md='6' className='low-stock-col-2'>
                                <span><b>Show in Online Store</b></span>
                                <Switch className='show-online-store-switch' size='default' {...register('show_online')} />
                                <span className='show-online-store-information-span'>Show or hide the product in catalogue/ online store</span>
                              </Col>
                              <Col md='6' className='not-for-sale-col-1'>
                                <span><b>Show in Online Store</b></span>
                                <Switch className='not-for-sale-switch' size='default' {...register('not_for_sale')} />
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
                <div className='button-position'>
                  <Button color='primary' className='save-update-button'>Add Item</Button>
                </div>
              </Form>

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
