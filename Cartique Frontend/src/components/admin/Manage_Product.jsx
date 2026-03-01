import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Manage_Product() {

    const [productData, setproductData] = useState([])

    useEffect(() => {
        fetchProduct()
    }, [])

    function fetchProduct() {
        ApiServices.AllProduct()
            .then((res) => {
                if (res.data.success) {
                    setproductData(res.data.data)
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
        ApiServices.DeleteProduct({ _id: _id, status: status })
            .then((res) => {
                if (res.data.success) {
                    fetchProduct()
                    toast.success("Product " + status)
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
                <h1 className="text-center text-white display-6">Manage Product</h1>
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
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Tags</th>
                                    <th>Rating</th>
                                    <th>Stock</th>
                                    <th>Product Description</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData && productData.length > 0 ? (
                                    productData.map((el, index) => (
                                        <tr key={el._id}>
                                            <td>{index + 1}</td>
                                            <td>{el.categoryId.categoryName}</td>
                                            <td>{el.brandId.brandName}</td>
                                            <td className="text-capitalize">{el.name}</td>
                                            <td>Rs. {el.price}</td>
                                            <td>{el.tags}</td>
                                            <td>{el.rating}</td>
                                            <td>{el.stock}</td>
                                            <td>{el.description}</td>
                                            <td>
                                                <img
                                                    src={el.image}
                                                    alt={el.name}
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
                                                <Link to={"/admin/editProduct/" + el._id} className="btn btn-warning btn-sm me-2">
                                                    <i className="fa fa-edit"></i>
                                                </Link>
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

export default Manage_Product
