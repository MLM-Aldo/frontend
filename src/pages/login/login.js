import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        let token = localStorage.getItem('token');
        if(token) {
            navigate('/dashboard');
        }
    },[]);


    const signupUser = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(base_url + 'users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.user._id);
            navigate('/dashboard');
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('An error occurred. Please try again.');
        }
      };
    return(
        <div className="auth-page-wrapper pt-5">
        {/* <!-- auth page bg --> */}
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div className="bg-overlay"></div>

            <div className="shape">
                {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg> */}
            </div>
        </div>

        {/* <!-- auth page content --> */}
        <div className="auth-page-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center mt-sm-5 mb-2 text-white-50">
                            <div>
                                <a href="index.html" className="d-inline-block auth-logo">
                                    <img src="assets/images/logo.png" alt="" height="80" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end row --> */}

                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card mt-4">

                            <div className="card-body p-4">
                                <div className="text-center mt-2">
                                    <h5 className="text-primary">Create New Account</h5>
                                </div>
                                <div className="p-2 mt-4">
                                    <form className="needs-validation" novalidate>

                                        

                                        <div className="mb-3">
                                            <label for="username" className="form-label">Username <span className="text-danger">*</span></label>
                                            <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Enter username" required />
                                            <div className="invalid-feedback">
                                                Please enter username
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" for="password-input">Password</label>
                                            <div className="position-relative auth-pass-inputgroup">
                                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}className="form-control pe-5 password-input" onpaste="return false" placeholder="Enter password" id="password-input" aria-describedby="passwordInput" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />
                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                <div className="invalid-feedback">
                                                    Please enter password
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the ALDO <a href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</a></p>
                                        </div>


                                        <div className="mt-4">
                                            <button className="btn btn-success w-100" onClick={signupUser}>Login</button>
                                        </div>

                                        {error && <div>{error}</div>}

                                        
                                    </form>

                                </div>
                            </div>
                            {/* <!-- end card body --> */}
                        </div>
                        {/* <!-- end card --> */}

                        <div className="mt-4 text-center">
                            <p className="mb-0">Dont have an account ? <a href="/signup" className="fw-semibold text-primary text-decoration-underline"> Sign Up </a> </p>
                        </div>

                    </div>
                </div>
                {/* <!-- end row --> */}
            </div>
            {/* <!-- end container --> */}
        </div>
        {/* <!-- end auth page content --> */}

         {/* <!-- footer --> */}
         <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <p className="mb-0 text-muted">&copy;
                                <script>document.write(new Date().getFullYear())</script> ALDO. Crafted with <i className="mdi mdi-heart text-danger"></i> by Shree
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        {/* <!-- end Footer --> */}
    </div>
    );
}

export default Login;