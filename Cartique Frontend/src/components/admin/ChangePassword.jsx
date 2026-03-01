import React, { useState } from "react";
import ApiServices from "../layout/ApiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BounceLoader, ClipLoader } from "react-spinners";

function ChangePassword() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#81C408");

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }

    ApiServices.changePassword(formData)
      .then((res) => {
        setLoading(false)

        if (res.data.success) {
          toast.success("Password changed Successfully!");
          sessionStorage.clear()
          nav("/login");

        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false)

        toast.error("Something Went Wrong!");
        console.log(err);
      });
  };

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Change Password</h1>
      </div>
      {/* Single Page Header End */}
      <div className="row">
        <div className="col-md-3 mx-auto">
          <BounceLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="">
            <div className="row g-4"></div>
            <div className="col-lg-4 mx-auto p-5 bg-light rounded">
              <form onSubmit={handleSubmit} className="">
                <label htmlFor="" className="form-label">Old Password</label>
                <input
                  type="password"
                  className="w-100 form-control border-0 mb-4"
                  placeholder=""
                  required
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setoldPassword(e.target.value)}
                />
                
                <label htmlFor="" className="form-label">New Password</label>
                <input
                  type="password"
                  className="w-100 form-control border-0 mb-4"
                  placeholder=""
                  required
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />

                <label htmlFor="" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="w-100 form-control border-0 mb-4"
                  placeholder=""
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />

                <button
                  className="w-100 btn form-control border-secondary bg-white text-primary"
                  type="submit"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
