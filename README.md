# react-scrollable-canvas

react-scrollable-canvas is a React component library that allows you to create scrollable canvas easily and quickly.

## Installation

Install ``` react-scrollable-canvas ``` with npm:

```
npm install react-scrollable-canvas --save
```

## Examples

## Props

### ScrollableCanvas Props

|Name|Type|Description|
|---|---|---|
|width|number|Required. Width of the display size.|
|height|number|Required. Height of the display size.|
|largeWidth|number|Required. Width of the canvas size.|
|largeHeight|number|Required. Height of the canvas size.|
|wait|number|Function onScroll is called every (wait) milliseconds. Used for throttle function. Default value is 10.|
|noScrollbar|boolean|Hide scroll bar. Default value is false.|
|onScroll|(scrollTop: number, scrollLeft: number) => void|This function is called when scrolled.|
|canvasRef|RefObject<HTMLCanvasElement>|This references a canvas element inside ScrollableCanvas.|

### ScrollableCanvasContainer Props
