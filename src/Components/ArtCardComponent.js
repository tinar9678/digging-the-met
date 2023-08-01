import React from "react";

import "./ArtCardComponent.css"

export const ArtCardComponent = ({artObject}) => {
    return (
        <div key = {artObject.objectID} className="art-card-wrapper">
            <div className="artTitle">{artObject.title}</div>
            <div className="artEndDate">{artObject.objectEndDate}</div>
            {artObject.primaryImage.length > 0 ? (
                <img src={artObject.primaryImage} alt="primaryArt" />
            ) : (
                <p>No Image found</p>
            )}
        </div>
    )
};