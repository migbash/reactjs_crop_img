import React, { useEffect } from "react";

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

    // USE-EFFECT [2nd Click Trigger]
    useEffect(() => {

        var c : any = document.getElementById("canvas_t");

        var img = new Image();
        img.src = imageUrl
        img.crossOrigin = '*';
        img.onload = function() {

            var ctx = c.getContext("2d");

            ctx.width = 200
            ctx.height = 300

            c.width = img.width;
            c.height = img.height;

            ctx.drawImage(img, 0, 0); // image draw on canvas

            // rectangle draw
            ctx.beginPath();
            ctx.rect(top, left, bottom, right); // x, y coordinate of the top left corner + width & height dimensions
            ctx.stroke();
        }
    })

    // ~~~~~~~~~~~~~~~~~~

    return (
        <div>  
            <canvas id='canvas_t' onDoubleClick={() => onAreaSelect(0, 0, 0, 0)}> </canvas>
        </div>
    );
};