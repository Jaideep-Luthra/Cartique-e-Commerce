import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function ViewOrderDetails() {

    const [orderData, setorderData] = useState([])
    const [shippingAddress, setshippingAddress] = useState("")
    const [totalAmount, settotalAmount] = useState("")
    const [orderStatus, setorderStatus] = useState("")

    const param = useParams()
    const orderId = param._id


    useEffect(() => {
        fetchOrder()
    }, [])

    function fetchOrder() {
        ApiServices.getOrderDetail({ orderId: orderId })
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.data[0].orderId.totalAmount)
                    setshippingAddress(res.data.data[0].orderId.shippingAddress)
                    settotalAmount(res.data.data[0].orderId.totalAmount)
                    setorderStatus(res.data.data[0].orderId.orderStatus)
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

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Order Details</h1>
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
                                    <th># Order Id</th>
                                    <th>Shipping Address</th>
                                    <th>Total Amount</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-dark">
                                    <td>#{orderId}</td>
                                    <td>{shippingAddress}</td>
                                    <td>Rs. {totalAmount}</td>
                                    <td>{orderStatus}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Sub Total</th>
                                    <th>Product Description</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData && orderData.length > 0 ? (
                                    orderData.map((el, index) => (
                                        <tr key={el._id}>
                                            <td>{index + 1}</td>
                                            <td>{el.productId.name}</td>
                                            <td>Rs. {el.productId.price}</td>
                                            <td>{el.quantity}</td>
                                            <td>Rs. {el.productId.price * el.quantity}</td>
                                            <td>{el.productId.description}</td>
                                            <td>
                                                <img
                                                    src={el.productId.image}
                                                    alt={el.productId.name}
                                                    height="80"
                                                    style={{ borderRadius: "5px" }}
                                                />
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

export default ViewOrderDetails
