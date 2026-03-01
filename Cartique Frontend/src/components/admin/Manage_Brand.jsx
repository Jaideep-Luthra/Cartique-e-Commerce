import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Manage_Brand() {

    const [brandData, setBrandData] = useState([])

    useEffect(() => {
        fetchBrand()
    }, [])

    function fetchBrand() {
        ApiServices.AllBrand()
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

    function changeBrandStatus(brandId, status) {
        ApiServices.DeleteBrand({ _id: brandId, status: status })
            .then((res) => {
                if (res.data.success) {
                    fetchBrand()
                    toast.success("Brand " + status)
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
                <h1 className="text-center text-white display-6">Manage Brand</h1>
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
                    padding: "20px 0",
                }}
            >
                <div className="container mt-5 pt-5">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Brand Name</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brandData && brandData.length > 0 ? (
                                    brandData.map((el, index) => (
                                        <tr key={el._id}>
                                            <td>{index + 1}</td>
                                            <td>{el.brandName}</td>
                                            <td>
                                                <img
                                                    src={el.image}
                                                    alt={el.brandName}
                                                    height="80"
                                                    style={{ borderRadius: "5px" }}
                                                />
                                            </td>
                                            <td>
                                                {el.status ? (
                                                    <span className="badge bg-success">Active</span>
                                                ) : (
                                                    <span className="badge bg-danger">Inactive</span>
                                                )}
                                            </td>
                                            <td>
                                                <Link to={"/admin/editBrand/" + el._id} className="btn btn-warning btn-sm me-2">
                                                    <i className="fa fa-edit"></i>
                                                </Link>
                                                {el.status ? (
                                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                                        changeBrandStatus(el._id, false)
                                                    }}>
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                                        changeBrandStatus(el._id, true)
                                                    }}>
                                                        <i className="fa fa-check"></i>
                                                    </button>
                                                )}

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No brands found.</td>
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

export default Manage_Brand
