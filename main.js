song1 = "";
song2 = "";

rightWrisrtX = 0;
rightWrisrtY = 0;

leftWrisrtX = 0;
leftWrisrtY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Intitialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() 
{
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill('#FF0000');
    stroke('#FF0000');

    if (scoreLeftWrist > 0.2) {
        circle(leftWrisrtX, leftWrisrtY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
        }

    }
}

    function play() {
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
    }

    function play2() {
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
    }