import { useEffect, useState } from "react";
import "./App.css";
import ImageCard from "./Components/Cards/ImageCard";
import OptionsModal from "./Components/Modals/optionsModal";
import ImageService from "./Services/ImageService";
import ImageModal from "./Components/Modals/imageModal";
import { imageStore } from "./Redux/ImagesState";

function App() {
  const [optionsModalState, setOptionsModalState] = useState(false); // state of Image information modal (open or closed)
  const [imageModalState, setImageModalState] = useState(false); // state of Image information modal (open or closed)
  const [image, setImage] = useState();
  const [images, setImages] = useState();
  const [filterOrder, setFilterOrder] = useState("asc"); // setting the default order filter to ascending
  const [page, setPage] = useState(0); //setting default page to 0
  const categories = ["Animals","Cats", "Ducks", "Work", "Sports", "Games", "Hobbies", "Coding"]; // categories array
  const [category, setCategory] = useState(categories[0]); // setting the default category

  const onCategoryChange = (args) => {
    // function to control category order change
    setCategory(args);
    setPage(0);
  };

  const onFilterOrderChange = (args) => {
    // function to control filter order change
    setFilterOrder(args);
    setPage(0);
  };

  const loadImages = async () => {
    await ImageService.get9Images(category, page, filterOrder); // getting 9 images from server side and storing them
    setImages(imageStore.getState().images); //setting local images from store
  };

  useEffect(() => {
    loadImages(); //loading 9 images on first render, re-rendering on every Category, Page, Filter or Filter Order changes.
  }, [category, page, filterOrder]);

  const toggleCategoryModal = () => {
    setImageModalState(false); //closing image information modal if open.
    setOptionsModalState(!optionsModalState); //opening options modal
  };

  const openImageModal = function (image) {
    setOptionsModalState(false); //closing options modal if open
    setImage(image); // setting an image for the modal to use
    setImageModalState(true); // opening image information modal
  };

  const closeImageModal = () => {
    // function to close the image information modal
    setImageModalState(false);
  };

  const nextPage = () => {
    // function for forward pagination
    setPage(page + 1);
    setImageModalState(false);
    setOptionsModalState(false);
  };

  const prevPage = () => {
    // function for backwards pagination
    setPage(page - 1);
    setImageModalState(false); // closing image modal if open
    setOptionsModalState(false); // closing options modal if open
  };

  if (images) {
    // in case of server issues or long loading
    return (
      <div className="App">
        <div className="buttons">
          <button className="navButton" onClick={prevPage}>
            ⬅️ Previous
          </button>
          <button className="navButton" onClick={toggleCategoryModal}>
            Select Category and Filter Order
          </button>
          <button className="navButton" onClick={nextPage}>
            Next ➡️
          </button>
        </div>
        <div className="modal-div">
          <OptionsModal
            isOpen={optionsModalState} // passing the modal state for it to render if state is true
            onClose={toggleCategoryModal} // passing a function to toggle modal
            categories={categories} // passing categories array
            category={category} // passing current category
            onCategoryChange={onCategoryChange} // passing the function for category change
            filterOrder={filterOrder} // passing current filter order
            onFilterOrderChange={onFilterOrderChange} // passing the function for filter order change
          ></OptionsModal>
          <ImageModal
            isOpen={imageModalState} // passing the modal state for it to render if state is true
            onClose={closeImageModal} // passing a function to close modal
            image={image} // passing the image to get information from
          ></ImageModal>
        </div>
        <div className="images">
          <div className="images-grid">
            {/* displaying 3 rows of 3 images */}
            <div>
              <ImageCard
                image={images[0]} // passing the image
                openModal={openImageModal} // passing the function to toggle the modal
              ></ImageCard>
              1
              <ImageCard
                image={images[3]}
                openModal={openImageModal}
              ></ImageCard>
              4
              <ImageCard
                image={images[6]}
                openModal={openImageModal}
              ></ImageCard>
              7
            </div>
            <div>
              <ImageCard
                image={images[1]}
                openModal={openImageModal}
              ></ImageCard>
              2
              <ImageCard
                image={images[4]}
                openModal={openImageModal}
              ></ImageCard>
              5
              <ImageCard
                image={images[7]}
                openModal={openImageModal}
              ></ImageCard>
              8
            </div>
            <div>
              <ImageCard
                image={images[2]}
                openModal={openImageModal}
              ></ImageCard>
              3
              <ImageCard
                image={images[5]}
                openModal={openImageModal}
              ></ImageCard>
              6
              <ImageCard
                image={images[8]}
                openModal={openImageModal}
              ></ImageCard>
              9
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading images...</div>; // in case of server issues or long loading
  }
}

export default App;
