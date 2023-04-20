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

function RequestFundHistory() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');  
  const [requestFundHistory, setrequestFundHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [refferalBonus, setRefferalBonus] = useState(0);
  const [notify, setNotify] = useState("");

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

  const getAllrequest = async () => {
    try {
      axios
        .get(base_url + "users/" + user._id + "/requestFundHistory")
        .then((response) => {
          console.log(response)
          const requestFundHistory = response.data.requiredFundLists ? response.data.requiredFundLists.map((item) => {
            return {
              ...item,
              createdAt: formatDate(item.created_at),
            };            
           }): [];
          setrequestFundHistory(requestFundHistory);
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
    getAllrequest();
  }, []);

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

 const requests = requestFundHistory.map(item => ({
  request: { amount_requested: item.amount_requested }
}));

 let total_amount_requested = 0;

for (const item of requests) {
  total_amount_requested += item.request.amount_requested;
}

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestFundHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(requestFundHistory.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDeleteWithdraw = (withdrawId) => {
    axios
      .delete(base_url + "users/" + user._id + "/requestFundHistory/" + withdrawId)
      .then((response) => {
        toast.success("Withdrawal deleted successfully");
        getAllrequest();
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
      <Header />

      <Sidebar />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-3 col-sm-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">Total Requested</p>
                        <h2 className="mt-4 ff-secondary fw-semibold"><span className="counter-value" >{total_amount_requested}</span>$</h2>

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
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="ticketsList">
                  <div className="card-header border-0">
                    <div className="d-flex align-items-center">
                      <h5 className="card-title mb-0 flex-grow-1">Request Fund History</h5>
                      <div className="flex-shrink-0">
                        <div className="d-flex flex-wrap gap-2">
                          <button className="btn btn-danger add-btn" data-bs-toggle="modal" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1"></i> Create Request Fund</button>
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
                            <th className="sort" data-sort="client_name">Requested Amount</th>
                            <th className="sort" data-sort="assignedto">Requested Date</th>
                            <th className="sort" data-sort="status">Status</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all" id="ticket-list-data">
                          {currentItems.map((request) => (
                            <tr key={request._id}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="checkAll" value="option1" />
                                  </div>
                                </th>
                                <td className="id"><a href="javascript:void(0);" data-id="001" className="fw-medium link-primary">001</a></td>
                                <td className="tasks_name">Amount Request</td>
                                <td className="client_name">{request.amount_requested} $</td>
                                <td className="create_date">{new Date(request.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <td className="status"><span className="badge badge-soft-warning text-uppercase">{request.amount_requested_status}</span></td>
                                
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

        <Footer />
      </div>
    </div>

  );
}

export default RequestFundHistory;