import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function AdminHeader() {
    const nav = useNavigate()
    // console.log(sessionStorage.getItem("userId"))

    const rdi = () => {
        if (sessionStorage.getItem("userId") == null)
            nav('/login')
    }

    useEffect(()=>{
        rdi()
    },[])

    return (
        <>
            {/* Navbar start */}
            <div className="container-fluid fixed-top">

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
                                <Link to={"/admin"} className="nav-item nav-link">
                                    Home
                                </Link>

                                <div className="nav-item dropdown">
                                    <Link
                                        to={""}
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Category
                                    </Link>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <Link to={"/admin/addcategory"} className="dropdown-item">
                                            Add
                                        </Link>
                                        <Link to={"/admin/managecategory"} className="dropdown-item">
                                            Manage
                                        </Link>

                                    </div>
                                </div>

                                <div className="nav-item dropdown">
                                    <Link
                                        to={""}
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Brands
                                    </Link>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <Link to={"/admin/addbrand"} className="dropdown-item">
                                            Add
                                        </Link>
                                        <Link to={"/admin/managebrand"} className="dropdown-item">
                                            Manage
                                        </Link>

                                    </div>
                                </div>

                                <div className="nav-item dropdown">
                                    <Link
                                        to={""}
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Products
                                    </Link>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <Link to={"/admin/addproduct"} className="dropdown-item">
                                            Add
                                        </Link>
                                        <Link to={"/admin/manageproduct"} className="dropdown-item">
                                            Manage
                                        </Link>

                                    </div>
                                </div>

                                <Link to={"/admin/vieworders"} className="nav-item nav-link">
                                    Orders
                                </Link>

                                <Link to={"/admin/viewusers"} className="nav-item nav-link">
                                    Users
                                </Link>

                                <Link to={"/admin/viewenquiry"} className="nav-item nav-link">
                                    Enquiry
                                </Link>

                                <Link to={"/admin/changePassword"} className="nav-item nav-link">
                                    Change Password
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

        </>
    )
}

export default AdminHeader
