import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { 
  selectCategory, selectDescription, selectImage, 
  selectName, selectPrice, selectStock, 
  setCategory, setDescription, setName, 
  setPrice, setStock, setImage 
} from "../../Redux/features/auth/AddProductSlice";
import productServices from "../../service/productServices";
import Swal from "sweetalert2";
const ListProduct = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const description = useSelector(selectDescription);
  const image = useSelector(selectImage);
  const category = useSelector(selectCategory);
  const price = useSelector(selectPrice);
  const stock = useSelector(selectStock);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select an image");
      return;
    }
    dispatch(setImage(file)); // Store the selected file in Redux
  };

  // Submit Product Details with Image
  const listProduct = async (e) => {
    e.preventDefault();

    // Check if an image is selected
    if (!image) {
      alert("Please select an image");
      return;
    }

    // Create FormData to send image + product details together
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("image", image); // Ensure image is a File object

    try {
      const response = await productServices.createProduct(formData);

      if (response.status === 201) {
        // alert("Product uploaded successfully!");
        // Reset form after successful upload
        Swal.fire({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                  showConfirmButton: false,
                   timer:2000
                });
          
        dispatch(setName(""));
        dispatch(setDescription(""));
        dispatch(setPrice(""));
        dispatch(setStock(""));
        dispatch(setCategory(""));
        dispatch(setImage(null));
      } else {
        alert("Failed to upload product");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-black p-8 rounded-xl shadow-lg border border-gray-800 text-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form className="space-y-6" onSubmit={listProduct}>
        {/* Product Name */}
        <div>
          <label className="text-gray-400 text-sm">Product Name</label>
          <input
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-400 text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Write about the product"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="text-gray-400 text-sm">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => dispatch(setPrice(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="text-gray-400 text-sm">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => dispatch(setStock(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-400 text-sm">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Enter category"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-gray-400 text-sm">Cover Photo</label>
          <div className="border-2 border-dashed border-gray-600 rounded-md p-6 text-center">
            <span className="block text-lg">📷</span>
            <p className="text-sm">Upload a file or drag and drop</p>
            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          </div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded preview"
              className="mt-4 w-32 h-32 object-cover border border-gray-600 rounded-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 py-3 rounded-md font-semibold hover:bg-blue-500 transition"
        >
          Upload Product 🚀
        </button>
      </form>
    </div>
  );
};

export default ListProduct;
