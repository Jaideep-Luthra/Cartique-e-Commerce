import { Outlet } from "react-router-dom"
import AdminFooter from "./AdminFooter"
import AdminHeader from "./AdminHeader"

function AdminMasterLayout() {
    return (
        <>
            <AdminHeader></AdminHeader>
            <Outlet></Outlet>
            <AdminFooter></AdminFooter>
            
        </>
    )
}

export default AdminMasterLayout
