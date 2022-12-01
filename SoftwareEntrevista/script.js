const videoButton= document.getElementById('next_bttn');
const video = document.getElementById('video_');
var texto =document.getElementById('pregunta_txt');
var preguntas=[
    '1.Háblame de ti',
    '2.¿Qué te gusta hacer en tu tiempo libre?',
    '3.¿Por qué te interesa el puesto?',
    '4.¿Por qué dejaste tu anterior empleo? ¿Por qué quieres cambiar de empleo?',
    '5.Cuéntame de algún momento de tu vida laboral en el que hayas cometido un error, ¿cómo lo solucionaste?',
    '6.¿Cuál es tu mayor virtud o habilidad?',
    '7.¿Cuál es tu mayor debilidad o defecto?',
    '8.¿Por qué deberíamos contratarte?'
]
var countPreguntas=0;

let mediaRecorder;

videoButton.onclick=()=>{
    console.log(videoButton.textContent);
    
    switch(videoButton.textContent){
        case 'Listo':
            videoButton.textContent ='Siguiente';
            texto.style.marginTop="40%";
            texto.textContent=preguntas[0];
            startRecording();
            break;
        case 'Siguiente':
            countPreguntas ++;
            if(countPreguntas<preguntas.length)
            {
                texto.textContent=preguntas[countPreguntas];
            }
            else if (countPreguntas==preguntas.length)
            {
                videoButton.textContent='Finalizar';    
            }
            break;   
        case 'Finalizar':
            videoButton.textContent='Envia';
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