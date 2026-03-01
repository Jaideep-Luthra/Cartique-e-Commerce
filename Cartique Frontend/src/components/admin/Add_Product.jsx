import { useEffect, useState } from "react"
import ApiServices from "../layout/ApiServices"
import { BounceLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Add_Product() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#81C408");

    const nav = useNavigate()
    const [categoryId, setcategoryId] = useState("")
    const [brandId, setbrandId] = useState("")
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [tags, settags] = useState("")
    const [rating, setrating] = useState("")
    const [stock, setstock] = useState("")
    const [description, setdescription] = useState("")
    const [image, setImage] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData();
        formData.append("categoryId", categoryId);
        formData.append("brandId", brandId);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("tags", tags);
        formData.append("rating", rating);
        formData.append("stock", stock);
        formData.append("description", description);
        formData.append("image", image);

        ApiServices.AddProduct(formData)
            .then((res) => {
                setLoading(false)

                if (res.data.success) {
                    toast.success("Product Added Successfully!");
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
                <h1 className="text-center text-white display-6">Add Product</h1>
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
                                            required
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
                                    className="w-100 btn form-control border-secondary  bg-white text-primary "
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div></div></div>
        </>
    )
}

export default Add_Product
