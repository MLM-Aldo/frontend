import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Users() {

    const base_url = process.env.REACT_APP_API_URL;
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    const user_info = JSON.parse(localStorage.getItem('user'));

    const getAllUsers = async() => {
        try {
            const response = await fetch(base_url + 'users/allUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' +token
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }

    useEffect(()=>{
        getAllUsers();
    },[]);

    const deleteMultiple = () => {

    }
    return (


        <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">ALDO Dashboard</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a>Dashboards</a></li>
                                            <li className="breadcrumb-item active">ALDO Dashboard</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="row dash-nft">
                            <div className="col-xxl-9">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="card overflow-hidden">
                                            <div className="card-body bg-marketplace d-flex">
                                                <div className="flex-grow-1">
                                                    <h4 className="fs-18 lh-base mb-0">Discover, Collect, Sell and Create <br></br> your own <span className="text-success">Equities.</span> </h4>
                                                    <p className="mb-0 mt-2 pt-1 text-muted">This is largest digital marketplace.</p>
                                                </div>
                                                <img src="assets/images/bg-d.png" alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-height-100">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <div className="dropdown card-header-dropdown">
                                                        <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical align-middle"></i></span>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item" href="#">Today</a>
                                                            <a className="dropdown-item" href="#">Last Week</a>
                                                            <a className="dropdown-item" href="#">Last Month</a>
                                                            <a className="dropdown-item" href="#">Current Year</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <span className="avatar-title bg-soft-info rounded fs-3">
                                                            <i className="bx bx-dollar-circle text-info"></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow-1 ps-3">
                                                        <h5 className="text-muted text-uppercase fs-13 mb-0">Total Revenue</h5>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-1">
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">Rs<span className="counter-value" data-target="55.564"></span> </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-height-100">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <div className="dropdown card-header-dropdown">
                                                        <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical align-middle"></i></span>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item" href="#">Today</a>
                                                            <a className="dropdown-item" href="#">Last Week</a>
                                                            <a className="dropdown-item" href="#">Last Month</a>
                                                            <a className="dropdown-item" href="#">Current Year</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="d-flex align-items-center">
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <span className="avatar-title bg-soft-info rounded fs-3">
                                                            <i className="bx bx-wallet text-info"></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow-1 ps-3">
                                                        <h5 className="text-muted text-uppercase fs-13 mb-0">Estimated</h5>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-1">
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">Rs<span className="counter-value" data-target="62.564"></span> </h4>
                                                </div> */}


                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <span className="avatar-title bg-soft-info rounded fs-3">
                                                            <i className="bx bx-wallet text-info"></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow-1 ps-3">
                                                        <h5 className="text-muted text-uppercase fs-13 mb-0">Referral Code</h5>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-1">
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">Referral Code: <span className="counter-value" data-target={user_info.referralCode}>{user_info.referralCode}</span> </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        

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
                                                        <input type="text" className="form-control search" placeholder="Search..." />
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
                                                    {users.map((u)=>{
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
                                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">{(u.active)?'Deactive':'Active'}</span></td>
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
                    {/* <!-- End Page-content --> */}

                    </div>

    );
}

export default Users;