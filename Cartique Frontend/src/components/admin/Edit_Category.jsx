import React, { useState, useEffect } from "react";
import ApiServices from "../layout/ApiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader, ClipLoader } from "react-spinners";

function Edit_Category() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#81C408");

    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState(null);
    const nav = useNavigate();
    const { id } = useParams();
    //   console.log(id)

    useEffect(() => {
        let data = { _id: id }
        ApiServices.SingleCategory(data)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.data)
                    setCategoryName(res.data.data.categoryName);
                    setImage(res.data.data.image);
                    //   toast.success("Fetched category.");

                } else {
                    toast.error("Failed to load category.");
                }
            })
            .catch((err) => {
                toast.error("Something went wrong!");
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData();
        formData.append("_id", id);
        formData.append("categoryName", categoryName);
        if (image instanceof File) {
            formData.append("image", image);
        }



        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        ApiServices.UpdateCategory(formData)
            .then((res) => {
                setLoading(false)

                if (res.data.success) {
                    toast.success("Category Updated Successfully!");

                    // setTimeout(() => {
                    nav("/admin/managecategory");
                    // }, 2000);
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
                <h1 className="text-center text-white display-6">Update Category</h1>
            </div>
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
            {/* Single Page Header End */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="">
                        <div className="row g-4"></div>
                        <div className="col-lg-4 mx-auto p-5 bg-light rounded">
                            <form onSubmit={handleSubmit} className="">
                                <label htmlFor="" className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    className="w-100 form-control border-0 mb-4"
                                    placeholder=""
                                    required
                                    name="categoryName"
                                    value={categoryName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="" className="form-label">Category Image</label>
                                <input
                                    type="file"
                                    className="w-100 form-control border-0 mb-4"
                                    placeholder=""
                                    name="image"
                                    onChange={handleFileChange}
                                />

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

export default Edit_Category;
