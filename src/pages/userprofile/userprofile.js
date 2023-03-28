import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const getAllUsers = async () => {
    try {
      axios
        .get(base_url + "users/allUsers")
        .then((response) => {
          setUsers(response.data.users);
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


  return (
    <div>
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
                    <a className="dropdown-item" href="">
                      <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
                      <span className="align-middle">
                        Balance : <b>Rs 5971.67</b>
                      </span>
                    </a>
                    <a className="dropdown-item" href="">
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
                    <a href="/users" className="nav-link menu-link">
                      <i className=" ri-contacts-fill"></i>Users
                    </a>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>

          <div className="sidebar-background"></div>
        </div>

        <div className="vertical-overlay"></div>

        <div className="main-content">

          <div className="page-content">
            <div className="container-fluid">
              <div className="profile-foreground position-relative mx-n4 mt-n4">
                <div className="profile-wid-bg">
                  <img src="assets/images/profile-bg.jpg" alt="" className="profile-wid-img" />
                </div>
              </div>
              <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                <div className="row g-4">
                  <div className="col-auto">
                    <div className="avatar-lg">
                      <img src="assets/images/users/avatar-1.jpg" alt="user-img" className="img-thumbnail rounded-circle" />
                    </div>
                  </div>
                  {/* <!--end col--> */}
                  <div className="col">
                    <div className="p-2">
                      <h3 className="text-white mb-1">{user.username}</h3>
                      <p className="text-white-75">Member</p>
                    </div>
                  </div>
                  {/* <!--end col--> */}

                </div>
                {/* <!--end row--> */}
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="d-flex profile-wrapper">
                      {/* <!-- Nav tabs --> */}

                      <div className="flex-shrink-0">
                        <a href="" className="btn btn-success"><i className="ri-edit-box-line align-bottom"></i> Edit Profile</a>
                      </div>
                    </div>
                    {/* <!-- Tab panes --> */}
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Info</h5>
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0" scope="row">Full Name :</th>
                                <td className="text-muted">{user.username}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">Mobile :</th>
                                <td className="text-muted">{user.phone}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">E-mail :</th>
                                <td className="text-muted">{user.email}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">Referral Code :</th>
                                <td className="text-muted">{user.referralCode}
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">Joining Date</th>
                                <td className="text-muted">{user.created_at}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* <!-- end card body --> */}
                    </div>
                    {/* <!-- end card --> */}
                  </div>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end row--> */}

            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}

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


  )
}

export default UserProfile;