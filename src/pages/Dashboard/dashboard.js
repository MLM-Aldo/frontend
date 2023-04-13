import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import LevelTree from "../Leveltree/Leveltree";
import Users from '../Userlist/userlist'
import axios from 'axios';
import QRCode from "qrcode.react";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_API_URL;
  const [refferalBonus, setRefferalBonus] = useState(0);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [approvedWithdrawals, setApprovedWithdrawals] = useState([]);


  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    axios
      .get(base_url + "referrals/referralBonus/" + user.referralCode)
      .then((response) => {
        const refferalBonus = response.data.referralAmount;
        setRefferalBonus(refferalBonus);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [refferalBonus])

  const logout = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(base_url + "users/logout")
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
                    className="nav-link menu-link active"
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
                      <li className="nav-item active">
                        <a href="/dashboard" className="nav-link" data-key="t-analytics">
                          {" "}
                          Wallet Balance{" "}
                        </a>
                      </li>
                      <li className="nav-item">
                      <a href="/requestfund" className="nav-link" data-key="t-analytics">
                        {" "}
                        Add Money{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/requestfundhistory" className="nav-link" data-key="t-ecommerce">
                        {" "}
                        Transaction History{" "}
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
                  <div className="row mb-3 pb-1">
                    <div className="col-12">
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <h4 className="fs-16 mb-1">Good Morning, {user.username}!</h4>
                          <p className="text-muted mb-0">Here's what's happening with your Account.</p>
                        </div>
                      </div>
                      {/* <!-- end card header --> */}
                    </div>
                    {/* <!--end col--> */}
                  </div>
                  {/* <!--end row--> */}
                  <div className="row">

                    <div className="col-xl-3 col-md-6">
                      {/* <!-- card --> */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Referral Code</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                {" "}
                                <span
                                  className="counter-value"
                                  data-target={user.referralCode}
                                >
                                  {user.referralCode}
                                </span>{" "}
                              </h4>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-success rounded fs-3">
                                <i className="bx bx-dollar-circle text-success"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col --> */}

                    <div className="col-xl-3 col-md-6">
                      {/* <!-- card --> */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Total Earnings</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="">{refferalBonus} </span> </h4>

                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-success rounded fs-3">
                                <i className="bx bx-dollar-circle text-success"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col --> */}

                    <div className="col-xl-3 col-md-6">
                      {/* <!-- card --> */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> My Balance</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="">{walletBalance}</span> </h4>
                              <a href="" className="text-decoration-underline">Withdraw money</a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-primary rounded fs-3">
                                <i className="bx bx-wallet text-primary"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                  {/* <!-- end row--> */}
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
    </div>
  );
};

export default Dashboard;