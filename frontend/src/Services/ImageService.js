import axios from "axios";
import { imageStore } from "../Redux/ImagesState";

async function get9Images(category, page, filterOrder) {
  const address = `https://galvitrak-msapps-homeassignment-server.onrender.com/api/images/${category}/${page}/${filterOrder}`; // setting the address to the api hosted on Render
  const response = await axios.get(address); // getting the images from server side
  imageStore.dispatch({
    // storing images in redux store
    type: "FetchImages",
    payload: response.data,
  });
}

function extractUploadDate(url) {
  // a function to extract image's upload date from it's preview url
  const startIndex = url.indexOf("/photo") + 7;
  const endIndex = url.lastIndexOf("/");
  const dateString = url.substring(startIndex, endIndex);
  const dateArr = dateString.split("/");

  return new Date(dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4]);
}

export default { get9Images, extractUploadDate };
