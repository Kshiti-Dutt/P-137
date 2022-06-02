status = "";
video = "";
objects =[];
function start()
{
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    input_text = document.getElementById("input_id").value;
}

function preload()
{
video = createVideo("");
}

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.position(530,250);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded() 
{
    console.log("Model Loaded");
    status = true;
    objectdetector.detect(video, gotResults);
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results)
{
  if(error) 
  {
      console.log(error);
  }
  else{
      console.log(results);
      object = results;
  }
}

function draw()
{
    image(video, 0, 0, 640, 420);
    if(status != "")
    {
        objectdetector.detect(video, gotResults);
        for(q = 0; q < object.length; q++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("red");
            percent = floor(object[q].confidence * 100);
            text(object[q].label + " " + percent + "%", object[q].x +15, object[q].y +15);
            noFill();
            stroke("red");
            rect(object[q].x, object[q].y, object[q].width, object[q].height);
            if(objects[i].label == input_text){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }
    }
}