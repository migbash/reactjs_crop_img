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

    // ~~~~~~~~~~~~~~~~~~
    // useEffect()

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

            // image draw on canvas
            ctx.drawImage(img, 0, 0);

            // rectangle draw
            ctx.beginPath();
            ctx.rect(top, left, bottom, right); // x, y coordinate of the top left corner + width & height dimensions
            ctx.stroke();
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