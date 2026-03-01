import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ViewCart() {

    const [cartData, setcartData] = useState([])
    const [shippingAddress, setShippingAddress] = useState("")
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#81C408");

    useEffect(() => {
        fetchCart()
    }, [])

    function fetchCart() {
        ApiServices.getCart({ addedById: sessionStorage.getItem("userId") })
            .then((res) => {
                if (res.data.success) {
                    setcartData(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    function changeStatus(_id, qty) {
        ApiServices.UpdateCart({ _id: _id, quantity: qty })
            .then((res) => {
                if (res.data.success) {
                    fetchCart()
                    toast.success("Cart Updated")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    function deleteCart(_id) {
        ApiServices.DeleteCart({ _id: _id })
            .then((res) => {
                if (res.data.success) {
                    fetchCart()
                    toast.success("Item deleted from cart")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    let totalAmount = 0

    let calcTotal = (amount) => {
        totalAmount += amount
    }

    const handleform = (e) => {
        e.preventDefault();
        setLoading(true)

        let data = {
            shippingAddress: shippingAddress,
            paymentMethod: "Online"
        }

        ApiServices.AddOrder(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Order Placed!");
                    setLoading(false)
                    // setTimeout(() => {
                    // nav("/admin/managecategory");
                    // }, 2000);
                    paymentHandler(res.data.orderData)

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

    const paymentHandler = (order) => {
        // setLoading(true);
        // const data = { _id };
        // apiService
        //   .pay(data)
        //   .then((res) => {
        //     if (res.data.success) {
        // const order = res.data.order;
        const options = {
            key: "rzp_test_81m41n13O8OvjC",
            amount: order.amount,
            currency: "INR",
            name: "Cartique",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,

            handler: function (response) {
                console.log("✅ Payment Success:", response);
                toast.success("Payment Successful!");
                // nav("/viewbooking")
                setLoading(false);
                // fetchRequests();

            },
            prefill: {
                name: "Mohit Kumar",
                email: "mohit@gmail.com",
                contact: "1234567890"
            },
            theme: {
                color: "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            // setLoading(false);
            console.log(response.error)
            toast.error(response.error.description || "Payment failed");
        });

        rzp1.open();

    }

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">My Cart</h1>
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
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Product Description</th>
                                    <th>Image</th>
                                    <th>Sub Total</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData && cartData.length > 0 ? (
                                    cartData.map((el, index) => (
                                        <tr key={el._id}>
                                            <td>{index + 1}</td>
                                            <td>{el.productId.name}</td>
                                            <td>Rs. {el.productId.price} </td>
                                            <td>{el.productId.description}</td>
                                            <td>
                                                <img
                                                    src={el.productId.image}
                                                    alt={el.productId.name}
                                                    height="100"
                                                    style={{ borderRadius: "5px" }}
                                                />
                                            </td>
                                            <td>Rs. {el.quantity * el.productId.price} {calcTotal(el.quantity * el.productId.price)}</td>
                                            <td>
                                                {el.quantity > 1 ? <>
                                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                                        changeStatus(el._id, el.quantity - 1)
                                                    }}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </> : <>
                                                    <button className="btn btn-danger btn-sm" disabled>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </>}
                                                <span className="h4 px-4">{el.quantity}</span>
                                                <>
                                                    <button className="btn btn-success btn-sm" onClick={() => {
                                                        changeStatus(el._id, el.quantity + 1)
                                                    }}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => {
                                                    deleteCart(el._id)
                                                }}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No data found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {cartData && cartData.length > 0 ?
                        <div className="row">
                            <div className="col-md-6">
                                <span className="h3">Grand Total : Rs. {totalAmount}</span>
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={handleform}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" placeholder="Shipping Address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required />
                                        </div>
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-warning w-100">Proceed to Place Order & Pay</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        : <></>}
                </div>
            </div>
        </>
    )
}

export default ViewCart