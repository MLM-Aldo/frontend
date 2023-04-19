import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar/sidebar";

function Users() {

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
                                    <input type="text" className="form-control search" placeholder="Search..." value={searchVal} onChange={(event) => handleSearchTerm(event.target.value)} />
                                    <i className="ri-search-line search-icon"></i>
                                  </div>
                                  <label>Start Date:</label>
                                  <input type="date" value={startDate} onChange={handleStartDateChange} />
                                  <label>End Date:</label>
                                  <input type="date" value={endDate} onChange={handleEndDateChange} />
                                  <button onClick={handleResetClick}>Reset</button>

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
                                  {currentUsers.map((u) => {
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
                                        <td className="date">{u.humanDate}</td>
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
                                {/* <a className="page-item pagination-prev disabled" href="javascrpit:void(0)">
                                                        Previous
                                                    </a>
                                                    <ul className="pagination listjs-pagination mb-0"></ul>
                                                    <a className="page-item pagination-next" href="javascrpit:void(0)">
                                                        Next
                                                    </a> */}

                                <Pagination>
                                  <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                  />
                                  {[...Array(totalPages)].map((_, i) => (
                                    <Pagination.Item
                                      key={i + 1}
                                      active={i + 1 === currentPage}
                                      onClick={() => handlePageChange(i + 1)}
                                    >
                                      {i + 1}
                                    </Pagination.Item>
                                  ))}
                                  <Pagination.Next
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                  />
                                </Pagination>
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
                              <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required 
                              onChange={(event)=>setUserName(event.target.value)}
                              value={UserName}
                              />
                              <div className="invalid-feedback">Please enter a customer name.</div>
                            </div>

                            <div className="mb-3">
                              <label htmlFor="email-field" className="form-label">Email</label>
                              <input type="email" id="email-field" className="form-control" placeholder="Enter Email" required
                              onChange={(event)=>setEmail(event.target.value)}
                              value={email}
                              />
                              <div className="invalid-feedback">Please enter an email.</div>
                            </div>

                            <div className="mb-3">
                              <label htmlFor="phone-field" className="form-label">Phone</label>
                              <input type="text" id="phone-field" className="form-control" placeholder="Enter Phone no." required
                              onChange={(event)=>setPhone(event.target.value)}
                              value={phone}
                              />
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
                              <button type="button" className="btn btn-success" id="edit-btn" onClick={userUpdate}>Update</button>
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

        <Footer />
      </div>
    </div>

  );
}

export default Users;