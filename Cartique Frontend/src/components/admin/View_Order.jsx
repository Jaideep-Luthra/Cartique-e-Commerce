import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function View_Order() {

    const [orderData, setorderData] = useState([])

    useEffect(() => {
        fetchOrder()
    }, [])

    function fetchOrder() {
        ApiServices.AllOrder()
            .then((res) => {
                if (res.data.success) {
                    setorderData(res.data.data)
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
        ApiServices.UpdateOrder({ _id: _id, orderStatus: status })
            .then((res) => {
                if (res.data.success) {
                    fetchOrder()
                    toast.success("Order has " + status)
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
                <h1 className="text-center text-white display-6">Manage Orders</h1>
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
                                    <th>Customer Email</th>
                                    <th>Shipping Address</th>
                                    <th>Total Amount</th>
                                    <th>Payment Method</th>
                                    <th>Status</th>
                                    <th>Order Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData && orderData.length > 0 ? (
                                    orderData.map((el, index) => (
                                        <tr key={el._id}>
                                            <td>{index + 1}</td>
                                            <td>{el.userId.email}</td>
                                            <td>{el.shippingAddress}</td>
                                            <td>Rs. {el.totalAmount}</td>
                                            <td>{el.paymentMethod}</td>
                                            <td>{el.orderStatus}</td>
                                            <td>
                                                <Link to={"/admin/viewOrderDetails/" + el?._id}>
                                                    <i className="fa fa-eye text-dark"></i>
                                                </Link>
                                            </td>
                                            <td>
                                                {el.orderStatus == "Pending" ? (
                                                    <>
                                                        <button className="btn btn-primary btn-sm mx-1" onClick={() => {
                                                            changeStatus(el._id, "Confirmed")
                                                        }}>
                                                            Confirm
                                                        </button>

                                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => {
                                                            changeStatus(el._id, "Cancelled")
                                                        }}>
                                                            Cancel
                                                        </button>

                                                    </>
                                                ) : (
                                                    <></>
                                                )}

                                                {el.orderStatus == "Confirmed" ? (
                                                    <>
                                                        <button className="btn btn-primary btn-sm mx-1" onClick={() => {
                                                            changeStatus(el._id, "Shipped")
                                                        }}>
                                                            Shipped
                                                        </button>

                                                    </>
                                                ) : (
                                                    <></>
                                                )}

                                                {el.orderStatus == "Shipped" ? (
                                                    <>
                                                        <button className="btn btn-primary btn-sm mx-1" onClick={() => {
                                                            changeStatus(el._id, "Delivered")
                                                        }}>
                                                            Delivered
                                                        </button>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}

                                                {/* {el.orderStatus == "Cancelled" ? (
                                                    <>
                                                        Cancelled
                                                    </>
                                                ) : (
                                                    <></>
                                                )} */}

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

export default View_Order
