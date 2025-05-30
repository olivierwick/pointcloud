let drop_zone;
let arrowImage1, arrowImage2, arrowImage3, arrowImage4;
let shape, geom;
let input, img;
let modelIsLoaded = false;

let animateMode = false;
let sinYMode = false;
let tanYMode = false;
let sinXMode = false;
let tanXMode = false;
let noiseMode = false;
let newModel = false;
let sizeMode = false;
let orbitDrag = true;
let orthoMode = false;
let resetDouble = false;

let saveButtonAnim;
let pointAmount = 1;

let sliderSizeX = 3, sliderSizeY = 3, sliderSizeZ = 3, sliderPointSize = 0;
let sliderWave1 = 0.2, sliderWave2 = 0.2, sliderWave3 = 0.2, sliderWave4 = 0.2, sliderWaveHeight = 3, sliderNoise = 0;
let rotateModel = false;
let rotationAngle = 0; 
let wave = 0.1;
let perlinNoise = 0;

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let stream;

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);

    background(0, 255, 0);
    
    initializeVideoCapture();

    dropZone = select('#drop_zone');

    arrowImage1 = select('#arrow-image1');
    arrowImage2 = select('#arrow-image2');
    arrowImage3 = select('#arrow-image3');
    arrowImage4 = select('#arrow-image4');
    titlePoint = select('#title-point');

    objText = select('#obj-text');
    animateText = select('#animate-text');
    disableText = select('#disable-text');

    wave1Text = select('#wave-1');
    wave2Text = select('#wave-2');
    wave3Text = select('#wave-3');
    wave4Text = select('#wave-4');
    waveHeight = select('#wave-height');
    waveFrequency = select('#wave-button');
    noiseText = select('#noise');

    rotateAnim = select('#rotate-anim');
    disableText2 = select('#disable-text2');
    resetButton = select('#reset');
    randomButton = select('#random');
    orthoButton = select('#ortho');
    disableText4 = select('#disable-text4');

    sizeX = select('#sizeX');
    sizeY = select('#sizeY');
    sizeZ = select('#sizeZ');
    pointSize = select('#pointsize');
    sizeGeneral = select('#size-general')
    disableText3 = select('#disable-text3');

    exportVideo = select('#export-video');
    stopVideo = select('#export-stop');
    exportImg = select('#export-img');

    initializeCustomSliders();

    const originalTransforms = {
      arrow1: 'translateX(0)', 
      arrow2: 'rotate(90deg)',
      arrow3: 'rotate(180deg)',
      arrow4: 'rotate(270deg)'
    };

    dropZone.dragOver(() => {
        arrowImage1.style('transform', originalTransforms.arrow1 + ' translateX(30px)');
        arrowImage2.style('transform', originalTransforms.arrow2 + ' translateX(30px)');
        arrowImage3.style('transform', originalTransforms.arrow3 + ' translateX(30px)');
        arrowImage4.style('transform', originalTransforms.arrow4 + ' translateX(30px)');

        arrowImage1.style('visibility', 'visible');
        arrowImage2.style('visibility', 'visible');
        arrowImage3.style('visibility', 'visible');
        arrowImage4.style('visibility', 'visible');

        objText.style('font-style', 'italic');
        objText.style('visibility', 'visible');

        titlePoint.style('visibility', 'hidden');
        animateText.style('visibility', 'hidden');
        disableText.style('visibility', 'hidden');
        rotateAnim.style('visibility', 'hidden');
        disableText2.style('visibility', 'hidden');
        resetButton.style('visibility', 'hidden');
        randomButton.style('visibility', 'hidden');
        orthoButton.style('visibility', 'hidden');
        disableText4.style('visibility', 'hidden');
        exportVideo.style('visibility', 'hidden');
        exportImg.style('visibility', 'hidden');
        sizeX.style('visibility', 'hidden');
        document.querySelector('.box').style.visibility = 'hidden';
        sizeY.style('visibility', 'hidden');
        document.querySelector('.box2').style.visibility = 'hidden';
        sizeZ.style('visibility', 'hidden');
        document.querySelector('.box3').style.visibility = 'hidden';
        pointSize.style('visibility', 'hidden');
        sizeGeneral.style('visibility', 'hidden');
        disableText3.style('visibility', 'hidden');
        document.querySelector('.box4').style.visibility = 'hidden';
        wave1Text.style('visibility', 'hidden');
        wave2Text.style('visibility', 'hidden');
        wave3Text.style('visibility', 'hidden');
        wave4Text.style('visibility', 'hidden');
        noiseText.style('visibility', 'hidden');
        waveHeight.style('visibility', 'hidden');
        waveFrequency.style('visibility', 'hidden');
        document.querySelector('.box5').style.visibility = 'hidden';
        document.querySelector('.box6').style.visibility = 'hidden';
        document.querySelector('.box7').style.visibility = 'hidden';
        document.querySelector('.box8').style.visibility = 'hidden';
        document.querySelector('.box9').style.visibility = 'hidden';
        document.querySelector('.box10').style.visibility = 'hidden';

        newModel = false;
    });

    dropZone.dragLeave(() => {
        arrowImage1.style('transform', originalTransforms.arrow1);
        arrowImage2.style('transform', originalTransforms.arrow2);
        arrowImage3.style('transform', originalTransforms.arrow3);
        arrowImage4.style('transform', originalTransforms.arrow4);
        objText.style('font-style', 'normal');

        newModel = false;
    });
        
    dropZone.drop((file) => {
        arrowImage1.style('visibility', 'hidden');
        arrowImage2.style('visibility', 'hidden');
        arrowImage3.style('visibility', 'hidden');
        arrowImage4.style('visibility', 'hidden');
        objText.style('visibility', 'hidden');
        titlePoint.style('visibility', 'visible');
        animateText.style('visibility', 'visible');
        rotateAnim.style('visibility', 'visible');
        resetButton.style('visibility', 'visible');
        randomButton.style('visibility', 'visible');
        exportVideo.style('visibility', 'visible');
        exportImg.style('visibility', 'visible');
        sizeGeneral.style('visibility', 'visible'); 
        orthoButton.style('visibility', 'visible'); 

        document.querySelector('.input-range').value = 3;
        document.querySelector('.input-range2').value = 3;
        document.querySelector('.input-range3').value = 3;
        document.querySelector('.input-range4').value = 0.2;
        document.querySelector('.input-range5').value = 0.2;
        document.querySelector('.input-range6').value = 0.2;
        document.querySelector('.input-range7').value = 3;
        document.querySelector('.input-range8').value = 0;
        document.querySelector('.input-range9').value = 0;
        document.querySelector('.input-range10').value = 0.2;
        sliderPointSize = 0.1;
        sliderWave1 = 0.2;
        sliderWave2 = 0.2;
        sliderWave3 = 0.2;
        sliderWave4 = 0.2;
        sliderWaveHeight = 3;
        sliderNoise = 0;

        orthoMode = false;
        animateMode = false;
        rotateModel= false;
        newModel = true;
        sizeMode = false;
        rotationAngle = 0; 
        wave = 0.1;
        
        readFile(file);
    });

    animateText.mouseOver(() => animateText.style('font-style', 'italic'))
            .mouseOut(() => animateText.style('font-style', 'normal'))
            .mousePressed(() => {
                disableText.style('visibility', 'visible');
                animateText.style('visibility', 'hidden');
                wave1Text.style('visibility', 'visible');
                waveHeight.style('visibility', 'visible');
                noiseText.style('visibility', 'visible');
                waveFrequency.style('visibility', 'visible');
                document.querySelector('.box4').style.visibility = 'visible';
                document.querySelector('.box7').style.visibility = 'visible';
                document.querySelector('.box9').style.visibility = 'visible';

                animateMode = true;
                noiseMode = true;
                sinYMode = true;
                tanYMode = false;
                sinXMode = false;
                tanXMode = false;
            });

    disableText.mouseOver(() => disableText.style('font-style', 'italic'))
            .mouseOut(() => disableText.style('font-style', 'normal'))
            .mousePressed(() => {
                animateText.style('visibility', 'visible');
                disableText.style('visibility', 'hidden');
                wave1Text.style('visibility', 'hidden');
                wave2Text.style('visibility', 'hidden');
                wave3Text.style('visibility', 'hidden');
                wave4Text.style('visibility', 'hidden');
                waveHeight.style('visibility', 'hidden');
                waveFrequency.style('visibility', 'hidden');
                document.querySelector('.box4').style.visibility = 'hidden';
                document.querySelector('.box5').style.visibility = 'hidden';
                document.querySelector('.box6').style.visibility = 'hidden';
                document.querySelector('.box7').style.visibility = 'hidden';
                document.querySelector('.box9').style.visibility = 'hidden';
                document.querySelector('.box10').style.visibility = 'hidden';
                noiseText.style('visibility', 'hidden');

                animateMode = false;
                noiseMode = false;
                sinMode = false;
                tanMode = false;
                cosMode = false;

                document.querySelector('.input-range4').value = 0.2;
                document.querySelector('.input-range5').value = 0.2;
                document.querySelector('.input-range6').value = 0.2;
                document.querySelector('.input-range6').value = 0.2;
                document.querySelector('.input-range7').value = 3;
                document.querySelector('.input-range9').value = 0;
                document.querySelector('.input-range10').value = 0;

                sliderWave1 = 0.2;
                sliderWave2 = 0.2;
                sliderWave3 = 0.2;
                sliderWave4 = 0.2;
                sliderWaveHeight = 3;
                sliderNoise = 0;

            });

    wave1Text.mouseOver(() => wave1Text.style('font-style', 'italic'))
            .mouseOut(() => wave1Text.style('font-style', 'normal'))
            .mousePressed(() => {
                wave2Text.style('visibility', 'visible');
                wave1Text.style('visibility', 'hidden');
                document.querySelector('.box4').style.visibility = 'hidden';
                document.querySelector('.box5').style.visibility = 'visible';

                sinYMode = false;
                tanYMode = true;
                sinXMode = false;
                tanXMode = false;

                sliderWaveHeight = 3;
                document.querySelector('.input-range7').value = 3;

                const slider = document.querySelector('.input-range4');
                slider.value = 0.2;
                slider.dispatchEvent(new Event('input')); 

            });

    wave2Text.mouseOver(() => wave2Text.style('font-style', 'italic'))
            .mouseOut(() => wave2Text.style('font-style', 'normal'))
            .mousePressed(() => {
                wave3Text.style('visibility', 'visible');
                wave2Text.style('visibility', 'hidden');
                document.querySelector('.box5').style.visibility = 'hidden';
                document.querySelector('.box6').style.visibility = 'visible';

                sinYMode = false;
                tanYMode = false;
                sinXMode = true;
                tanXMode = false;

                sliderWaveHeight = 3;
                document.querySelector('.input-range7').value = 3;

                const slider = document.querySelector('.input-range5');
                slider.value = 0.2;
                slider.dispatchEvent(new Event('input')); 
            });

    wave3Text.mouseOver(() => wave3Text.style('font-style', 'italic'))
            .mouseOut(() => wave3Text.style('font-style', 'normal'))
            .mousePressed(() => {
                wave4Text.style('visibility', 'visible');
                wave3Text.style('visibility', 'hidden');
                document.querySelector('.box10').style.visibility = 'visible';
                document.querySelector('.box6').style.visibility = 'hidden';

                sinYMode = false;
                tanYMode = false;
                sinXMode = false;
                tanXMode = true;

                sliderWaveHeight = 3;
                document.querySelector('.input-range7').value = 3;

                const slider = document.querySelector('.input-range6');
                slider.value = 0.2;
                slider.dispatchEvent(new Event('input')); 
            });

    wave4Text.mouseOver(() => wave4Text.style('font-style', 'italic'))
            .mouseOut(() => wave4Text.style('font-style', 'normal'))
            .mousePressed(() => {
                wave1Text.style('visibility', 'visible');
                wave4Text.style('visibility', 'hidden');
                document.querySelector('.box4').style.visibility = 'visible';
                document.querySelector('.box10').style.visibility = 'hidden';

                sinYMode = true;
                tanYMode = false;
                sinXMode = false;
                tanXMode = false;

                sliderWaveHeight = 3;
                document.querySelector('.input-range7').value = 3;

                const slider = document.querySelector('.input-range10');
                slider.value = 0.2;
                slider.dispatchEvent(new Event('input')); 
            });

            resetButton.mouseOver(() => resetButton.style('font-style', 'italic'))
            .mouseOut(() => resetButton.style('font-style', 'normal'))
            .mousePressed(() => {
    
                if (!resetDouble) {

                    document.querySelector('.input-range').value = 3;
                    document.querySelector('.input-range2').value = 3;
                    document.querySelector('.input-range3').value = 3;
                    document.querySelector('.input-range4').value = 0.2;
                    document.querySelector('.input-range5').value = 0.2;
                    document.querySelector('.input-range6').value = 0.2;
                    document.querySelector('.input-range10').value = 0.2;
                    document.querySelector('.input-range7').value = 3;
                    document.querySelector('.input-range8').value = 0;
                    document.querySelector('.input-range9').value = 0;
                    
                    sliderSizeX = 3;
                    sliderSizeY = 3;
                    sliderSizeZ = 3;
                    sliderWave1 = 0.2;
                    sliderWave2 = 0.2;
                    sliderWave3 = 0.2;
                    sliderWave4 = 0.2;
                    sliderWaveHeight = 3;
                    sliderPointSize = 0;
                    sliderNoise = 0;
    
                    resetDouble = true;
                }
                else if (
                    sliderSizeX === 3 && 
                    sliderSizeY === 3 && 
                    sliderSizeZ === 3 && 
                    sliderPointSize === 0 && 
                    sliderWave1 === 0.2 && 
                    sliderWave2 === 0.2 && 
                    sliderWave3 === 0.2 && 
                    sliderWave4 === 0.2 && 
                    sliderWaveHeight === 3 && 
                    sliderNoise === 0 && 
                    resetDouble
                ) {

                    sizeX.style('visibility', 'hidden');
                    sizeY.style('visibility', 'hidden');
                    sizeZ.style('visibility', 'hidden');
                    sizeGeneral.style('visibility', 'visible');
                    pointSize.style('visibility', 'hidden');
                    disableText3.style('visibility', 'hidden');
                    animateText.style('visibility', 'visible');
                    disableText.style('visibility', 'hidden');
                    wave1Text.style('visibility', 'hidden');
                    wave2Text.style('visibility', 'hidden');
                    wave3Text.style('visibility', 'hidden');
                    wave4Text.style('visibility', 'hidden');
                    waveHeight.style('visibility', 'hidden');
                    waveFrequency.style('visibility', 'hidden');
                    document.querySelector('.box').style.visibility = 'hidden';
                    document.querySelector('.box2').style.visibility = 'hidden';
                    document.querySelector('.box3').style.visibility = 'hidden';
                    document.querySelector('.box4').style.visibility = 'hidden';
                    document.querySelector('.box5').style.visibility = 'hidden';
                    document.querySelector('.box6').style.visibility = 'hidden';
                    document.querySelector('.box7').style.visibility = 'hidden';
                    document.querySelector('.box8').style.visibility = 'hidden';
                    document.querySelector('.box9').style.visibility = 'hidden';
                    document.querySelector('.box10').style.visibility = 'hidden';
                    noiseText.style('visibility', 'hidden');

                    animateMode = false;
                    noiseMode = false;
                    sinYMode = false;
                    sinXMode = false;
                    tanYMode = false;
                    tanXMode = false;
                    resetDouble = false;
                    sizeMode = false;
                    rotateModel = false;
                    orthoMode = false;

                    rotationAngle = 0;
                }

                rotateAnim.style('visibility', 'visible');
                disableText2.style('visibility', 'hidden');
                orthoButton.style('visibility', 'visible');
                disableText4.style('visibility', 'hidden');
            });

    rotateAnim.mouseOver(() => rotateAnim.style('font-style', 'italic'))
            .mouseOut(() => rotateAnim.style('font-style', 'normal'))
            .mousePressed(() => {
                disableText2.style('visibility', 'visible');
                rotateAnim.style('visibility', 'hidden');
                rotateModel = true;
            });

    disableText2.mouseOver(() => disableText2.style('font-style', 'italic'))
            .mouseOut(() => disableText2.style('font-style', 'normal'))
            .mousePressed(() => {
                rotateAnim.style('visibility', 'visible');
                disableText2.style('visibility', 'hidden');
                rotateModel = false;
            });

    randomButton.mouseOver(() => randomButton.style('font-style', 'italic'))
            .mouseOut(() => randomButton.style('font-style', 'normal'))
            .mousePressed(() => {

                if (animateMode) {
                        if (sinYMode) {
                    document.querySelector('.input-range4').value = random(0, 10);
                    sliderWave1 = parseFloat(document.querySelector('.input-range4').value);
                        }
                        if (tanYMode) {
                    document.querySelector('.input-range5').value = random(0, 10);
                    sliderWave2 = parseFloat(document.querySelector('.input-range5').value);
                        }
                        if (sinXMode) {
                    document.querySelector('.input-range6').value = random(0, 10);
                    sliderWave3 = parseFloat(document.querySelector('.input-range6').value);
                        }
                        if (tanXMode) {
                    document.querySelector('.input-range10').value = random(0, 10);
                    sliderWave4 = parseFloat(document.querySelector('.input-range10').value);
                        }
                    document.querySelector('.input-range7').value = random(0, 20);
                    document.querySelector('.input-range9').value = random(0, 10);
                    sliderWaveHeight = parseFloat(document.querySelector('.input-range7').value);
                    sliderNoise = parseFloat(document.querySelector('.input-range9').value);

                }

                if (sizeMode) {
                    document.querySelector('.input-range').value = random(0, 10);
                    document.querySelector('.input-range2').value = random(0, 10);
                    document.querySelector('.input-range3').value = random(0, 10);
                    document.querySelector('.input-range8').value = random(0, 10);
                    sliderSizeX = parseFloat(document.querySelector('.input-range').value);
                    sliderSizeY = parseFloat(document.querySelector('.input-range2').value);
                    sliderSizeZ = parseFloat(document.querySelector('.input-range3').value);
                    sliderPointSize = parseFloat(document.querySelector('.input-range8').value);
                }  
            });

    sizeGeneral.mouseOver(() => sizeGeneral.style('font-style', 'italic'))
    .mouseOut(() => sizeGeneral.style('font-style', 'normal'))
    .mousePressed(() => {
        disableText3.style('visibility', 'visible');
        sizeGeneral.style('visibility', 'hidden');

        sizeX.style('visibility', 'visible');
        document.querySelector('.box').style.visibility = 'visible';
        sizeY.style('visibility', 'visible');
        document.querySelector('.box2').style.visibility = 'visible';
        sizeZ.style('visibility', 'visible');
        document.querySelector('.box3').style.visibility = 'visible';
        document.querySelector('.box8').style.visibility = 'visible';
        pointSize.style('visibility', 'visible');

        sizeMode = true;
    });

    disableText3.mouseOver(() => disableText3.style('font-style', 'italic'))
    .mouseOut(() => disableText3.style('font-style', 'normal'))
    .mousePressed(() => {
        disableText3.style('visibility', 'hidden');
        sizeGeneral.style('visibility', 'visible');

        sizeX.style('visibility', 'hidden');
        document.querySelector('.box').style.visibility = 'hidden';
        sizeY.style('visibility', 'hidden');
        document.querySelector('.box2').style.visibility = 'hidden';
        sizeZ.style('visibility', 'hidden');
        document.querySelector('.box3').style.visibility = 'hidden';
        document.querySelector('.box8').style.visibility = 'hidden';
        pointSize.style('visibility', 'hidden');
        document.querySelector('.input-range').value = 3;
        document.querySelector('.input-range2').value = 3;
        document.querySelector('.input-range3').value = 3;
        document.querySelector('.input-range8').value = 0.1;
        sliderPointSize = 0.1;

        sizeMode = false;

    });

    exportVideo.mouseOver(() => exportVideo.style('font-style', 'italic'))
            .mouseOut(() => exportVideo.style('font-style', 'normal'))
            .mousePressed(() => {
                startVideoCapture();

                animateText.style('visibility', 'hidden');
                rotateAnim.style('visibility', 'hidden');
                resetButton.style('visibility', 'hidden');
                randomButton.style('visibility', 'hidden');
                exportVideo.style('visibility', 'hidden');
                exportImg.style('visibility', 'hidden');
                sizeX.style('visibility', 'hidden');
                disableText.style('visibility', 'hidden');
                disableText2.style('visibility', 'hidden');
                sizeGeneral.style('visibility', 'hidden');
                disableText3.style('visibility', 'hidden');
                orthoButton.style('visibility', 'hidden');
                disableText4.style('visibility', 'hidden');
                document.querySelector('.box').style.visibility = 'hidden';
                sizeY.style('visibility', 'hidden');
                document.querySelector('.box2').style.visibility = 'hidden';
                sizeZ.style('visibility', 'hidden');
                document.querySelector('.box3').style.visibility = 'hidden';
                pointSize.style('visibility', 'hidden');
                document.querySelector('.box4').style.visibility = 'hidden';
                document.querySelector('.box5').style.visibility = 'hidden';
                document.querySelector('.box6').style.visibility = 'hidden';
                document.querySelector('.box7').style.visibility = 'hidden';
                document.querySelector('.box8').style.visibility = 'hidden';
                document.querySelector('.box9').style.visibility = 'hidden';
                wave1Text.style('visibility', 'hidden');
                wave2Text.style('visibility', 'hidden');
                wave3Text.style('visibility', 'hidden');
                waveHeight.style('visibility', 'hidden');
                noiseText.style('visibility', 'hidden');
            });

    document.querySelectorAll('[class^="input-range"]').forEach(input => {

                input.addEventListener('mousedown', () => orbitDrag = false);
                input.addEventListener('mouseup', () => orbitDrag = true);

              });
    
    orthoButton.mouseOver(() => orthoButton.style('font-style', 'italic'))
              .mouseOut(() => orthoButton.style('font-style', 'normal'))
              .mousePressed(() => {
                disableText4.style('visibility', 'visible');
                orthoButton.style('visibility', 'hidden');
                orthoMode = true;
              });

    disableText4.mouseOver(() => disableText4.style('font-style', 'italic'))
              .mouseOut(() => disableText4.style('font-style', 'normal'))
              .mousePressed(() => {
                disableText4.style('visibility', 'hidden');
                orthoButton.style('visibility', 'visible');
                orthoMode = false;

                document.querySelector('.input-range').value = 3;
                document.querySelector('.input-range2').value = 3;
                document.querySelector('.input-range3').value = 3;
                document.querySelector('.input-range8').value = 0.1;
                sliderSizeX = 3;
                sliderSizeY = 3;
                sliderSizeZ = 3;
                sliderPointSize = 0.1;
              });          

    

    // Stop Video Button
    stopVideo.mouseOver(() => stopVideo.style('font-style', 'italic'))
            .mouseOut(() => stopVideo.style('font-style', 'normal'))
            .mousePressed(() => {
                stopVideoCapture();

                resetButton.style('visibility', 'visible');
                randomButton.style('visibility', 'visible');
                exportVideo.style('visibility', 'visible');
                exportImg.style('visibility', 'visible');

                if (animateMode) {
                    disableText.style('visibility', 'visible');
                    if (sinMode) {
                        document.querySelector('.box4').style.visibility = 'visible';
                        wave1Text.style('visibility', 'visible')
                    }
                    if (tanMode) {
                        document.querySelector('.box5').style.visibility = 'visible';
                        wave2Text.style('visibility', 'visible')
                    }

                    if (cosMode) {
                        document.querySelector('.box6').style.visibility = 'visible';
                        wave3Text.style('visibility', 'visible')
                    }
                    document.querySelector('.box7').style.visibility = 'visible';
                    document.querySelector('.box9').style.visibility = 'visible';
                    waveHeight.style('visibility', 'visible');
                    noiseText.style('visibility', 'visible');
                }
                else if (!animateMode){
                    animateText.style('visibility', 'visible');
                    document.querySelector('.box4').style.visibility = 'hidden';
                    document.querySelector('.box5').style.visibility = 'hidden';
                    document.querySelector('.box6').style.visibility = 'hidden';
                    document.querySelector('.box7').style.visibility = 'hidden';
                    document.querySelector('.box9').style.visibility = 'hidden';
                }

                if (rotateModel) {
                    disableText2.style('visibility', 'visible');
                }
                if (!rotateModel) {
                    rotateAnim.style('visibility', 'visible');
                }

                if (sizeMode) {
                    disableText3.style('visibility', 'visible');
                    sizeX.style('visibility', 'visible');
                    document.querySelector('.box').style.visibility = 'visible';
                    sizeY.style('visibility', 'visible');
                    document.querySelector('.box2').style.visibility = 'visible';
                    sizeZ.style('visibility', 'visible');
                    document.querySelector('.box3').style.visibility = 'visible';
                    pointSize.style('visibility', 'visible');
                    document.querySelector('.box8').style.visibility = 'visible';
                }
                if (!sizeMode) {
                    sizeGeneral.style('visibility', 'visible');
                }
            });

    exportImg.mouseOver(() => exportImg.style('font-style', 'italic'))
            .mouseOut(() => exportImg.style('font-style', 'normal'))
            .mousePressed(() => {
                save('pointcloud_screenshot.png');
            });
    
}














