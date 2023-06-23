// ** React Import
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInr, faArrowUpFromBracket, faCirclePlay, faCirclePlus, faPencil, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ArrowRight } from 'react-feather'
import { DatePicker, Tooltip, Checkbox, InputNumber, Collapse, Switch, Upload, Drawer, Radio, Space } from 'antd'
import { Option } from 'antd/es/mentions'
// Email select tah import // react multi email select
import * as React from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import '../media.css'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'
import './add-customer.css'

// ** Utils
// import { selectThemeColors } from '../../../utility/Utils'

// ** Third Party Components
import Select from 'react-select'
// import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Row, Col, Input } from 'reactstrap'
import { Plus } from 'react-feather'
import { Heart } from 'react-feather'
//react bootstrape input
import { Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap'

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { BottomNavigation } from '@mui/material'
import TextArea from 'antd/es/input/TextArea'
import { Footer } from 'antd/es/layout/layout'
// billing-addres-management import
import { addBillingAddress, getBillingAddress, deleteBillingAddresss, getEditBillingAddressData, updateAddBillingAddressData } from '../../../../api/billingAddressManagement/index'
// Shipping-Address-management import
import { addShippingAddress, getEditShippingAddressDataRetrive, getShippingAddress, deleteShippingAddresss, updateAddShippingAddressData } from '../../../../api/shippingAddressManagement/index'
import { AddNewCustomerData, } from '../../../../api/addCustomerManagement/index'
import { Navigate, useParams } from 'react-router-dom'
// Token import
import jwt_decode from "jwt-decode";
import { SellOutlined } from '@mui/icons-material'
// tag input import
import { selectThemeColors } from '../../../../utility/Utils'
import { data } from 'jquery'


const { Panel } = Collapse

const selectBox = () => (
  <div className='notes-select'>
    <Select
      style={{ width: '290px' }}
      name="product_id"
      placeholder='Search or scan barcode for existing products'
    />
  </div>
)

// default value of billing address
const defaultValues_billing = {
  address_line_one: '',
  address_line_two: '',
  city: '',
  state: '',
  pincode: '',
  user_id: 0,
}
// default value of shipping address
const defaultValues_shipping = {
  address_line_one: '',
  address_line_two: '',
  city: '',
  state: '',
  pincode: '',
  notes: '',
  user_id: 0,
}

const defaultValues_customer = {
  customer_name: '',
  customer_country_code:'',
  customer_phone: '',
  customer_email: '',
  customer_cc_emails: '{""}',
  customer_gstin: '',
  customer_company: '',
  customer_debit_amount:0,
  customer_credit_amount:0,
  billing_address_id: '',
  shipping_address_id: '',
  discount: '',
  // tds: false,
  tds_percentage: '',
  notes: '',
  tags: '{""}',
  balance: '',
  user_id: 0,
}

const AddNewCustomer = ({ open, toggleCustomerForm,  }) => {
  // ** States

  // react multi email state
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);

  // billing address data retrive data state
  const [getEditBillingData, setGetEditBillingData] = useState({
    address_line_one: '',
    address_line_two: '',
    city: '',
    state: '',
    pincode: '',
    user_id: 0,
  })
  // shipping address data retrive data state
  const [getEditShippingAddressData, setGetEditShippingAddressData] = useState({
    address_line_one: '',
    address_line_two: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
    user_id: 0,
  })
  const [billingList, setBillingList] = useState([]);
  const [shippingList, setShippingList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')
  //Hide and Show tds form
  const [show, setShow] = useState(false);
  // debit-credit state
  const [selectedOption, setSelectedOption] = useState("debit");
  //billing address state
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  //Shipping address state
  const [isChildrenDrawer, setIsChildrenDrawer] = useState(false);

  // Copy address function
  // const copy = () => {
  //   setShippingList(billingList)
  // }

  // ** Store Vars
  const dispatch = useDispatch()
  const isDebit = (event) => {
    setSelectedOption(event.target.value);
  }
  // Tag input Option
  const colorOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
    { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
    { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
    { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
  ]
  // billing Function
  const showChildrenDrawer = () => {
    setLoading(true)
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  // shipping Function
  const showChildrenDrawerOpen = () => {
    setIsChildrenDrawer(true);
  };
  const showChildrenDrawerClose = () => {
    setIsChildrenDrawer(false);
  };

  // TDS Function
  const showItem = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  // ** Vars
  //Form-1 for Billing Address
  const {
    register: register1,
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    watch: watch1,
    formState: { errors1 }
  } = useForm({ defaultValues_billing })

  // Form - 2 for Shipping Address
  const {
    register: register2,
    setValue: setValue2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    watch: watch2,
    formState: { errors2 }
  } = useForm({ defaultValues_shipping })

  //Form -  Add New Customer

  const {
    register: register3,
    setValue: setValue3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    watch: watch3,
    formState: { errors3 }
  } = useForm({ defaultValues_customer })

  // Customer  data  Post

  const onSubmit3 = (data) => {
    console.log('customer data',data);
    const token = localStorage.getItem("userDetails");
    var decoded = jwt_decode(token);
    const body = {
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      customer_country_code:data.customer_country_code,
      customer_email: data.customer_email,
      customer_cc_emails: data.customer_cc_emails,
      customer_gstin: data.customer_gstin,
      customer_company: data.customer_company,
      customer_debit_amount:data.customer_debit_amount,
      customer_credit_amount:data.customer_credit_amount,
      billing_address_id: data.billing_address_id,
      shipping_address_id: data.shipping_address_id,
      discount: data.discount,
      // tds: data.tds,
      tds_percentage: data.tds_percentage,
      notes: data.notes,
      tags: data.tags,
      balance: data.balance,
      user_id: decoded.user_id,
    }
    AddNewCustomerData(body).then((res) => {
      console.log('hiiiii',res);
      toggleCustomerForm()
    })
  }




  //billing address api data listing function
  const getData = async () => {
    await getBillingAddress().then((response) => {
      setBillingList(response?.data?.data)
    })
    setLoading(false)
  }

  //shipping address api data listing function
  const getShippingData = async () => {
    await getShippingAddress().then((response) => {
      console.log('fdfdfd', response)
      setShippingList(response?.data?.data)
    })
    setLoading(false)
  }

  // 

  //billing address api data delete function
  const deleteData = (billing_address_id) => {
    deleteBillingAddresss(billing_address_id).then((response) => {
      console.log('dfdf', response)
      getData()
    })
  }

  //Shipping address api data delete function
  const deleteShippingData = (shipping_address_id) => {
    deleteShippingAddresss(shipping_address_id).then((response) => {
      console.log('dfdf', response)
      getShippingData()
    })
  }


  // billing address api data edit retrive function
  const getEditData = async (billing_address_id) => {
    await getEditBillingAddressData(billing_address_id).then((response) => {
      console.log('jjjjjjj', response);
      setGetEditBillingData(response?.data?.data)
      setValue1('billing_address_id', response?.data?.data?.billing_address_id)
      setValue1('address_line_one', response?.data?.data?.address_line_one)
      setValue1('address_line_two', response?.data?.data?.address_line_two)
      setValue1('city', response?.data?.data?.city)
      setValue1('state', response?.data?.data?.state)
      setValue1('pincode', response?.data?.data?.pincode)
    })
  }

  // shipping address api data edit retrive function
  const getEditShippingData = async (shipping_address_id) => {
    await getEditShippingAddressDataRetrive(shipping_address_id).then((response) => {
      console.log('jjjjjjj', response);
      setGetEditShippingAddressData(response?.data?.data)
      setValue2('shipping_address_id', response?.data?.data?.shipping_address_id)
      setValue2('address_line_one', response?.data?.data?.address_line_one)
      setValue2('address_line_two', response?.data?.data?.address_line_two)
      setValue2('city', response?.data?.data?.city)
      setValue2('state', response?.data?.data?.state)
      setValue2('pincode', response?.data?.data?.pincode)
      setValue2('notes', response?.data?.data?.notes)
    })
  }

  // ** Function to handle form submit for Billing Address
  const onSubmit1 = (data) => {
    console.log('gfgfgfg', data)
    setFlag(!flag)
    if (isEditMode) {
      const body = {
        billing_address_id: data.billing_address_id,
        address_line_one: data.address_line_one,
        address_line_two: data.address_line_two,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        user_id: data.user_id
      }
      updateAddBillingAddressData(data.billing_address_id, body).then((response) => {
        setChildrenDrawer(false);
      })
      setIsEditMode(false)
    } else {
      const token = localStorage.getItem("userDetails");
      var decoded = jwt_decode(token);
      const body = {
        address_line_one: data.address_line_one,
        address_line_two: data.address_line_two,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        user_id: decoded.user_id
      }
      addBillingAddress(body).then((res) => {
        setChildrenDrawer(false);
      })
    }
    reset1()
  }

  // ** Function to handle form submit for shipping Address
  const onSubmit2 = (data) => {
    console.log('gfgfgfg', data)
    setFlag(!flag)
    if (isEditMode) {
      const body = {
        shipping_address_id: data.shipping_address_id,
        address_line_one: data.address_line_one,
        address_line_two: data.address_line_two,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        notes: data.notes,
        user_id: data.user_id
      }
      updateAddShippingAddressData(data.shipping_address_id, body).then((response) => {
        setIsChildrenDrawer(false);
      })
      setIsEditMode(false)
    } else {
      const token = localStorage.getItem("userDetails");
      var decoded = jwt_decode(token);
      const body = {
        address_line_one: data.address_line_one,
        address_line_two: data.address_line_two,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        notes: data.notes,
        user_id: decoded.user_id
      }
      addShippingAddress(body).then((res) => {
        setIsChildrenDrawer(false);
      })
    }
    reset2()
  }



  const handleSidebarClosed = () => {
    for (const key in defaultValues_billing) {
      setValue1(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }


  useEffect(() => {
    getData();
    getShippingData();
  }, [flag]);


  return (
    <Sidebar
      size='lg'
      open={open}
      title={<span className='add-item-heading-main-span'>
        <span className='add-item-heading-span'>Add Customer</span>
        <span>
          <Button color='primary' className='save-update-button'>Save Customer</Button>
        </span>
      </span>}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleCustomerForm}
      onClosed={handleSidebarClosed}
    >

      <div>
        <Form>
          <div className='document-setting-text'>
            <div className='add-custom-text-box'>
              <div className='additional-text'>Basic Details</div>
              <div className='add-custom-fields'><a href='#'><span className='plus-icon'><Plus /></span>Add Custom fields</a></div>
            </div>


            <div className='card card-box'>
              <div className='document-prefixes'>
                <Row className='first-prefix-row'>
                  <Col md="12">
                    {/* <Label>Name</Label> */}
                    <Form.Label htmlFor="inputPassword5"><em>*</em>Name</Form.Label>
                    <InputGroup size="sm" className="mb-3">
                      {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
                      <Form.Control
                        className='name-input'
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        {...register3('customer_name')}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='first-prefix-row'>
                  <Col md="6" className='phone-col'>
                    <Form.Label htmlFor="inputPassword5">Phone</Form.Label>
                    <span> <div className='customer-phone'>
                      <Form.Select 
                      size="sm" 
                      className='react-select'
                      {...register3('customer_country_code')}
                      >
                        <option value='+93 Afghanistan'>+93 Afghanistan</option>
                        <option value='+355 Albania'>+355 Albania</option>
                        <option value='+213 Algeria'>+213 Algeria</option>
                        <option value='+376 Andorra'>+376 Andorra</option>
                        <option value='+244 Angola'>+244 Angola</option>
                        <option value='+1264 Anguilla'>+1264 Anguilla</option>
                        <option value='+1268 Antigua And Barbuda'>+1268 Antigua And Barbuda</option>
                        <option value='+54 Argentina'>+54 Argentina</option>
                        <option value='+297 Aruba'>+297 Aruba</option>
                        <option value='+61 Australia'>+61 Australia</option>
                        <option value='+43 Austria'>+43 Austria</option>
                        <option value='+973 Bahrain'>+973 Bahrain</option>
                        <option value='+880 Bangladesh'>+880 Bangladesh</option>
                        <option value='+1246 Barbados'>+1246 Barbados</option>
                        <option value='+375 Belarus'>+375 Belarus</option>
                        <option value='+32 Belgium'>+32 Belgium</option>
                        <option value='+501 Belize'>+501 Belize</option>
                        <option value='+229 Benin'>+229 Benin</option>
                        <option value='+1441 Bermuda'>+1441 Bermuda</option>
                        <option value='+975 Bhutan'>+975 Bhutan</option>
                        <option value='+591 Bolivia'>+591 Bolivia</option>
                        <option value='+267 Botswana'>+267 Botswana</option>
                        <option value='+55 Brazil'>+55 Brazil</option>
                        <option value='+246 British India Ocean Territory'>+246 British India Ocean Territory</option>
                        <option value='+673 Brunei'>+673 Brunei</option>
                        <option value='+359 Bulgaria'>+359 Bulgaria</option>
                        <option value='+226 Burkina Faso'>+226 Burkina Faso</option>
                        <option value='+257 Burundi'>+257 Burundi</option>
                        <option value='+855 Cambodia'>+855 Cambodia</option>
                        <option value='+237 Cameroon'>+237 Cameroon</option>
                        <option value='+1 Canada'>+1 Canada</option>
                        <option value='+1345 Cayman Island'>+1345 Cayman Island</option>
                        <option value='+236 Central African Republic'>+236 Central African Republic</option>
                        <option value='+235 Chad'>+235 Chad</option>
                        <option value='+56 Chile'>+56 Chile</option>
                        <option value='+86 China'>+86 China</option>
                        <option value='+57 Colombia'>+57 Colombia</option>
                        <option value='+269 Comoros'>+269 Comoros</option>
                        <option value='+682 Cook Island'>+682 Cook Island</option>
                        <option value='+506 Costa Rica'>+506 Costa Rica</option>
                        <option value='+53 Cuba'>+53 Cuba</option>
                        <option value='+357 Cyprus'>+357 Cyprus</option>
                        <option value='+420 Czech Republic'>+420 Czech Republic</option>
                        <option value='+45 Denmark'>+45 Denmark</option>
                        <option value='+253 Djibouti'>+253 Djibouti</option>
                        <option value='+1767 Dominica'>+1767 Dominica</option>
                        <option value='+1809 Dominican Republic'>+1809 Dominican Republic</option>
                        <option value='+670 East Timor'>+670 East Timor</option>
                        <option value='+670 East Timor'>+593 Ecuador</option>
                        <option value='+20 Egypt'>+20 Egypt</option>
                        <option value='+503 EI Salvador'>+503 EI Salvador</option>
                        <option value='+240 Equatorial Guinea'>+240 Equatorial Guinea</option>
                        <option value='+291 Eritrea'>+291 Eritrea</option>
                        <option value='+372 Estonia'>+372 Estonia</option>
                        <option value='+251 Ethiopia'>+251 Ethiopia</option>
                        <option value='+500 Falkland Island'>+500 Falkland Island</option>
                        <option value='+298 Faroe Island'>+298 Faroe Island</option>
                        <option value='+358 Finland'>+358 Finland</option>
                        <option value='+33 France'>+33 France</option>
                        <option value='+689 French Polynesia'>+689 French Polynesia</option>
                        <option value='+241 Gabon'>+241 Gabon</option>
                        <option value='+995 Georgia'>+995 Georgia</option>
                        <option value='+49 Germany'>+49 Germany</option>
                        <option value='+233 Ghana'>+233 Ghana</option>
                        <option value='+350 Gibraltar'>+350 Gibraltar</option>
                        <option value='+30 Greece'>+30 Greece</option>
                        <option value='+1473 Grenada'>+1473 Grenada</option>
                        <option value='+502 Guatemala'>+502 Guatemala</option>
                        <option value='+224 Guinea'>+224 Guinea</option>
                        <option value='+245 Guinea-Bissau'>+245 Guinea-Bissau</option>
                        <option value='+592 Guyana'>+592 Guyana</option>
                        <option value='+509 Haiti'>+509 Haiti</option>
                        <option value='+504 Honduras'>+504 Honduras</option>
                        <option value='+852 Hong Kong'>+852 Hong Kong</option>
                        <option value='+36 Hungary'>+36 Hungary</option>
                        <option value='+354 Iceland'>+354 Iceland</option>
                        <option value='+91 India'>+91 India</option>
                        <option value='+62 Indonesia'>+62 Indonesia</option>
                        <option value='+98 Iran'>+98 Iran</option>
                        <option value='+964 Iraq'>+964 Iraq</option>
                        <option value='+353 Ireland'>+353 Ireland</option>
                        <option value='+44 Isle of Man'>+44 Isle of Man</option>
                        <option value='+972 Israel'>+972 Israel</option>
                        <option value='+39 Italy'>+39 Italy</option>
                        <option value='+1876 Jamaica'>+1876 Jamaica</option>
                        <option value='+81 Japan'>+81 Japan</option>
                        <option value='+44 Jersey'>+44 Jersey</option>
                        <option value='+962 Jordan'>+962 Jordan</option>
                        <option value='+254 Kenya'>+254 Kenya</option>
                        <option value='+686 Kiribati'>+686 Kiribati</option>
                        <option value='+965 Kuwait'>+965 Kuwait</option>
                        <option value='+996 Kyrgyzstan'>+996 Kyrgyzstan</option>
                        <option value='+856 Laos'>+856 Laos</option>
                        <option value='+371 Latvia'>+371 Latvia</option>
                        <option value='+961 Lebanon'>+961 Lebanon</option>
                        <option value='+266 Lesotho'>+266 Lesotho</option>
                        <option value='+231 Liberia'>+231 Liberia</option>
                        <option value='+218 Libya'>+218 Libya</option>
                        <option value='+423 Liechtenstein'>+423 Liechtenstein</option>
                        <option value='+370 Lithuania'>+370 Lithuania</option>
                        <option value='+352 Luxembourg'>+352 Luxembourg</option>
                        <option value='+261 Medagascar'>+261 Medagascar</option>
                        <option value='+265 Malavi'>+265 Malavi </option>
                        <option value='+60 Malaysia'>+60 Malaysia</option>
                        <option value='+960 Maldives'>+960 Maldives</option>
                        <option value='+223 Mali'>+223 Mali</option>
                        <option value='+356 Malta'>+356 Malta</option>
                        <option value='+692 Marshall Island'>+692 Marshall Island</option>
                        <option value='+222 Mauritania'>+222 Mauritania</option>
                        <option value='+230 Mauritius'>+230 Mauritius</option>
                        <option value='+52 Mexico'>+52 Mexico</option>
                        <option value='+691 Micronesia'>+691 Micronesia</option>
                        <option value='+373 Moldova'>+373 Moldova</option>
                        <option value='+377 Monaco'>+377 Monaco</option>
                        <option value='+976 Mongolia'>+976 Mongolia</option>
                        <option value='+1664 Montserrat'>+1664 Montserrat</option>
                        <option value='+212 Morocco'>+212 Morocco</option>
                        <option value='+258 Mozambique'>+258 Mozambique</option>
                        <option value='+95 Myanmar'>+95 Myanmar</option>
                        <option value='+264 Namibia'>+264 Namibia</option>
                        <option value='+674 Nauru'>+674 Nauru</option>
                        <option value='+977 Nepal'>+977 Nepal</option>
                        <option value='+31 Netherland'>+31 Netherland</option>
                        <option value='+687 New Caledonia'>+687 New Caledonia</option>
                        <option value='+64 New Zealand'>+64 New Zealand</option>
                        <option value='+505 Nicaragua'>+505 Nicaragua</option>
                        <option value='+227 Niger'>+227 Niger</option>
                        <option value='+234 Nigeria'>+234 Nigeria</option>
                        <option value='+683 Niua'>+683 Niua</option>
                        <option value='+47 Norway'>+47 Norway</option>
                        <option value='+968 Oman'>+968 Oman</option>
                        <option value='+92 Pakistan'>+92 Pakistan</option>
                        <option value='+680 Palau'>+680 Palau</option>
                        <option value='+970 Palestine'>+970 Palestine</option>
                        <option value='+507 Panama'>+507 Panama</option>
                        <option value='+675 Papua new Guinea'>+675 Papua new Guinea</option>
                        <option value='+595 Paraguay'>+595 Paraguay</option>
                        <option value='+51 Peru'>+51 Peru</option>
                        <option value='+63 Philippines'>+63 Philippines</option>
                        <option value='+48 Poland'>+48 Poland</option>
                        <option value='+351 Portugal'>+351 Portugal</option>
                        <option value='+1 Puerto Rico'>+1 Puerto Rico</option>
                        <option value='+974 Qatar'>+974 Qatar</option>
                        <option value='+82 Republic of Korea (South Korea)'>+82 Republic of Korea (South Korea)</option>
                        <option value='+40 Romania'>+40 Romania</option>
                        <option value='+7 Russia'>+7 Russia</option>
                        <option value='+250 Rwanda'>+250 Rwanda</option>
                        <option value='+290 Saint Helena'>+290 Saint Helena</option>
                        <option value='+1869 Saint Kitts And Nevis'>+1869 Saint Kitts And Nevis</option>
                        <option value='+1758 Saint Lucia'>+1758 Saint Lucia</option>
                        <option value='+1784 Saint Vincent And Grenadines'>+1784 Saint Vincent And Grenadines</option>
                        <option value='+684 Samoa'>+684 Samoa</option>
                        <option value='+378 San Marino'>+378 San Marino</option>
                        <option value='+239 Sao Tome And Principe'>+239 Sao Tome And Principe</option>
                        <option value='+966 Saudi Arabia'>+966 Saudi Arabia</option>
                        <option value='+221 Senegal'>+221 Senegal</option>
                        <option value='+381 Serbia'>+381 Serbia</option>
                        <option value='+232 Sierra Leone'>+232 Sierra Leone</option>
                        <option value='+65 Singapore'>+65 Singapore</option>
                        <option value='+421 Slovakia'>+421 Slovakia</option>
                        <option value='+386 Slovenia'>+386 Slovenia</option>
                        <option value='+677 Solomon Islands'>+677 Solomon Islands</option>
                        <option value='+252 Somalia'>+252 Somalia</option>
                        <option value='+27 South Africa'>+27 South Africa</option>
                        <option value='+211 South Sudan'>+211 South Sudan</option>
                        <option value='+34 Spain'>+34 Spain</option>
                        <option value='+94 Sri Lanka'>+94 Sri Lanka</option>
                        <option value='+249 Sudan'>+249 Sudan</option>
                        <option value='+597 Suriname'>+597 Suriname</option>
                        <option value='+268 Swaziland'>+268 Swaziland</option>
                        <option value='+46 Sweden'>+46 Sweden</option>
                        <option value='+41 Switzerland'>+41 Switzerland</option>
                        <option value='+886 Taiwan'>+886 Taiwan</option>
                        <option value='+992 Tajikistan'>+992 Tajikistan</option>
                        <option value='+255 Tanzania'>+255 Tanzania</option>
                        <option value='+66 Thailand'>+66 Thailand</option>
                        <option value='+228 Togo'>+228 Togo</option>
                        <option value='+676 Tongo'>+676 Tongo</option>
                        <option value='+1868 Trinidad And Tobago'>+1868 Trinidad And Tobago</option>
                        <option value='+216 Tunisia'>+216 Tunisia</option>
                        <option value='+90 Turkey'>+90 Turkey</option>
                        <option value='+7370 Turkmenistan'>+7370 Turkmenistan</option>
                        <option value='+1649 Turks And Caicos Islands'>+1649 Turks And Caicos Islands</option>
                        <option value='+688 Tuvalu'>+688 Tuvalu</option>
                        <option value='+256 Uganda'>+256 Uganda</option>
                        <option value='+380 Ukraine'>+380 Ukraine</option>
                        <option value='+971 United Arab Emirates'>+971 United Arab Emirates</option>
                        <option value='+44 United Kingdom'>+44 United Kingdom</option>
                        <option value='+1 Unites States'>+1 Unites States</option>
                        <option value='+598 Uruguay'>+598 Uruguay</option>
                        <option value='+998 Uzbekistan'>+998 Uzbekistan</option>
                        <option value='+678 Vanuatu'>+678 Vanuatu</option>
                        <option value='+58 Venezuela'>+58 Venezuela</option>
                        <option value='+84 Vietnam'>+84 Vietnam</option>
                        <option value='+967 Yemen'>+967 Yemen</option>
                        <option value='+260 Zambia'>+260 Zambia</option>
                        <option value='+263 Zimbabwe'>+263 Zimbabwe</option>
                      </Form.Select>
                      <InputGroup size="sm" className="mb-3">
                        {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
                        <Form.Control
                          className='mobile-input'
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          {...register3('customer_phone')}
                        />
                      </InputGroup>
                    </div></span>

                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                      type="email" 
                      placeholder="name@example.com" 
                      className='email'
                      {...register3('customer_email')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className='document-setting-text'>
            <div className='additional-text'>Company Details (Optional)</div>
            <div className='card card-box'>
              <div className='additional-form'>
                <Row className='first-prefix-row'>
                  <Col md="12">
                    <Form.Label htmlFor="inputPassword5">GSTIN</Form.Label>
                    <div className='fetch-details'>
                      <InputGroup className="mb-3">
                        <Form.Control
                          className='gstin-input'
                          placeholder="27ADEFGTSVHER2"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          {...register3('customer_gstin')}
                        />
                        <Button type='button' variant="outline-secondary" id="button-addon2" className='gstin-input'>
                          Button
                        </Button>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
                <Row className='first-prefix-row'>
                  <Col md="12">
                    <Form.Label htmlFor="inputPassword5">Company Name</Form.Label>
                    <InputGroup size="sm" className="mb-3">
                      {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
                      <Form.Control
                        placeholder='ABC Technology PVT. LTD.'
                        className='company-name-input'
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        {...register3('customer_company')}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div className='billing-address-section'>
            {billingList.length > 0 ? (<div>
              <div className='billing-listing-heading'>Billing Address</div>
              <div className='billing-listing-div'>

                {billingList && billingList.map((val) => {
                  return (

                    <div id={val?.billing_address_id} className='billing-list-data'>
                      <p className='billing-data-p'>{val?.address_line_one}</p>
                      <p className='billing-data-p'>{val?.address_line_two}</p>
                      <p className='billing-data-p'>{val?.city}</p>
                      <p className='billing-data-p'>{val?.state} - {val?.pincode}</p>
                      <button type='button' className='billing-address-edit-btn' onClick={() => {
                        setIsEditMode(true)
                        setChildrenDrawer(true)
                        getEditData(val?.billing_address_id)
                      }}>Edit</button>
                      <button type='button' className='billing-address-delete-btn' onClick={() => deleteData(val?.billing_address_id)}>Delete</button>
                      {/* <button type='button' className='copy-btn' onClick={copy}>Copy to Shipping</button> */}
                    </div>)
                })}
              </div></div>) : (<div className='billing-address'>
                <label>Billing Address</label>
                <button type='button' className='billing-btn' onClick={showChildrenDrawer}><span className='plus-icon'><Plus /></span>Billing Address</button>
              </div>)}

            <Drawer
              title={<span className='add-item-heading-main-span'>
                <span className='add-item-heading-span'>Add Billing Address</span>
                <span>
                  <Button color='primary' className='save-update-button'>Save and Update</Button>
                </span>
              </span>}
              width={320}
              closable={false}
              onClose={onChildrenDrawerClose}
              open={childrenDrawer}
            >
              <div className='export-check'>
                <Checkbox>Export?</Checkbox>
              </div>
              <Form>
                <div className='ant-drawer-body-div'>

                  <div className='addressline-1-div'>
                    <label>Address line 1</label>
                    <input
                      type='text'
                      placeholder='Address line 1 '
                      className='address-line-1-input'
                      {...register1('address_line_one')}
                    />
                  </div>

                  <div className='addressline-2-div'>
                    <label>Address line 2</label>
                    <input
                      type='text'
                      placeholder='Address line 2 '
                      className='address-line-2-input'
                      {...register1('address_line_two')}
                    />
                  </div>

                  <div className='city-div'>
                    <label>City</label>
                    <input
                      type='text'
                      placeholder='City'
                      className='city-input'
                      {...register1('city')}
                    />
                  </div>

                  <div className='state-div'>
                    <label>State</label>


                    <select
                      placeholder='Select State'
                      type='text'
                      className='state-select'
                      // options={options}
                      {...register1('state')}

                    >
                      <option value='01-JAMMUANDKASHMIR'>01-JAMMUANDKASHMIR</option>
                      <option value='02-HIMACHALPRADESH'>02-HIMACHALPRADESH</option>
                      <option value='03-PANJAB'>03-PANJAB</option>
                      <option value='04-CHANDIGARDH'>04-CHANDIGARDH</option>
                      <option value='05-UTTARAKHAND'>05-UTTARAKHAND</option>
                      <option value='06-HARYANA'>06-HARYANA</option>
                      <option value='07-DELHI'>07-DELHI</option>
                      <option value='08-RAJASTHAN'>08-RAJASTHAN</option>
                      <option value='09-UTTARPRADESH'>09-UTTARPRADESH</option>
                      <option value='10-BIHAR'>10-BIHAR</option>
                      <option value='11-SIKKIM'>11-SIKKIM</option>
                      <option value='12-ARUNACHALPRADESH'>12-ARUNACHALPRADESH</option>
                      <option value='13-NAGALAND'>13-NAGALAND</option>
                      <option value='14-MANIPUR'>14-MANIPUR</option>
                      <option value='15-MIZORAM'>15-MIZORAM</option>
                      <option value='16-TRIPURA'>16-TRIPURA</option>
                      <option value='17-MEGHALAYA'>17-MEGHALAYA</option>
                      <option value='18-ASSAM'>18-ASSAM</option>
                      <option value='19-WESTBENGA'>19-WESTBENGAL</option>
                      <option value='20-JHARKHAND'>20-JHARKHAND</option>
                      <option value='21-ODISHA'>21-ODISHA</option>
                      <option value='22-CHATTISGARH'>22-CHATTISGARH</option>
                      <option value='23-MADHYAPRADSH'>23-MADHYAPRADSH</option>
                      <option value='24-GUJARAT'>24-GUJARAT</option>
                      <option value='26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT'>26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT</option>
                      <option value='27-MAHARASHTRA'>27-MAHARASHTRA</option>
                      <option value='28-ANDHRAPRADESH(BEFOREADDED)'>28-ANDHRAPRADESH(BEFOREADDED)</option>
                      <option value='29-KARNATAKA'>29-KARNATAKA</option>
                      <option value='30-GOA'>30-GOA</option>
                      <option value='31-LAKSHWADEEP'>31-LAKSHWADEEP</option>
                      <option value='32-KERALA'>32-KERALA</option>
                      <option value='33-TAMILNADU'>33-TAMILNADU</option>
                      <option value='34-PUDUCHERRY'>34-PUDUCHERRY</option>
                      <option value='35-ANDAMANANDNICOBARISLANDS'>35-ANDAMANANDNICOBARISLANDS</option>
                      <option value='36-TELANGANA'>36-TELANGANA</option>
                      <option value='37-ANDHRAPRADESH'>37-ANDHRAPRADESH</option>
                      <option value='38-LADAKH(NEWLYADDED)'>38-LADAKH(NEWLYADDED)</option>
                      <option value='97-OTHERTERRYTORY'>97-OTHERTERRYTORY</option>

                    </select>



                    <small className='address-small'>Billing State (like 36-Telangana) is responsible for deciding CGST + SGST or IGST calculation on the invoice. Please ignore this, if you do not have GST.</small>
                  </div>

                  <div className='pincode-div'>
                    <label>Pin Code</label>
                    <input
                      type='text'
                      placeholder='Pincode'
                      className='pincode-input'
                      {...register1('pincode', { valueAsNumber: true })}
                    />
                  </div>


                </div>
                <div className='footer'>
                  <Button color='primary' type='button' className='save-update-btn' onClick={handleSubmit1(onSubmit1)
                  }>Save and Update</Button>
                </div>
              </Form>
            </Drawer>





            {shippingList.length > 0 ? (<div>
              <div className='billing-listing-heading'>Shipping Address</div>
              <div className='billing-listing-div'>

                {shippingList && shippingList.map((d) => {
                  return (

                    <div id={d?.shipping_address_id} className='billing-list-data'>
                      <p className='billing-data-p'>{d?.address_line_one}</p>
                      <p className='billing-data-p'>{d?.address_line_two}</p>
                      <p className='billing-data-p'>{d?.city}</p>
                      <p className='billing-data-p'>{d?.state} - {d?.pincode}</p>
                      <p className='billing-data-p'>{d?.notes} {console.log(d?.notes)}</p>

                      <button type='button' className='billing-address-edit-btn' onClick={() => {
                        setIsEditMode(true)
                        setIsChildrenDrawer(true)
                        getEditShippingData(d?.shipping_address_id)
                      }}>Edit</button>
                      <button type='button' className='billing-address-delete-btn' onClick={() => deleteShippingData(d?.shipping_address_id)}>Delete</button>
                    </div>)
                })}
              </div></div>) : (<div className='billing-address'>
                <label>Shipping Address</label>
                <button type='button' onClick={showChildrenDrawerOpen} className='billing-btn shipping'><span className='plus-icon'><Plus /></span>Shipping Address</button>
              </div>)}
            <Drawer
              title={<span className='title-span'><span className='search-hsn-heading'>Add Shipping Address</span><span className='save-update-btn-span'><Button color='primary' className='save-update-btn'>Save and Update</Button></span></span>}
              width={320}
              closable={false}
              onClose={showChildrenDrawerClose}
              open={isChildrenDrawer}
            >

              <div className='export-check'>
                <Checkbox>Export?</Checkbox>
              </div>
              <Form>
                <div className='ant-drawer-body-div'>

                  <div className='addressline-1-div'>
                    <label>Address line 1</label>
                    <input
                      type='text'
                      placeholder='Address line 1 '
                      className='address-line-1-input'
                      {...register2('address_line_one')} />

                  </div>

                  <div className='addressline-2-div'>
                    <label>Address line 2</label>
                    <input
                      type='text'
                      placeholder='Address line 1 '
                      className='address-line-2-input'
                      {...register2('address_line_two')} />
                  </div>

                  <div className='city-div'>
                    <label>City</label>
                    <input
                      type='text'
                      placeholder='Address line 1 '
                      className='city-input'
                      {...register2('city')} />
                  </div>

                  <div className='state-div'>
                    <label>State</label>
                    <select className='state-select'
                      {...register2('state')}>
                      <option value='01-JAMMUANDKASHMIR'>01-JAMMUANDKASHMIR</option>
                      <option value='02-HIMACHALPRADESH'>02-HIMACHALPRADESH</option>
                      <option value='03-PANJAB'>03-PANJAB</option>
                      <option value='04-CHANDIGARDH'>04-CHANDIGARDH</option>
                      <option value='05-UTTARAKHAND'>05-UTTARAKHAND</option>
                      <option value='06-HARYANA'>06-HARYANA</option>
                      <option value='07-DELHI'>07-DELHI</option>
                      <option value='08-RAJASTHAN'>08-RAJASTHAN</option>
                      <option value='09-UTTARPRADESH'>09-UTTARPRADESH</option>
                      <option value='10-BIHAR'>10-BIHAR</option>
                      <option value='11-SIKKIM'>11-SIKKIM</option>
                      <option value='12-ARUNACHALPRADESH'>12-ARUNACHALPRADESH</option>
                      <option value='13-NAGALAND'>13-NAGALAND</option>
                      <option value='14-MANIPUR'>14-MANIPUR</option>
                      <option value='15-MIZORAM'>15-MIZORAM</option>
                      <option value='16-TRIPURA'>16-TRIPURA</option>
                      <option value='17-MEGHALAYA'>17-MEGHALAYA</option>
                      <option value='18-ASSAM'>18-ASSAM</option>
                      <option value='19-WESTBENGA'>19-WESTBENGAL</option>
                      <option value='20-JHARKHAND'>20-JHARKHAND</option>
                      <option value='21-ODISHA'>21-ODISHA</option>
                      <option value='22-CHATTISGARH'>22-CHATTISGARH</option>
                      <option value='23-MADHYAPRADSH'>23-MADHYAPRADSH</option>
                      <option value='24-GUJARAT'>24-GUJARAT</option>
                      <option value='26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT'>26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT</option>
                      <option value='27-MAHARASHTRA'>27-MAHARASHTRA</option>
                      <option value='28-ANDHRAPRADESH(BEFOREADDED)'>28-ANDHRAPRADESH(BEFOREADDED)</option>
                      <option value='29-KARNATAKA'>29-KARNATAKA</option>
                      <option value='30-GOA'>30-GOA</option>
                      <option value='31-LAKSHWADEEP'>31-LAKSHWADEEP</option>
                      <option value='32-KERALA'>32-KERALA</option>
                      <option value='33-TAMILNADU'>33-TAMILNADU</option>
                      <option value='34-PUDUCHERRY'>34-PUDUCHERRY</option>
                      <option value='35-ANDAMANANDNICOBARISLANDS'>35-ANDAMANANDNICOBARISLANDS</option>
                      <option value='36-TELANGANA'>36-TELANGANA</option>
                      <option value='37-ANDHRAPRADESH'>37-ANDHRAPRADESH</option>
                      <option value='38-LADAKH(NEWLYADDED)'>38-LADAKH(NEWLYADDED)</option>
                      <option value='97-OTHERTERRYTORY'>97-OTHERTERRYTORY</option>
                    </select>

                    <small className='address-small'>Billing State (like 36-Telangana) is responsible for deciding CGST + SGST or IGST calculation on the invoice. Please ignore this, if you do not have GST.</small>
                  </div>

                  <div className='pincode-div'>
                    <label>Pin Code</label>
                    <input
                      type='text'
                      placeholder='Address line 1 '
                      className='pincode-input'
                      {...register2('pincode', { valueAsNumber: true })} />
                  </div>
                  <div className='notes-div'>
                    <label className='notes-label'>Notes</label>
                    <textarea
                      className='shipping-note-textarea'
                      {...register2('notes')}
                    />
                  </div>

                </div>
                <div className='footer'>
                  <Button type='button' color='primary' className='save-update-btn' onClick={handleSubmit2(onSubmit2)}>Save and Update</Button>
                </div>
              </Form>
            </Drawer>


          </div>
          <div className='document-setting-text export-invoice'>
            <div className='additional-text'>Optional Details</div>


            <div className='card card-box'>
              <div className='additional-form'>
                <div className='opening-radio'>
                  <label>Opening Balance</label>
                  <div style={{ display: 'flex', marginTop: '15px' }}>
                    <div className='form-check'>
                      <Input type='radio' id='ex1-active' name='ex1' value='debit' onChange={isDebit} defaultChecked />
                      <Label className='form-check-label' for='ex1-active'>
                        Debit
                      </Label>
                    </div>
                    <div className='form-check' style={{ paddingLeft: '40px' }}>
                      <Input type='radio' name='ex1' id='ex1-inactive' value='credit' onChange={isDebit} />
                      <Label className='form-check-label' for='ex1-inactive'>
                        Credit
                      </Label>
                    </div>
                  </div>
                  {selectedOption === "debit" ? (<div style={{ marginTop: '25px', width: '100%' }}>
                    <span className='debit-span'>
                      <InputGroup>
                        <Form.Control
                          type='number'
                          name='customer_debit_amount'
                          placeholder='Enter Debit Amount'
                          className='debit-amount'
                          {...register3('customer_debit_amount')}
                        />
                      </InputGroup>
                      <div className='debit-div'>
                        <Label className='vendor-debit-label'>Customer pays you<FontAwesomeIcon icon={faInr} style={{ marginLeft: '4px', marginRight: '4px' }} /></Label>
                      </div>
                    </span>
                  </div>) :( <div style={{ marginTop: '25px', width: '100%' }}>
                    <span className='debit-span'>
                      <InputGroup>
                        <Form.Control
                          type='number'
                          name='customer_credit_amount'
                          placeholder='Enter Credit Amount'
                          className='debit-amount'
                          {...register3('customer_credit_amount')}
                        />
                      </InputGroup>
                      <div className='debit-div'>
                        <Label className='vendor-credit-label'>You pay the Customer  <FontAwesomeIcon icon={faInr} style={{ marginLeft: '4px', marginRight: '4px' }} /></Label>
                      </div>
                    </span>
                  </div>)}
                </div>
                <div className='opening-radio radio-div'>
                  <Form.Label htmlFor="inputPassword5">Balance</Form.Label>

                  <InputGroup>
                    <Form.Control
                      disabled
                      type='number'
                      name='vendor_debit_amount'
                      placeholder='Enter Credit Amount'
                      className='balance-input'
                      {...register3('balance')}
                    />
                  </InputGroup>

                </div>
                <Row className='first-prefix-row tds-row'>
                  <Col md="6">
                    <Form.Label htmlFor="inputPassword5">TDS</Form.Label>
                    <div className='form-switch form-check-primary'>
                      <Switch
                      className='tds-switch-btn' 
                      id='switch-primary' 
                      name='tds' 
                      onClick={showItem}
                      />
                    </div>


                  </Col>
                  {show &&
                    (<div className='tds-switch-sub-div'>
                      <Form.Label htmlFor="inputPassword5">TDS Percentage</Form.Label>
                      <Form.Select 
                      size="sm" 
                      className='tds-percent-select'
                      {...register3('tds_percentage')}
                      >
                        <option>Small select</option>
                        <option>Small sele</option>
                        <option>Small se</option>
                      </Form.Select>
                      {/* <InputNumber disabled className='tds-input-num' /> */}
                    </div>)}
                </Row>
                <div className='more-details-section'>
                  <Collapse>
                    <Panel header={<div className='tags-text'><span>More Details?</span><p>Add Notes, Tags, Discount, CC Emails</p></div>} key="1">
                      <div className='discount-section'>
                        <div className='discount-fild'>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Discount(%)</Form.Label>
                            <Form.Control
                             type='number' 
                             placeholder="name@example.com" 
                             {...register3('dicount')}
                             />
                          </Form.Group>
                        </div>
                        <div className='discount-fild'>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows={3} 
                            {...register3('notes')}
                            />
                          </Form.Group>
                        </div>
                        <div className='discount-fild'>
                          <Form.Label htmlFor="inputPassword5">Tags</Form.Label>
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            defaultValue={[colorOptions[2], colorOptions[3]]}
                            isMulti
                            name='colors'
                            options={colorOptions}
                            className='react-select'
                            classNamePrefix='select'
                            {...register3('tags')}
                          />
                        </div>
                        <div className='discount-fild'>
                          <Form.Label>CC Emails<em className='new-text'>NEW</em></Form.Label>
                          <ReactMultiEmail
                            placeholder='Input your email'
                            // emails={emails}
                            // onChange={(emails) => {
                            //   setEmails(emails);
                            // }}
                            {...register3(' customer_cc_emails')}
                            autoFocus={true}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            getLabel={(email, index, removeEmail) => {
                              return (
                                <div data-tag key={index}>
                                  <div data-tag-item>{email}</div>
                                  <span data-tag-handle onClick={() => removeEmail(index)}>
                                    ×
                                  </span>
                                </div>
                              );
                            }}
                          />

                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>


          <div className='update-close-btns'>
            <button type='button' className=' save-customer-btn'>
              <span className=' save-customer-btn' onClick={handleSubmit3(onSubmit3)}>Save<span className='arrow-right'><ArrowRight /></span></span>
            </button>
            <Button className='ms-2' color='secondary'>
              <span className='align-middle ms-50'>Close</span>
            </Button>
          </div>
        </Form>
      </div>
    </Sidebar>
  )
}

export default AddNewCustomer
