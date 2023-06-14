const canva = document.querySelector('canvas'),
toolsBtn = document.querySelectorAll('.tool'),
fillColor = document.querySelector('#fill-color'),
sizeSlider = document.querySelector('#size-slider'),
colorBtn = document.querySelectorAll('.colors .option'),
colorPicker = document.querySelector('#color-picker'),
clearCanvas = document.querySelector('.clear-canvas'),
saveImg = document.querySelector('.save-img'),
ctx = canva.getContext('2d');

// global variables with default value
let prevMouseX, prevMouseY, snapShot,
isDrawing = false,
selectedTool = 'brush',
brushWidth = 5,
selectedColor = '#000';

const setCanvaBackground = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canva.width, canva.height);
    ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
}

window.addEventListener('load', () => {
    // setting canva width/height.. offsetwidth/height returns viewable width/height of an element
      canva.width = canva.offsetWidth;
      canva.height = canva.offsetHeight;
      setCanvaBackground();
});

const drawRect = (e) => {
    // if fillcolor isn't checked draw a rect with border else draw rect with background 
    if(!fillColor.checked){
        // creating circle according to the mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX,  prevMouseY - e.offsetY );
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX,  prevMouseY - e.offsetY );

}

const drawCircle = (e) => {
    ctx.beginPath(); // creating new Path to draw circle
    //getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2))
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTria = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);// moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line accorfing to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // cloing path of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawSquare = (e) => {
    ctx.beginPath();
    const sideLength = Math.abs(prevMouseX - e.offsetX) // calculate the side lenght of the square

        // Calculate the top-left coordinates of the square based on the mouse position
        const squareX = prevMouseX < e.offsetX ? prevMouseX : prevMouseX - sideLength;
        const squareY = prevMouseY < e.offsetY ? prevMouseY : prevMouseY - sideLength;
    
        // Draw the square
        if (fillColor.checked) {
            ctx.fillRect(squareX, squareY, sideLength, sideLength);
        } else {
            ctx.strokeRect(squareX, squareY, sideLength, sideLength);
        }
}


const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // passing current mouseX position as PrevMouseX value
    prevMouseY = e.offsetY; // passing current mouseY position as PrevMouseY value
    ctx.beginPath(); // creating new path to draw
    ctx.lineWidth = brushWidth; // passing brushsize as line width
    ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
    ctx.fillStyle = selectedColor; // passing selectedColor as fill style
    // copying canva data & passing as snapshot value.. this avoids dragging the image
    snapShot = ctx.getImageData(0, 0, canva.width, canva.height);
}

const drawing = (e) => {
    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.putImageData(snapShot, 0, 0); // adding copied canvas data on to this canvas

    if(selectedTool === 'brush' || selectedTool === 'eraser' ){
        // if selected tool is eraser then set strokeStyle to white
        // to paint white color on to the selecting canvas content else set the stroke color to the selected color
        ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    }else if(selectedTool === 'rectangle'){
        drawRect(e);
    }else if(selectedTool === 'circle'){
        drawCircle(e);
    }else if (selectedTool === 'square'){
        drawSquare(e)
    } else if (selectedTool === 'triangle'){
          drawTria(e)
    }


}

toolsBtn.forEach(btn => {
     btn.addEventListener('click', () => { // adding click event to all tool option
        // removing active class from the prevoius option and adding on current clicked option
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool = btn.id;
        console.log(selectedTool);
     });
});

sizeSlider.addEventListener('change', () => brushWidth = sizeSlider.value); // passing slider value a brushSize

colorBtn.forEach(btn => {
    btn.addEventListener('click', () => { // adding a click event to all color button
        // removing active class from the prevoius option and adding on current clicked option
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue('background-color');
    });
});

colorPicker.addEventListener('change', () => {
    // passing picked color value from color picker to last color btn background
     colorPicker.parentElement.style.background = colorPicker.value;
     colorPicker.parentElement.click();
});

clearCanvas.addEventListener('click', () =>{
    ctx.clearRect(0, 0, canva.width, canva.height); // clearing whole canvas
    setCanvaBackground();
});

saveImg.addEventListener('click', () =>{
    const link = document.createElement('a'); // creating <a></a> element
    link.download = `${Date.now()}.jpg`; // pasing current date as link download value
    link.href = canva.toDataURL(); // passing canvasData as link href value
    link.click(); // clicking link to download image
});


canva.addEventListener('mousedown', startDraw);
canva.addEventListener('mousemove', drawing);
canva.addEventListener('mouseup', () => isDrawing = false);