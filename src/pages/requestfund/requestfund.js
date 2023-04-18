import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [amount_requested, setRequestFund] = useState("")

  const requestAmount = async (e) => {
    e.preventDefault();
    try {
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
                            <div className="col-lg-12 col-sm-6">
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
        <ToastContainer />
      </div>
    </div>

  );
}

export default RequestFund;