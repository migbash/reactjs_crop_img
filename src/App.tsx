import React, { useEffect, useState } from 'react';

import './App.css';
import { ImageCropFeedback } from './components/ImageCropFeedback';

var imgSrc = 'https://placekitten.com/600/600', dataURL = ''

function App() {

  const [dimension, setDimension] = useState([120, 500, 353, 403])

  const onAreaSelect = (top: number, left: number, right: number, bottom: number) => {
    setDimension([top, left, right, bottom])
  }

  useEffect(() => {
    tmpCanvasHandler()
  }, [dimension])

  const tmpCanvasHandler = () => {
    var canvas:any = document.getElementById('canvas_tmp')
    canvas.style = `position: absolute;
                    display: none; `
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = imgSrc
    img.crossOrigin = '*';
    img.onload = function() {
      canvas.width = 250;
      canvas.height = 250;
      const height = dimension[2] - dimension[0]
      const width = dimension[3] - dimension[1]
      ctx.drawImage(img, dimension[0], dimension[1], height, width, 0, 0, 250, 250);  // img, offsetX, offsetY, sWidth, sHeight
      // update the image src:
      var t_img:HTMLImageElement|any = document.getElementById('target_img')
      dataURL = canvas.toDataURL();
      t_img.src = dataURL
    }
    ctx.restore()
  }
  
  return (
    <div className="App">
      <ImageCropFeedback imageUrl={imgSrc} top={dimension[0]} left={dimension[1]} right={dimension[2]} bottom={dimension[3]} onAreaSelect={onAreaSelect} />
      <canvas id='canvas_tmp'> </canvas>
      <p> Result: </p>
      <img alt='cropped_img' src={dataURL} id='target_img'></img>
    </div>
  );
}

export default App;