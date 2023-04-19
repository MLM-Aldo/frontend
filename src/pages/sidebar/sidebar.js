import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar() {

    const location = useLocation();      

    return (
        <div className="sidebar-menu">
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
                                    aria-expanded="true"
                                    aria-controls="sidebarDashboards"
                                >
                                    <i className="ri-dashboard-2-line"></i>{" "}
                                    <span data-key="t-dashboards">Wallet</span>
                                </a>
                                <div
                                    className="collapse menu-dropdown show"
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
                                            <a href="/wallettransfer" className="nav-link" data-key="t-ecommerce">
                                                {" "}
                                                Transfer Money{" "}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/" className="nav-link" data-key="t-ecommerce">
                                                {" "}
                                                Transfer History{" "}
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
                                    aria-expanded="true"
                                    aria-controls="sidebarApps"
                                >
                                    <i className="ri-apps-2-line"></i>{" "}
                                    <span data-key="t-apps">Genealogy</span>
                                </a>
                                <div className="collapse menu-dropdown show" id="sidebarApps">
                                    <ul className="nav nav-sm flex-column">                                        
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
                                    href="#withdraw"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="withdraw"
                                >
                                    <i className="ri-dashboard-2-line"></i>{" "}
                                    <span data-key="t-dashboards">Withdraw</span>
                                </a>
                                <div
                                    className="collapse menu-dropdown show"
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
        </div>
    )
};
export default Sidebar;