import React from "react";

function Userlist() {

    const deleteMultiple = () => {

    }
    return (

        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Listjs</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Tables</a></li>
                                        <li className="breadcrumb-item active">Listjs</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}

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
                                                    <button className="btn btn-soft-danger" onClick={deleteMultiple}><i className="ri-delete-bin-2-line"></i></button>
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
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: 'none' }}><a href="javascript:void(0);" className="fw-medium link-primary">#VZ2101</a></td>
                                                        <td className="customer_name">Mary Cousar</td>
                                                        <td className="email">marycousar@velzon.com</td>
                                                        <td className="phone">580-464-4694</td>
                                                        <td className="date">06 Apr, 2021</td>
                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">Active</span></td>
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

                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">Data Attributes + Custom</h4>
                                </div>
                                {/* <!-- end card header --> */}

                                <div className="card-body">
                                    <p className="text-muted">Use data attributes and other custom attributes as keys</p>
                                    <div id="users">
                                        <div className="row mb-2">
                                            <div className="col">
                                                <div>
                                                    <input className="search form-control" placeholder="Search" />
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-light sort" data-sort="name">
                                                    Sort by name
                                                </button>
                                            </div>
                                        </div>

                                        <div data-simplebar style={{ height: '242px' }} className="mx-n3">
                                            <ul className="list list-group list-group-flush mb-0">
                                                <li className="list-group-item" data-id="1">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-13 mb-1"><a href="#" className="link name text-dark">Jonny Stromberg</a></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="12345">1986</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-1.jpg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <!-- end list item --> */}
                                                <li className="list-group-item" data-id="2">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-13 mb-1"><a href="#" className="link name text-dark">Jonas Arnklint</a></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="23456">1985</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-2.jpg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <!-- end list item --> */}
                                                <li className="list-group-item" data-id="3">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-13 mb-1"><a href="#" className="link name text-dark">Martina Elm</a></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="34567">1986</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-3.jpg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <!-- end list item --> */}
                                                <li className="list-group-item" data-id="4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-13 mb-1"><a href="#" className="link name text-dark">Gustaf Lindqvist</a></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="45678">1983</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-4.jpg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <!-- end list item --> */}
                                            </ul>
                                            {/* <!-- end ul list --> */}
                                        </div>
                                    </div>
                                    {/* </div><!-- end card body --> */}
                                </div>
                                {/* <!-- end card --> */}
                            </div>
                            {/* <!-- end col --> */}

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">Existing List</h4>
                                    </div>
                                    {/* <!-- end card header --> */}

                                    <div className="card-body">
                                        <p className="text-muted">Basic Example with Existing List</p>
                                        <div id="contact-existing-list">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <div>
                                                        <input className="search form-control" placeholder="Search" />
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <button className="btn btn-light sort" data-sort="contact-name">
                                                        Sort by name
                                                    </button>
                                                </div>
                                            </div>

                                            <div data-simplebar style={{ height: '242px' }} className="mx-n3">
                                                <ul className="list list-group list-group-flush mb-0">
                                                    <li className="list-group-item" data-id="01">
                                                        <div className="d-flex align-items-start">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div>
                                                                    <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-1.jpg" />
                                                                </div>
                                                            </div>

                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <h5 className="contact-name fs-13 mb-1"><a href="#" className="link text-dark">Jonny Stromberg</a></h5>
                                                                <p className="contact-born text-muted mb-0">New updates for ABC Theme</p>
                                                            </div>

                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="fs-11 text-muted">06 min</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* <!-- end list item --> */}
                                                    <li className="list-group-item" data-id="02">
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div>
                                                                    <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-2.jpg" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <h5 className="contact-name fs-13 mb-1"><a href="#" className="link text-dark">Jonas Arnklint</a></h5>
                                                                <p className="contact-born text-muted mb-0">Bug Report - abc theme</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="fs-11 text-muted">12 min</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* <!-- end list item --> */}
                                                    <li className="list-group-item" data-id="03">
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div>
                                                                    <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-3.jpg" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h5 className="contact-name fs-13 mb-1"><a href="#" className="link text-dark">Martina Elm</a></h5>
                                                                <p className="contact-born text-muted mb-0">Nice to meet you</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="fs-11 text-muted">28 min</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* <!-- end list item --> */}
                                                    <li className="list-group-item" data-id="04">
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div>
                                                                    <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-4.jpg" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h5 className="contact-name fs-13 mb-1"><a href="#" className="link text-dark">Gustaf Lindqvist</a></h5>
                                                                <p className="contact-born text-muted mb-0">I've finished it! See you so</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="fs-11 text-muted">01 hrs</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* <!-- end list item --> */}
                                                </ul>
                                                {/* <!-- end ul list --> */}
                                            </div>
                                        </div>
                                        {/* </div><!-- end card --> */}
                                    </div>
                                    {/* <!-- end col --> */}
                                </div>
                                {/* <!-- end col --> */}

                                <div className="col-xl-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title mb-0">Fuzzy Search</h4>
                                        </div>
                                        {/* <!-- end card header --> */}
                                        <div className="card-body">
                                            <p className="text-muted">Example of how to use the fuzzy search plugin</p>
                                            <div id="fuzzysearch-list">
                                                <input type="text" className="fuzzy-search form-control mb-2" placeholder="Search" />

                                                <div data-simplebar style={{ height: '242px' }}>
                                                    <ul className="list mb-0">
                                                        <li>
                                                            <p className="name">Guybrush Threepwood</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Elaine Marley</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">LeChuck</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Stan</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Voodoo Lady</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Herman Toothrot</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Meathook</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Carla</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Otis</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Rapp Scallion</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Rum Rogers Sr.</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Men of Low Moral Fiber</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Murray</p>
                                                        </li>
                                                        <li>
                                                            <p className="name">Cannibals</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- end card --> */}
                                </div>
                                {/* <!-- end col --> */}
                            </div>
                            {/* <!-- end row --> */}

                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title mb-0">Pagination</h4>
                                        </div>
                                        {/* <!-- end card header --> */}

                                        <div className="card-body">
                                            <p className="text-muted">Example of how to use the pagination plugin</p>

                                            <div className="listjs-table" id="pagination-list">
                                                <div className="mb-2">
                                                    <input className="search form-control" placeholder="Search" />
                                                </div>

                                                <div className="mx-n3">
                                                    <ul className="list list-group list-group-flush mb-0">
                                                        <li className="list-group-item">
                                                            <div className="d-flex align-items-center pagi-list">
                                                                <div className="flex-shrink-0 me-3">
                                                                    <div>
                                                                        <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-1.jpg" />
                                                                    </div>
                                                                </div>

                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <h5 className="fs-13 mb-1"><a href="#" className="link text-dark">Jonny Stromberg</a></h5>
                                                                    <p className="born timestamp text-muted mb-0">Front end Developer</p>
                                                                </div>

                                                                <div className="flex-shrink-0 ms-2">
                                                                    <div>
                                                                        <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/* <!-- end list item --> */}
                                                        <li className="list-group-item">
                                                            <div className="d-flex align-items-center pagi-list">
                                                                <div className="flex-shrink-0 me-3">
                                                                    <div>
                                                                        <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-2.jpg" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <h5 className="fs-13 mb-1"><a href="#" className="link text-dark">Jonas Arnklint</a></h5>
                                                                    <p className="born fs-12 timestamp text-muted mb-0">Backend Developer</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <div>
                                                                        <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/* <!-- end list item --> */}
                                                        <li className="list-group-item">
                                                            <div className="d-flex align-items-center pagi-list">
                                                                <div className="flex-shrink-0 me-3">
                                                                    <div>
                                                                        <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-3.jpg" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="fs-13 mb-1"><a href="#" className="link text-dark">Martina Elm</a></h5>
                                                                    <p className="born fs-12 timestamp text-muted mb-0">UI/UX Designer</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <div>
                                                                        <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/* <!-- end list item --> */}
                                                        <li className="list-group-item">
                                                            <div className="d-flex align-items-center pagi-list">
                                                                <div className="flex-shrink-0 me-3">
                                                                    <div>
                                                                        <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-4.jpg" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="fs-13 mb-1"><a href="#" className="link text-dark">Gustaf Lindqvist</a></h5>
                                                                    <p className="born fs-12 timestamp text-muted mb-0">Full Stack Developer</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <div>
                                                                        <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/* <!-- end list item --> */}
                                                        <li className="list-group-item">
                                                            <div className="d-flex align-items-center pagi-list">
                                                                <div className="flex-shrink-0 me-3">
                                                                    <div>
                                                                        <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-1.jpg" />
                                                                    </div>
                                                                </div>

                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <h5 className="fs-13 mb-1"><a href="#" className="link text-dark">Jonny Stromberg</a></h5>
                                                                    <p className="born timestamp text-muted mb-0">Front end Developer</p>
                                                                </div>

                                                                <div className="flex-shrink-0 ms-2">
                                                                    <div>
                                                                        <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/* <!-- end list item --> */}
                                                        <li className="list-group-item">
                                                            <div className="d-flex align-items-center pagi-list">
                                                                <div className="flex-shrink-0 me-3">
                                                                    <div>
                                                                        <img className="image avatar-xs rounded-circle" alt="" src="assets/images/users/avatar-2.jpg" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <h5 className="fs-13 mb-1"><a href="#" className="link text-dark">Jonas Arnklint</a></h5>
                                                                    <p className="born fs-12 timestamp text-muted mb-0">Backend Developer</p>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <div>
                                                                        <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/* <!-- end list item --> */}
                                                    </ul>
                                                    {/* <!-- end ul list --> */}

                                                    <div className="d-flex justify-content-center">
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
                        {/* <!-- container-fluid --> */}
                    </div>
                    {/* <!-- End Page-content --> */}
                </div>
            </div>
        </div>

    );
}

export default Userlist;