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


function WithdrawFund() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [fullUsers, setFullUsers] = useState();
  const [refferalBonus, setRefferalBonus] = useState(0);  
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [notify, setNotify] = useState("");
  const [approvedWithdrawals, setApprovedWithdrawals] = useState([]);



  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const [transactionPassword, setTransactionPassword] = useState('');
  const [isTransactionPasswordValid, setIsTransactionPasswordValid] = useState(false);

  const handleTransactionPasswordChange = (e) => {
    const password = e.target.value;
    setTransactionPassword(password);
    setIsTransactionPasswordValid(password.length >= 6); // Set the validity based on your validation logic
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const [currentPage, setCurrentPage] = useState(1);
  let totalItems = users.length;
  let totalPages = Math.ceil(totalItems / 1); // 1 record per page
  let startIndex = (currentPage - 1) * 1;
  let endIndex = Math.min(startIndex + 1 - 1, totalItems - 1); // end index of current page
  const currentUsers = users.slice(startIndex, endIndex + 1); // users to display in current page

//Edit Request Fund
const [amount_withdraw, setwithdrawFund] = useState("")

const withdrawAmount = async (e) => {
  e.preventDefault();
  try {
    // if (amount_withdraw > walletBalance) {
    //   setNotify(toast("Withdraw amount should be below wallet balance or Equal to wallet Balance !"))
    //   return;
    // }
    
    // Retrieve the user's transaction password hash from the database
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
        base_url + "users/"+ user._id + "/withdrawFund",
        JSON.stringify({ amount_withdraw, transactionPassword})
      )
      .then((response) => {
        setwithdrawFund("")
        setNotify(toast("Amount Withdraw Request Sent successfully!"))
      })
      .catch((error) => {
        setError(error.message);
      });
  } catch (error) {
    setError("An error occurred. Please try again.");
  }
};


  //Edit USers
  const [UserName, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const userUpdate =() =>{
    axios
      .put(base_url + "users/"+ user._id, {
        "username": UserName,
        "email": user.email,
        "phone": phone
      })
      .then((response) => {
        user.username = UserName;
        user.email = email;
        user.phone = phone;
        localStorage.setItem('user', JSON.stringify(user));
        setNotify(toast("User updated successfully!"))
      }).catch((error) => {
      });
  }


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

  const [walletBalance, setWalletBalance] = useState(refferalBonus);

  const getAllWithdraw = async () => {
    try {
      const response = await axios.get(base_url + "users/" + user._id + "/withdrawHistory");
      const withdrawHistory = response.data.withdrawLists.map((item) => ({
        ...item,
        createdAt: formatDate(item.created_at),
      }));
      const approvedWithdrawals = withdrawHistory.filter(item => item.amount_withdraw_status === "Approved");
      setWithdrawHistory(withdrawHistory);
      setApprovedWithdrawals(approvedWithdrawals);
      return withdrawHistory;
    } catch (error) {
      console.error(error);
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    getAllWithdraw().then(withdrawHistory => {
      const requests = withdrawHistory.filter(item => item.amount_withdraw_status === "Approved").map(item => ({
        request: { amount_withdraw: item.amount_withdraw }
      }));
      const total_amount_withdraw = requests.reduce((total, item) => total + item.request.amount_withdraw, 0);
      const newBalance = refferalBonus - total_amount_withdraw;
      setWalletBalance(newBalance);
    });
  }, [refferalBonus, setWalletBalance]);

  const requests = approvedWithdrawals.map(item => ({
    request: { amount_withdraw: item.amount_withdraw }
  }));

  let total_amount_withdraw = 0;

  for (const item of requests) {
    total_amount_withdraw += item.request.amount_withdraw;
  }

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
                          <h4 className="card-title mb-0">Withdraw Amount</h4>
                        </div>
                        {/* <!-- end card header --> */}
                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
                              <div>
                                <label htmlFor="requestedAmount" className="text-muted text-uppercase fw-semibold">Enter Required Amount (In Dollars only)</label>
                              </div>
                              <div className="mb-2">
                                <input type="text" value={amount_withdraw}  onChange={(e) => setwithdrawFund(e.target.value)} className="form-control bg-light border-0" id="requestedAmount" placeholder="Withdraw Amount" required />
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
                                            <button className="btn btn-success w-100" onClick={withdrawAmount}>Send Withdraw Request</button>
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

export default WithdrawFund;