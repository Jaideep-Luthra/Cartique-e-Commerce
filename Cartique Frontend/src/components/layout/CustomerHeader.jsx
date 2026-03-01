import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiServices from "./ApiServices";
import { toast } from "react-toastify";

export default function CustomerHeader() {

  const nav = useNavigate()
  // console.log(sessionStorage.getItem("userId"))

  const rdi = () => {
    if (sessionStorage.getItem("userId") == null)
      nav('/login')
  }

  useEffect(() => {
    rdi()
  }, [])

  const [catData, SetCatData] = useState([])
  const [brandData, setBrandData] = useState([])


  function fetchCat() {
    ApiServices.customerViewAllCategory({ status: true })
      .then((res) => {
        if (res.data.success) {
          SetCatData(res.data.data)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong")
        console.log(err)
      })
  }

  function fetchBrand() {
    ApiServices.customerViewAllBrand({ status: true })
      .then((res) => {
        if (res.data.success) {
          setBrandData(res.data.data)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong")
        console.log(err)
      })
  }

  useEffect(() => {
    fetchCat(),
      fetchBrand()
  }, [])

  return (
    <>
      {/* Navbar start */}
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
                <a href="#" className="text-white">
                  Jalandhar
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="#" className="text-white">
                  Cartique@gmail.com
                </a>
              </small>
            </div>
            {/* <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div> */}
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="index.html" className="navbar-brand">
              <h1 className="text-primary display-6">Cartique</h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to={"/customer"} className="nav-item nav-link">
                  Home
                </Link>
                {/* <Link to={"/customer/shop"} className="nav-item nav-link">
                  Shop
                </Link> */}

                <div className="nav-item dropdown">
                  <Link
                    to={""}
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Category
                  </Link>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {catData && catData.length > 0 ? (
                      catData.map((el, index) => (
                        <Link to={"/customer/categoryproduct/" + el?._id} className="dropdown-item" key={el._id}>
                          {el?.categoryName}
                        </Link>
                      ))
                    ) : <></>}

                  </div>
                </div>

                <div className="nav-item dropdown">
                  <Link
                    to={""}
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Brand
                  </Link>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {brandData && brandData.length > 0 ? (
                      brandData.map((el, index) => (
                        <Link to={"/customer/brandproduct/" + el?._id} className="dropdown-item" key={el._id}>
                          {el?.brandName}
                        </Link>
                      ))
                    ) : <></>}

                  </div>
                </div>

                <Link to={"/customer/product"} className="nav-item nav-link">
                  Products
                </Link>

                <Link to={"/customer/viewcart"} className="nav-item nav-link">
                  Cart
                </Link>

                <Link to={"/customer/vieworder"} className="nav-item nav-link">
                  Order
                </Link>

                <Link to={"/customer/contact"} className="nav-item nav-link">
                  Enquiry
                </Link>

                <Link to={"/customer/changePassword"} className="nav-item nav-link">
                  Change Password
                </Link>
                <Link to={"/customer/profile"} className="nav-item nav-link">
                  Profile
                </Link> 

                <Link to={"/login"} className="nav-item nav-link" onClick={() => {
                  sessionStorage.clear()
                  toast.success("Logout Successfully!")
                  // setTimeout(() => {
                  nav("/login")

                  // }, 2000)
                }}>
                  Logout
                </Link>

              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
      {/* Modal Search Start */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}

    </>
  )
}