import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Users from '../Userlist/userlist'

function Dashboard() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        let token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
        }
    },[])

    const logout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(base_url + 'users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };


    return (
        <div id="layout-wrapper">

            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                <a href="/" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src="assets/images/logo.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="assets/images/logo.png" alt="" height="17" />
                                    </span>
                                </a>

                                <a href="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src="assets/images/logo.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="assets/images/logo.png" alt="" height="17" />
                                    </span>
                                </a>
                            </div>

                            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon">
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>

                            {/* <!-- App Search--> */}
                            <form className="app-search d-none d-md-block">
                                <div className="position-relative">
                                    <input type="text" className="form-control" placeholder="Search..." autoComplete="off" id="search-options" value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <span className="mdi mdi-magnify search-widget-icon"></span>
                                    <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
                                </div>
                                <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                                    <div data-simplebar style={{ maxHeight: "320px" }}>
                                        <div className="dropdown-header">
                                            <h6 className="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                                        </div>

                                        <div className="dropdown-item bg-transparent text-wrap">
                                            <a href="/" className="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i className="mdi mdi-magnify ms-1"></i></a>
                                            <a href="/" className="btn btn-soft-secondary btn-sm btn-rounded">buttons <i className="mdi mdi-magnify ms-1"></i></a>
                                        </div>

                                        <div className="dropdown-header mt-2">
                                            <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                                        </div>

                                        <a href="" className="dropdown-item notify-item">
                                            <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                                            <span>Analytics Dashboard</span>
                                        </a>

                                        <a href="" className="dropdown-item notify-item">
                                            <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                                            <span>Help Center</span>
                                        </a>

                                        <a href="" className="dropdown-item notify-item">
                                            <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                                            <span>My account settings</span>
                                        </a>

                                        <div className="dropdown-header mt-2">
                                            <h6 className="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                                        </div>

                                        <div className="notification-list">

                                            <a href="" className="dropdown-item notify-item py-2">
                                                <div className="d-flex">
                                                    <img src="assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <h6 className="m-0">Angela Bernier</h6>
                                                        <span className="fs-11 mb-0 text-muted">Manager</span>
                                                    </div>
                                                </div>
                                            </a>

                                            <a href="#" className="dropdown-item notify-item py-2">
                                                <div className="d-flex">
                                                    <img src="assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <h6 className="m-0">David Grasso</h6>
                                                        <span className="fs-11 mb-0 text-muted">Web Designer</span>
                                                    </div>
                                                </div>
                                            </a>

                                            <a href="#" className="dropdown-item notify-item py-2">
                                                <div className="d-flex">
                                                    <img src="assets/images/users/avatar-5.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <h6 className="m-0">Mike Bunch</h6>
                                                        <span className="fs-11 mb-0 text-muted">React Developer</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="text-center pt-3 pb-1">
                                        <a href="" className="btn btn-primary btn-sm">View All Results <i className="ri-arrow-right-line ms-1"></i></a>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="d-flex align-items-center">

                            <div className="dropdown d-md-none topbar-head-dropdown header-item">
                                <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="bx bx-search fs-22"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                    <form className="p-3">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                                <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                                <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                    <i className='bx bx-bell fs-22'></i>
                                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span className="visually-hidden">unread messages</span></span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">

                                    <div className="dropdown-head bg-primary bg-pattern rounded-top">
                                        <div className="p-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                                </div>
                                                <div className="col-auto dropdown-tabs">
                                                    <span className="badge badge-soft-light fs-13"> 4 New</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-2 pt-2">
                                            <ul className="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist">
                                                <li className="nav-item waves-effect waves-light">
                                                    <a className="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">
                                                        All (4)
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="tab-content position-relative" id="notificationItemsTabContent">
                                        <div className="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel">
                                            <div data-simplebar style={{ maxHeight: "300px" }} className="pe-2">

                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <div className="avatar-xs me-3">
                                                            <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                                                <i className='bx bx-message-square-dots'></i>
                                                            </span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <a href="/" className="stretched-link">
                                                                <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation
                                                                </h6>
                                                            </a>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox" value="" id="all-notification-check03" />
                                                                <label className="form-check-label" htmlFor="all-notification-check03"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="my-3 text-center view-all">
                                                    <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                        All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab"></div>

                                        <div className="notification-actions" id="notification-actions">
                                            <div className="d-flex text-muted justify-content-center">
                                                Select <div id="select-content" className="text-body fw-semibold px-1">0</div> Result <button type="button" className="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="d-flex align-items-center">
                                        <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg" alt="Header Avatar" />
                                        <span className="text-start ms-xl-2">
                                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">S</span>
                                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Admin</span>
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">

                                    <h6 className="dropdown-header">Welcome Admin!</h6>
                                    <a className="dropdown-item" href=""><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href=""><i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Balance : <b>Rs 5971.67</b></span></a>
                                    <a className="dropdown-item" href=""><span className="badge bg-soft-success text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Settings</span></a>
                                    <a className="dropdown-item" href="">
                                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle" data-key="t-logout" onClick={logout}>Logout</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div id="removeNotificationModal" className="modal fade zoomIn" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="app-menu navbar-menu">
                {/* <!-- LOGO --> */}
                <div className="navbar-brand-box">
                    {/* <!-- Dark Logo--> */}
                    <a href="index.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="assets/images/logo.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo.png" alt="" height="17" />
                        </span>
                    </a>
                    {/* <!-- Light Logo--> */}
                    <a href="index.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="assets/images/logo.png" alt="" height="80" />
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo.png" alt="" height="80" />
                        </span>
                    </a>
                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>

                <div id="scrollbar">
                    <div className="container-fluid">

                        <div id="two-column-menu">
                        </div>
                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                                    <i className="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Wallet</span>
                                </a>
                                <div className="collapse menu-dropdown" id="sidebarDashboards">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a href="" className="nav-link" data-key="t-analytics"> Wallet Balance </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className="nav-link" data-key="t-crm"> Pending Funds </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className="nav-link" data-key="t-ecommerce"> Transfer Funds </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className="nav-link" data-key="t-crypto"> Manage Funds</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/* <!-- end Dashboard Menu --> */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                    <i className="ri-apps-2-line"></i> <span data-key="t-apps">Genealogy</span>
                                </a>
                                <div className="collapse menu-dropdown" id="sidebarApps">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a href="" className="nav-link" data-key="t-calendar"> Reffered Lists </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className="nav-link" data-key="t-chat"> Downline Tree </a>
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
                    <Users></Users>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                2023 © ALDO
                            </div>
                            <div className="col-sm-6">
                                <div className="text-sm-end d-none d-sm-block">
                                    Design & Develop by Shree
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>


        </div>
    )
}

export default Dashboard;