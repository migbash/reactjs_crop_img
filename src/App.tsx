import React, { Component, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';

import logo from './logo.svg';
import './App.css';
import { ImageCropFeedback } from './components/ImageCropFeedback';

var height = 0, width = 0, imgSrc = 'https://placekitten.com/600/600'
var dataURL = ''
var crop = false

function App() {

  // ~~~~~~~~~~~~~~~~
  // Using React Hooks as State for the component

  const [topVal, setTopVal] = useState(100)
  const [leftVal, setLeftVal] = useState(100)
  const [rightVal, setRightVal] = useState(100)
  const [bottomVal, setBottomVal] = useState(100)

  const [clickCount, setClickCount] = useState(0)

  const [clickOne, setClickOne] = useState([0])
  const [clickTwo, setClickTwo] = useState([0])

  // ~~~~~~~~~~~~~~~~
  // Component Functions

  const newAreaSelect = (top: number, left: number, right: number, bottom: number) => {

    // RESET THE VALUES OF THE RECTANLGE TO (0, 0, 0, 0)
    setTopVal(top)
    setLeftVal(left)
    setRightVal(right)
    setBottomVal(bottom)

    setClickCount(clickCount + 1)
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

      // draw the image on the canvas
      ctx.drawImage(img, topVal, leftVal, bottomVal, rightVal, 0, 0, 200, 200);

      // update the image src:
      var t_img:HTMLImageElement|any = document.getElementById('target_img')
      dataURL = canvas.toDataURL();
      t_img.src = dataURL

      crop = false
    }
    ctx.restore()
  }

  // FUNCTION CLICK COMPONENT CLICK EVENT
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

  // ~~~~~~~~~~~~~~~
  // useEffect()
  
  useEffect(() => {
    // onChange of the clickCounter, do:

    // prevent intial render execution, wait for intial clicks
    if (clickCount != 0) {

      width = clickTwo[0] - clickOne[0]
      height = clickTwo[1] - clickOne[1]

      setTopVal(clickOne[0])
      setLeftVal(clickOne[1])
      setRightVal(height)
      setBottomVal(width)

      crop = true
    }
  }, [clickTwo])

  useEffect(() => {
    if(crop) {
      setTopVal(clickOne[0])
      setLeftVal(clickOne[1])
      setRightVal(height)
      setBottomVal(width)
      tmpCanvasHandler()
    }
  }, [crop])

  // ~~~~~~~~~~~~
  
  return (
    <div className="App">
      <ImageCropFeedback imageUrl={imgSrc} top={topVal} left={leftVal} right={rightVal} bottom={bottomVal} onAreaSelect={newAreaSelect} />
      <canvas id='canvas_tmp'> </canvas>
      <p> Result: </p>
      <img src={dataURL} id='target_img'></img>
    </div>
  );
}

export default App;