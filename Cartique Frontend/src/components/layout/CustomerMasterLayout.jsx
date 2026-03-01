import { Outlet } from "react-router-dom"
import CustomerHeader from "./CustomerHEader"
import CustomerFooter from "./CustomerFooter"

function CustomerMasterLayout() {
    return (
        <>
            <CustomerHeader></CustomerHeader>
            <Outlet></Outlet>
            <CustomerFooter></CustomerFooter>
            
        </>
    )
}

export default CustomerMasterLayout
