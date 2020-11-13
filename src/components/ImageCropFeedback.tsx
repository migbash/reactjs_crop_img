import React, { useEffect, useState } from "react";

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

export const ImageCropFeedback: React.FC<ImageCropFeedbackProps> = ({ imageUrl, top, left, right, bottom, onAreaSelect }) => {

    const [clickCount, setClickCount] = useState(0)
    const [clickOne, setClickOne] = useState([0])
    const [clickTwo, setClickTwo] = useState([0])

    const handleClick = (e:any) => {
        if (clickCount === 0) {
            setClickOne([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
            setClickCount(1)
        } 
        if (clickCount === 1) {
            setClickTwo([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
            setClickCount(0)
        }
    }

    useEffect(() => {
        if(clickTwo.length !== 1) {
            onAreaSelect(clickOne[0], clickOne[1], clickTwo[0], clickTwo[1])
        }
    }, [clickTwo])

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
            const height = right - top
            const width = bottom - left
            ctx.drawImage(img, 0, 0); // image draw on canvas
            ctx.beginPath();
            ctx.rect(top, left, height, width); // x, y, height, width
            ctx.stroke();
        }
    })

    return (
        <div>  
            <canvas id='canvas_t' onClick={(e) => handleClick(e)}> </canvas>
        </div>
    );
};