// Neue, robuste Video-Capture Implementierung
function initializeVideoCapture() {
    try {
        // Canvas-Stream erstellen
        const canvasElement = document.querySelector('canvas');
        if (canvasElement) {
            stream = canvasElement.captureStream(30); // 30 FPS
        }
    } catch (error) {
        console.warn('Canvas-Stream nicht verfügbar:', error);
    }
}

function startVideoCapture() {
    if (isRecording) return;
    
    try {
        const canvasElement = document.querySelector('canvas');
        
        stream = canvasElement.captureStream(30);
        recordedChunks = [];
        
        let options = { mimeType: 'video/webm;codecs=vp9' };
        
        // Fallback für verschiedene Browser
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/webm;codecs=vp8' };
        }
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/webm' };
        }
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/mp4' };
        }
        
        mediaRecorder = new MediaRecorder(stream, options);
        
        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = function() {
            try {
                const blob = new Blob(recordedChunks, {
                    type: mediaRecorder.mimeType || 'video/webm'
                });
                
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                
                // Dateiname mit Timestamp
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const extension = mediaRecorder.mimeType.includes('mp4') ? 'mp4' : 'webm';
                a.download = `pointcloud_animation_${timestamp}.${extension}`;
                
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                URL.revokeObjectURL(url);
                
                console.log('Video erfolgreich gespeichert');
            } catch (error) {
                console.error('Fehler beim Speichern des Videos:', error);
            }
        };
        
        mediaRecorder.onerror = function(event) {
            console.error('MediaRecorder Fehler:', event.error);
            resetVideoCapture();
        };
        
        mediaRecorder.start(100); // Sammle Daten alle 100ms
        isRecording = true;
        
        exportVideo.style('visibility', 'hidden');
        stopVideo.style('visibility', 'visible');
        
        console.log('Video-Aufnahme gestartet mit:', mediaRecorder.mimeType);
        
    } catch (error) {
        console.error('Fehler beim Starten der Video-Aufnahme:', error);
        resetVideoCapture();
    }
}

