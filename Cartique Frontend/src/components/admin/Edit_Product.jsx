import React, { useState, useEffect } from "react";
import ApiServices from "../layout/ApiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader, ClipLoader } from "react-spinners";

function Edit_Product() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#81C408");

    const [categoryId, setcategoryId] = useState("")
    const [brandId, setbrandId] = useState("")
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [tags, settags] = useState("")
    const [rating, setrating] = useState("")
    const [stock, setstock] = useState("")
    const [description, setdescription] = useState("")

    const [image, setImage] = useState(null);
    const nav = useNavigate();
    const { id } = useParams();

    const [catData, SetCatData] = useState([])

    useEffect(() => {
        fetchCat()
    }, [])

    function fetchCat() {
        ApiServices.AllCategory()
            .then((res) => {
                if (res.data.success) {
                    SetCatData(res.data.data)
                    console.log(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    const [brandData, setBrandData] = useState([])

    useEffect(() => {
        fetchBrand()
    }, [])

    function fetchBrand() {
        ApiServices.AllBrand()
            .then((res) => {
                if (res.data.success) {
                    setBrandData(res.data.data)
                    console.log(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something Went Wrong")
                console.log(err)
            })
    }

    useEffect(() => {
        let data = { _id: id };
        ApiServices.SingleProduct(data)
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.data);
                    setcategoryId(res.data.data.categoryId);
                    setbrandId(res.data.data.brandId);
                    setname(res.data.data.name);
                    setprice(res.data.data.price);
                    setstock(res.data.data.stock);
                    settags(res.data.data.tags);
                    setrating(res.data.data.rating);
                    setdescription(res.data.data.description);
                    setImage(res.data.data.image);
                } else {
                    toast.error("Failed to load brand.");
                }
            })
            .catch((err) => {
                toast.error("Something went wrong!");
                console.log(err);
            });
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData();
        formData.append("_id", id);
        formData.append("categoryId", categoryId);
        formData.append("brandId", brandId);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("tags", tags);
        formData.append("rating", rating);
        formData.append("stock", stock);
        formData.append("description", description);
        // formData.append("image", image);
        if (image instanceof File) {
            formData.append("image", image);
        }

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": ", pair[1]);
        // }

        ApiServices.UpdateProduct(formData)
            .then((res) => {
                setLoading(false)
                if (res.data.success) {
                    toast.success("Product Updated Successfully!");

                    nav("/admin/manageproduct");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                setLoading(false)
                toast.error("Something Went Wrong!");
                console.log(err);
            });
    };

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Update Product</h1>
            </div>
            {/* Single Page Header End */}
            <div className="row">
                <div className="col-md-3 mx-auto">
                    <BounceLoader
                        color={color}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="">
                        <div className="row g-4"></div>
                        <div className="col-lg-6 mx-auto p-5 bg-light rounded">
                            <form onSubmit={handleSubmit} className="">
                                <div className="row">

                                    <div className="col-md-6">
                                        <label>Category</label>
                                        <select value={categoryId} onChange={(e) => setcategoryId(e.target.value)} className="form-control mb-4" required>
                                            <option value="" disabled selected>Select Category</option>
                                            {catData?.map((el, index) => {
                                                return (
                                                    <option value={el?._id} key={index}>{el?.categoryName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Brand</label>
                                        <select value={brandId} onChange={(e) => setbrandId(e.target.value)} className="form-control mb-4" required>
                                            <option value="" disabled selected>Select Brand</option>
                                            {brandData?.map((el, index) => {
                                                return (
                                                    <option value={el?._id} key={index}>{el?.brandName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder="Product Name"
                                            required
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Product Price</label>
                                        <input
                                            type="text"
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder="Product Price"
                                            required
                                            value={price}
                                            onChange={(e) => setprice(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Tag(s)</label>
                                        <input
                                            type="text"
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder="Tag"
                                            required
                                            value={tags}
                                            onChange={(e) => settags(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Rating</label>
                                        <input
                                            type="text"
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder="Rating"
                                            required
                                            value={rating}
                                            onChange={(e) => setrating(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Stock</label>
                                        <input
                                            type="number"
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder="Stock"
                                            required
                                            min={1}
                                            value={stock}
                                            onChange={(e) => setstock(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Image</label>
                                        <input
                                            type="file"
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder=""
                                            name="image"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <label>Description</label>
                                        <textarea
                                            className="w-100 form-control border-0 mb-4"
                                            placeholder="Description"
                                            required
                                            value={description}
                                            onChange={(e) => setdescription(e.target.value)}
                                        ></textarea>
                                    </div>

                                </div>

                                <button
                                    className="w-100 btn form-control border-secondary bg-white text-primary"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit_Product;
