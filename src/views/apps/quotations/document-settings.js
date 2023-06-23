// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../../@core/components/sidebar'

// ** Utils
import { selectThemeColors } from '../../../utility/Utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from 'reactstrap'
import { Heart } from 'react-feather'

// ** Store & Actions
import { addUser } from '../user/store'
import { useDispatch } from 'react-redux'
import { BottomNavigation } from '@mui/material'

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

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

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
      toggleSidebar()
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

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Document Settings'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
     <div className='document-setting-text'>
      <div className='invoice-form-top'>
        <button className='invoice-template-btn'><span className='heart-icon'><Heart /></span>Invoice Templates</button>
      </div>
      <div className='additional-text'>Document prefixes</div>
      <div className='card card-box'>
        <Form className='document-prefixes'>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Invoice Prefix</Label>
              <Input type="text" name="invoice_prefix" placeholder='INV-' />
              <div className='example-prefix'>Example INV/22-23/, JIO/, AMZN- or you can leave it blank also.</div>
            </Col>
            <Col md="6">
              <Label>Purchase Order Prefix</Label>
              <Input type="text" name="purchase_order_prefix" placeholder='PO-' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Purchase Invoice Prefix</Label>
              <Input type="text" name="purchase_invoice_prefix" placeholder='PINV-' />
            </Col>
            <Col md="6">
              <Label>Quotation Prefix</Label>
              <Input type="text" name="quotation_prefix" placeholder='EST-' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Sales Return Prefix</Label>
              <Input type="text" name="sales_return_prefix" placeholder='SRTN-' />
            </Col>
            <Col md="6">
              <Label>Purchase Return Prefix</Label>
              <Input type="text" name="purchase_return_prefix" placeholder='PRTN-' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Delivery Challan Prefix</Label>
              <Input type="text" name="delivery_challan_prefix" placeholder='DC-' />
            </Col>
            <Col md="6">
              <Label>Pro Forma Invoice Prefix</Label>
              <Input type="text" name="pro_forma_invoice_prefix" placeholder='PFI-' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Subscription Prefix</Label>
              <Input type="text" name="subscription_prefix" placeholder='SUB-' />
            </Col>
          </Row>
        </Form>
      </div>
      </div>
      <div className='document-setting-text'>
      <div className='additional-text'>Additional Customizations</div>
      <div className='card card-box'>
        <Form className='additional-form'>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Show Images</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>This will show images on all documents, provided images are uploaded for the product. Upto 5 images only.</div>
            </Col>
            <Col md="6">
              <Label>Show NetBalance</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>Only receivable balance (i.e customer is in Debit and you have to collect the payment) will be shown on the invoices.</div>
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Show Due Date</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>To show due date in invoice documents.</div>
            </Col>
            <Col md="6">
              <Label>Show Payments</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>Payment mode and date will be shown on the invoices if payments are recorded.</div>
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Allow Negative Quantity</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>If this is enabled, you can create bills with quantity less than 0.</div>
            </Col>
            <Col md="6">
              <Label>Show Round Off</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>Round off amount will be shown in the invoices if this is enabled.</div>
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Show Transactions sorted by</Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
              />
            </Col>
            <Col md="6">
              <Label>Document Color</Label>
              <Input type="text" name="document_color" />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Select Language in PDF</Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
              />
            </Col>
          </Row>
        </Form>
      </div>
      </div>
      <div className='document-setting-text export-invoice'>
      <div className='additional-text'>Export Invoice Settings</div>
      <div className='card card-box'>
        <Form className='additional-form'>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label>Show Conversion Factor</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>Conversion rate will be shown in the invoices if this is enabled.</div>
            </Col>
            <Col md="6">
              <Label>Show in INR</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'>Currency will be shown in INR for export invoices if this is enabled.</div>
            </Col>
          </Row>
          <div>
          </div>
        </Form>
      </div>
      <div className='update-close-btns'>
      <Button className='ms-2' color='primary'>
        <span className='align-middle ms-50'>Update Settings</span>
      </Button>
      <Button className='ms-2' color='secondary'>
        <span className='align-middle ms-50'>Close</span>
      </Button>        
      </div>
      </div>
    </Sidebar>
  )
}

export default SidebarNewUsers
