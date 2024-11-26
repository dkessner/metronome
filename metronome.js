//
// eight_count.js
//


let bpm = 80;

let audioIn;
let amp;

let level_max = 0;


function initializeAudioIn() 
{
    console.log("Initializing audio input.");
    userStartAudio();
    audioIn = new p5.AudioIn();
    audioIn.start();

    amp = new p5.Amplitude();
    amp.setInput(audioIn);
}



function setup() 
{
    createCanvas(400, 400);
    initializeAudioIn();
}


function get_time_value() 
{
    let t = millis() / 1000.0 / 60; // time in minutes
    let beats = t * bpm * 4;            // number of beats
    return beats%8;                 // return value in [0,8)
}


function draw() 
{
    background(0);

    const left = width * .1;
    const right = width * .9;

    // axis and beat markers

    stroke(255);
    line(left, width/2, right, width/2);

    for (let i=0; i<=8; i++)
    {
        let x = map(i, 0, 8, left, right);
        fill(128);
        stroke(128);
        ellipse(x, width/2, 10, 10);
        if (i%2 == 0)
        {
            line(x, 0, x, height);
        }
    }

    // cursor

    let t = get_time_value();
    let x = map(t, 0, 8, left, right);

    let level = amp.getLevel();
    if (level_max < level)
        level_max = level;

    if (level < .1) level = .1;
    let y = height/4 + map(level, .1, .2, 0, -width*.25);

    fill(255);
    text(level, width/2, height*.75);

    fill(255);
    ellipse(x, y, 50, 50);

    stroke(255);
    line(x, 0, x, height);

}
