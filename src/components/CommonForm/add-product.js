// ** React Import
import { useState, Fragment, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import jwtDecode from "jwt-decode";

import styles from "./add-product.module.css";
// ** Utils
import { primaryUnitList } from "../../utility/Utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";

// antd imports
import {
  Tooltip,
  Radio,
  InputNumber,
  Select,
  Collapse,
  Input,
  Switch,
  Upload,
  Drawer,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

// ** Reactstrap Imports
import { Button, Label, FormText, Row, Col } from "react-bootstrap";

// font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

// React strap import
import {
  Card,
  CardHeader,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// React Bootstrap import
import { InputGroup, Form, Dropdown, DropdownButton } from "react-bootstrap";

// ** Store & Actions
import { useDispatch } from "react-redux";

// React Quill rich editor import
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileUpload from "./fileUpload";
import { addProduct, updateProduct } from "../../api/addProductManagement";

// bottom toggle data
const { Panel } = Collapse;

const AddProductForm = ({
  open,
  setOpenSidebar,
  getProductData,
  getProductListHandler,
  setProductData,
}) => {
  const [getRandomNumber, setRandomNumber] = useState("");
  const [active, setActive] = useState("1");
  const [getGSTmodal, setGSTModal] = useState(false);
  const [getHSNModal, setHSNmodal] = useState(false);
  const [getDiscount, setDiscount] = useState("percentage");
  const [fileList, setFileList] = useState([]);
  const [getProductDetails, setProductDetails] = useState("product");
  const [getProductLoader, setProductLoader] = useState(false);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const LoaderIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#fff",
      }}
      spin
    />
  );

  // ** Vars
  const {
    control,
    register,
    setValue,
    setError,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const productInformation = watch();

  useEffect(() => {
    reset();
    setRandomNumber("");
    setDiscount("percentage");
    setFileList([]);
    setProductDetails("product");
    setValue("discount", 0);
  }, [open]);

  useEffect(() => {
    setValue(
      "opening_stock_value",
      watch("opening_quantity") * watch("opening_purchase_price")
    );
  }, [watch("opening_quantity"), watch("opening_purchase_price")]);

  const getGSTModalHandler = () => {
    setGSTModal(!getGSTmodal);
  };

  const addProductHandler = (data) => {
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    const formData = new FormData();
    formData.append("item_name", data.item_name);
    formData.append("item_type", getProductDetails);
    formData.append("sell_price", Number(data.sell_price));
    formData.append("tax", data.tax ? data.tax : 0);
    formData.append("is_price_with_tax", data.is_price_with_tax);
    formData.append("primary_unit", data.primary_unit);
    formData.append("hsn_code", data.hsn_code);
    formData.append("barcode", getRandomNumber);
    formData.append(
      "purchase_price",
      data.purchase_price ? Number(data.purchase_price) : 0
    );

    fileList?.length > 0
      ? fileList.forEach((item) => {
        formData.append("product_image", item?.originFileObj);
      })
      : formData.append("product_image", fileList);

    formData.append("description", data.description ? data.description : "");
    formData.append("opening_quantity", Number(data.opening_quantity));
    formData.append(
      "opening_purchase_price",
      Number(data.opening_purchase_price)
    );
    formData.append("opening_stock_value", Number(data.opening_stock_value));
    formData.append("discount", data.discount ? Number(data.discount) : 0);
    formData.append(
      "discount_amount",
      data.discount_amount ? Number(data.discount_amount) : 0
    );
    formData.append("show_discount_in", getDiscount);
    formData.append("cess", data.cess ? Number(data.cess) : 0);
    formData.append(
      "minimum_stock_quantity",
      data.minimum_stock_quantity ? Number(data.minimum_stock_quantity) : 0
    );
    formData.append("show_online", data.show_online ? data.show_online : false);
    formData.append(
      "not_for_sale",
      data.not_for_sale ? data.not_for_sale : false
    );
    formData.append("user_id", token.user_id);

    const ProductResponse =
      Object.keys(getProductData)?.length === 0
        ? addProduct(formData)
        : updateProduct(getProductData?.product_id, formData);

    ProductResponse.then((response) => {
      setProductLoader(true);
      if (response.status === 200) {
        getProductData?.product_id
          ? message.success("Product updated successfully")
          : message.success("Product added successfully");
        setOpenSidebar(false);
        setProductLoader(false);
        getProductListHandler();
        setProductData([]);
      }
    }).catch((error) => {
      message.error("Somethings went wrong");
      setProductLoader(false);
    });
  };

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 10 ** 9));
  };

  useEffect(() => {
    if (getProductData && Object.keys(getProductData)?.length > 0) {
      setValue("item_name", getProductData?.item_name);
      setValue("sell_price", getProductData?.sell_price);
      setValue("primary_unit", getProductData?.primary_unit);
      setRandomNumber(getProductData?.barcode);
      setValue("purchase_price", getProductData?.purchase_price);
      setValue("hsn_code", getProductData?.hsn_code);
      setValue("description", getProductData?.description);
      setValue("cess", getProductData?.cess);
      setValue("discount", getProductData?.discount);
      setValue("discount_amount", getProductData?.discount_amount);
      setValue("opening_quantity", getProductData?.opening_quantity);
      setValue(
        "opening_purchase_price",
        getProductData?.opening_purchase_price
      );
      setValue("opening_stock_value", getProductData?.opening_stock_value);
      setValue(
        "minimum_stock_quantity",
        getProductData?.minimum_stock_quantity
      );
      setValue("is_price_with_tax", getProductData?.is_price_with_tax);
      setValue("show_online", getProductData?.show_online);
      setValue("not_for_sale", getProductData?.not_for_sale);
      setValue("product_image", fileList);
      setProductDetails(getProductData?.item_type);
    }
  }, [getProductData]);

  return (
    <Drawer
      open={open}
      title={
        <span className={styles.add_item_heading_main_span}>
          <span className={styles.add_item_heading_span}>
            {Object.keys(getProductData).length > 0
              ? "Update Item"
              : "Add Item"}
          </span>
          <span>
            <Button color="primary" className="add-item-btn">
              {getProductLoader && <Spin indicator={LoaderIcon} />}{" "}
              {Object.keys(getProductData).length > 0
                ? "Update Item"
                : "Add Item"}
            </Button>
          </span>
        </span>
      }
      width={"54%"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      onClose={() => setOpenSidebar(false)}
    >
      <div className={styles.details_sidebar_main_div}>
        <Fragment>
          <Nav tabs className={styles.main_fragment}>
            <NavItem>
              <NavLink
                className={styles.details_nav_link}
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                Details
              </NavLink>
            </NavItem>
            <Tooltip
              placement="right"
              title={
                <small>
                  It will be enabled once created the product. Click on Add Item
                  and then Edit to add attachments.
                </small>
              }
            >
              <NavItem className={styles.attachment_nav_item}>
                <NavLink
                  className={styles.details_nav_link}
                  disabled
                  active={active === "2"}
                  onClick={() => {
                    toggle("2");
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
          <TabContent
            className={`py-50 ${styles.detail_tab_contain}`}
            activeTab={active}
          >
            <TabPane tabId="1">
              <Form className={styles.product_form_container}>
                <div className={styles.details_tab_main_div}>
                  <div className={styles.basic_detail_heading_div}>
                    <h5 className={styles.details_nav_link}>Basic Details</h5>
                    {/* <h6 className='add-custom-field-heading'> <FontAwesomeIcon className='plus-circle' icon={faCirclePlus} />Add Custom field</h6> */}
                  </div>
                  <div className={styles.add_product_form_main_div}>
                    <div className={styles.radio_btn_div}>
                      <Radio.Group
                        value={getProductDetails}
                        buttonStyle="solid"
                        onChange={(e) => setProductDetails(e.target.value)}
                      >
                        <Radio.Button value="service">Service</Radio.Button>
                        <Radio.Button value="product">Product</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className={styles.radio_btn_div}>
                      <span className={styles.text_danger}>*</span>
                      <span className={styles.text_dark}>Item Name</span>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="item_name"
                          placeholder="Enter Item Name"
                          {...register("item_name", {
                            required: "Please fill item name",
                          })}
                          value={watch("item_name")}
                        />
                      </InputGroup>
                      {errors.item_name && (
                        <span className="error_message_product">
                          {errors?.item_name?.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.radio_btn_div}>
                      <Row>
                        <Col md="6" className={styles.add_product_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            Selling Price
                          </span>
                          <InputGroup>
                            <Form.Control
                              type="number"
                              name="sell_price"
                              placeholder="Enter Selling Price"
                              value={watch("sell_price")}
                              className="selling-price-input"
                              {...register("sell_price", {
                                validate: (match) => {
                                  return match < 0
                                    ? "Selling Price not less than 0"
                                    : true;
                                },
                              })}
                            />
                            {/* <Form.Select className='with-tax' {...register('is_price_with_tax')}>
                              <option value='with Tax'>with Tax</option>
                              <option value='without Tax'>without Tax</option>
                            </Form.Select> */}
                          </InputGroup>
                          {errors.sell_price && (
                            <p className="error_message_product">
                              {errors?.sell_price?.message}
                            </p>
                          )}
                        </Col>
                        <Col md="6" className={styles.selling_price_col_2}>
                          <button
                            type="button"
                            className="add-gst-num-btn"
                            onClick={getGSTModalHandler}
                          >
                            Add GST Number
                          </button>
                          <Modal
                            isOpen={getGSTmodal}
                            toggle={getGSTModalHandler}
                            className="modal-dialog-centered"
                            zIndex={2000}
                          >
                            <ModalHeader
                              toggle={getGSTModalHandler}
                              className="gst-modal-header"
                            >
                              <span className={styles.gst_modal_heading}>
                                Add GSTIN
                              </span>
                            </ModalHeader>
                            <ModalBody>
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  className={styles.gst_num_input}
                                  placeholder="Enter 15 digit GSTIN"
                                />
                              </InputGroup>
                              <Button
                                color="primary"
                                className={styles.add_gst_modal_btn}
                                onClick={() => setGSTModal(true)}
                              >
                                Add GSTIN
                              </Button>
                            </ModalBody>
                            {/* <ModalFooter className='gst-modal-footer'>
                           {' '}
                            </ModalFooter> */}
                          </Modal>
                          <span>
                            <small>
                              Add GST Details to add tax for the products.
                            </small>
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.primary_unit_main_div}>
                      <Row>
                        <Col md="6" className={styles.add_product_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            Primary Unit
                          </span>
                          <Form.Select
                            {...register("primary_unit")}
                            placeholder="Select Unit"
                            value={watch("primary_unit")}
                          >
                            {primaryUnitList?.map((unit) => {
                              return (
                                <option
                                  value={unit}
                                  hidden={unit === "" ? true : false}
                                >
                                  {unit === "" ? "Please select unit" : unit}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <a
                            href="https://einvoice1.gst.gov.in/Others/MasterCodes"
                            target="_blank"
                            className="UQC_code"
                          >
                            GST approved UQC codes.
                          </a>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className={styles.additional_information_heading_div}>
                    <span
                      className={`mb-1 ${styles.additional_information_heading_span} `}
                    >
                      Additional Information
                    </span>
                    <span className={styles.optional_span}>OPTIONAL</span>
                  </div>
                  <div className={styles.additional_information_main_div}>
                    <div className={styles.opening_quantity_div}>
                      <Row>
                        <Col
                          md="6"
                          className={`mb-2 ${styles.add_product_col_1}`}
                        >
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            HSN/SAC Code
                          </span>
                          <span className={styles.hsn_field}>
                            <InputGroup className={styles.hsn_input_field}>
                              <Form.Control
                                type="text"
                                className={styles.hsn_input}
                                placeholder="Enter HSN/sac Code"
                                {...register("hsn_code")}
                                value={watch("hsn_code")}
                              />
                            </InputGroup>
                            <span className={styles.ant_input_group_addon}>
                              <button
                                onClick={() => setHSNmodal(true)}
                                type="button"
                                className={styles.hsn_btn}
                              >
                                Search HSN codes
                              </button>
                            </span>
                          </span>
                          <span className="hsn-extra-information">
                            Click here to check{" "}
                            <a
                              href="https://einvoice1.gst.gov.in/Others/MasterCodes"
                              target="_blank"
                            >
                              GST approved HSN/SAC codes.
                            </a>
                          </span>
                        </Col>
                        <Drawer
                          title={
                            <span className={styles.search_hsn_heading}>
                              Search HSN
                            </span>
                          }
                          width={"50%"}
                          closable={true}
                          onClose={() => setHSNmodal(false)}
                          open={getHSNModal}
                        >
                          <div className={styles.ant_drawer_body_div}>
                            <Input
                              placeholder="HSN/SAC Code (Optional) "
                              className={styles.search_hsn_input}
                            />

                            <Button
                              color="primary"
                              className={styles.add_hsn_btn}
                            >
                              Use this HSN
                            </Button>
                          </div>
                        </Drawer>
                        <Col md="6" className={styles.add_product_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.purchase_price_label_span}`}
                          >
                            Purchase Price
                          </span>
                          <span className={styles.hsn_field}>
                            <InputGroup>
                              <Form.Control
                                type="number"
                                className="purchase-price-input"
                                value={watch("purchase_price")}
                                {...register("purchase_price", {
                                  validate: (match) => {
                                    return match < 0
                                      ? "Purchase Price not less than 0"
                                      : true;
                                  },
                                })}
                              />
                            </InputGroup>
                            <span>
                              <Form.Select
                                className={styles.purchase_price_select}
                                {...register("is_price_with_tax")}
                                value={watch("is_price_with_tax")}
                              >
                                <option Selected value="without Tax">
                                  without Tax
                                </option>
                                <option value="with Tax">with Tax</option>
                              </Form.Select>
                            </span>
                          </span>
                          {errors.purchase_price && (
                            <p className="error_message_product">
                              {errors?.purchase_price?.message}
                            </p>
                          )}
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.barcode_category_main_div}>
                      <Row>
                        <Col md="6" className={styles.add_product_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            Barcode
                          </span>
                          <span
                            className={`${styles.hsn_field} ${styles.sac_bar_code}`}
                          >
                            <InputGroup className={styles.hsn_input_field}>
                              <Form.Control
                                type="text"
                                className={styles.barcode_input}
                                placeholder="2356897412"
                                {...register("barcode")}
                                value={getRandomNumber}
                              />
                            </InputGroup>
                            <span>
                              <button
                                type="button"
                                className={styles.barcode_btn}
                                onClick={() => generateRandomNumber()}
                              >
                                <FontAwesomeIcon
                                  className={styles.barcode_icon}
                                  icon={faWandMagicSparkles}
                                />
                                Auto Generate
                              </button>
                            </span>
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.barcode_category_main_div}>
                      <span
                        className={`${styles.text_dark} ${styles.text_danger}`}
                      >
                        Product Image
                      </span>
                      {/* <Form.Control
                        type="file"
                        {...register("product_image")}
                        onChange={imageUploader}
                      ></Form.Control> */}

                      <FileUpload
                        setFileList={setFileList}
                        fileList={fileList}
                      />

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
                      <spna className={styles.upload_image_extra_text}>
                        &nbsp;Product images must be PNG or JPEG, recommended
                        1024
                        <br /> &nbsp; px by 1024 px or 1:1 aspect ratio.
                      </spna>
                    </div>
                    <div className={styles.additional_information_heading_div}>
                      <span
                        className={`${styles.text_dark} ${styles.text_danger}`}
                      >
                        Description
                      </span>
                      <div className={styles.rich_editor_sub_div}>
                        <div>
                          <ReactQuill
                            name="description"
                            className={styles.rich_editor_field}
                            theme="snow"
                            value={watch("description")}
                            onChange={(value) => {
                              setValue("description", value);
                            }}
                          // {...register('description')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.additional_information_heading_div}>
                    <span className={styles.opening_stock_heading_span}>
                      Opening Stock
                    </span>
                    <span className={styles.optional_span}>OPTIONAL</span>
                  </div>
                  <div className={styles.opening_stock_main_div}>
                    <div className={styles.opening_quantity_div}>
                      <Row>
                        <Col md="6" className={styles.add_product_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            Opening Quantity
                          </span>
                          <InputGroup>
                            <Form.Control
                              type="number"
                              className={styles.quantity_input}
                              placeholder="eg. 10"
                              {...register("opening_quantity", {
                                validate: (match) => {
                                  return match < 0
                                    ? "Opening Quantity not less than 0"
                                    : true;
                                },
                              })}
                              value={watch("opening_quantity")}
                            />
                          </InputGroup>

                          {errors.opening_quantity && (
                            <p className="error_message_product">
                              {errors?.opening_quantity?.message}
                            </p>
                          )}
                          <p>
                            *Quantity of the product available in your existing
                            inventory
                          </p>
                        </Col>
                        <Col md="6" className={styles.add_product_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            Opening Purchase Price (with tax)
                          </span>
                          <InputGroup
                            className={styles.opening_purchase_input_group}
                          >
                            <Form.Control
                              type="number"
                              className={styles.opening_purchase_price_input}
                              placeholder="eg. 100.00"
                              {...register("opening_purchase_price", {
                                validate: (match) => {
                                  return match < 0
                                    ? "Opening Purchase Price not less than 0"
                                    : true;
                                },
                              })}
                              value={watch("opening_purchase_price")}
                            />
                          </InputGroup>
                          {errors.opening_purchase_price && (
                            <p className="error_message_product">
                              {errors?.opening_purchase_price?.message}
                            </p>
                          )}
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.opening_stock_div}>
                      <Row>
                        <Col md="6" className={styles.opening_stock_col_1}>
                          <span
                            className={`${styles.text_dark} ${styles.text_danger}`}
                          >
                            Opening Stock Value (with tax)
                          </span>
                          <InputGroup>
                            <Form.Control
                              type="number"
                              className={styles.quantity_input}
                              placeholder="eg. 100.00"
                              disabled
                              value={
                                watch("opening_stock_value")
                                  ? watch("opening_stock_value")
                                  : 0
                              }
                              {...register("opening_stock_value", {
                                validate: (match) => {
                                  return match < 0
                                    ? "Opening Stock value not less than 0"
                                    : true;
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.opening_stock_value && (
                            <p className="error_message_product">
                              {errors?.opening_stock_value?.message}
                            </p>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className={styles.product_more_details_section}>
                    <Collapse>
                      <Panel
                        header={
                          <div className={styles.tags_text}>
                            <span>More Details?</span>
                            <p>
                              Cess, Discount, Show Online, Inventory tracking,
                              Low stock alerts etc.
                            </p>
                          </div>
                        }
                        key="1"
                      >
                        <div className={styles.discount_section}>
                          <Row>
                            <Col md="6" className="mb-1">
                              <div className={styles.discount_fild}>
                                <label>Discount(%)</label>
                                <InputGroup>
                                  <Form.Control
                                    addonAfter="%"
                                    className={styles.discount_percent_input}
                                    type="number"
                                    placeholder="0"
                                    name="document_color"
                                    {...register("discount", {
                                      validate: (match) => {
                                        return match < 100
                                          ? true
                                          : "Discount should be less than or equal to 100%";
                                      },
                                    })}
                                    value={watch("discount")}
                                  />
                                </InputGroup>
                                {errors.discount && (
                                  <p className="error_message_product">
                                    {errors?.discount?.message}
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col md="6" className="mb-1">
                              <div className={styles.discount_fild}>
                                <label>Discount Amount</label>
                                <InputGroup>
                                  <Form.Control
                                    addonAfter="₹"
                                    className={styles.discount_percent_input}
                                    type="number"
                                    placeholder="0"
                                    name="document_color"
                                    {...register("discount_amount", {
                                      validate: (match) => {
                                        return match < 0
                                          ? "Discount Amount value not less than 0"
                                          : true;
                                      },
                                    })}
                                    value={watch("discount_amount")}
                                  />
                                </InputGroup>
                                {errors.discount_amount && (
                                  <p className="error_message_product">
                                    {errors?.discount_amount?.message}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <div className={styles.add_product_col_1}>
                            <span>
                              <b>Show Discount in</b>
                            </span>
                            <Radio.Group
                              onChange={(e) => setDiscount(e.target.value)}
                              value={getDiscount}
                            >
                              <Radio value={"percentage"}>
                                <b>Percentage</b>
                              </Radio>
                              <Radio value={"amount"}>
                                <b>Amount</b>
                              </Radio>
                            </Radio.Group>
                            <span
                              className={styles.discount_type_information_span}
                            >
                              Discount will be shown based on the selected
                              option and is applicable only for online store.
                            </span>
                          </div>
                          <div className={styles.barcode_category_main_div}>
                            <Row>
                              <Col
                                md="6"
                                className={`mb-1 ${styles.add_product_col_1}`}
                              >
                                <span>Cess</span>
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    className={styles.search_hsn_input}
                                    placeholder="eg. 10"
                                    {...register("cess", {
                                      validate: (match) => {
                                        return match < 0
                                          ? "Cess Amount value not less than 0"
                                          : true;
                                      },
                                    })}
                                    value={watch("cess")}
                                  />
                                </InputGroup>
                                {errors.cess && (
                                  <p className="error_message_product">
                                    {errors?.cess?.message}
                                  </p>
                                )}
                              </Col>
                              <Col
                                md="6"
                                className={`mb-1 ${styles.add_product_col_1}`}
                              >
                                <span>
                                  <b>Low Stock Alert at</b>
                                </span>
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    className={styles.search_hsn_input}
                                    placeholder="eg. 10"
                                    {...register("minimum_stock_quantity", {
                                      validate: (match) => {
                                        return match < 0
                                          ? "Minimum stock quantity value not less than 0"
                                          : true;
                                      },
                                    })}
                                    value={watch("minimum_stock_quantity")}
                                  />
                                </InputGroup>
                                {errors.minimum_stock_quantity && (
                                  <p className="error_message_product">
                                    {errors?.minimum_stock_quantity?.message}
                                  </p>
                                )}
                                <span className="low-stock-information-span">
                                  You will be notified once the stock reaches
                                  the minimum stock qty. (BETA)
                                </span>
                              </Col>
                            </Row>
                          </div>
                          <div className={styles.barcode_category_main_div}>
                            <Row>
                              <Col md="6" className={styles.add_product_col_1}>
                                <span>
                                  <b>Show in Online Store</b>
                                </span>
                                <Switch
                                  className={styles.show_online_store_switch}
                                  size="default"
                                  checked={
                                    watch("show_online")
                                      ? watch("show_online")
                                      : false
                                  }
                                  onChange={(value) =>
                                    setValue("show_online", value)
                                  }
                                />
                                <span
                                  className={
                                    styles.show_online_store_information_span
                                  }
                                >
                                  Show or hide the product in catalogue/ online
                                  store
                                </span>
                              </Col>
                              <Col md="6" className={styles.add_product_col_1}>
                                <span>
                                  <b>Not For Sale</b>
                                </span>
                                <Switch
                                  className={styles.not_for_sale_switch}
                                  size="default"
                                  checked={
                                    watch("not_for_sale")
                                      ? watch("not_for_sale")
                                      : false
                                  }
                                  onChange={(value) =>
                                    setValue("not_for_sale", value)
                                  }
                                />
                                <span
                                  className={
                                    styles.not_for_sale_information_span
                                  }
                                >
                                  Hides the item for sale and shows only while
                                  making a purchase. eg. Office equipment
                                </span>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
                <div className={styles.product_button_position}>
                  <Button
                    color="primary"
                    className={styles.save_update_button}
                    type="submit"
                    onClick={handleSubmit(addProductHandler)}
                  >
                    {getProductLoader && <Spin indicator={LoaderIcon} />}{" "}
                    {Object.keys(getProductData).length > 0
                      ? "Update Item"
                      : "Add Item"}
                  </Button>
                </div>
              </Form>
            </TabPane>
          </TabContent>
        </Fragment>
      </div>
    </Drawer>
  );
};

export default AddProductForm;
