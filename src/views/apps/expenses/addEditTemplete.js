//Attached File
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, DatePicker, Tooltip } from 'antd';
import Sidebar from '../../../@core/components/sidebar';
//Add CSS ArrowDown.css
import './addEditTemplete.css'
import { selectThemeColors } from '../../../utility/Utils';
import { Cascader, InputNumber, Space, Form } from 'antd';
import {createDocumentNotes} from '../../../api/expenseDataManage/expenseManagement';
// ** Third Party Components
import Select from 'react-select'
// ** React Imports
import { useState } from 'react'
//** CSS import */
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Share, Play, ArrowRight, Info } from 'react-feather'
// ** Reactstrap Imports
import {
  Modal, Input, Label, ModalHeader,
  ModalBody, InputGroup, InputGroupText, FormFeedback, Card,
  CardHeader, CardTitle, CardBody, Row, Col, DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { useForm } from 'react-hook-form';
import { error } from 'jquery';
//ToolTIp is here
const UPI = <span>A UPI ID or VPA (Virtual Payment Address) is a unique ID
  that is used to make UPI payments in place of bank account details.
  This UPI ID will be used to generate Dynamic QR codes
  on the invoices and bills.</span>;
const buttonWidth = 70;
const gap = 8;
const btnProps = {
  style: {
    width: buttonWidth,
  },
};
//API default value is here
const defaultValues={
  label:'',
  notes:'',
  document_type:'',
  is_notes:'',
  is_terms:''
}

const AddEmailTemplete = ({ open, addEditTemplete }) => {
//Document Notes API integrate here
const {
  handleSubmit,
  register,
  formState:{errors}, 
}=useForm({defaultValues})


const onSubmit = (data) => {
  console.log('Document Notes Details Here', data);
  const body = {
    label:data.label,
    notes: data.notes,
    document_type: data.document_type,
    is_notes: data.is_notes,
    is_terms: data.is_terms,
  }
  createDocumentNotes(body).then((respose) => {
    console.log('Document Notes Details Here', respose);
  }).catch((error) => {
    console.log("data not found")
  })
}

  // ** State
  const [Picker, setPicker] = useState(new Date())
  //Payment Method Hide and Show Content
  const [visible, setVisible] = useState(true)
  //Hide and Show content
  const [show, setShow] = useState(true)
  const showitem = () => {
    if (show == false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={addEditTemplete} />

  return (
    <>
      <Modal
        isOpen={open}
        toggle={addEditTemplete}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        <div className='all-section' >
          <div className='create-exp-head-templete'>
            <div className='head-button-main-tempelte'>
              <ModalHeader className='head-button' toggle={addEditTemplete} close={CloseBtn}>
                <h3>Add/Edit Quotation Terms</h3>
              </ModalHeader>
            </div>
            <button className='head-button-one'>Save<ArrowRight /></button>
          </div>
          <Form className='amount-page' onSubmit={handleSubmit(onSubmit)}>
            <div className='create-expense-head'>
              <div className='create-form-expense'>
                <Row>
                  <Col md='100' >
                    <div className='Bank-view-section'>
                      <label className='lable-bank-templete'>Label:</label>
                      <input className='amount-input-bank' type='text'
                        placeholder='Label'  {...register('label')} />

                      <label className='lable-notes-Add'>Terms:</label>
                      <div className='descr-textarea-add-edit'>
                        <textarea type='textarea' className='add-edit-text-area' id='exampleText' rows='2' placeholder='Notes' {...register('notes')}></textarea>
                      </div>

                    </div>
                  </Col>
                </Row>
                <footer className='create-exp-footer'>
                  <div className='payout-upadte-bt'>
                    <button className='payout-btn' type='submit'>Save<ArrowRight /></button>
                    <button className='payout-btn1' >Close</button>
                  </div>
                </footer>
              </div>
            </div>
          </Form>
          {/* <div className='footer-section'> */}

          {/* </div> */}
        </div>
      </Modal>
    </>
  )
}

export default AddEmailTemplete;
