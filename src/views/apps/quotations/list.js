// ** React Imports
import { Fragment, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import '../../../@core/scss/react/libs/flatpickr/flatpickr.scss'
import './quotation.css'
import AvatarGroup from '../../../@core/components/avatar-group'
import { useNavigate } from 'react-router-dom'

// ** Images
import react from '../../../assets/images/icons/react.svg'
import vuejs from '../../../assets/images/icons/vuejs.svg'
import angular from '../../../assets/images/icons/angular.svg'
import bootstrap from '../../../assets/images/icons/bootstrap.svg'
import avatar1 from '../../../assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '../../../assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '../../../assets/images/portrait/small/avatar-s-7.jpg'
import ReactPaginate from 'react-paginate'
import DocumentSettings from './document-settings'

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Col, Label,Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Play, Plus, Settings, Search, ArrowRight, Calendar,MoreVertical, Edit, Trash, Filter, Send, Eye, ChevronDown, Download } from 'react-feather'

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

const List = () => {
    // ** State
    const [active, setActive] = useState('1')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    const [currentPage, setCurrentPage] = useState(0)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
    const CustomPagination = () => (
        <ReactPaginate
          nextLabel=''
          breakLabel='...'
          previousLabel=''
          pageRangeDisplayed={2}
          forcePage={currentPage}
          marginPagesDisplayed={2}
          activeClassName='active'
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          pageCount={1}
          onPageChange={page => handlePagination(page)}
          containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        />
      )
      const createPurchase = () => {
        navigate('/apps/quotations/create')
      }   

    return (
        <div className='quotation-tabs card'>
            <div className='quotation-top-bar'>
                <div className='quotation-heading'><h3>Quotations<span className='playcircle-icon'><Play /></span></h3></div>
                <div className='settings-create-btns'>
                    <button className='document-btn' onClick={toggleSidebar}><span className='settings-icon'><Settings /></span>Document Settings</button>
                    <button className='create-btn btn-primary' onClick={createPurchase}><span className='plus-icon'><Plus /></span>Create Estimate</button>
                </div>
            </div>
            <Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            active={active === '1'}
                            onClick={() => {
                                toggle('1')
                            }}
                        >
                            All Transactions
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '2'}
                            onClick={() => {
                                toggle('2')
                            }}
                        >
                            Cancelled
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='py-50' activeTab={active}>
                    <TabPane tabId='1'>
                        <div className='tabs-content-holder'>
                            <div className='tabs-search-calendar'>
                                <div className='col-lg-3 tabs-search'>
                                    <span className='search-icon'><Search /></span>
                                    <Input
                                        className='dataTable-filter'
                                        type='text'
                                        bsSize='sm'
                                        id='search-input'
                                        placeholder='Search by transaction, customers, invoice #... '
                                    />
                                </div>
                                <div className='col-lg-3 tabs-calendar'>
                                    <Col md='6' className='date'>
                                        <Flatpickr
                                            className='form-control'
                                            id='date'
                                            // value={Picker}
                                            options={{ mode: 'range', dateFormat: 'm/d/Y' }}
                                        // onChange={date => handleDateFilter(date)}
                                        />
                                    </Col>
                                    <div className='picker-range-separato'><ArrowRight /></div>
                                    <Col md='6' className='end-date'>
                                        <Flatpickr
                                            className='form-control'
                                            id='date'
                                            // value={Picker}
                                            options={{ mode: 'range', dateFormat: 'm/d/Y' }}
                                        // onChange={date => handleDateFilter(date)}
                                        />
                                        <span className='calendar'><Calendar /></span>
                                    </Col>
                                </div>
                            </div>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th className='bill'>
                                      <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Filter size={15} />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                            <div className='table-filter-dropdown'>
                                                <div className='dropdown-input'><Input class="ant-checkbox-input" type="checkbox" /><label className='label'>Open</label></div>
                                                <div className='dropdown-input'><Input class="ant-checkbox-input" type="checkbox" /><label className='label'>Closed</label></div>
                                                <div className='reset-text'>
                                                   <a className='reset-btn' href='#'>Reset</a> 
                                                   <a className='ok-btn' href='#'>Ok</a> 
                                                </div>
                                            </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                     Bill #
                                    </th>
                                    <th className='updated-time'>
                                    <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Filter size={15} />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                              <div className='table-filter-dropdown'>
                                                <div className='dropdown-input'>
                                                  <div className='dropdown-select-all-items'>
                                                    <Input class="ant-checkbox-input" type="checkbox" /><label className='label'>Select all items</label>
                                                  </div>
                                                  <div className='dropdown-to-dropdown'>
                                                   <div className='dropdown-input'><Input class="ant-checkbox-input" type="checkbox" /><label className='label'>Invoice</label></div>
                                                   <div className='dropdown-input'><Input class="ant-checkbox-input" type="checkbox" /><label className='label'>POS</label></div>
                                                   <div className='dropdown-input'><Input class="ant-checkbox-input" type="checkbox" /><label className='label'>Users</label></div>
                                                  </div>
                                                </div>
                                                <div className='reset-text'>
                                                   <a className='reset-btn' href='#'>Reset</a> 
                                                   <a className='ok-btn' href='#'>Ok</a> 
                                                </div>
                                            </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    Customer
                                    </th>
                                    <th><span><span class="font-size-12 mt-0 mb-0">Date / </span><span class="font-size-10 mb-0 mt-0">Updated Time</span></span></th>
                                    <th style={{textAlign: 'right'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img className='me-75' src={angular} alt='angular' height='20' width='20' />
                                        <span className='align-middle fw-bold'>Angular Project</span>
                                    </td>
                                    <td>Peter Charles</td>
                                    <td>
                                        <AvatarGroup data={avatarGroupData1} />
                                    </td>
                                    <td>
                                        <Badge pill color='light-primary' className='me-1'>
                                            Active
                                        </Badge>
                                    </td>
                                    <td>
                                        <p>Date 25-06-2023</p>
                                    </td>
                                    <td>
                                    <div className='list-action-btns'>
                                      <div className='view-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Eye size={11} />View
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div>
                                        <div className='send-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Send size={11} />Send
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div> 
                                        <div className='toggle-noarrow'>
                                        <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <ChevronDown size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Download className='me-50' size={15} /> <span className='align-middle'>Download</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Duplicate</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Thermal Print</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Delivery Challan</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Create E-way Bill</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to Sale</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to ProForma Invoice</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Cancel Estimate</span>
                                            </DropdownItem>                                                                                                                                                                                                                                                                                                                    
                                        </DropdownMenu>
                                    </UncontrolledDropdown> 
                                    </div> 
                                    </div>                                     
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className='me-75' src={react} alt='react' height='20' width='20' />
                                        <span className='align-middle fw-bold'>React Project</span>
                                    </td>
                                    <td>Ronald Frest</td>
                                    <td>
                                        <AvatarGroup data={avatarGroupData2} />
                                    </td>
                                    <td>
                                        <Badge pill color='light-success' className='me-1'>
                                            Completed
                                        </Badge>
                                    </td>
                                    <td>
                                      <p>Date 25-06-2023</p>
                                    </td>
                                    <td>
                                    <div className='list-action-btns'>
                                      <div className='view-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Eye size={11} />View
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div>
                                        <div className='send-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Send size={11} />Send
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div> 
                                        <div className='toggle-noarrow'>
                                        <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <ChevronDown size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Download className='me-50' size={15} /> <span className='align-middle'>Download</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Duplicate</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Thermal Print</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Delivery Challan</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Create E-way Bill</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to Sale</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to ProForma Invoice</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Cancel Estimate</span>
                                            </DropdownItem>                                                                                                                                                                                                                                                                                                                    
                                        </DropdownMenu>
                                    </UncontrolledDropdown> 
                                    </div> 
                                    </div> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className='me-75' src={vuejs} alt='vuejs' height='20' width='20' />
                                        <span className='align-middle fw-bold'>Vuejs Project</span>
                                    </td>
                                    <td>Jack Obes</td>
                                    <td>
                                        <AvatarGroup data={avatarGroupData3} />
                                    </td>
                                    <td>
                                        <Badge pill color='light-info' className='me-1'>
                                            Scheduled
                                        </Badge>
                                    </td>
                                    <td>
                                        <p>Date 25-06-2023</p>
                                    </td>
                                    <td>
                                    <div className='list-action-btns'>
                                      <div className='view-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Eye size={11} />View
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div>
                                        <div className='send-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Send size={11} />Send
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div> 
                                        <div className='toggle-noarrow'>
                                        <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <ChevronDown size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Download className='me-50' size={15} /> <span className='align-middle'>Download</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Duplicate</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Thermal Print</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Delivery Challan</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Create E-way Bill</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to Sale</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to ProForma Invoice</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Cancel Estimate</span>
                                            </DropdownItem>                                                                                                                                                                                                                                                                                                                    
                                        </DropdownMenu>
                                    </UncontrolledDropdown> 
                                    </div> 
                                    </div> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className='me-75' src={bootstrap} alt='bootstrap' height='20' width='20' />
                                        <span className='align-middle fw-bold'>Bootstrap Project</span>
                                    </td>
                                    <td>Jerry Milton</td>
                                    <td>
                                        <AvatarGroup data={avatarGroupData4} />
                                    </td>
                                    <td>
                                        <Badge pill color='light-warning' className='me-1'>
                                            Pending
                                        </Badge>
                                    </td>
                                    <td>
                                        <p>Date 25-06-2023</p>
                                    </td>
                                    <td>
                                    <div className='list-action-btns'>
                                      <div className='view-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Eye size={11} />View
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div>
                                        <div className='send-btn'>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                <Send size={11} />Send
                                            </DropdownToggle>
                                        </UncontrolledDropdown>
                                        </div> 
                                        <div className='toggle-noarrow'>
                                        <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <ChevronDown size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Download className='me-50' size={15} /> <span className='align-middle'>Download</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Duplicate</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Thermal Print</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Delivery Challan</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Create E-way Bill</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to Sale</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Convert to ProForma Invoice</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='me-50' size={15} /> <span className='align-middle'>Cancel Estimate</span>
                                            </DropdownItem>                                                                                                                                                                                                                                                                                                                    
                                        </DropdownMenu>
                                    </UncontrolledDropdown> 
                                    </div> 
                                    </div> 
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='pagination-section'>
                           <a onClick={() => CustomPagination}>1</a>
                         </div>
                    </TabPane>
                    <TabPane tabId='2'>
                        <p>
                            Dragée jujubes caramels tootsie roll gummies gummies icing bonbon. Candy jujubes cake cotton candy. Jelly-o
                            lollipop oat cake marshmallow fruitcake candy canes toffee. Jelly oat cake pudding jelly beans brownie lemon
                            drops ice cream halvah muffin. Brownie candy tiramisu macaroon tootsie roll danish.
                        </p>
                        <p>
                            Croissant pie cheesecake sweet roll. Gummi bears cotton candy tart jelly-o caramels apple pie jelly danish
                            marshmallow. Icing caramels lollipop topping. Bear claw powder sesame snaps.
                        </p>
                    </TabPane>
                    <TabPane tabId='3'>
                        <p>
                            Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame snaps. Dessert macaroon bonbon carrot
                            cake biscuit. Lollipop lemon drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear claw pie
                            halvah oat cake cotton candy sweet roll. Cotton candy sweet roll donut ice cream.
                        </p>
                        <p>
                            Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears chocolate cake topping powder. Sweet
                            marzipan cheesecake jelly-o powder wafer lemon drops lollipop cotton candy.
                        </p>
                    </TabPane>
                </TabContent>
                 <DocumentSettings open={sidebarOpen} toggleSidebar={toggleSidebar} />
            </Fragment>
        </div>
    )
}
export default List    

