import axios from "axios";
import appConfig from "../Utils/app-config.js";

function getNextPage(array, pageNumber) {
  // a function to get the next 9 images in an infinite loop
  const startIndex = pageNumber * 9;
  const endIndex = startIndex + 9;
  let arr = [];
  for (let i = startIndex; i < endIndex; i++) {
    const index = i % array.length;
    arr.push(array[index]);
  }
  return arr;
}

function getPrevPage(array, pageNumber) {
  // a function to get the previous 9 images in an infinite loop
  const startIndex = array.length - 1 - pageNumber * 9;
  const endIndex = startIndex - 8;

  let arr = [];

  for (let i = startIndex; i >= endIndex; i--) {
    const index = (array.length - (i % array.length) - 1) % array.length;
    arr.push(array[index]);
  }

  return arr;
}

function sortById(images, filterOrder) {
  // function to sort the images array by id (and therefore by upload date and time)
  images.sort(function (a, b) {
    let aId = +a.id;
    let bId = +b.id;
    if (filterOrder === "asc") {
      // sorting the array by id values and filter order
      return aId - bId;
    }
    return bId - aId;
  });
  return images; // return sorted images array
}

async function getImagesByCategoryPageAndId(category, page, filter) {
  // function to return 9 images from the external API by category, sorted by page number (pagination) and filter order
  try {
    const response = await axios.get(appConfig.imagesAPI + `${category}`, {}); // getting object from external API by category
    const images = response.data.hits; // extracting the images array
    const sortedImages = sortById(images, filter); // calling the function to sort the entire images array by id (and therefore by upload date and time)
    let nineImages;
    if (page >= 0) {
      nineImages = getNextPage(sortedImages, page); // getting 9 images by page number
    } else {
      nineImages = getPrevPage(sortedImages, page);
    }
    return nineImages; // returning 9 images sorted by id and page number
  } catch (err) {
    console.log(err.message);
  }
}

export default {
  getImagesByCategoryPageAndId,
};
