import React from "react";
import ImageService from "../../Services/ImageService";

function ImageModal({ image, isOpen, onClose }) {
  let date;
  if (image) {
    date = ImageService.extractUploadDate(image.previewURL); // getting image's upload date
  }
  if (!isOpen) {
    return null;
  }
  return (
    <div className="image modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
        {/* displaying image's information */}
        <h2>Image Information</h2>
        <p>Views: {image.views}</p>
        <p>Likes: {image.likes}</p>
        <p>Comments: {image.comments}</p>
        <p>Downloads: {image.downloads}</p>
        <p>Collections: {image.collections}</p>
        <p>Date: {date.toLocaleString()}</p>
        <p>Id: {image.id}</p>
        <p>By User: {image.user}</p>
      </div>
    </div>
  );
}
export default ImageModal;
