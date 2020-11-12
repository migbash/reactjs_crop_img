import React, { useEffect, useState } from 'react';

import './App.css';
import { ImageCropFeedback } from './components/ImageCropFeedback';

var height = 0, width = 0, imgSrc = 'https://placekitten.com/600/600'
var dataURL = ''
var crop = false

function App() {

  console.log('Component Re-render')

  // ~~~~~~~~~~~~~~~~
  // Using React Hooks as State for the component

  const [dimension, setDimension] = useState([100, 100, 100, 100])
  const [clickCount, setClickCount] = useState(0)
  const [clickOne, setClickOne] = useState([0])
  const [clickTwo, setClickTwo] = useState([0])

  console.log(dimension)

  // ~~~~~~~~~~~~~~~~
  // Component Functions

  const newAreaSelect = (top: number, left: number, right: number, bottom: number) => {
    // RESET THE VALUES OF THE RECTANLGE TO (0, 0, 0, 0)
    setDimension([top, left, right, bottom])
    setClickCount(1)
  }

  const tmpCanvasHandler = () => {

    var canvas:any = document.getElementById('canvas_tmp')
    canvas.style = `position: absolute;
                    display: none; `
    var ctx = canvas.getContext("2d");
    
    var img = new Image();
    img.src = imgSrc
    img.crossOrigin = '*';
    img.onload = function() {

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, dimension[0], dimension[1], dimension[3], dimension[2], 0, 0, 250, 250);  // draw the image on the canvas

      // update the image src:
      var t_img:HTMLImageElement|any = document.getElementById('target_img')
      dataURL = canvas.toDataURL();
      t_img.src = dataURL

      crop = false
    }
    ctx.restore()
  }

  // FUNCTION CLICK COMPONENT CLICK EVENT (1st & 2nd Clicks)
  onclick = function(e) {
    if (clickCount === 1) {
      setClickOne([e.offsetX, e.offsetY])
      setClickCount(clickCount + 1)
    } 
    
    if (clickCount === 2) {
      setClickTwo([e.offsetX, e.offsetY])
      setClickCount(0)
    }
  };

  // USE-EFFECT [2nd Click Trigger]
  useEffect(() => {
    // prevent intial render execution, wait for intial clicks
    if (clickCount !== 0) {
      width = clickTwo[0] - clickOne[0]
      height = clickTwo[1] - clickOne[1]
      setDimension([clickOne[0], clickOne[1], height, width])
      crop = true // Notify of updated rectangle crop
    }
  }, [clickTwo])

  // USE-EFFECT [Crop Rect-Upadate]
  useEffect(() => {
    if(crop) {
      tmpCanvasHandler()
    }
  }, [crop])

  // ~~~~~~~~~~~~
  
  return (
    <div className="App">
      <ImageCropFeedback imageUrl={imgSrc} top={dimension[0]} left={dimension[1]} right={dimension[2]} bottom={dimension[3]} onAreaSelect={newAreaSelect} />
      <canvas id='canvas_tmp'> </canvas>
      <p> Result: </p>
      <img alt='cropped_img' src={dataURL} id='target_img'></img>
    </div>
  );
}

export default App;