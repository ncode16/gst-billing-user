// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'
import './settings.css'
import '../media.css'


// ** Utils
import { selectThemeColors } from '../../../../utility/Utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { Heart } from 'react-feather'

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

const DocumentSetting = ({ open, toggleSidebar }) => {
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
      <button className='invoice-template-button'><span className='heart'><Heart /></span>Invoice Templates</button>
      <div className='additional-text'>Document prefixes</div>
      <div className='card card-box'>
        <Form>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Invoice Prefix</Label>
              <Input type="text" className="invoice_prefix" placeholder='INV-' value='INV -' />
              <div className='example-prefix'><small className='small-text'>Example INV/22-23/, JIO/, AMZN- or you can leave it blank also.</small></div>
            </Col>
            <Col md="6">
              <Label className='label-text'>Purchase Order Prefix</Label>
              <Input type="text" className="purchase_order_prefix" placeholder='PO-' value='PO -' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Purchase Invoice Prefix</Label>
              <Input type="text" className="purchase_invoice_prefix" placeholder='PINV-' value='PINV -' />
            </Col>
            <Col md="6">
              <Label className='label-text'>Quotation Prefix</Label>
              <Input type="text" className="quotation_prefix" placeholder='EST-' value='EST -' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Sales Return Prefix</Label>
              <Input type="text" className="sales_return_prefix" placeholder='SRTN-' value='SRTN -' />
            </Col>
            <Col md="6">
              <Label className='label-text'>Purchase Return Prefix</Label>
              <Input type="text" className="purchase_return_prefix" placeholder='PRTN-' value='PRTN -' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Delivery Challan Prefix</Label>
              <Input type="text" className="delivery_challan_prefix" placeholder='DC-' value='DC -' />
            </Col>
            <Col md="6">
              <Label className='label-text'>Pro Forma Invoice Prefix</Label>
              <Input type="text" className="pro_forma_invoice_prefix" placeholder='PFI-' value='PFI -' />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Subscription Prefix</Label>
              <Input type="text" className="subscription_prefix" placeholder='SUB-' value='SUB -' />
            </Col>
          </Row>
        </Form>
      </div>
      <div className='additional-text-second'>Additional Customizations</div>
      <div className='card card-box'>
        <Form>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Show Images</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' />
              </div>
              <div className='extra-information'><small className='small-text'>This will show images on all documents, provided images are uploaded for the product. Upto 5 images only.</small></div>
            </Col>
            <Col md="6">
              <Label className='label-text'>Show NetBalance</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' />
              </div>
              <div className='extra-information'><small className='small-text'>Only receivable balance (i.e customer is in Debit and you have to collect the payment) will be shown on the invoices.</small></div>
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Show Due Date</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'><small className='small-text'>To show due date in invoice documents.</small></div>
            </Col>
            <Col md="6">
              <Label className='label-text'>Show Payments</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' />
              </div>
              <div className='extra-information'><small className='small-text'>Payment mode and date will be shown on the invoices if payments are recorded.</small></div>
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Allow Negative Quantity</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'><small className='small-text'>If this is enabled, you can create bills with quantity less than 0.</small></div>
            </Col>
            <Col md="6">
              <Label className='label-text'>Show Round Off</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' defaultChecked />
              </div>
              <div className='extra-information'><small className='small-text'>Round off amount will be shown in the invoices if this is enabled.</small></div>
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Show Transactions sorted by</Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
              />
            </Col>
            <Col md="6">
              <Label className='label-text'>Document Color</Label>
              <Input type="text" name="document_color" />
            </Col>
          </Row>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Select Language in PDF</Label>
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
      <div className='additional-text'>Export Invoice Settings</div>
      <div className='card card-box'>
        <Form>
          <Row className='first-prefix-row'>
            <Col md="6">
              <Label className='label-text'>Show Conversion Factor</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' />
              </div>
              <div className='extra-information'><small className='small-text'>Conversion rate will be shown in the invoices if this is enabled.</small></div>
            </Col>
            <Col md="6">
              <Label className='label-text'>Show in INR</Label>
              <div className='form-switch form-check-primary'>
                <Input type='switch' id='switch-primary' name='primary' />
              </div>
              <div className='extra-information'><small className='small-text'>Currency will be shown in INR for export invoices if this is enabled.</small></div>
            </Col>
          </Row>
          <div>
            <Button className='update-setting-btn' color='primary'>
              Update Settings
            </Button>
            <Button className='close-btn'>
              Close
            </Button>
          </div>
        </Form>
      </div>
    </Sidebar>
  )
}

export default DocumentSetting
