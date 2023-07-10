import express from "express";
import imagesLogic from "../Logic/images-logic.js";

const imageController = express.Router();

imageController.get(
  "/images/:category/:page/:filter",
  async (request, response, next) => {
    try {
      const category = request.params.category; //getting category params
      const filter = request.params.filter; //getting filter order params
      const page = +request.params.page; //getting page params
      const images = await imagesLogic.getImagesByCategoryPageAndId(
        category,
        page,
        filter
      ); // getting images from external API by category, page and filter order
      response.json(images); // returning the images to client side
    } catch (err) {
      next(err);
    }
  }
);

export default imageController;
