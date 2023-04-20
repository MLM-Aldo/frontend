import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar/sidebar";

function UserSettings() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [refferalBonus,setRefferalBonus] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

  const [firstName, setFirstName] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);

  const [oldPassword, setOldPassword] = useState("");
  const [newPasword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notify, setNotify] = useState("");

  const changePassword = () =>{
    axios
      .put(base_url + "users/"+ user._id + '/password', {
        "oldPassword": oldPassword,
        "newPassword": newPasword
      })
      .then((response) => {
        setNewPassword("")
        setOldPassword("")
        setConfirmPassword("")
        setNotify(toast("Password updated successfully!"))
      }).catch((error) => {
      });
  }

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
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  }

  const profileUpdate =() =>{
    axios
      .put(base_url + "users/"+ user._id, {
        "username": firstName,
        "email": user.email,
        "phone": phone
      })
      .then((response) => {
        user.username = firstName;
        user.phone = phone;
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/userprofile");
      }).catch((error) => {
      });
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
        <Header />

        <Sidebar />

        <div className="main-content">
            <div class="page-content">
                <div class="container-fluid">

                    <div class="position-relative mx-n4 mt-n4">
                        <div class="profile-wid-bg profile-setting-img">
                            <img src="assets/images/profile-bg.jpg" class="profile-wid-img" alt="" />
                            <div class="overlay-content">
                                
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xxl-3">
                            <div class="card mt-n5">
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                                            <img src="assets/images/users/avatar-1.jpg" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" />
                                            <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <input id="profile-img-file-input" type="file" class="profile-img-file-input" />
                                                <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                                    <span class="avatar-title rounded-circle bg-light text-body">
                                                        <i class="ri-camera-fill"></i>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <h5 class="fs-16 mb-1">{user.username}</h5>
                                        <p class="text-muted mb-0">Member</p>
                                    </div>
                                </div>
                            </div>
                            {/* <!--end card--> */}
                        </div>
                        {/* <!--end col--> */}
                        <div class="col-xxl-9">
                            <div class="card mt-xxl-n5">
                                <div class="card-header">
                                    <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
                                                <i class="fas fa-home"></i> Personal Details
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab">
                                                <i class="far fa-user"></i> Change Password
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body p-4">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="personalDetails" role="tabpanel">
                                            <form action="javascript:void(0);">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="mb-3">
                                                            <label for="firstnameInput" class="form-label">Full Name</label>
                                                            <input type="text" class="form-control" id="firstnameInput" placeholder="Enter your firstname"
                                                              onChange={(event)=>setFirstName(event.target.value)}
                                                             value={firstName} />
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                    <div class="col-lg-6">
                                                        <div class="mb-3">
                                                            <label for="phonenumberInput" class="form-label">Phone Number</label>
                                                            <input type="text" class="form-control" id="phonenumberInput" placeholder="Enter your phone number" 
                                                            onChange={(event)=>setPhone(event.target.value)}
                                                            value={phone} />
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                    <div class="col-lg-12">
                                                        <div class="hstack gap-2 justify-content-end">
                                                            <button type="submit" class="btn btn-primary" onClick={profileUpdate}>Update</button>
                                                            <button type="button" class="btn btn-soft-success">Cancel</button>
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                </div>
                                                {/* <!--end row--> */}
                                            </form>
                                        </div>
                                        {/* <!--end tab-pane--> */}
                                        <div class="tab-pane" id="changePassword" role="tabpanel">
                                            <form action="javascript:void(0);">
                                                <div class="row g-2">
                                                    <div class="col-lg-4">
                                                        <div>
                                                            <label for="oldpasswordInput" class="form-label">Old Password*</label>
                                                            <input type="password" class="form-control" id="oldpasswordInput" placeholder="Enter current password" 
                                                            value={oldPassword} onChange={(event)=>{setOldPassword(event.target.value)}}/>
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                    <div class="col-lg-4">
                                                        <div>
                                                            <label for="newpasswordInput" class="form-label">New Password*</label>
                                                            <input type="password" class="form-control" id="newpasswordInput" 
                                                            placeholder="Enter new password"  value={newPasword} onChange={(event)=>{setNewPassword(event.target.value)}}/>
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                    <div class="col-lg-4">
                                                        <div>
                                                            <label for="confirmpasswordInput" class="form-label">Confirm Password*</label>
                                                            <input type="password" class="form-control" id="confirmpasswordInput" placeholder="Confirm password" 
                                                            value={confirmPassword} onChange={(event)=>{setConfirmPassword(event.target.value)}}/>
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                    <div class="col-lg-12">
                                                        <div class="mb-3">
                                                            <a href="javascript:void(0);" class="link-primary text-decoration-underline">Forgot Password ?</a>
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                    <div class="col-lg-12">
                                                        <div class="text-end">
                                                            <button type="submit" class="btn btn-success" onClick={changePassword}>Change Password</button>
                                                        </div>
                                                    </div>
                                                    {/* <!--end col--> */}
                                                </div>
                                                {/* <!--end row--> */}
                                            </form>
                                        </div>
                                        {/* <!--end tab-pane--> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}

                </div>
                {/* <!-- container-fluid --> */}
            </div>
            {/* <!-- End Page-content --> */}

          <Footer />
          <ToastContainer />
        </div>
      </div>
    </div>


  )
}

export default UserSettings;