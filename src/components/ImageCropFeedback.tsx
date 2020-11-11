import React, { useEffect, useState } from "react";

// ~~~~~~~~~~~~~~
// Component Interface

interface ImageCropFeedbackProps {
    imageUrl: string;
    top: number;
    left: number;
    right: number;
    bottom: number;

    onAreaSelect: (
        top: number,
        left: number,
        right: number,
        bottom: number
    ) => void;
}

// ~~~~~~~~~~~~~~~~~
// TypeScript Function Component

export const ImageCropFeedback: React.FC<ImageCropFeedbackProps> = ({ imageUrl, top, left, right, bottom, onAreaSelect }) => {

    // ~~~~~~~~~~~~~~~~
    // Using HooksAPI

    const [topVal, setTopVal] = useState(top)
    const [leftVal, setLeftVal] = useState(left)
    const [rightVal, setRightVal] = useState(right)
    const [bottomVal, setBottomVal] = useState(bottom)

    // ~~~~~~~~~~~~~~~~~
    // Function Component Methods

    // onAreaSelect = (top, left, right, bottom):void => {
    //     // UPDATE THE DIMNESIONS OF THE RECTANGLE UPON DOUBLE CLICK
    //     setTopVal(top)
    //     setLeftVal(left)
    //     setRightVal(right)
    //     setBottomVal(bottom)
    // }

    // ~~~~~~~~~~~~~~~~~~
    // useEffect()

    useEffect(() => {

        var c : any = document.getElementById("canvas_t"); // LOcate the canvas on the component

        var img = new Image(); // Instantiating the image object

        img.src = imageUrl
        img.crossOrigin = '*';
        img.onload = function() {

            var ctx = c.getContext("2d");

            ctx.width = 200
            ctx.height = 300

            c.width = img.width;
            c.height = img.height;

            // var rect = c.getBoundingClientRect();

            // var x = top - rect.top;   // x top left coordinate
            // var y = left - rect.left; // y top left coordinate  

            ctx.drawImage(img, 0, 0); // image draw on canvas

            // rectangle draw
            ctx.beginPath();
            ctx.rect(top, left, bottom, right); // x, y coordinate of the top left corner + width & height dimensions
            ctx.stroke();

            if (process.env.NODE_ENV != 'production') {
                // console.log('Redrawing')
                // console.log('Values passed: ' + top + ' ' + left + ' ' + ' ' + right + ' ' + bottom)
                // console.log('Crop value: ' + crop)
                // console.log('rect-left: ' + rect.left + 'rect-top: ' + rect.top)
                // console.log('x-value: ' + x + ' y-value: ' + y)
            }
        }
    })

    // ~~~~~~~~~~~~~~~~~~
    // Return HTML

    return (
        <div>  
            <canvas id='canvas_t' onDoubleClick={() => onAreaSelect(0, 0, 0, 0)}> </canvas>
        </div>
    );
};