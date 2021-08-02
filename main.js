status = "";
video = "";
objects = [];
function setup() {
    canvas = createCanvas(280, 230);
    canvas.position(500, 150);
    video = createCapture(VIDEO);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    objectName = document.getElementById("objectName").value;
}
function modelLoaded() {
    console.log("COCO Ssd is initialized");
    status = true;
}
function draw() {
    image(video, 0, 0, 280, 230);
    if (status != "") {
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            stroke(r, g, b);
            noFill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == objectName) {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectStatus").innerHTML = objectName + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName + "Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("objectStatus").innerHTML = objectName + " Not Found";
            }
        }
    }
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}