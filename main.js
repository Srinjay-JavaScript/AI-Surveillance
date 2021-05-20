var status = "";
var video = "";
var objects = [];
function preload()
{video = createVideo("video.mp4");}

function setup()
{canvas = createCanvas(500, 300);canvas.center();video.hide();}

function draw()
{
image(video, 0, 0, 500, 300);

if (status != "")
{
    objectDetector.detect(video, final);
    for(i = 0; i<objects.length; i++){
      document.getElementById("status").innerHTML = "Status: Objects Detected";
      document.getElementById("objectNumber").innerHTML = "Number of Objects: " + objects.length;
      x = objects[i].x;
      y = objects[i].y;
      w = objects[i].width;
      h = objects[i].height;
      percent = floor(objects[i].confidence * 100);
      n = objects[i].label;
      fill("red");
      text(n + " Confidence: " + percent, x + 15, y + 15);
      textStyle(BOLD);
      noFill();
     stroke("red")
     rect(x, y, w, h);

    }
}
}

function start()
{objectDetector = ml5.objectDetector('cocossd', initialized);
 document.getElementById("status").innerHTML = "Status: Dectecting Object";
}


function initialized()
{console.log("COCOSSD is ready.");status=true;video.speed(1);video.volume(0);video.loop();}
function final(error, results)
{
 if (error)
 {
     console.error(error);
 }
 else
 {
   console.log(results);
   objects = results;
 }
}