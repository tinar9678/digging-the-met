import React, {useState} from "react";

import "./SearchBarComponent.css"

const SEARCH_API = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
const LIST_OBJECTS_API = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

export const SearchBarComponent = () => {
    const [inputString, setInputString] = useState("");
    const fetchObjectIdsData = async (value) => {
        try {
            const cleanedString = value.replace(/\s+/g, '');
            const data = await fetch(SEARCH_API+cleanedString);
            const json = await data.json();
            return json.objectIDs;
        } catch {
            console.error("Fetching data from the Met was unsuccessful.");
        }
        return [];
    }

    const fetchArtData = async (objectIds) => {
        if (!objectIds) return [];
        const artObjectList = [];
        for (const objectId of objectIds) {
            try {
              const data = await fetch(LIST_OBJECTS_API+objectId);
              const json = await data.json();
              if (json) artObjectList.push(json);
            } catch {
              console.error("ObjectId " + objectId + " was not found");
            }
        }
        return artObjectList;
    }

    const handleInputChange = async (value) => {
        if (value.length === 0) {
            // TODO(tinaryu): show last searched or encourage user. 
            return;
        }
        setInputString(value);
        const objectIds = await fetchObjectIdsData(value);
        console.log(objectIds);
        const artObjectList = await fetchArtData(objectIds);
        // TODO(tinaryu): If artObjectsList is empty, set label in results to be "not found"
        console.log(artObjectList);
        // update code so that user only sees the changes once we have all the art object list.
    }

    return (
        <div className="search-input-wrapper">
            <input placeholder="What do you want to see at the Met?" 
                    onChange={(e) => handleInputChange(e.target.value)} value={inputString}/>
        </div>
    )
}