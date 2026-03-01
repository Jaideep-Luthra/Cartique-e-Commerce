import { useEffect, useState } from "react"
import ApiServices from "../layout/ApiServices"

function AdminDashboard() {
    const [totalCustomers, SettotalCustomers] = useState(0)
    const [totalOrder, SettotalOrder] = useState(0)
    const [totalEnquiry, SettotalEnquiry] = useState(0)
    const [totalCategory, SettotalCategory] = useState(0)
    const [totalBrand, SettotalBrand] = useState(0)
    const [totalProduct, SettotalProduct] = useState(0)

    useEffect(() => {
        getDashbaorad()
    }, [])

    const getDashbaorad = () => {
        ApiServices.dashboard()
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data)
                    SettotalCustomers(res.data.totalCustomers)
                    SettotalOrder(res.data.totalOrder)
                    SettotalEnquiry(res.data.totalEnquiry)
                    SettotalCategory(res.data.totalCategory)
                    SettotalBrand(res.data.totalCustomers)
                    SettotalProduct(res.data.totalProduct)
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
                <h1 className="text-center text-white display-6">Dashboard</h1>
            </div>
            {/* Single Page Header End */}
            <div className="container-fluid featurs py-5 ">
                <div className="container py-5 mt-5">
                    <div className="row g-4 mt-5 pt-5">
                        <div className="col-md-4 col-lg-4">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-content text-center">
                                    <h5>Total Customers</h5>
                                    <p className="mb-0">{totalCustomers}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-content text-center">
                                    <h5>Total Order</h5>
                                    <p className="mb-0">{totalOrder}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-content text-center">
                                    <h5>Total Enquiries</h5>
                                    <p className="mb-0">{totalEnquiry}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-content text-center">
                                    <h5>Total Categories</h5>
                                    <p className="mb-0">{totalCategory}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-content text-center">
                                    <h5>Total Brands</h5>
                                    <p className="mb-0">{totalBrand}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-content text-center">
                                    <h5>Total Products</h5>
                                    <p className="mb-0">{totalProduct}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
