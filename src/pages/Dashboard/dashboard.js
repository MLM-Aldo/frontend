import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import LevelTree from "../Leveltree/Leveltree";
import Users from '../Userlist/userlist'

function Dashboard() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API_URL;

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

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
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' +token
                },
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
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


                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="d-flex align-items-center">
                                        <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg" alt="Header Avatar" />
                                        <span className="text-start ms-xl-2">
                                            {/* <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">S</span> */}
                                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user.username}</span>
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">

                                    <h6 className="dropdown-header">Welcome {user.username}!</h6>
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

                <div className="page-content">
                    <LevelTree></LevelTree>
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