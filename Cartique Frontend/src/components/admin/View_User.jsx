import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function View_User() {

    const [userData, setuserData] = useState([])

    useEffect(() => {
        fetchUser()
    }, [])

    function fetchUser() {
        ApiServices.AllUser()
            .then((res) => {
                // console.log(res.data)
                if (res.data.success) {
                    setuserData(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    function changeStatus(_id, status) {
        ApiServices.DeleteUser({ _id: _id, status: status })
            .then((res) => {
                if (res.data.success) {
                    fetchUser()
                    toast.success("User has " + status)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Manage Users</h1>
            </div>
            {/* Single Page Header End */}

            <div
                className="container-fluid"
                style={{
                    backgroundImage: `url('/path-to-your-image.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                    padding: "20px 0", // Added padding for better spacing
                }}
            >
                <div className="container mt-5 pt-5">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>User Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.length > 0 ? (
                                    userData.map((el, index) => (
                                        <tr key={el._id}>
                                            <td>{index + 1}</td>
                                            <td>{el.name}</td>
                                            <td>{el.email}</td>
                                            <td>{el.userType == 1 ? "Admin" : "Customer"}</td>
                                            <td>
                                                {el.status ? (
                                                    <span className="badge bg-success">Active</span>
                                                ) : (
                                                    <span className="badge bg-danger">Inactive</span>
                                                )}
                                            </td>
                                            <td>
                                                {el.status ? (
                                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                                        changeStatus(el._id, false)
                                                    }}>
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                                        changeStatus(el._id, true)
                                                    }}>
                                                        <i className="fa fa-check"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No data found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View_User
