// Sketch.tsx
import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; // We use 'p5Types' to avoid conflicts with the global p5 instance.

interface SketchProps {
}

const P5Sketch: React.FC<SketchProps> = () => {
  let rotation = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5: p5Types) => {
    p5.background(200);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(rotation);
    p5.rect(0, 0, 50, 50);

  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Sketch;