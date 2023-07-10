import { createStore } from "redux";

export class imageState {
  images = [];
}

function ImageReducer(currentState = new imageState(), action) {
  const newState = { ...currentState };

  switch (action.type) {
    case "FetchImages":
      newState.images = action.payload;
      break;
  }
  return newState;
}

export const imageStore = createStore(ImageReducer);
