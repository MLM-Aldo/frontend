import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import LevelTree from "../Leveltree/Leveltree";
import Users from '../Userlist/userlist'
import axios from 'axios';
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../sidebar/sidebar";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_API_URL;
  const [refferalBonus, setRefferalBonus] = useState(0);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [approvedWithdrawals, setApprovedWithdrawals] = useState([]);


  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    axios
      .get(base_url + "referrals/referralBonus/" + user.referralCode)
      .then((response) => {
        const refferalBonus = response.data.referralAmount;
        setRefferalBonus(refferalBonus);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [refferalBonus])

  const logout = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(base_url + "users/logout")
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

  const [walletBalance, setWalletBalance] = useState(refferalBonus);

  const getAllWithdraw = async () => {
    try {
      const response = await axios.get(base_url + "users/" + user._id + "/withdrawHistory");
      const withdrawHistory = response.data.withdrawLists.map((item) => ({
        ...item,
        createdAt: formatDate(item.created_at),
      }));
      const approvedWithdrawals = withdrawHistory.filter(item => item.amount_withdraw_status === "Approved");
      setWithdrawHistory(withdrawHistory);
      setApprovedWithdrawals(approvedWithdrawals);
      return withdrawHistory;
    } catch (error) {
      console.error(error);
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    getAllWithdraw().then(withdrawHistory => {
      const requests = withdrawHistory.filter(item => item.amount_withdraw_status === "Approved").map(item => ({
        request: { amount_withdraw: item.amount_withdraw }
      }));
      const total_amount_withdraw = requests.reduce((total, item) => total + item.request.amount_withdraw, 0);
      const newBalance = refferalBonus - total_amount_withdraw;
      setWalletBalance(newBalance);
    });
  }, [refferalBonus, setWalletBalance]);

  const requests = approvedWithdrawals.map(item => ({
    request: { amount_withdraw: item.amount_withdraw }
  }));

  let total_amount_withdraw = 0;

  for (const item of requests) {
    total_amount_withdraw += item.request.amount_withdraw;
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
                  <div className="row mb-3 pb-1">
                    <div className="col-12">
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <h4 className="fs-16 mb-1">Good Morning, {user.username}!</h4>
                          <p className="text-muted mb-0">Here's what's happening with your Account.</p>
                        </div>
                      </div>
                      {/* <!-- end card header --> */}
                    </div>
                    {/* <!--end col--> */}
                  </div>
                  {/* <!--end row--> */}
                  <div className="row">

                    <div className="col-xl-3 col-md-6">
                      {/* <!-- card --> */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Referral Code</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                {" "}
                                <span
                                  className="counter-value"
                                  data-target={user.referralCode}
                                >
                                  {user.referralCode}
                                </span>{" "}
                              </h4>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-success rounded fs-3">
                                <i className="bx bx-dollar-circle text-success"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col --> */}

                    <div className="col-xl-3 col-md-6">
                      {/* <!-- card --> */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Total Earnings</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="">{refferalBonus} </span> </h4>

                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-success rounded fs-3">
                                <i className="bx bx-dollar-circle text-success"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col --> */}

                    <div className="col-xl-3 col-md-6">
                      {/* <!-- card --> */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> My Balance</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="">{walletBalance}</span> </h4>
                              <a href="" className="text-decoration-underline">Withdraw money</a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-primary rounded fs-3">
                                <i className="bx bx-wallet text-primary"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end card body --> */}
                      </div>
                      {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                  {/* <!-- end row--> */}
                  
                </div>
              </div>

            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;