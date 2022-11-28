const videoButton= document.getElementById('video_bttn');
const video = document.getElementById('video');

let mediaRecorder;

videoButton.onclick=()=>{
    switch(videoButton.textContent){
        case 'Record':
            videoButton.textContent ='Stop';
            startRecording();
            break;
        case 'Stop':
            videoButton.textContent='Record';
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
    }
    catch(e){
        console.log("Error con el dispositivo de video");
    }
    
}

function startWebCemere(stream) 
{
    video.srcObject = stream;
    window.stream = stream;
}

function startRecording(){
    if (video.srcObject==null){
       video.srcObject =  window.stream;
    }
    mediaRecorder= new mediaRecorder(window,stream,{mimeType: 'video/webm/codecs=vp9,opus'});
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordvideo;
}

function recordvideo(event){
    if (event.data && event.data.size > 0){
        video.srcObject=null;
        let videoUrl=URL.createObjectURL(event.data);
        video.src=videoUrl;
    }
}