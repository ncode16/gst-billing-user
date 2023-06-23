// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../../../@core/components/sidebar'


// ** Utils
import { selectThemeColors } from '../../../../utility/Utils'

// ** Third Party Components
// import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col, Tooltip } from 'reactstrap'
import { Select, Collapse, Upload, message } from 'antd'
import { Option } from 'antd/es/mentions'

// ** Store & Actions
import { addUser } from '../../user/store'
import { useDispatch } from 'react-redux'
import { Heart } from 'react-feather'
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

const AddSignature = ({ open, toggleSignatureBar }) => {
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

    return (
        <Sidebar
            size='lg'
            open={open}
            title={
                <span className='add-item-heading-main-span'>
                    <span className='add-item-heading-span'>Signature Details</span>
                    <span>
                        <Button color='primary' className='save-update-button'>Save & Update</Button>
                    </span>
                </span>
            }
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSignatureBar}
            onClosed={handleSidebarClosed}
        >
            <div>
                <Form>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <div>
                                <Label className='basic-details-label'><em style={{color: 'red'}}>*</em> Signature Name</Label>
                                <Input type='text' name='account_number' className='vendor-name' placeholder='Signature Name (This is only for your reference and will not be shown on the documents' />
                                <div className='default-bank'>Signature Name is only for your reference and will not be shown on the documents.</div>
                            </div>
                            <div className='field-down'>
                                <Label className='basic-details-label'>Signature Image</Label>
                                <div>
                                    <div>
                                        <span>
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                            {/* <div>
                                                <PlusOutlined />
                                                <div>Upload</div>
                                            </div> */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='image-validation-text'>Images must be PNG or JPEG, recommended 1:1 (1024 x 1024 pixels) or 4:3 (640 x 480 Pixels) aspect ratios.</p>
                            </div>
                        </div>
                    </div>
                </Form>
                <div>
                    <h4 className='signature-text'>
                        <span style={{marginRight: '8px'}}>Your Signature.</span>
                        <span>Your Authority. <FontAwesomeIcon icon={faSignature} /></span>
                    </h4>
                    <img src='https://app.getswipe.in/resources/images/signature.jpg' className='signature-image-url' />
                </div>
                <div className='button-position'>
                    <Button color='primary' className='save-update-button'>Save & Update<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} /></Button>
                </div>
            </div>
        </Sidebar>
    )
}

export default AddSignature
