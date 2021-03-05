
let svg, img, imgData, wheelPins, lineCount = 0, colorData = [], settingsData;
let SIZE = 660, PIN_COUNT, MIN_DISTANCE, MAX_LINE_COUNT, REDUCE_VALUE, LINE_OPACITY, IS_COLORED, CAN_BE_DRAWN_AGAIN;

let button = document.getElementById('start');
let process = document.getElementById('process');
let controller = document.getElementById('controller');
let container = document.querySelector('.container');
let info = document.querySelector('.info');


document.addEventListener('DOMContentLoaded', function() {
  // Document Ready
  
  svg = SVG().addTo('#art').size(SIZE + 20, SIZE + 20)
  
  img = new Image();
  img.crossOrigin = 'anonymous';
  
});


// When 'Start Process' button triggered
function drawImageToCanvas(){
  
  let settings = [...controller.querySelectorAll('input[type="number"]')].map(i => parseInt(i.value || 0));
  let imgSource = controller.querySelector('input[type="text"]').value;
  let checkboxes = [...controller.querySelectorAll('input[type="checkbox"]')].map(i => i.checked);

  
  // img.src = 'https://i.imgur.com/sj57ls6.png'; // Thomas Shelby 1
  // img.src = 'https://i.imgur.com/zNTSaRC.png'; // Mustafa Kemal Atatürk 1
  // img.src = 'https://i.imgur.com/6nlVY3F.png'; // Mustafa Kemal Atatürk 2
  // img.src = 'https://i.imgur.com/0udBWbA.jpg'; // John Wick
  img.src            = imgSource   || 'https://i.imgur.com/tsIeCkC.jpeg'; // Thomas shelby 2
  MAX_LINE_COUNT     = settings[0] || 3000;
  PIN_COUNT          = settings[1] || 200;
  MIN_DISTANCE       = settings[2] || 15;
  REDUCE_VALUE       = settings[3] || 40;
  LINE_OPACITY       = settings[5] || 0.2;
  IS_COLORED         = checkboxes[0];
  CAN_BE_DRAWN_AGAIN = checkboxes[1];

  settingsData = `Line Count: ${MAX_LINE_COUNT} | 
  Pin Count: ${PIN_COUNT} | 
  Min Distance: ${MIN_DISTANCE} | 
  Color Reduce Amount: ${REDUCE_VALUE} | 
  Line Opacity: ${LINE_OPACITY} | 
  Is Colored: ${IS_COLORED} | 
  Use Same Lines: ${CAN_BE_DRAWN_AGAIN}`;



  controller.style.display = 'none';
  button.style.display = 'none';
  container.style.display = 'grid';
  
  
  img.onload = function(){
    const c = document.getElementById('image');
    const ctx = c.getContext('2d');


    // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, SIZE, SIZE);  // default square image
    // ctx.drawImage(img, 180, 80, 350, 350, 0, 0, SIZE, SIZE); // thomas shelby 1
     ctx.drawImage(img, 900, 50, 1750, 1750, 0, 0, SIZE, SIZE); // thomas shelby 2

    imgData = ctx.getImageData(0, 0, SIZE, SIZE).data;    // used for increasing brightness
    imgDataCpy = ctx.getImageData(0, 0, SIZE, SIZE).data; // used for reducing colors
    
    wheelPins = generatePins();

    generatePath(0, wheelPins);

  }

  
}


function generatePins(pinCount = PIN_COUNT, diameter = SIZE ){
  
  let radius = diameter / 2;
  let angle = Math.PI * 2 / pinCount; // Angle between d1 and d2 vectors which are (d1.x, d1.y) and (d2.x, d2.y)
  let pins = [];
  
  for(let k = 0; k < pinCount; k++){

    let x = Math.round(radius + radius * Math.cos( k * angle ));
    let y = Math.round(radius + radius * Math.sin( k * angle ));
    
    // lets prevent overflow
    x == SIZE ? x-- : '';
    y == SIZE ? y-- : '';
    
    pins.push(new Point(x, y));
    // console.log(i, x, y);
    // svg.rect(1,1).fill('#ff0000').move(x, y); // show pins on our svg
    
  }
  
  return pins;
}

class Point{
  constructor(x = 0, y = 0){
      this.x = x;
      this.y = y;
  }
}

