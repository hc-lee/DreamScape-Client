import React from 'react';
import '../styles/ImageBox.css';
function ImageBox(props) {
    // Image path to display.
    const imagePath = props.imageData;

    const onRefreshButton = () => {
        props.onRefreshButtonClick();
    };

    return (
        <>
            <div className={"top"}>
                <h3 className={"header-description2"}>Your image: </h3>
                <div className={"spacer"}>
                 <button
                     className={"refresh-button"}
                     onClick={onRefreshButton}>
                     ↻
                 </button>
                </div>
            </div>
            <img src={imagePath} alt="Dreamscape image"/>
            <button className={"button"}>Save</button>
            <p className={"alert"}> Please login or register to save images to your personal log!</p>
        </>
    )

}


export default ImageBox;