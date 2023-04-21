import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs-react";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import Footer from "../footer/footer";


function WalletTransfer() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [fullUsers, setFullUsers] = useState();
  const [refferalBonus, setRefferalBonus] = useState(0);  
  const [notify, setNotify] = useState("");
  const [receiver_id, setReceiverId] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));

  const [currentPage, setCurrentPage] = useState(1);
  let totalItems = users.length;
  let totalPages = Math.ceil(totalItems / 1); // 1 record per page
  let startIndex = (currentPage - 1) * 1;
  let endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
  const currentUsers = users.slice(startIndex, endIndex + 1); // users to display in current page

  //Edit Request Fund
  const [sent_amount, setSentAmount] = useState("");
  const [sender_id, setSenderId] =  useState(user._id);
  const [reciever_id, setRecieverId] = useState("");

  const [transactionPassword, setTransactionPassword] = useState('');
  const [isTransactionPasswordValid, setIsTransactionPasswordValid] = useState(false);

  const handleTransactionPasswordChange = (e) => {
    const password = e.target.value;
    setTransactionPassword(password);
    setIsTransactionPasswordValid(password.length >= 6); // Set the validity based on your validation logic
  };

  const transferAmount = async (e) => {
    e.preventDefault();
    const username = user.username;
    const user_id = user._id;
  
    try {
      const postResponse = await axios.post(
        base_url + "users/" + user._id + "/transactionPassword",
        { username, transactionPassword }
      );
  
      const transactionPasswordHash = postResponse.data.user.transactionPassword;
  
      // Compare the entered transaction password with the stored hashed password
      const isTransactionPasswordMatch = await bcrypt.compare(
        transactionPassword,
        transactionPasswordHash
      );
  
      console.log("Password Match:", isTransactionPasswordMatch);
  
      if (!isTransactionPasswordMatch) {
        setNotify(toast("Transaction password is incorrect. Please try again."));
        return;
      }
    } catch (error) {
      console.log(error);
      setNotify(toast("An error occurred while processing your request. Please try again later."));
      return;
    }
  
    try {
      // Send the receiver id in the request body
      const requestData = {
        receiver: receiver_id
      };
  
      const config = { headers: { "Content-Type": "text/html" } };
      const response = await axios.post(
        base_url + "users/" + user._id + "/getReceiverDetails",
        requestData,
        config
      );
  
      const receiverData = response.data;
      
      // Check if the receiver id entered by the user is valid
      if (!receiverData) {
        setNotify(toast("Receiver not found. Please enter a valid receiver id."));
        return;
      }
  
      requestData.user_id = user_id;
  
      const transactionResponse = await axios.post(
        base_url + "users/" + user._id + "/UsersTransactions",
        requestData,
        config
      );
  
      setSentAmount("");
      setNotify(toast("Amount sent successfully!"));
    } catch (error) {
      console.log(error);
      setNotify(toast("An error occurred while processing your request. Please try again later."));
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
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                          <h4 className="card-title mb-0">Wallet Amount Transfer</h4>
                        </div>
                        {/* <!-- end card header --> */}

                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6">
                              <div>
                                <label htmlFor="sentAmount" className="text-muted text-uppercase fw-semibold">Enter Sending Amount (In Dollars only)</label>
                              </div>
                              <div className="mb-2">
                                <input type="text" value={sent_amount}  onChange={(e) => setSentAmount(e.target.value)} className="form-control bg-light border-0" id="sentAmount" placeholder="Sending Amount" required />
                                <div className="invalid-feedback">
                                  Please enter Valid Amount
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                              <div>
                                <label htmlFor="recieverId" className="text-muted text-uppercase fw-semibold">Reciever ID</label>
                              </div>
                              <div className="mb-2">
                                <input type="text" value={receiver_id} onChange={(e) => setReceiverId(e.target.value)} className="form-control bg-light border-0" id="recieverId" placeholder="Reciever ID" required />
                                <div className="invalid-feedback">
                                  Please enter Valid Reciever ID
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
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
                                <button className="btn btn-success w-100" onClick={transferAmount}>Send Amount</button>
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
          </div>
        </div>

        <Footer />
        <ToastContainer />
      </div>
    </div>

  );
}

export default WalletTransfer;