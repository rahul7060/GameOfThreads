import authServices from "../service/authServices";




const authLoader = async () => {
  try {
    const response = await authServices.loggedinuser();
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error loading user: ${error.response.status} - ${error.response.data.message}`);
    } else {
      console.error(`Network Error: ${error.message}`);
    }
    return null; // Return null to handle failure gracefully
  }
};

export default authLoader;
