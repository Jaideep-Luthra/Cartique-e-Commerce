import { toast } from "react-toastify"
import ApiServices from "../layout/ApiServices"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function CustomerProfile() {

    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setemail] = useState("")
    const [dateOfBirth, setdateOfBirth] = useState("")
    const [gender, setgender] = useState("")

    useEffect(() => {
        fetchprofile()
    }, [])

    function fetchprofile() {
        ApiServices.customerProfile()
            .then((res) => {
                if (res.data.success) {
                    setfirstName(res.data.data.firstName)
                    setlastName(res.data.data.lastName)
                    setdateOfBirth(res.data.data.dateOfBirth)
                    setgender(res.data.data.gender)
                    setemail(res.data.data.userId.email)
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
                <h1 className="text-center text-white display-6">Profile</h1>
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
                    <div className="row">
                        <div className="col-md-6 mx-auto border">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-borderless">
                                    <tr>
                                        <th className="py-3">First Name</th>
                                        <td>{firstName}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3">Last Name</th>
                                        <td>{lastName}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3">Email</th>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3">Date of Birth</th>
                                        <td>{dateOfBirth}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3">Gender</th>
                                        <td>{gender}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerProfile
