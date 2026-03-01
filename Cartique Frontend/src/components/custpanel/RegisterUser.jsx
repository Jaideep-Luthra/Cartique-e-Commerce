import React, { useState } from "react";
import '../../../public/assets/css/customStyle.css'
import ApiServices from "../layout/ApiServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader, ClipLoader } from "react-spinners";


function RegisterUser() {

  var [firstName, setfirstName] = useState("");
  var [lastName, setlastName] = useState("");
  var [dateOfBirth, setdateOfBirth] = useState("");
  var [gender, setgender] = useState("");
  var [Email, setEmail] = useState("");
  var [Password, setPassword] = useState("");

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#81C408");

  var nav = useNavigate();

  function handleForm(e) {
    // Loading stop
    e.preventDefault();
    setLoading(true)

    console.log("form is submit");

    let data = {
      email: Email,
      password: Password,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender
    }

    ApiServices.RegisterCustomer(data)
      .then((res) => {
        if (res.data.success) {
          toast.success("CUstomer Added Successfully!");
          setLoading(false)
          //Login Here
          ApiServices.Login(data)
            .then((res) => {
              setLoading(false)
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
              setLoading(false)
              toast.error("Server error, please try again");
            });

        } else {
          setLoading(false)
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error("Something Went Wrong!");
        console.log(err)
      });

  }

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Register</h1>
      </div>
      {/* Single Page Header End */}
      <div
        className="col-12"
        style={{
          backgroundImage: 'url("/assets/images/job.jpg")',
          opacity: "0.9",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="form-container p-4 border rounded mt-5 pt-5" style={{ marginBottom: "100px" }}>
          <form action="#" className="" onSubmit={handleForm}>
            <div className="row form-group mb-4">
              <div className="col-md-12 mb-3 mb-md-0">
                <label>First Name*</label>
                <input
                  type="text"
                  id="fname"
                  className="form-control"
                  placeholder="Email address"
                  value={firstName} onChange={(e) => setfirstName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row form-group mb-4">
              <div className="col-md-12 mb-3 mb-md-0">
                <label>Last Name*</label>
                <input
                  type="text"
                  id="fname"
                  className="form-control"
                  placeholder="Email address"
                  value={lastName} onChange={(e) => setlastName(e.target.value)}
                  required
                />
              </div>
            </div>

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

            <div className="row form-group mb-4">
              <div className="col-md-12 mb-3 mb-md-0">
                <label>Date of Birth*</label>
                <input
                  type="date"
                  id="fname"
                  className="form-control"
                  placeholder="DOB"
                  value={dateOfBirth}
                  onChange={(e) => setdateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row form-group mb-4">
              <div className="col-md-12 mb-3 mb-md-0">
                <label>Gender*</label>
                <select
                  id="fname"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  required
                >
                  <option value="" selected disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <input
                  type="submit"
                  defaultValue="Register"
                  className="btn px-4  text-white" style={{ backgroundColor: "greenyellow" }} />
              </div>
            </div>

            <div className="col-12 mt-3">
              <span>Already have an account? <Link to="/login" >Login</Link></span>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default RegisterUser;
