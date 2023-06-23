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
import { Button, Label, FormText, Input, Row, Col, Tooltip } from 'reactstrap'
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
import { Form, InputGroup } from 'react-bootstrap'
import jwtDecode from 'jwt-decode'
import { addSignature } from '../../../../api/signature/index'

const { Panel } = Collapse

const defaultValues = {
    signature_name: '',
    signature_image: '',
    user_id: 0
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

const AddSignature = ({ open, toggleSidebar }) => {
    // ** States
    const [data, setData] = useState(null)
    const [plan, setPlan] = useState('basic')
    const [role, setRole] = useState('subscriber')
    const [selectedOption, setSelectedOption] = useState("");
    const [imageUrl, setImageUrl] = useState();
    const [getImage, setImage] = useState("");

    // ** Store Vars
    const dispatch = useDispatch()

    // ** Vars
    const {
        control,
        setValue,
        setError,
        register,
        reset,
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

    const onSubmit = (data) => {
        const decoded = localStorage.getItem('userDetails')
        const token = jwtDecode(decoded)
        const formData = new FormData()
        formData.append('signature_name', data.signature_name)
        formData.append('signature_image', getImage)
        formData.append('user_id', token.user_id)

        console.log('fsdfds', data)
        addSignature(formData).then((res) => {
            console.log('add-signature', res)
            toggleSidebar()
            reset()
        }).catch((error) => {
            console.log('fdf', error?.response?.data?.message?.vendor_name?.message)
        })
    }

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
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='basic-details-card'>
                        <div className='basic-details-card-body'>
                            <div>
                                <Label className='basic-details-label'><em style={{ color: 'red' }}>*</em> Signature Name</Label>
                                <InputGroup>
                                    <Form.Control
                                        type='text'
                                        name='signature_name'
                                        placeholder='Signature Name (This is only for your reference and will not be shown on the documents'
                                        {...register('signature_name')}
                                    />
                                </InputGroup>
                                <div className='default-bank'>Signature Name is only for your reference and will not be shown on the documents.</div>
                            </div>
                            <div className='field-down'>
                                <Label className='basic-details-label'>Signature Image</Label>
                                <div>
                                    <Form.Control type='file' {...register('signature_image')} onChange={imageUploader} />
                                </div>
                            </div>
                            <div>
                                <p className='image-validation-text'>Images must be PNG or JPEG, recommended 1:1 (1024 x 1024 pixels) or 4:3 (640 x 480 Pixels) aspect ratios.</p>
                            </div>
                        </div>
                    </div>
                    <div className='button-position'>
                        <Button color='primary' className='save-update-button'>Save & Update<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} /></Button>
                    </div>
                </Form>
                <div>
                    <h4 className='signature-text'>
                        <span style={{ marginRight: '8px' }}>Your Signature.</span>
                        <span>Your Authority. <FontAwesomeIcon icon={faSignature} /></span>
                    </h4>
                    <img src='https://app.getswipe.in/resources/images/signature.jpg' className='signature-image-url' />
                </div>
            </div>
        </Sidebar>
    )
}

export default AddSignature
