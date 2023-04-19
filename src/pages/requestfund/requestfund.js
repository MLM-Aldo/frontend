import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs-react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar/sidebar";
import QRCode from "qrcode.react";

function RequestFund() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [fullUsers, setFullUsers] = useState();
  const [refferalBonus, setRefferalBonus] = useState(0);  
  const [notify, setNotify] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));

  const [currentPage, setCurrentPage] = useState(1);
  let totalItems = users.length;
  let totalPages = Math.ceil(totalItems / 1); // 1 record per page
  let startIndex = (currentPage - 1) * 1;
  let endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
  const currentUsers = users.slice(startIndex, endIndex + 1); // users to display in current page

  //Edit Request Fund
  const [amount_requested, setRequestFund] = useState("");

  const [transactionPassword, setTransactionPassword] = useState('');
  const [isTransactionPasswordValid, setIsTransactionPasswordValid] = useState(false);

  const handleTransactionPasswordChange = (e) => {
    const password = e.target.value;
    setTransactionPassword(password);
    setIsTransactionPasswordValid(password.length >= 6); // Set the validity based on your validation logic
  };

  const requestAmount = async (e) => {
    e.preventDefault();
    try {
      const username = user.username;
      const response = await axios.post(
        base_url + "users/" + user._id + "/transactionPassword",
        { username, transactionPassword }
      )
        .catch((error) => {
          setNotify(toast("Withdraw Amount Or Transaction password you entered is incorrect. Please try again."));
          setError(error.message);
        });
      const transactionPasswordHash = response.data.user.transactionPassword;

      // Compare the entered password with the stored hash
      const isTransactionPasswordMatch = await bcrypt.compare(transactionPassword, transactionPasswordHash);
      console.log("Password Match:", isTransactionPasswordMatch);

      if (!isTransactionPasswordMatch) {
        setNotify(toast("Transaction password is incorrect. Please try again."));
        return;
      }
      axios
        .post(
          base_url + "users/"+ user._id + "/requestFund",
          JSON.stringify({ amount_requested })
        )
        .then((response) => {
          setRequestFund("");
          console.log(amount_requested);
          setNotify(toast("Fund Request Sent successfully!"))
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };


  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    axios
      .get(base_url + "referrals/referralBonus/" + user.referralCode)
      .then((response) => {
        setRefferalBonus(response.data.referralAmount);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [])

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchVal, setSearchTerm] = useState("");


  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    search(searchVal,e.target.value, endDate )
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    search(searchVal, startDate, e.target.value )

  };


  const handleSearchTerm = (term) => {
    setSearchTerm(term);
    search(term,startDate, endDate)
  };

  const search = (v, s, e) => {
    let filteredUsers = fullUsers;
  
    if (v) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          _.includes(user.username, v) || _.includes(user.email, v)
      );
    }
  
    if (s) {
      filteredUsers = filteredUsers.filter(
        (user) => new Date(user.created_at).getDate() >= new Date(s).getDate() 
      );
    }
  
    if (e) {
      filteredUsers = filteredUsers.filter(
        (user) => new Date(user.created_at).getDate() <= new Date(e).getDate() 
      );
    }
  
    setUsers(filteredUsers);
    setCurrentPage(1);
  
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / 1); // 1 record per page
    const startIndex = (currentPage - 1) * 1;
    const endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
    const currentUsers = filteredUsers.slice(startIndex, endIndex + 1); // users to display in current page
  
  };


  const handleResetClick = () => {
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
    search("", "", "" );
  };


  // const searchTerm = (term) => {
  //   debugger;
  //   if (term == "" ) {
  //     setUsers(fullUsers);
  //     setCurrentPage(1);
  //     let totalItems = users.length;
  //     let totalPages = Math.ceil(totalItems / 1); // 1 record per page
  //     let startIndex = (currentPage - 1) * 1;
  //     let endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
  //     const currentUsers = users.slice(startIndex, endIndex + 1); // users to display in current page

  //   } else {

  //     const users = [];
  //     fullUsers.map((x) => {
  //       if (_.includes(x.username, term) || _.includes(x.email, term)) {
  //         users.push(x)
  //       }
  //     });
  //     setUsers(users);
  //     setCurrentPage(1);
  //     let totalItems = users.length;
  //     let totalPages = Math.ceil(totalItems / 1); // 1 record per page
  //     let startIndex = (currentPage - 1) * 1;
  //     let endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
  //     const currentUsers = users.slice(startIndex, endIndex + 1); // users to display in current page
  //   }


  // };
   
  const getAllUsers = async () => {
    try {
      axios
        .get(base_url + "users/allUsers")
        .then((response) => {
          response.data.users.forEach(user => {
            user.humanDate = new Date(user.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          });
          setFullUsers((response.data.users))
          setUsers(response.data.users);
          setCurrentPage(1);
          let totalItems = users.length;
          let totalPages = Math.ceil(totalItems / 1); // 1 record per page
          let startIndex = (currentPage - 1) * 1;
          let endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
          const currentUsers = users.slice(startIndex, endIndex + 1); // users to display in current page

        })
        .catch((error) => {
          setError(error.message);
        });
      // const response = await fetch(base_url + 'users/allUsers', {
      //     method: 'GET',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'authorization': 'Bearer ' +token
      //     },
      // });
      // const data = await response.json();
      // if (response.ok) {
      //     setUsers(data.users);
      // } else {
      //     setError(data.message);
      // }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(base_url + "users/logout", null)
        .then((response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        })
        .catch((error) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setError(error.message);
          navigate("/login");
        });
      // const response = await fetch(base_url + 'users/logout', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      // });
      // const data = await response.json();
      // if (response.ok) {
      //     localStorage.removeItem('token');
      //     localStorage.removeItem('user');
      //     navigate('/login');
      // } else {
      //     setError(data.message);
      // }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      setError('An error occurred. Please try again.');
    }
  };


  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteMultiple = () => {

  }
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
                                <label htmlFor="requestedAmount" className="text-muted text-uppercase fw-semibold">Enter Required Amount (In Dollars only)</label>
                              </div>
                              <div className="mb-2">
                                <input type="text" value={amount_requested}  onChange={(e) => setRequestFund(e.target.value)} className="form-control bg-light border-0" id="requestedAmount" placeholder="Request Amount" required />
                                <div className="invalid-feedback">
                                  Please enter Valid Amount
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                              <div>
                                <label htmlFor="transactionPassword" className="text-muted text-uppercase fw-semibold">Enter Transaction Pasword</label>
                              </div>
                              <div className="mb-2">
                                <input type="text" 
                                className="form-control bg-light border-0"
                                id="transactionPassword"
                                name="transactionPassword"
                                value={transactionPassword}
                                onChange={handleTransactionPasswordChange}
                                 placeholder="Transaction Password" required />
                                <div className="invalid-feedback">
                                  Please enter Valid Password
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-success w-100" onClick={requestAmount}>Send Request</button>
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
            <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">Dropzone</h4>
                                </div>
                                {/* <!-- end card header --> */}

                                <div className="card-body">
                                    <p className="text-muted">drag and drop file uploads with image previews.</p>

                                    <div className="dropzone">
                                        <div className="fallback">
                                            <input name="file" type="file"  />
                                        </div>
                                        <div className="dz-message needsclick">
                                            <div className="mb-3">
                                                <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                            </div>

                                            <h4>Drop files here or click to upload.</h4>
                                        </div>
                                    </div>

                                    <ul className="list-unstyled mb-0" id="dropzone-preview">
                                        <li className="mt-2" id="dropzone-preview-list">
                                            {/* <!-- This is used as the file preview template --> */}
                                            <div className="border rounded">
                                                <div className="d-flex p-2">
                                                    <div className="flex-shrink-0 me-3">
                                                        <div className="avatar-sm bg-light rounded">
                                                            <img data-dz-thumbnail className="img-fluid rounded d-block" src="assets/images/new-document.png" alt="Dropzone-Image" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="pt-1">
                                                            <h5 className="fs-14 mb-1" data-dz-name>&nbsp;</h5>
                                                            <p className="fs-13 text-muted mb-0" data-dz-size></p>
                                                            <strong className="error text-danger" data-dz-errormessage></strong>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-3">
                                                        <button data-dz-remove className="btn btn-sm btn-danger">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* <!-- end dropzon-preview --> */}
                                </div>
                                {/* <!-- end card body --> */}
                            </div>
                            {/* <!-- end card --> */}
                        </div> 
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                    <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card card-height-100">
                        <div className="card-header align-items-center d-flex justify-content-center">
                          <h4 className="card-title mb-0 flex-grow-1 text-center">Payment Mode</h4>
                        </div>
                        <div className="card-body">
                          {/* <!-- Swiper --> */}
                          <div className="text-center rounded">
                            <QRCode value="0x754C8aD1D6CbA4a1ec20D5a8B5ebA3a6cF56Db45" style={{ maxHeight: 'auto', maxWidth: 'auto' }} />
                          </div>
                          <div className="pt-3 text-center">
                            <a href="javascript:void(0)">
                              <h6 className="fs-15 lh-base text-truncate mb-0">Crypto Wallet</h6>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card card-height-100">
                        <div className="card-header align-items-center d-flex justify-content-center">
                          <h4 className="card-title mb-0 flex-grow-1 text-center">Payment Mode</h4>
                        </div>
                        <div className="card-body">
                          {/* <!-- Swiper --> */}
                          <div className="text-center rounded">
                            <QRCode value="0x754C8aD1D6CbA4a1ec20D5a8B5ebA3a6cF56Db45" style={{ maxHeight: 'auto', maxWidth: 'auto' }} />
                          </div>
                          <div className="pt-3 text-center">
                            <a href="javascript:void(0)">
                              <h6 className="fs-15 lh-base text-truncate mb-0">GPay Wallet</h6>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6">
                      <div className="card card-height-100">
                        <div className="card-header align-items-center d-flex justify-content-center">
                          <h4 className="card-title mb-0 flex-grow-1 text-center">Payment Mode</h4>
                        </div>
                        <div className="card-body">
                          {/* <!-- Swiper --> */}
                          <div class="vstack gap-2">
                            <div class="form-check card-radio">
                                <label class="form-check-label" for="listGroupRadioGrid1">
                                  <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 ms-3">
                                      <h6 class="mb-1">Bank Name:</h6>
                                      <b class="pay-amount">HDFC Bank</b>
                                    </div>
                                  </div>
                                </label>
                            </div>
                            <div class="form-check card-radio">
                                <label class="form-check-label" for="listGroupRadioGrid2">
                                  <div class="d-flex align-items-center">
                                    <div class="flex-grow-1 ms-3">
                                      <h6 class="mb-1">Bank Account Holder Name & Number</h6>                                      
                                      <b class="pay-amount">Test User </b>
                                      <b class="pay-amount">12345678900092</b>
                                    </div>
                                  </div>
                                </label>
                            </div>
                            <div class="form-check card-radio">
                                <label class="form-check-label" for="listGroupRadioGrid3">
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
                              <h6 className="fs-15 lh-base text-truncate mb-0">Bank Details</h6>
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