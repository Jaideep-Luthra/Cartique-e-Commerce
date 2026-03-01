import { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CustHome from './components/custpanel/CustHome'
import CustContact from './components/custpanel/CustContact'
import CustShop from './components/custpanel/CustShop'
import AdminMasterLayout from './components/layout/AdminMasterLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import Add_Category from './components/admin/Add_Category'
import Manage_Category from './components/admin/Manage_Category'
import MasterLayout from './components/layout/MasterLayout'
import Login from './components/custpanel/Login'
import RegisterUser from './components/custpanel/RegisterUser'
import Add_Brand from './components/admin/Add_Brand'
import Manage_Brand from './components/admin/Manage_Brand'
import Add_Product from './components/admin/Add_Product'
import Manage_Product from './components/admin/Manage_Product'
import View_Order from './components/admin/View_Order'
import View_User from './components/admin/View_User'
import View_Enquiry from './components/admin/View_Enquiry'
import Edit_Category from './components/admin/Edit_Category';
import Edit_Brand from './components/admin/Edit_Brand';
import Edit_Product from './components/admin/Edit_Product';
import CustomerMasterLayout from './components/layout/CustomerMasterLayout';
import Products from './components/custpanel/Products';
import CategoryProduct from './components/custpanel/CategoryProduct';
import BrandProduct from './components/custpanel/BrandProduct';
import ViewCart from './components/custpanel/ViewCart';
import CustomerViewOrder from './components/custpanel/CustomerViewOrder';
import CustomerViewOrderDetails from './components/custpanel/CustomerViewOrderDetails';
import ViewOrderDetails from './components/admin/ViewOrderDetails';
import ChangePassword from './components/admin/ChangePassword';
import CustomerChangePassword from './components/custpanel/CustomerChangePassword';
import CustomerProfile from './components/custpanel/CustomerProfile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<MasterLayout />}>
            <Route path='/' element={<CustHome />} />
            <Route path='/contact' element={<CustContact />} />
            <Route path='/shop' element={<CustShop />} />
            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<RegisterUser></RegisterUser>} />
            <Route path='/product' element={<Products />} />
            <Route path='/categoryproduct/:categoryId' element={<CategoryProduct />} />
            <Route path='/brandproduct/:brandId' element={<BrandProduct />} />
          </Route>


          <Route path='/admin' element={<AdminMasterLayout></AdminMasterLayout>}>
            <Route path='/admin' element={<AdminDashboard></AdminDashboard>} />
            <Route path='/admin/addcategory' element={<Add_Category></Add_Category>} />
            <Route path='/admin/editCategory/:id' element={<Edit_Category></Edit_Category>} />
            <Route path='/admin/managecategory' element={<Manage_Category></Manage_Category>} />
            <Route path='/admin/addbrand' element={<Add_Brand></Add_Brand>} />
            <Route path='/admin/editBrand/:id' element={<Edit_Brand></Edit_Brand>} />
            <Route path='/admin/managebrand' element={<Manage_Brand></Manage_Brand>} />
            <Route path='/admin/addproduct' element={<Add_Product></Add_Product>} />
            <Route path='/admin/manageproduct' element={<Manage_Product></Manage_Product>} />
            <Route path='/admin/editProduct/:id' element={<Edit_Product />} />
            <Route path='/admin/vieworders' element={<View_Order></View_Order>} />
            <Route path='/admin/viewOrderDetails/:_id' element={<ViewOrderDetails />} />
            <Route path='/admin/viewusers' element={<View_User></View_User>} />
            <Route path='/admin/viewenquiry' element={<View_Enquiry></View_Enquiry>} />
            <Route path='/admin/changePassword' element={<ChangePassword/>} />
          </Route>

          <Route path='/customer' element={<CustomerMasterLayout />}>
            <Route path='/customer' element={<CustHome />} />
            <Route path='/customer/contact' element={<CustContact />} />
            <Route path='/customer/product' element={<Products />} />
            <Route path='/customer/categoryproduct/:categoryId' element={<CategoryProduct />} />
            <Route path='/customer/brandproduct/:brandId' element={<BrandProduct />} />
            <Route path='/customer/viewcart' element={<ViewCart />} />
            <Route path='/customer/vieworder' element={<CustomerViewOrder />} />
            <Route path='/customer/viewOrderDetails/:_id' element={<CustomerViewOrderDetails />} />
            <Route path='/customer/changePassword' element={<CustomerChangePassword />} />
            <Route path='/customer/profile' element={<CustomerProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
