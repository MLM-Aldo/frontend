import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WithdrawHistory() {

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
  const currentWithdrawItem = users.slice(startIndex, endIndex + 1); // users to display in current page

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
    const currentWithdrawItem = filteredUsers.slice(startIndex, endIndex + 1); // users to display in current page
  
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

  const getAllWithdraw = async () => {
    try {
      axios
        .get(base_url + "users/" + user._id + "/withdrawHistory")
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
          const currentWithdrawItem = users.slice(startIndex, endIndex + 1); // users to display in current page

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
    getAllWithdraw();
  }, []);

  const deleteMultiple = () => {

  }
  return (
    <div id="layout-wrapper">
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex"></div>

            <div className="d-flex align-items-center">
              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-search-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-search fs-22"></i>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>

              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="assets/images/users/avatar-1.jpg"
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      {/* <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">S</span> */}
                      <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                        {user.username}
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">
                    Welcome {user.username}!
                  </h6>
                  <a className="dropdown-item" href="/userprofile">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Profile</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/dashboard">
                    <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">
                      Balance : <b>{refferalBonus}</b>
                    </span>
                  </a>
                  <a className="dropdown-item" href="/usersetting">
                    <span className="badge bg-soft-success text-success mt-1 float-end">
                      New
                    </span>
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Settings</span>
                  </a>
                  <a className="dropdown-item" onClick={logout}>
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                    <span
                      className="align-middle"
                      data-key="t-logout"
                    >
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="app-menu navbar-menu">
        {/* <!-- LOGO --> */}
        <div className="navbar-brand-box">
          {/* <!-- Dark Logo--> */}
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src="assets/images/logo.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo.png" alt="" height="66" />
            </span>
          </a>
          {/* <!-- Light Logo--> */}
          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src="assets/images/logo.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo.png" alt="" height="66" />
            </span>
          </a>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarDashboards"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                >
                  <i className="ri-dashboard-2-line"></i>{" "}
                  <span data-key="t-dashboards">Wallet</span>
                </a>
                <div
                  className="collapse menu-dropdown"
                  id="sidebarDashboards"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="/dashboard" className="nav-link" data-key="t-analytics">
                        {" "}
                        Wallet Balance{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="" className="nav-link" data-key="t-ecommerce">
                        {" "}
                        Transfer Funds{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <!-- end Dashboard Menu --> */}
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-apps-2-line"></i>{" "}
                  <span data-key="t-apps">Genealogy</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="" className="nav-link" data-key="t-calendar">
                        {" "}
                        Reffered Lists{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/leveltree"
                        className="nav-link"
                        data-key="t-chat"
                      >
                        {" "}
                        Downline Tree{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {user.isAdmin ? (
                <li className="nav-item">
                  <a
                    className="nav-link menu-link"
                    href="#members"
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="members"
                  >
                    <i className="ri-apps-2-line"></i>{" "}
                    <span data-key="t-apps">Members</span>
                  </a>
                  <div className="collapse menu-dropdown" id="members">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                        <a href="/users" className="nav-link" data-key="t-calendar">
                          {" "}
                          All Members{" "}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/blockeduser"
                          className="nav-link"
                          data-key="t-chat"
                        >
                          {" "}
                          Blocked Users{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#requestfund"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="requestfund"
                >
                  <i className="ri-dashboard-2-line"></i>{" "}
                  <span data-key="t-dashboards">Request Funds</span>
                </a>
                <div
                  className="collapse menu-dropdown"
                  id="requestfund"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="/requestfund" className="nav-link" data-key="t-analytics">
                        {" "}
                        Request Funds{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/requestfundhistory" className="nav-link" data-key="t-ecommerce">
                        {" "}
                        Request Fund History{" "}
                      </a>
                    </li>                    
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#withdraw"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="withdraw"
                >
                  <i className="ri-dashboard-2-line"></i>{" "}
                  <span data-key="t-dashboards">Withdraw</span>
                </a>
                <div
                  className="collapse menu-dropdown"
                  id="withdraw"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="/withdrawFund" className="nav-link" data-key="t-analytics">
                        {" "}
                        Withdraw Funds{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/withdrawhistory" className="nav-link" data-key="t-ecommerce">
                        {" "}
                        Withdraw History{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/pendingwithdraw" className="nav-link" data-key="t-ecommerce">
                        {" "}
                        Pending Withdraw{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/completedwithdraw" className="nav-link" data-key="t-ecommerce">
                        {" "}
                        Completed Withdraw{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="sidebar-background"></div>
      </div>

      <div className="vertical-overlay"></div>

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
          <div className="row">
                        <div className="col-xxl-3 col-sm-6">
                            <div className="card card-animate">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="fw-medium text-muted mb-0">Total Withdraw</p>
                                            <h2 className="mt-4 ff-secondary fw-semibold"><span className="counter-value" data-target="547">0</span>$</h2>
                                            
                                        </div>
                                        <div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                                                    <i className="ri-ticket-2-line"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        
                        <div className="col-xxl-3 col-sm-6">
                            <div className="card card-animate">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="fw-medium text-muted mb-0">Pending Withdraw Request</p>
                                            <h2 className="mt-4 ff-secondary fw-semibold"><span className="counter-value" data-target="124">0</span>$</h2>
                                        </div>
                                        <div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                                                    <i className="mdi mdi-timer-sand"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xxl-3 col-sm-6">
                            <div className="card card-animate">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="fw-medium text-muted mb-0">Closed Withdraw Request</p>
                                            <h2 className="mt-4 ff-secondary fw-semibold"><span className="counter-value" data-target="107">0</span>$</h2>
                                        </div>
                                        <div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                                                    <i className="ri-shopping-bag-line"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card" id="ticketsList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Withdraw History</h5>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex flex-wrap gap-2">
                                                <button className="btn btn-danger add-btn" data-bs-toggle="modal" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1"></i> Create Withdraw Request</button>
                                                <button className="btn btn-soft-danger" id="remove-actions" onClick="deleteMultiple()"><i className="ri-delete-bin-2-line"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body border border-dashed border-end-0 border-start-0">
                                    <form>
                                        <div className="row g-3">
                                            <div className="col-xxl-5 col-sm-12">
                                                <div className="search-box">
                                                    <input type="text" className="form-control search bg-light border-light" placeholder="Search for Withdraw details or something..." />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-4">
                                                <input type="text" className="form-control bg-light border-light" data-provider="flatpickr" data-date-format="d M, Y" data-range-date="true" id="demo-datepicker" placeholder="Select date range" />
                                            </div>
                                            <div className="col-xxl-3 col-sm-4">
                                                <div className="input-light">
                                                    <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                                        <option value="">Status</option>
                                                        <option value="all" selected>All</option>
                                                        <option value="Open">Open</option>
                                                        <option value="Inprogress">Inprogress</option>
                                                        <option value="Closed">Closed</option>
                                                        <option value="New">New</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xxl-1 col-sm-4">
                                                <button type="button" className="btn btn-primary w-100" onclick="SearchData();"> <i className="ri-equalizer-fill me-1 align-bottom"></i>
                                                    Filters
                                                </button>
                                            </div>
                                        </div>                                        
                                    </form>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive table-card mb-4">
                                        <table className="table align-middle table-nowrap mb-0" id="ticketTable" >
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{width: '40px'}}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                        </div>
                                                    </th>
                                                    <th className="sort" data-sort="id">SR No</th>
                                                    <th className="sort" data-sort="tasks_name">Title</th>
                                                    <th className="sort" data-sort="client_name">Withdraw Amount</th>
                                                    <th className="sort" data-sort="assignedto">Withdraw Date</th>
                                                    <th className="sort" data-sort="status">Status</th>
                                                    <th className="sort" data-sort="priority">Priority</th>
                                                    <th className="sort" data-sort="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list form-check-all" id="ticket-list-data">
                                            {currentWithdrawItem.map((u) => {
                                    return (
                                      <tr key={u._id}>
                                                    <th scope="row">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="checkAll" value="option1" />
                                                        </div>
                                                    </th>
                                                    <td className="id"><a href="javascript:void(0);" onclick="ViewTickets(this)" data-id="001" className="fw-medium link-primary">001</a></td>
                                                    <td className="tasks_name">Amount Request</td>
                                                    <td className="client_name">{u.amount_withdraw}</td>
                                                    <td className="create_date">08 Dec, 2021</td>
                                                    <td className="status"><span className="badge badge-soft-warning text-uppercase">Inprogress</span></td>
                                                    <td className="priority"><span className="badge bg-danger text-uppercase">High</span></td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="ri-more-fill align-middle"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li><button className="dropdown-item" onclick="location.href = 'apps-tickets-details.html';"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</button></li>
                                                                <li><a className="dropdown-item edit-item-btn" href="#showModal" data-bs-toggle="modal"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a></li>
                                                                <li>
                                                                    <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                              })}
                                            </tbody>
                                        </table>
                                        <div className="noresult" style={{display: 'none'}}>
                                            <div className="text-center">
                                                <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{width:'75px',height:'75px'}}></lord-icon>
                                                <h5 className="mt-2">Sorry! No Result Found</h5>
                                                <p className="text-muted mb-0">We've searched more than 150+ Withdraw History We did not find any request for you search.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-2">
                                        <div className="pagination-wrap hstack gap-2">
                                            <a className="page-item pagination-prev disabled" href="#">
                                                Previous
                                            </a>
                                            <ul className="pagination listjs-pagination mb-0"></ul>
                                            <a className="page-item pagination-next" href="#">
                                                Next
                                            </a>
                                        </div>
                                    </div>

                                    <div className="modal fade flip" id="deleteOrder" tabindex="-1" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-body p-5 text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{width:'90px', height:'90px'}}></lord-icon>
                                                    <div className="mt-4 text-center">
                                                        <h4>You are about to delete a order ?</h4>
                                                        <p className="text-muted fs-14 mb-4">Deleting your order will remove all of your information from our database.</p>
                                                        <div className="hstack gap-2 justify-content-center remove">
                                                            <button className="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i className="ri-close-line me-1 align-middle"></i> Close</button>
                                                            <button className="btn btn-danger" id="delete-record">Yes, Delete It</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade zoomIn" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0">
                                <div className="modal-header p-3 bg-soft-info">
                                    <h5 className="modal-title" id="exampleModalLabel"></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
                                </div>
                                <form className="tablelist-form" autocomplete="off">
                                    <div className="modal-body">
                                        <div className="row g-3">
                                            <div className="col-lg-12">
                                                <div id="modal-id">
                                                    <label for="orderId" className="form-label">SR No</label>
                                                    <input type="text" id="orderId" className="form-control" placeholder="ID" value="001" readonly />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div>
                                                    <label for="tasksTitle-field" className="form-label">Title</label>
                                                    <input type="text" id="tasksTitle-field" className="form-control" placeholder="Title" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div>
                                                    <label for="client_nameName-field" className="form-label">Withdraw Amount</label>
                                                    <input type="text" id="client_nameName-field" className="form-control" placeholder="Client Name" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label for="date-field" className="form-label">Withdraw Date</label>
                                                <input type="text" id="date-field" className="form-control" data-provider="flatpickr" data-date-format="d M, Y" placeholder="Create Date" required />
                                            </div>
                                            <div className="col-lg-6">
                                                <label for="ticket-status" className="form-label">Status</label>
                                                <select className="form-control" data-plugin="choices" name="ticket-status" id="ticket-status">
                                                    <option value="">Status</option>
                                                    <option value="New">New</option>
                                                    <option value="Inprogress">Inprogress</option>
                                                    <option value="Closed">Closed</option>
                                                    <option value="Open">Open</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <label for="priority-field" className="form-label">Priority</label>
                                                <select className="form-control" data-plugin="choices" name="priority-field" id="priority-field">
                                                    <option value="">Priority</option>
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <div className="hstack gap-2 justify-content-end">
                                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-success" id="add-btn">Add Request</button>
                                            <button type="button" className="btn btn-success" id="edit-btn">Update</button> 
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

          </div>
        </div>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">2023 © ALDO</div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design & Develop by Digiphins
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

  );
}

export default WithdrawHistory;