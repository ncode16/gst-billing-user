import { useState } from 'react'


// ** Custom Components
import AvatarGroup from '../../../@core/components/avatar-group'


// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// antd import
import { Pagination, Dropdown } from 'antd'

// ** Images
import react from '../../../assets/images/icons/react.svg'
import vuejs from '../../../assets/images/icons/vuejs.svg'
import angular from '../../../assets/images/icons/angular.svg'
import bootstrap from '../../../assets/images/icons/bootstrap.svg'
import avatar1 from '../../../assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '../../../assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '../../../assets/images/portrait/small/avatar-s-7.jpg'

// Font awesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments, faEnvelope, faInr, faEye, faPaperPlane, faAngleDown, faPenToSquare, faClone, faReceipt, faFileSignature, faArrowUpFromBracket, faCircleMinus } from '@fortawesome/free-solid-svg-icons'


// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

const avatarGroupData1 = [
  {
    title: 'Lilian',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Alberto',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Bruce',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Diana',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Rey',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'James',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Lee',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Mario',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Oswald',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Christie',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Barnes',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Arthur',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]


const Data = () => {

  const [emailOpen, setEmailOpen] = useState(false)
  const toggleEmail = () => setEmailOpen(!emailOpen)

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
      label: <a style={{ color: 'black', fontWeight: 600 }}><FontAwesomeIcon icon={faComments} style={{ marginRight: '8px', color: '#fc3654' }} />SMS</a>,
      key: '2',
    },
    {
      label: <a style={{ color: 'black', fontWeight: 600 }}><FontAwesomeIcon icon={faClone} style={{ marginRight: '8px', color: '#6e6e73' }} />Copy link</a>,
      key: '2',
    },
  ];

  return (

    <div style={{ marginTop: '8px', marginBottom: '24px' }}>
      <Table responsive>
        <thead>
          <tr>
            <th className='table-head'>Amount</th>
            <th className='table-head'>Status</th>
            <th className='table-head'>Mode</th>
            <th className='table-head'>Bill #</th>
            <th className='table-head'>Vendor</th>
            <th className='table-head'>Supplier Details</th>
            <th className='table-head'>Date/ <span style={{ fontSize: '8px' }}>Updated Time</span></th>
            <th className='table-head'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td className='table-data'>
              <span>
                <a className='purchase-amount'><FontAwesomeIcon icon={faInr} />800.00</a>
              </span>
            </td>
            <td className='table-data'>
              <Button color='success' className='payment-status'>paid</Button>
            </td>
            <td className='table-data'>
              <Button color='success' className='payment-mode'>UPI</Button>
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
                <button className='view-button'>
                  <FontAwesomeIcon icon={faEye} />
                  <span style={{ marginLeft: '4px', display: 'inline' }}>View</span>
                </button>
                <Dropdown menu={{
                  items,
                }} trigger={['click']}>
                  <a>
                    <button className='send-button'>
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
                        <span className='align-middle' style={{ color: '#e11900' }}><FontAwesomeIcon icon={faCircleMinus} style={{ marginRight: '16px', fontWeight: 400, textAlign: 'center', width: '20px' }} />Cancel Purchase</span>
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

      <div>
        <div>
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
    </div>


  )
}

export default Data;