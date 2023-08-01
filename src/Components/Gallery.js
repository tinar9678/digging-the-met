import React from "react";

import "./Gallery.css"
import { ArtCardComponent } from "./ArtCardComponent";

export const Gallery = ({results}) => {

    return (
        <div className="art-gallery-wrapper">
            {results.map((artObject) => {
                return <ArtCardComponent artObject={artObject}/> 
            })}
        </div>
    )
};