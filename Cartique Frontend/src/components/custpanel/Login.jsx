import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../layout/ApiServices";

function Login() {
    var [Email, setEmail] = useState("admin@gmail.com");
    var [Password, setPassword] = useState("123");
    var nav = useNavigate();

    function handleForm(e) {
        // Loading stop
        e.preventDefault();

        console.log("form is submit");

        let data = {
            email: Email,
            password: Password
        }
        ApiServices.Login(data)
            .then((res) => {
                if (res.data.success) {

                    if (res.data.data.userType == "1") {
                        // store values in sessionStorage
                        sessionStorage.setItem("token", res.data.token);
                        sessionStorage.setItem("userId", res.data.data._id); // login user _id
                        sessionStorage.setItem("userType", res.data.data.userType);

                        toast.success("Login Successfull!");
                        // setTimeout(() => {
                        nav("/admin"); // redirect to Admin dashboard or page

                        // }, 2000)
                    }
                    else if (res.data.data.userType == "2") {
                        sessionStorage.setItem("token", res.data.token)
                        sessionStorage.setItem("userId", res.data.data._id)
                        sessionStorage.setItem("userType", res.data.data.userType)
                        toast.success("Login Successfull!")

                        // setTimeout(() => {
                        nav("/customer")

                        // }, 2000)
                    }

                } else {
                    toast.error("Invalid credentials");
                }
            })
            .catch(() => {
                toast.error("Server error, please try again");
            });

    }

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
            </div>
            {/* Single Page Header End */}
            <section className="site-section">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-2"></div>
                        <div className="col-lg-6 mx-auto p-4 border rounded mt-5 pt-5">
                            <form action="#" className="" onSubmit={handleForm}>
                                <div className="row form-group mb-4">
                                    <div className="col-md-12 mb-3 mb-md-0">
                                        <label>Email*</label>
                                        <input
                                            type="email"
                                            id="fname"
                                            className="form-control"
                                            placeholder="Email address"
                                            value={Email} onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row form-group mb-4">
                                    <div className="col-md-12 mb-3 mb-md-0">
                                        <label>Password*</label>
                                        <input
                                            type="password"
                                            id="fname"
                                            className="form-control"
                                            placeholder="Password"
                                            value={Password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-12">
                                        <ToastContainer />
                                        <input
                                            type="submit"
                                            defaultValue="Log In"
                                            className="btn px-4  text-white" style={{ backgroundColor: "greenyellow" }} />
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <span>Don't have an account? <Link to="/register" >Register</Link></span>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2"></div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
