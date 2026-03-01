import React, { useEffect, useRef, useState } from "react";
import ApiServices from "../layout/ApiServices"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function CategoryProduct() {
  const [productData, setproductData] = useState([])
  const param = useParams()
  const _id = param.categoryId
  const location = useLocation()

  useEffect(() => {
    fetchProduct()
  }, [location])

  function fetchProduct() {
    ApiServices.customerViewAllProduct({ categoryId: _id, status: true })
      .then((res) => {
        if (res.data.success) {
          setproductData(res.data.data)
        } else {
          setproductData([])
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong")
        console.log(err)
      })
  }

  function addToCart(productId) {
    ApiServices.AddtoCart({ productId: productId })
      .then((res) => {
        if (res.data.success) {
          fetchProduct()
          toast.success("Product added to cart")
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong")
        console.log(err)
      })
  }
  
  //speech start
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
      fetchResults(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (recognition && !listening) {
      try {
        recognition.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    }
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition && listening) {
      recognition.stop();
    }
  };

  const fetchResults = async (query) => {
    try {

      let data = {
        name: query,
        status: true
      }
      ApiServices.customerViewAllProduct(data)
        .then((res) => {
          if (res.data.success) {
            setproductData(res.data.data)
          } else {
            setproductData([])
          }
        })
        .catch((err) => {
          // toast.error("Something Went Wrong")
          console.log(err)
        })
    } catch (err) {
      console.error("API fetch error:", err);
    }
  };

  //speech end

  return (
    <>
      <>
        {/* Modal Search Start */}
        <div
          className="modal fade"
          id="searchModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Search by keyword
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control p-3"
                    placeholder="keywords"
                    aria-describedby="search-icon-1"
                  />
                  <span id="search-icon-1" className="input-group-text p-3">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Search End */}
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Products by Category</h1>
        </div>
        {/* Single Page Header End */}
        {/* Fruits Shop Start*/}
        <div className="container-fluid fruite py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-8">
                <h1 className="mb-4">Our Products</h1>
              </div>
              <div className="col-md-4">
                <div style={{ padding: "2rem" }}>
                  <button onClick={startListening} disabled={listening} className="btn btn-primary float-end">
                    {listening ? "Listening..." : "Start Speaking"}
                  </button>
                  <button onClick={stopListening} disabled={!listening} className="btn btn-danger float-end">
                    Stop
                  </button>
                  <p><strong>Recognized:</strong> {transcript}</p>
                </div>
              </div>
            </div>
            {/* <SpeechSearch /> */}
            <div className="row g-4">
              <div className="col-lg-12">

                <div className="row g-4">

                  <div className="col-lg-12">
                    <div className="row">
                      {productData && productData.length > 0 ? (
                        productData.map((el, index) => (
                          <div className="col-md-4 col-lg-4 col-xl-3 my-3" key={el._id}>
                            <div className="rounded position-relative fruite-item">
                              <div className="fruite-img border border-primary">
                                <img
                                  src={el.image}
                                  style={{ height: "300px" }}
                                  className="img-fluid w-100 rounded-top"
                                  alt=""
                                />
                              </div>
                              <div
                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, left: 10 }}
                              >
                                {el.categoryId.categoryName} - {el.brandId.brandName}
                              </div>
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>{el.name}</h4>
                                <p>
                                  {el.description}
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0">
                                    Rs. {el.price}
                                  </p>
                                  {sessionStorage.getItem('userId') ? <>
                                    <a
                                      href="#"
                                      className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => { addToCart(el._id) }} >
                                      <i className="fa fa-shopping-bag me-2 text-primary" />
                                      Add to cart
                                    </a>
                                  </> : <>
                                    {/* <a
                                      href="#"
                                      className="btn btn-secondary rounded-pill px-3 text-primary disabled" >
                                      <i className="fa fa-shopping-bag me-2 text-primary" />
                                      Add to cart
                                    </a> */}
                                  </>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (<h1>No Product Found</h1>)}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fruits Shop End*/}
      </>


    </>
  )
}