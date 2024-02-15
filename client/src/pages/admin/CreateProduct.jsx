import React, { useEffect, useState } from "react";
import "./style.css";
import toast from "react-hot-toast";
import axios from "axios";

const CreateProduct = () => {
  const [createProductTab, setCreateProductTab] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [offer, setOffer] = useState();
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, [imageLoading]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product`
      );
      console.log("data response", data);
      setAllProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImageFile = (pics) => {
    setImageLoading(true);
    if (pics === undefined) {
      toast.error("Please Select an Image!");

      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);

      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setImage(res.url.toString());
          setImageLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageLoading(false);
        });
    } else {
      toast.error("Please Select an Image!");
      setImageLoading(false);
      return;
    }
  };

  const onAddProduct = async (event) => {
    event.preventDefault();
    setCreateProductTab(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/create-product`,
        {
          name: name,
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          photo: image,
          offer: offer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setAllCategories(data?.category);
        setCategory(data?.category[0]?.slug);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-list-mainWrapper">
      {!createProductTab ? (
        <table className="product-box-container">
          <tr className="product-box-header">
            <div className="product-box-header-left">
              <h3>All products</h3>
              <span>{`Number of products : ${allProducts?.length}`}</span>
            </div>
            <div className="product-box-header-right">
              <button onClick={() => setCreateProductTab(true)}>
                Add Product
              </button>
            </div>
          </tr>
          <tr className="product-list-heading">
            <th className="id">id</th>
            <th className="photo">Photo</th>
            <th className="name">Name</th>
            <th className="description">Description</th>
            <th className="price">Price</th>
            <th className="offer">Offer</th>
            <th className="category">Category</th>
            <th className="quantity">Quantity</th>
            <th className="edit">Edit</th>
            <th className="delete">Delete</th>
          </tr>
          <div>
            {allProducts?.map((item, index) => (
              <tr className="product-list-data">
                <td className="id">{index + 1}</td>
                <td className="photo">
                  <img src={item.photo} alt={item.name} width={"100px"} />
                </td>
                <td className="name">{item.name.slice(0, 60)}</td>
                <td className="description">{item.description.slice(0, 60)}</td>
                <td className="price">{item.price}</td>
                <td className="offer">{`${item.offer}%`}</td>
                <td className="category">{item.category.name}</td>
                <td className="quantity">{item.quantity}</td>
                <td className="edit">
                  <button>Edit</button>
                </td>
                <td className="delete">
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </div>
        </table>
      ) : (
        <div className="create-product-container">
          <form onSubmit={onAddProduct}>
            <h3>New Product</h3>
            <div className="input-group">
              <label htmlFor="inputName">Product Image</label>
              <div
                className="icon-btn"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => loadImageFile(e.target.files[0])}
                />
                {image && (
                  <img
                    src={image}
                    alt={name || "uploaded image"}
                    width={"240px"}
                  />
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputName">Product name</label>
              <div className="icon-btn">
                <input
                  type="text"
                  value={name}
                  placeholder="Product name"
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputdescription">Description</label>
              <div className="icon-btn">
                <textarea
                  type="text"
                  aria-describedby="description"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="inputPrice" className="form-label">
                Price
              </label>
              <div className="icon-btn">
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputOffer" className="form-label">
                Offer
              </label>
              <div className="icon-btn">
                <input
                  type="text"
                  placeholder="Offer"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputCategory" className="form-label">
                Category
              </label>
              <div className="icon-btn">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%" }}
                >
                  {allCategories?.map((itm, index) => (
                    <option key={`oprion-${index}-${itm.slug}`} value={itm._id}>
                      {itm.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputQuantity" className="form-label">
                Quantity
              </label>
              <div className="icon-btn">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="btn-group-product">
              <button type="submit" id={"btn-login"}>
                Add Product
              </button>
            </div>
            <div className="btn-group-product">
              <button id={"btn-clear"}>Clear</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
