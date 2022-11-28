const videoButton= document.getElementById('video_bttn');
const video = document.getElementById('video_');

let mediaRecorder;

videoButton.onclick=()=>{
    console.log(videoButton.textContent);
    switch(videoButton.textContent){
        case 'Grabar':
            videoButton.textContent ='Detener';
            startRecording();
            break;
        case 'Detener':
            videoButton.textContent='Grabar';
            stopRecording();
            break;    
    }
}

async function init(){
    try {
        const stream = await navigator.mediaDevices.getUserMedia(
            {
                audio: true,
                video: true
            }
        );
        startWebCamera(stream);
    }
    catch(e){
        console.log("Error con el dispositivo de video");
        console.log(e);
    }
    
}

function startWebCamera(stream) 
{
    video.srcObject = stream;
    window.stream = stream;
}

function startRecording(){
    console.log('init recordong')
    if (video.srcObject===null){
        video.srcObject =  window.stream;
    }
    mediaRecorder= new MediaRecorder(window.stream,{mimeType:'video/webm;codecs=vp9'});
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordVideo;
}

function recordVideo(event){
    if (event.data && event.data.size > 0){
        video.srcObject=null;
        let videoUrl=URL.createObjectURL(event.data);
        video.src=videoUrl;
    }
}
function stopRecording(){
    mediaRecorder.stop();
}
init();