function generatePath(currentPinIndex, pins, path = []){
  let nextPinIndex;
  let maxScore = 0;
  let tempPath = path;


  for(let i = 0; i < pins.length; i++){

    if(currentPinIndex == i || !isPinFarEnough(currentPinIndex, i) || isLineAlreadyDrawen(currentPinIndex, i, tempPath)){
      continue;
    }
    
    let vector = vectorPixelsFromAtoB(pins[currentPinIndex], pins[i]);
    let score = calculateVectorScore(vector);

    if(score >= maxScore ){
      maxScore = score;
      nextPinIndex = i;
    }

  }
  lineCount++;

  if(lineCount <= MAX_LINE_COUNT){
    
    process.innerHTML = `${ (lineCount * 100 / MAX_LINE_COUNT).toFixed(2) }%`;

    tempPath.push([currentPinIndex, nextPinIndex]);
    
    increaseBrightness(pins[currentPinIndex], pins[nextPinIndex]);
    

    let currP = pins[currentPinIndex];
    let nextP = pins[nextPinIndex];
    if(IS_COLORED){
      colorData.push(colorizeLine(currP, nextP));
    }else {
      svg.line(currP.x, currP.y, nextP.x, nextP.y).stroke({color: '#000', width: .5, opacity: LINE_OPACITY}); 
    }


    setTimeout(function(){
      generatePath(nextPinIndex, pins, tempPath);
    }, 5)

  }else {
    console.log('process finished')
    info.innerHTML = settingsData; // used settings for the current process
    console.log(tempPath);     // tempPath[i]  - start and end pin numbers of a specific(iTh) line.
    console.log(colorData);    // colorData[i] - color of a specific(iTh) line 
  } 


}

function vectorPixelsFromAtoB(a, b){ // 'Bresenham Line Algorithm' from https://stackoverflow.com/a/55666538
    var coordinatesArray = [];

    // Translate coordinates
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y;

    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    // Set first coordinates
    coordinatesArray.push(new Point(x1, y1));

    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
        var e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }

        // Set coordinates
        coordinatesArray.push(new Point(x1, y1));
    }
    // Return the result
    return coordinatesArray;
}

function calculateVectorScore(vector){
  let score = 0;

  vector.forEach(function(pixel){
    // In black and white images, r=g=b
    // So we can define its lightness according to any value of r, g or b

    let r = imgData[getColor(pixel.x, pixel.y)[0]] / 255; // r = 1 -> max lightness
    // In colored images, use [(Math.max(r,g,b)/255) + (Math.min(r,g,b)/255)]/2 to calculate lightness


    score += 1 - r; // substracting it from 1 gives us the darkness

  })


  return score / vector.length; // avarage darkness

}

function increaseBrightness(a, b){

  let vector = vectorPixelsFromAtoB(a, b);
  vector.forEach(function(pixel){
    // we can increase brightness with increasing the red amount of the each pixel of the vector
    
    imgData[getColor(pixel.x, pixel.y)[0]] += REDUCE_VALUE

    if(imgData[getColor(pixel.x, pixel.y)[0]] > 255){ 
      imgData[getColor(pixel.x, pixel.y)[0]] = 255
    }

  })

}

function colorizeLine(a, b){

  let color = [0,0,0];

  let vector = vectorPixelsFromAtoB(a, b);
  vector.forEach(function(pixel){

    color[0] += imgDataCpy[getColor(pixel.x, pixel.y)[0]];
    color[1] += imgDataCpy[getColor(pixel.x, pixel.y)[1]];
    color[2] += imgDataCpy[getColor(pixel.x, pixel.y)[2]];

  })

  color = color.map(c1 => Math.round(c1 / vector.length));


  let c = findBestColorAndReduceOriginalSourceColor(color, vector, REDUCE_VALUE);


  svg.line(a.x, a.y, b.x, b.y).stroke({color: c, width: .5, opacity: LINE_OPACITY});
  return c;

}

function findBestColorAndReduceOriginalSourceColor(color, vector, reduce){
  let colors = ['#ff0000', '#00ff00', '#0000ff']

  let max = Math.max(color[0],color[1],color[2]);
  let c = color.indexOf(max);


  vector.forEach(function(pixel){

    imgDataCpy[getColor(pixel.x, pixel.y)[c]] -= reduce;
    if(imgDataCpy[getColor(pixel.x, pixel.y)[c]] < 0){
      imgDataCpy[getColor(pixel.x, pixel.y)[c]] = 0;
    }

  })
  

  return colors[c];

}





function isPinFarEnough(current, target){

  let diff = Math.abs(target - current);
  diff = ( diff > (PIN_COUNT / 2) ) ? (PIN_COUNT - diff) : diff;

  return (diff >= MIN_DISTANCE);

}

function isLineAlreadyDrawen(current, target, path){

  let hasPath = false;
  
  if(!CAN_BE_DRAWN_AGAIN && path.length > 0){
    path.forEach(function(step){
      if((step[0] == current && step[1] == target) || (step[0] == target && step[1] == current) ){
        hasPath = true
      }
    })
  }
  return hasPath;
}

function getColor(x, y) { // A kind of function which returns RGBA indices of a pixel of an image with SIZExSIZE;
  let redIndex = y * (SIZE * 4) + x * 4;
  return [redIndex, redIndex + 1, redIndex + 2, redIndex + 3];
}