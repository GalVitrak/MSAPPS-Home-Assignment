import React from "react";

function OptionsModal({
  isOpen,
  onClose,
  categories,
  category,
  onCategoryChange,
  filterOrder,
  onFilterOrderChange,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
        <h3>Select Category</h3>
        <select
          defaultValue={category}
          onChange={(e) => {
            onCategoryChange(e.target.value); // changing the category by selected option value
          }}
        >
          {categories.map(function (c, index) {
            return <option key={index}>{c}</option>;
          })}
        </select>
        <h3>Order By Date</h3>
        <select
          defaultValue={filterOrder}
          onChange={(e) => {
            onFilterOrderChange(e.target.value); // changing the filter order by selected option value
          }}
        >
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </select>
      </div>
    </div>
  );
}

export default OptionsModal;
