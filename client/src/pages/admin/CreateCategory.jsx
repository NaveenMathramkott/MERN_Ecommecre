import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateCategory = () => {
  const [createCategoryTab, setCreateCategoryTab] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, [imageLoading]);

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

  const onAddCategory = async (event) => {
    event.preventDefault();
    if (!image && !category) {
      toast.error(`Please add a Image and Category`);
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/category/create-category`,
          {
            name: category,
            photo: image,
          }
        );
        if (res && res.data.success) {
          toast.success(res.data.message);
          setCategory("");
          setImage("");
          setCreateCategoryTab(false);
        } else {
          toast.error(res.data.message);
          setCreateCategoryTab(false);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setAllCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-list-mainWrapper">
      {!createCategoryTab ? (
        <table className="product-box-container">
          <tr className="product-box-header">
            <div className="product-box-header-left">
              <h3>All Categories</h3>
              <span>{`Number of Categories : ${allCategories.length}`}</span>
            </div>
            <div className="product-box-header-right">
              <button onClick={() => setCreateCategoryTab(true)}>
                Add Category
              </button>
            </div>
          </tr>
          <tr className="product-list-heading">
            <th className="id">id</th>
            <th className="photo">Photo</th>
            <th className="name">Name</th>
            <th className="edit">Edit</th>
            <th className="delete">Delete</th>
          </tr>
          <div>
            {allCategories?.map((item, index) => (
              <tr className="product-list-data">
                <td className="id">{index + 1}</td>
                <td className="photo">
                  <img src={item.photo} alt={item.name} width={"100px"} />
                </td>
                <td className="name">{item.slug}</td>
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
          <form onSubmit={onAddCategory}>
            <h3>New Category</h3>
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
                    alt={category || "uploaded image"}
                    width={"240px"}
                    height={"240px"}
                    style={{ padding: "10px" }}
                  />
                )}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="inputCategory" className="form-label">
                Category
              </label>
              <div className="icon-btn">
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="btn-group-product">
              <button type="submit" id={"btn-login"}>
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