function stopVideoCapture() {
    if (!isRecording || !mediaRecorder) return;
    
    try {
        if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
        
        isRecording = false;
        
        exportVideo.style('visibility', 'visible');
        stopVideo.style('visibility', 'hidden');
        
        // Stream-Tracks stoppen
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        console.log('Video-Aufnahme gestoppt');
        
    } catch (error) {
        console.error('Fehler beim Stoppen der Video-Aufnahme:', error);
        resetVideoCapture();
    }
}

function resetVideoCapture() {
    isRecording = false;
    
    exportVideo.style('visibility', 'visible');
    stopVideo.style('visibility', 'hidden');
    
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        try {
            mediaRecorder.stop();
        } catch (e) {
            console.warn('Konnte MediaRecorder nicht stoppen:', e);
        }
    }
    
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    mediaRecorder = null;
    recordedChunks = [];
}

















function initializeCustomSliders() {
    const sliderX = document.querySelector('.input-range');
    const sliderY = document.querySelector('.input-range2');
    const sliderZ = document.querySelector('.input-range3');
    const sliderW1 = document.querySelector('.input-range4');
    const sliderW2 = document.querySelector('.input-range5');
    const sliderW3 = document.querySelector('.input-range6');
    const sliderW4 = document.querySelector('.input-range10');
    const sliderWH = document.querySelector('.input-range7');
    const sliderPS = document.querySelector('.input-range8');
    const sliderN = document.querySelector('.input-range9');

    
    if (sliderX && sliderY && sliderZ && sliderW1 && sliderW2 && sliderW3 && sliderWH && sliderPS && sliderN && sliderW4) {

        sliderSizeX = parseFloat(sliderX.value);
        sliderSizeY = parseFloat(sliderY.value);
        sliderSizeZ = parseFloat(sliderZ.value);
        sliderWave1 = parseFloat(sliderW1.value);
        sliderWave2 = parseFloat(sliderW2.value);
        sliderWave3 = parseFloat(sliderW3.value);
        sliderWave4 = parseFloat(sliderW4.value);
        sliderWaveHeight = parseFloat(sliderWH.value);
        sliderPointSize = parseFloat(sliderPS.value);
        sliderNoise = parseFloat(sliderN.value);

        
        sliderX.addEventListener('input', () => {
            sliderSizeX = parseFloat(sliderX.value);
        });
        
        sliderY.addEventListener('input', () => {
            sliderSizeY = parseFloat(sliderY.value);
        });

        sliderZ.addEventListener('input', () => {
            sliderSizeZ = parseFloat(sliderZ.value);
        });

        sliderW1.addEventListener('input', () => {
          sliderWave1 = parseFloat(sliderW1.value);
        });

        sliderW2.addEventListener('input', () => {
        sliderWave2 = parseFloat(sliderW2.value);
        });

        sliderW3.addEventListener('input', () => {
        sliderWave3 = parseFloat(sliderW3.value);
        });

        sliderW4.addEventListener('input', () => {
            sliderWave4 = parseFloat(sliderW4.value);
          });  

        sliderWH.addEventListener('input', () => {
          sliderWaveHeight = parseFloat(sliderWH.value);
        });

        sliderPS.addEventListener('input', () => {
          sliderPointSize = parseFloat(sliderPS.value);
        });   

        sliderN.addEventListener('input', () => {
          sliderNoise = parseFloat(sliderN.value);
        });  
    }
}

