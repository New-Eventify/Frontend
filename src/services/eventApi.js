import axiosInstance from "../context/axios";

export const createEvent = async (eventData) => {
  try {
    const res = await axiosInstance.post("/events/create", eventData);
    console.log(res.data);
  } catch (error) {
    console.error("Error creating event", error.res?.data || error.message);
    throw error;
  }
};

export const uploadBanner = async (image) => {
  try {
    // Create FormData instance and append the image
    const formData = new FormData();
    formData.append("image", image);

    // Post the form data
    const res = await axiosInstance.post("/events/upload-image", formData);
    console.log(res.data);
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message
    );
    throw error;
  }
};
