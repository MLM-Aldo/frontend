import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

function BlockedUsers() {

    const base_url = process.env.REACT_APP_API_URL;
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [fullUsers, setFullUsers] = useState();
    const [refferalBonus,setRefferalBonus] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        let token = localStorage.getItem('token');
        if(!token) {
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
    },[])

    const searchTerm = (term) => {
      debugger;
      if(term == "") {
        setUsers(fullUsers);
      }else {

        const busers = [];
        fullUsers.map((x) => {
          if(_.includes(x.username, term) || _.includes(x.email, term)) {
            busers.push(x)
          }
        });
        setUsers(busers);
      }
      
    };

    const getAllUsers = async () => {
        try {
          axios
            .get(base_url + "users/allUsers")
            .then((response) => {
              setFullUsers(_.filter(response.data.users, {active: true}))
              const busers = _.filter(response.data.users, {active: true})
              setUsers(busers);
            })
            .catch((error) => {
              setError(error.message);
            });
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
                                        <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                                    </div>
                                    {/* <!-- end card header --> */}

                                    <div className="card-body">
                                        <div className="listjs-table" id="customerList">
                                            <div className="row g-4 mb-3">
                                                <div className="col-sm-auto">
                                                    <div>
                                                        <button type="button" className="btn btn-success add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1"></i> Add</button>
                                                        <button className="btn btn-soft-danger" ><i className="ri-delete-bin-2-line"></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-sm">
                                                    <div className="d-flex justify-content-sm-end">
                                                        <div className="search-box ms-2">
                                                            <input type="text" className="form-control search" placeholder="Search..." onChange={(event)=>searchTerm(event.target.value)}/>
                                                            <i className="ri-search-line search-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="table-responsive table-card mt-3 mb-1">
                                                <table className="table align-middle table-nowrap" id="customerTable">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th scope="col" style={{ width: '50px' }}>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                                </div>
                                                            </th>
                                                            <th className="sort" data-sort="customer_name">Customer</th>
                                                            <th className="sort" data-sort="email">Email</th>
                                                            <th className="sort" data-sort="phone">Phone</th>
                                                            <th className="sort" data-sort="date">Joining Date</th>
                                                            <th className="sort" data-sort="status">Delivery Status</th>
                                                            <th className="sort" data-sort="action">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
                                                        {users.map((u) => {
                                                            return (
                                                                <tr key={u._id}>
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                        </div>
                                                                    </th>
                                                                    <td className="id" style={{ display: 'none' }}><a href="#" className="fw-medium link-primary">#VZ2101</a></td>
                                                                    <td className="customer_name">{u.username}</td>
                                                                    <td className="email">{u.email}</td>
                                                                    <td className="phone">{u.phone}</td>
                                                                    <td className="date">06 Apr, 2021</td>
                                                                    <td className="status"><span className="badge badge-soft-success text-uppercase">{(u.active) ? 'Deactive' : 'Active'}</span></td>
                                                                    <td>
                                                                        <div className="d-flex gap-2">
                                                                            <div className="edit">
                                                                                <button className="btn btn-sm btn-success edit-item-btn" data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                            </div>
                                                                            <div className="remove">
                                                                                <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )

                                                        })}

                                                    </tbody>
                                                </table>
                                                <div className="noresult" style={{ display: 'none' }}>
                                                    <div className="text-center">
                                                        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: '75px', height: '75px' }}></lord-icon> */}
                                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                                        <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any orders for you search.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end">
                                                <div className="pagination-wrap hstack gap-2">
                                                    <a className="page-item pagination-prev disabled" href="javascrpit:void(0)">
                                                        Previous
                                                    </a>
                                                    <ul className="pagination listjs-pagination mb-0"></ul>
                                                    <a className="page-item pagination-next" href="javascrpit:void(0)">
                                                        Next
                                                    </a>
                                                </div>
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

                        <div className="modal fade" id="showModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header bg-light p-3">
                                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
                                    </div>
                                    <form className="tablelist-form" autoComplete="off">
                                        <div className="modal-body">
                                            <div className="mb-3" id="modal-id" style={{ display: 'none' }}>
                                                <label htmlFor="id-field" className="form-label">ID</label>
                                                <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="customername-field" className="form-label">Customer Name</label>
                                                <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required />
                                                <div className="invalid-feedback">Please enter a customer name.</div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="email-field" className="form-label">Email</label>
                                                <input type="email" id="email-field" className="form-control" placeholder="Enter Email" required />
                                                <div className="invalid-feedback">Please enter an email.</div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="phone-field" className="form-label">Phone</label>
                                                <input type="text" id="phone-field" className="form-control" placeholder="Enter Phone no." required />
                                                <div className="invalid-feedback">Please enter a phone.</div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="date-field" className="form-label">Joining Date</label>
                                                <input type="text" id="date-field" className="form-control" placeholder="Select Date" required />
                                                <div className="invalid-feedback">Please select a date.</div>
                                            </div>

                                            <div>
                                                <label htmlFor="status-field" className="form-label">Status</label>
                                                <select className="form-control" data-trigger name="status-field" id="status-field" required>
                                                    <option value="">Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Block">Block</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-success" id="add-btn">Add Customer</button>
                                                <button type="button" className="btn btn-success" id="edit-btn">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Modal --> */}
                        <div className="modal fade zoomIn" id="deleteRecordModal" tabIndex={-1} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mt-2 text-center">
                                            {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> */}
                                            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                                <h4>Are you Sure ?</h4>
                                                <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                            <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--end modal --> */}
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

export default BlockedUsers;