import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PendingWithdraw() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');  
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [refferalBonus, setRefferalBonus] = useState(0);
  const [notify, setNotify] = useState("");

  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
const [approvedWithdrawals, setApprovedWithdrawals] = useState([]);
const [rejectedWithdrawals, setRejectedWithdrawals] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  


  const user = JSON.parse(localStorage.getItem('user'));

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

  const getAllWithdraw = async () => {
    try {
      axios
        .get(base_url + "users/" + user._id + "/withdrawHistory")
        .then((response) => {
          const withdrawHistory = response.data.withdrawLists.map((item) => {
            return {
              ...item,
              createdAt: formatDate(item.created_at),
            };
          });
          // Separate pending and completed withdrawals
          const pendingWithdrawals = withdrawHistory.filter(item => item.amount_withdraw_status === "waiting");
          const approvedWithdrawals = withdrawHistory.filter(item => item.amount_withdraw_status  === "completed");

          setWithdrawHistory(withdrawHistory);
          setPendingWithdrawals(pendingWithdrawals);
          setApprovedWithdrawals(approvedWithdrawals);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  }
  
  useEffect(() => {
    getAllWithdraw();
  }, []);
  useEffect(() => {
    const pending = withdrawHistory.filter(item => item.amount_withdraw_status === 'waiting');
    setPendingWithdrawals(pending);

    const approved = withdrawHistory.filter(item => item.status === 'approved');
    setApprovedWithdrawals(approved);

    const rejected = withdrawHistory.filter(item => item.status === 'rejected');
    setRejectedWithdrawals(rejected);
  }, [withdrawHistory]);

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

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingWithdrawals.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pendingWithdrawals.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDeleteWithdraw = (withdrawId) => {
    axios
      .delete(base_url + "users/" + user._id + "/withdrawHistory/" + withdrawId)
      .then((response) => {
        toast.success("Withdrawal deleted successfully");
        getAllWithdraw();
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };



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
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
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
                      <h5 className="card-title mb-0 flex-grow-1">Pending Withdraw History</h5>
                      <div className="flex-shrink-0">
                        <div className="d-flex flex-wrap gap-2">
                          <button className="btn btn-danger add-btn" data-bs-toggle="modal" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1"></i> Create Withdraw Request</button>
                          <button className="btn btn-soft-danger" id="remove-actions" onClick="deleteMultiple()"><i className="ri-delete-bin-2-line"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">                    
                    <div className="table-responsive table-card mb-4">
                      <table className="table align-middle table-nowrap mb-0" id="ticketTable" >
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '40px' }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                              </div>
                            </th>
                            <th className="sort" data-sort="id">SR No</th>
                            <th className="sort" data-sort="tasks_name">Title</th>
                            <th className="sort" data-sort="client_name">Withdraw Amount</th>
                            <th className="sort" data-sort="assignedto">Withdraw Date</th>
                            <th className="sort" data-sort="status">Status</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all" id="ticket-list-data">
                          {currentItems.map((withdrawal) => (
                            <tr key={withdrawal._id}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="checkAll" value="option1" />
                                  </div>
                                </th>
                                <td className="id"><a href="javascript:void(0);" data-id="001" className="fw-medium link-primary">001</a></td>
                                <td className="tasks_name">Amount Request</td>
                                <td className="client_name">{withdrawal.amount_withdraw} $</td>
                                <td className="create_date">{new Date(withdrawal.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <td className="status"><span className="badge badge-soft-warning text-uppercase">{withdrawal.amount_withdraw_status}</span></td>
                                
                              </tr>
                              ))}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: 'none' }}>
                        <div className="text-center">
                          <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: '75px', height: '75px' }}></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">We've searched more than 150+ Withdraw History We did not find any request for you search.</p>
                        </div>
                      </div>
                    </div>
                    <Pagination>
                      {pageNumbers.map((number) => (
                        <Pagination.Item
                          key={number}
                          active={number === currentPage}
                          onClick={() => handlePageChange(number)}
                        >
                          {number}
                        </Pagination.Item>
                      ))}
                    </Pagination>


                  </div>
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

export default PendingWithdraw;