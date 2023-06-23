// ** React Import
import { useEffect, useState } from "react";

// ** Third Party Components
// import Select from 'react-select'
import { useForm } from "react-hook-form";
// import './signature.css'
import styles from "./signature.module.css";
// ** Reactstrap Imports
import { Button, Label } from "reactstrap";
import { Upload, message, Drawer, Modal, Spin } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
// Add Signature Management imports
import { addNewSignatureData } from "../../api/signature";
import { Form, InputGroup } from "react-bootstrap";
// ** Store & Actions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSignature } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";

const defaultValues = {
  signature_name: "",
  signature_image: [],
  user_id: 0,
};

const AddSignatureForm = ({
  open,
  setOpenSignatureBar,
  getSignatureListHandler,
}) => {
  // ** States
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  // Signature Image Upload States
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [fileUploadError, setFileUploadError] = useState(false);
  // ** Vars
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    setFileUploadError(false);

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    } else if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    } else {
      setFileUploadError(true);
    }
    return false;
  };

  const addSignatureDetailHandler = (signatureInfo) => {
    setLoading(true);
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    let upload_image = [];
    fileList.forEach((item) => {
      return upload_image.push(item.thumbUrl);
    });
    const modifiedBankingInfo = {
      ...signatureInfo,
      signature_image: upload_image,
      user_id: token.user_id,
    };
    const newSignatureResponse = addNewSignatureData(modifiedBankingInfo);
    newSignatureResponse
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          message.success("Signature Created Successfully");
          setLoading(false);
        }
      })
      .catch((err) => message.error("Something went wrong"));
    reset();
    setOpenSignatureBar(false);
    getSignatureListHandler();
    setLoading(false);
  };

  const text = (
    <span>
      <small>
        A UPI ID or VPA (Virtual Payment Address) is a unique ID that is used to
        make UPI payments in place of bank account details.
        <br />
        This UPI ID will be used to generate <b>Dynamic QR codesr</b> on the
        invoices and bills.
      </small>
    </span>
  );

  //Signature Image Base64 Function
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log(file, "hellllo");
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    fileUploadError && setFileList(newFileList);
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

  useEffect(() => {
    reset();
    setFileList([]);
  }, [open]);

  return (
    <Drawer
      size="lg"
      width={"54%"}
      open={open}
      onClose={() => setOpenSignatureBar(false)}
      title={
        <span className={styles.add_item_heading_main_span}>
          <span className={styles.add_item_heading_span}>
            Signature Details
          </span>
          <span>
            <Button
              onClick={handleSubmit(addSignatureDetailHandler)}
              color="primary"
              className={styles.save_update_button}
            >
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "white" }}
                      spin
                    />
                  }
                />
              )}
              Save & Update
            </Button>
          </span>
        </span>
      }
      headerClassName="mb-1"
      contentClassName="pt-0"
    >
      <div>
        <Form>
          <div className={styles.basic_details_card}>
            <div className={styles.basic_details_card_body}>
              <div className={styles.signature_input_name_div}>
                <Label className={styles.basic_details_label}>
                  <em style={{ color: "red" }}>*</em> Signature Name
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="signature_name"
                    className={styles.vendor_name}
                    placeholder="Signature Name (This is only for your reference and will not be shown on the documents"
                    {...register("signature_name", {
                      required: "Please fill Signature Name",
                    })}
                  />
                </InputGroup>
                {errors?.signature_name && (
                  <span className={styles.add_signature_error_msg}>
                    {errors?.signature_name?.message}
                  </span>
                )}
              </div>
              <div className={styles.signature_extra_information}>
                Signature Name is only for your reference and will not be shown
                on the documents.
              </div>
              <div className={styles.field_down}>
                <Label className={styles.basic_details_label}>
                  Signature Image
                </Label>
                <div>
                  <div>
                    <span>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className={styles.image_validation_text}>
                  Images must be PNG or JPEG, recommended 1:1 (1024 x 1024
                  pixels) or 4:3 (640 x 480 Pixels) aspect ratios.
                </p>
              </div>
            </div>
          </div>
        </Form>
        <div>
          <h4 className={styles.signature_text}>
            <span style={{ marginRight: "8px" }}>Your Signature.</span>
            <span>
              Your Authority. <FontAwesomeIcon icon={faSignature} />
            </span>
          </h4>
          <img
            src="https://app.getswipe.in/resources/images/signature.jpg"
            className={styles.signature_image_url}
          />
        </div>
        <div className={styles.button_position_signature}>
          <Button
            color="primary"
            className={styles.save_update_button}
            onClick={handleSubmit(addSignatureDetailHandler)}
          >
            {loading && (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "white" }}
                    spin
                  />
                }
              />
            )}
            Save & Update
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "8px" }}
            />
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default AddSignatureForm;
