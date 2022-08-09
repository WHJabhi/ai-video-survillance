status = "";
objects = [];

function modelLoded() {
    console.log("model loded");
    status = true;
}

function gotresult(error,results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
} 

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video,gotresult);
        for(i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: objects detected";
            fill("greypink");
            percent = floor(objects[i].confiedence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("greypink");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotresult);
                document.getElementById("object_status").innerHTML = object_name+" found";
                synth = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterthis);


            }
            else{ document.getElementById("object_status").innerHTML = object_name+" notfound";}
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoded);
    document.getElementById("status").innerHTML = "Status: Decting objects";
    object_name = document.getElementById("object_name").value;
}
