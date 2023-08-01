import React, { useState } from "react";

import "./SearchBarComponent.css";

const SEARCH_API = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
const LIST_OBJECTS_API = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

export const SearchBarComponent = ({ setResults, setLoading }) => {
  const [inputString, setInputString] = useState("");
  const [lastInputString, setLastInputString] = useState("");
  const [timer, setTimer] = useState(null);
  const [cachedData, setCachedData] = useState({});

  const fetchObjectIDsData = async (value) => {
    try {
      const cleanedString = value.replace(/\s+/g, "");
      const data = await fetch(SEARCH_API + cleanedString);
      const json = await data.json();
      return json.objectIDs;
    } catch {
      console.error("Fetching data from the Met was unsuccessful.");
    }
    return [];
  };

  const fetchArtData = async (objectIDs) => {
    if (!objectIDs) return [];
    const artObjectList = [];
    for (const objectID of objectIDs) {
      try {
        const cachedArtData = cachedData[objectID];
        if (cachedArtData) {
          // If the art data is already in cache, use it directly
          artObjectList.push(cachedArtData);
        } else {
          // Fetch the data from the API and store it in cache
          const data = await fetch(LIST_OBJECTS_API + objectID);
          const json = await data.json();
          if (json && json.objectID) {
            artObjectList.push(json);
            setCachedData((prevCachedData) => ({
              ...prevCachedData,
              [objectID]: json, // Store the fetched art data in cache
            }));
          }
        }
      } catch {
        console.error("ObjectID " + objectID + " was not found");
      }
    }
    return artObjectList;
  };

  const handleFetchData = async (value) => {
    setLoading(true);
    const objectIDs = await fetchObjectIDsData(value);
    const artObjectList = await fetchArtData(objectIDs);
    setResults(artObjectList);
    setLoading(false);
  };

  const handleInputChange = (value) => {
    setInputString(value);
    if (value !== lastInputString) {
      setLastInputString(value);

      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        handleFetchData(value);
      }, 500);

      setTimer(newTimer);
    }
  };

  return (
    <div className="search-input-wrapper">
      <input
        placeholder="What do you want to see at the Met?"
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputString}
      />
    </div>
  );
};