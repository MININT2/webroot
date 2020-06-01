var canvas = document.querySelector('.the-canvas');
var context = canvas.getContext('2d');
var ratio = window.devicePixelRatio || 1;

var totalLineHeight = 680;
var totalLines = 4;
var totalDiff = totalLineHeight / totalLines;
var fontHeight = 60 * ratio - 50; //small centering

var smallestWidth = 280; //width of smallest line
var offsetX = 12;
var offsetY = 6;
var iterations;
var verticalAlign, line1Diff, line2Diff, line3Diff, line4Diff, iterations, iteration, animationFrame;

var startRGB = [255, 255, 255];
var endRGB   = [220, 165, 163];
var fullColorSet = [];

init();

function init() {
  
  cancelAnimationFrame(animationFrame);
  
  //width and height
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
 
  //canvas font prop
  context.font = '180px mediumJP';
  context.textAlign = 'center';
  context.fillStyle = '#fff';
  context.strokeStyle = "#F0A5A3";
  context.lineWidth = "3";
  context.textBaseline = "middle"; 
  
  //centering
  verticalAlign = (window.innerHeight / 2  * ratio) - totalLineHeight / 2;
  line1Diff = totalLineHeight + fontHeight - totalDiff;
  line2Diff = totalLineHeight + fontHeight - totalDiff * 2;
  line3Diff = totalLineHeight + fontHeight - totalDiff * 3;
  line4Diff = totalLineHeight + fontHeight - totalDiff * 4;
  
  //iterations
  iterations = Math.floor(((window.innerWidth * ratio / 2) - (smallestWidth * ratio / 2)) / offsetX + 5);
  prepareColorSets(iterations);
  
  iteration = 0;
  
  animationFrame = requestAnimationFrame(draw);
}

//draw loop
function draw() {
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  for( var i = iterations - 1; i > 0; i-- ) {
    context.fillStyle = 'rgb(' + fullColorSet[i][0] + ',' + fullColorSet[i][1] + ',' + fullColorSet[i][2] + ')';
    var x = window.innerWidth / 2 * ratio - i * offsetX;
    var y = verticalAlign + i * offsetY + (Math.sin(i + iteration) * 2);
    drawText( x, y );
  } 
  
  iteration += 0.1; 
  animationFrame = requestAnimationFrame(draw);
}

//draw the text line by line
function drawText(x, y) {
  
  context.fillText("THE ONE", x, y + line4Diff);
  context.strokeText("THE ONE", x, y + line4Diff);
  
  context.fillText("YOU ARE", x, y + line3Diff);
  context.strokeText("YOU ARE", x, y + line3Diff);
  
  context.fillText("LOOKING FOR", x, y + line2Diff);
  context.strokeText("LOOKING FOR", x, y + line2Diff);
  
  context.fillText("IS YOU", x, y + line1Diff);
  context.strokeText("IS YOU", x, y + line1Diff);
}

//prevent having to do this shit every loop
function prepareColorSets(iterations) {
  fullColorSet = [];
  for( var i = 0; i < iterations; i++ ) {
    fullColorSet.push(colourGradientor(1 - i / iterations, startRGB, endRGB));
  }
}

//get color gradient between colors, get fucked
function colourGradientor(p, rgb_beginning, rgb_end){

  var w = p * 2 - 1;
  var w1 = (w + 1) / 2.0;
  var w2 = 1 - w1;
  var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
             parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
             parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
  return rgb;
};

window.onresize = init;