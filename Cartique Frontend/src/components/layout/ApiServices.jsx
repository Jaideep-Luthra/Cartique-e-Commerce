import axios from "axios";

export const BaseUrl = "http://localhost:5000";

class ApiServices {
    getToken() {
        let obj = {
            Authorization: sessionStorage.getItem('token')
        }
        return obj
    }

    Login(data) {
        return axios.post(BaseUrl + "/api/user/login", data)
    }

    RegisterCustomer(data) {
        return axios.post(BaseUrl + "/api/customer/register", data)
    }

    // ------------------ ADMIN ------------------
    AddCategory(data) {
        return axios.post(BaseUrl + "/admin/category/add", data, { headers: this.getToken() })
    }

    AllCategory() {
        return axios.post(BaseUrl + "/admin/category/view", null, { headers: this.getToken() })
    }

    SingleCategory(data) {
        return axios.post(BaseUrl + "/admin/category/single", data, { headers: this.getToken() })
    }

    UpdateCategory(data) {
        return axios.post(BaseUrl + "/admin/category/update", data, { headers: this.getToken() })
    }

    DeleteCategory(data) {
        return axios.post(BaseUrl + "/admin/category/changeStatus", data, { headers: this.getToken() })
    }

    AddBrand(data) {
        return axios.post(BaseUrl + "/admin/brand/add", data, { headers: this.getToken() })
    }

    AllBrand(data) {
        return axios.post(BaseUrl + "/admin/brand/view", data, { headers: this.getToken() })
    }

    SingleBrand(data) {
        return axios.post(BaseUrl + "/admin/brand/single", data, { headers: this.getToken() })
    }

    UpdateBrand(data) {
        return axios.post(BaseUrl + "/admin/brand/update", data, { headers: this.getToken() })
    }

    DeleteBrand(data) {
        return axios.post(BaseUrl + "/admin/brand/changeStatus", data, { headers: this.getToken() })
    }
    
    AddProduct(data) {
        return axios.post(BaseUrl + "/admin/product/add", data, { headers: this.getToken() })
    }

    AllProduct(data) {
        return axios.post(BaseUrl + "/admin/product/view", data, { headers: this.getToken() })
    }

    SingleProduct(data) {
        return axios.post(BaseUrl + "/admin/product/single", data, { headers: this.getToken() })
    }

    UpdateProduct(data) {
        return axios.post(BaseUrl + "/admin/product/update", data, { headers: this.getToken() })
    }

    DeleteProduct(data) {
        return axios.post(BaseUrl + "/admin/product/changeStatus", data, { headers: this.getToken() })
    }

    AllOrder(data) {
        return axios.post(BaseUrl + "/admin/order/all", data, { headers: this.getToken() })
    }

    SingleOrder(data) {
        return axios.post(BaseUrl + "/admin/order/single", data, { headers: this.getToken() })
    }

    UpdateOrder(data) {
        return axios.post(BaseUrl + "/admin/order/changeStatus", data, { headers: this.getToken() })
    }

    AllUser(data) {
        return axios.post(BaseUrl + "/admin/user/all", data, { headers: this.getToken() })
    }

    DeleteUser(data) {
        return axios.post(BaseUrl + "/admin/user/changeStatus", data, { headers: this.getToken() })
    }

    AllEnquiry(data) {
        return axios.post(BaseUrl + "/admin/enquiry/all", data, { headers: this.getToken() })
    }


    getSingleOrder(data) {
        return axios.post(BaseUrl + "/admin/order/single", data, { headers: this.getToken() })
    }

    changeOrderStatus(data) {
        return axios.post(BaseUrl + "/admin/order/changeStatus", data, { headers: this.getToken() })
    }

    getOrderDetail(data) {
        return axios.post(BaseUrl + "/admin/order/orderDetail", data, { headers: this.getToken() })
    }

    dashboard(data) {
        return axios.post(BaseUrl + "/admin/dashboard/view", data, { headers: this.getToken() })
    }

    customerViewAllCategory(data) {
        return axios.post(BaseUrl + "/customerapi/category/view", data, { headers: this.getToken() })
    }

    customerViewSingleCategory(data) {
        return axios.post(BaseUrl + "/customerapi/category/single", data, { headers: this.getToken() })
    }

    customerViewAllBrand(data) {
        return axios.post(BaseUrl + "/customerapi/brand/view", data, { headers: this.getToken() })
    }

    customerViewSingleBrand(data) {
        return axios.post(BaseUrl + "/customerapi/brand/single", data, { headers: this.getToken() })
    }

    customerViewAllProduct(data) {
        return axios.post(BaseUrl + "/customerapi/product/view", data, { headers: this.getToken() })
    }

    customerViewSingleProduct(data) {
        return axios.post(BaseUrl + "/customerapi/product/single", data, { headers: this.getToken() })
    }

    AddtoCart(data) {
        return axios.post(BaseUrl + "/customerapi/cart/add", data, { headers: this.getToken() })
    }

    getCart(data) {
        return axios.post(BaseUrl + "/customerapi/cart/all", data, { headers: this.getToken() })
    }

    UpdateCart(data) {
        return axios.post(BaseUrl + "/customerapi/cart/update", data, { headers: this.getToken() })
    }

    DeleteCart(data) {
        return axios.post(BaseUrl + "/customerapi/cart/delete", data, { headers: this.getToken() })
    }

    AddOrder(data) {
        return axios.post(BaseUrl + "/customerapi/order/add", data, { headers: this.getToken() })
    }

    getCustomerOrder(data) {
        return axios.post(BaseUrl + "/customerapi/order/all", data, { headers: this.getToken() })
    }

    getCustomerSingleOrder(data) {
        return axios.post(BaseUrl + "/customerapi/order/single", data, { headers: this.getToken() })
    }

    DeleteOrder(data) {
        return axios.post(BaseUrl + "/customerapi/order/changeStatus", data, { headers: this.getToken() })
    }

    getCustomerOrderDetail(data) {
        return axios.post(BaseUrl + "/customerapi/order/orderDetail", data, { headers: this.getToken() })
    }

    AddEnquiry(data) {
        return axios.post(BaseUrl + "/customerapi/enquiry/add", data, { headers: this.getToken() })
    }

    getAllEnquiry(data) {
        return axios.post(BaseUrl + "/customerapi/enquiry/all", data, { headers: this.getToken() })
    }
    
    customerProfile(data) {
        return axios.post(BaseUrl + "/customerapi/customer/profile", data, { headers: this.getToken() })
    }
    
    changePassword(data) {
        return axios.post(BaseUrl + "/api/password/change", data, { headers: this.getToken() })
    }

}

export default new ApiServices;