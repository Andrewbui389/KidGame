// eslint-disable-next-line
import React, { useRef, useState, useEffect } from "react";
// eslint-disable-next-line
import * as tf from '../node_modules/@tensorflow/tfjs';
import * as cocossd from '../node_modules/@tensorflow-models/coco-ssd'
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

export default function Detector() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);




  const runCoco = async () => {
    let net = await cocossd.load()
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      
      let verifyHighRate = obj.every(prediction => prediction['score'] > 0.87);
      if(verifyHighRate){
        console.log(obj)
        drawRect(obj,ctx)
      }
      
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 500,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 450,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}
