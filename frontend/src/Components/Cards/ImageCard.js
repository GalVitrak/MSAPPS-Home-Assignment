import React from "react";

function ImageCard({ image, openModal }) {
  return (
    <div className="imageCard">
      <img
        onClick={() => {
          openModal(image); //toggling the modal and passing image information
        }}
        src={image.previewURL}
      ></img>{" "}
      {/* displaying the image*/}
    </div>
  );
}

export default ImageCard;