function draw(){
    background(0);
   
    if (orbitDrag) {
        orbitControl();
    }

    if (orthoMode) {
        ortho();
    }
    else if (!orthoMode) {
        perspective();
    }

    

    if (rotateModel === true) {
      rotationAngle += 0.002;
    }
    

    rotateY(rotationAngle);
    
    updateCustomSliderValues();

    if(newModel && shape != null){
        if (!orthoMode) {
            scale(-sliderSizeX, -sliderSizeZ, sliderSizeY);
        }
        else if (orthoMode) {
            scale(-sliderSizeX*1.2, -sliderSizeZ*1.2, sliderSizeY*1.2);
        }

        pointAmount = 1;

        if (geom.vertices.length > 250000) {
          pointAmount = 20; 
        }
          
        beginShape(POINTS);
        for(let i = 0; i < geom.vertices.length; i++) {
            if (i % pointAmount === 0){
                let v = geom.vertices[i];
                      if (animateMode === true) {
                        if (sinYMode === true) {
                      wave = sin(v.y * sliderWave1 * 0.05 + frameCount * 0.05) * sliderWaveHeight;
                        }
                        else if (tanYMode === true) {
                            wave = tan(v.y * sliderWave2 * 0.05 + frameCount * 0.05) * sliderWaveHeight;
                              }
                        else if (sinXMode === true) {
                            wave = sin(v.x * sliderWave3 * 0.05 + frameCount * 0.05) * sliderWaveHeight;
                              }
                        else if (tanXMode === true) {
                      wave = tan(v.x * sliderWave4 * 0.05 + frameCount * 0.05) * sliderWaveHeight;
                        }
                      }

                    
                      if (noiseMode === true) {
                        let n = random (1, 100);
                        perlinNoise = noise(v.x + n + frameCount * 0.03) * sliderNoise;
                      }

                      stroke(255);
                    strokeWeight(sliderPointSize);
                    if (animateMode) {
                        vertex(v.x + wave + perlinNoise, v.y + wave + perlinNoise, v.z + wave + perlinNoise);
                    }
                    else if (!animateMode) {
                        vertex(v.x, v.y, v.z);
                    }

            }
        }
        endShape();
    }
}

function updateCustomSliderValues() {
    const sliderX = document.querySelector('.input-range');
    const sliderY = document.querySelector('.input-range2');
    const sliderZ = document.querySelector('.input-range3');
    
    if (sliderX && sliderY && sliderZ) {
        sliderSizeX = parseFloat(sliderX.value);
        sliderSizeY = parseFloat(sliderY.value);
        sliderSizeZ = parseFloat(sliderZ.value);
    }
}

function readFile(theFile){
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;

        shape = createModel(data, '.obj', true);
        geom = shape.computeFaces(); 
        print(geom.vertices.length);
        modelIsLoaded = true;
    };

    reader.readAsText(theFile);  
}

function dropHandler(ev) {
    console.log("File(s) dropped");

    ev.preventDefault();

    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();        
                readFile(file); 
            }
        });
    }
}

function dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    ev.preventDefault();
}

// Cleanup-Funktion für Browser-Refresh oder Tab-Schließen
window.addEventListener('beforeunload', function() {
    if (isRecording) {
        stopVideoCapture();
    }
});











