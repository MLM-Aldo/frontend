import axios from "axios";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function RequestFund() {
  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [notify, setNotify] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  let [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const [imageFile, setImageFile] = useState(null);

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDropzoneChange = (files) => {
    setFiles(files);
  };

  //Edit Request Fund
  const [amount_requested, setRequestFund] = useState("");
  const [paymentMode, setPaymentMode] = useState('');


  const requestAmount = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("amount_requested", amount_requested);
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      console.log(formData.get("file"));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      // form data post request
      const fileUploadResponse = await axios.post(
        base_url + "users/fileUpload",
        formData,
        config
      );
      const requestFundResponse = await axios.post(
        base_url + "users/" + user._id + "/requestFund",
        {
          amount_requested: amount_requested,
          filename: fileUploadResponse.data.filename,          
          payment_mode: paymentMode
        }
      );

      console.log(requestFundResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      axios
        .get(base_url + "users/allUsers")
        .then((response) => {
          response.data.users.forEach((user) => {
            user.humanDate = new Date(user.created_at).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
          });
          setUsers(response.data.users);
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

 

  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Fund Request</h4>
                        </div>
                        {/* <!-- end card header --> */}

                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
                              <div>
                                <label
                                  htmlFor="requestedAmount"
                                  className="text-muted text-uppercase fw-semibold"
                                >
                                  Enter Required Amount (In Dollars only)
                                </label>
                              </div>
                              <div className="mb-2">
                                <input
                                  type="text"
                                  value={amount_requested}
                                  onChange={(e) =>
                                    setRequestFund(e.target.value)
                                  }
                                  className="form-control"
                                  id="requestedAmount"
                                  placeholder="Request Amount"
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please enter Valid Amount
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6">
                            <div>
                                <label
                                  htmlFor="requestedAmount"
                                  className="text-muted text-uppercase fw-semibold"
                                >
                                  Select Payment Mode
                                </label>
                              </div>
                              <div class="input-group">
                                <select class="form-select" id="PaymentModes" onChange={(e) => setPaymentMode(e.target.value)}>
                                  <option selected>Choose...</option>
                                  <option value="1">Crypto Wallet</option>
                                  <option value="2">GPay Wallet</option>
                                  <option value="3">Bank Account</option>
                                </select>
                                <label class="input-group-text" for="PaymentModes">Payment Modes</label>
                              </div>
                            </div>
                            <div className="col-lg-12 mt-2">
                              <div className="card">
                                <div className="card-header">
                                  <h4 className="card-title mb-0">Dropzone</h4>
                                </div>
                                {/* <!-- end card header --> */}

                                <div className="card-body">
                                  <div className="fileUpload container">
                                    {/* <label>
                                      Image File:
                                      <input
                                        type="file"
                                        onChange={handleImageFileChange}
                                      />
                                    </label> */}
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                      <input {...getInputProps()} />
                                      <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                      {thumbs}
                                    </aside>
                                  </div>
                                </div>
                                {/* <!-- end card body --> */}
                              </div>
                              {/* <!-- end card --> */}
                            </div>
                            <div className="mt-4">
                              <button
                                className="btn btn-success w-100"
                                onClick={requestAmount}
                              >
                                Send Request
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card --> */}
                      </div>
                      {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                  {/* <!-- end row --> */}
                </div>
              </div>
            </div>
            {/* <!-- end row --> */}
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card card-height-100">
                  <div className="card-header align-items-center d-flex justify-content-center">
                    <h4 className="card-title mb-0 flex-grow-1 text-center">
                      Payment Mode
                    </h4>
                  </div>
                  <div className="card-body">
                    {/* <!-- Swiper --> */}
                    <div className="text-center rounded">
                      <QRCode
                        value="0x754C8aD1D6CbA4a1ec20D5a8B5ebA3a6cF56Db45"
                        style={{ maxHeight: "auto", maxWidth: "auto" }}
                      />
                    </div>
                    <div className="pt-3 text-center">
                      <a href="javascript:void(0)">
                        <h6 className="fs-15 lh-base text-truncate mb-0">
                          Crypto Wallet
                        </h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-height-100">
                  <div className="card-header align-items-center d-flex justify-content-center">
                    <h4 className="card-title mb-0 flex-grow-1 text-center">
                      Payment Mode
                    </h4>
                  </div>
                  <div className="card-body">
                    {/* <!-- Swiper --> */}
                    <div className="text-center rounded">
                      <QRCode
                        value="0x754C8aD1D6CbA4a1ec20D5a8B5ebA3a6cF56Db45"
                        style={{ maxHeight: "auto", maxWidth: "auto" }}
                      />
                    </div>
                    <div className="pt-3 text-center">
                      <a href="javascript:void(0)">
                        <h6 className="fs-15 lh-base text-truncate mb-0">
                          GPay Wallet
                        </h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6">
                <div className="card card-height-100">
                  <div className="card-header align-items-center d-flex justify-content-center">
                    <h4 className="card-title mb-0 flex-grow-1 text-center">
                      Payment Mode
                    </h4>
                  </div>
                  <div className="card-body">
                    {/* <!-- Swiper --> */}
                    <div class="vstack gap-2">
                      <div class="form-check card-radio">
                        <label
                          class="form-check-label"
                          for="listGroupRadioGrid1"
                        >
                          <div class="d-flex align-items-center">
                            <div class="flex-grow-1 ms-3">
                              <h6 class="mb-1">Bank Name:</h6>
                              <b class="pay-amount">HDFC Bank</b>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div class="form-check card-radio">
                        <label
                          class="form-check-label"
                          for="listGroupRadioGrid2"
                        >
                          <div class="d-flex align-items-center">
                            <div class="flex-grow-1 ms-3">
                              <h6 class="mb-1">
                                Bank Account Holder Name & Number
                              </h6>
                              <b class="pay-amount">Test User </b>
                              <b class="pay-amount">12345678900092</b>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div class="form-check card-radio">
                        <label
                          class="form-check-label"
                          for="listGroupRadioGrid3"
                        >
                          <div class="d-flex align-items-center">
                            <div class="flex-grow-1 ms-3">
                              <h6 class="mb-1">IFSC Code</h6>
                              <b class="pay-amount">HDFC0000647</b>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="pt-3 text-center">
                      <a href="javascript:void(0)">
                        <h6 className="fs-15 lh-base text-truncate mb-0">
                          Bank Details
                        </h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- end col --> */}
            </div>
          </div>
        </div>

        <Footer />
        <ToastContainer />
      </div>
    </div>
  );
}

export default RequestFund;
