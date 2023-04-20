import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar/sidebar";

function UserProfile() {

  const base_url = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
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
        <Header />

        <Sidebar />

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

          <Footer />
        </div>
      </div>
    </div>


  )
}

export default UserProfile;