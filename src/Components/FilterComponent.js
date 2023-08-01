import React, { useState, useEffect } from 'react';

const RECENT_FILTER = "Recently Created";
const CONTAINS_IMAGE_FILTER = "Contains Image";
const ALPHABETICAL_FILTER = "Sort by Title Alphabetically";
const NO_FILTER = "No Filter";

export const FilterComponent = ({ artObjects, setFilteredResults }) => {
  const [selectedOption, setSelectedOption] = useState(NO_FILTER);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    let filteredArtObjects = artObjects;

    switch (selectedOption) {
      case RECENT_FILTER:
        filteredArtObjects = artObjects
          .filter((artObject) => artObject.objectEndDate !== undefined)
          .sort((a, b) => b.objectEndDate - a.objectEndDate);
        break;
      case CONTAINS_IMAGE_FILTER:
        filteredArtObjects = artObjects.filter((artObject) => artObject.primaryImage);
        break;
      case ALPHABETICAL_FILTER:
        filteredArtObjects = artObjects
          .filter((artObject) => artObject.title !== undefined)
          .sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // For "No Filter", set filteredArtObjects back to the original artObjects array
        filteredArtObjects = artObjects;
        break;
    }

    setFilteredResults(filteredArtObjects);
  }, [artObjects, selectedOption, setFilteredResults]);

  return (
    <div>
      <label htmlFor="filter">Filter</label>
      <select id="filter" value={selectedOption} onChange={(event) => handleOptionChange(event.target.value)}>
        <option key="no_filter" value={NO_FILTER}>
          No Filter
        </option>
        <option key="recently_created" value={RECENT_FILTER}>
          Recently Created
        </option>
        <option key="has_images" value={CONTAINS_IMAGE_FILTER}>
          Contains Image
        </option>
        <option key="sort_alphabetically" value={ALPHABETICAL_FILTER}>
          Sort by Title Alphabetically
        </option>
      </select>
    </div>
  );
};
