const videoButton= document.getElementById('next_bttn');
const video = document.getElementById('video_');
var texto =document.getElementById('pregunta_txt');
const cronometro = document.getElementById('timer')
var preguntas=[
    'Háblame de ti',
    '¿Qué te gusta hacer en tu tiempo libre?',
    '¿Por qué te interesa el puesto?',
    '¿Por qué dejaste tu anterior empleo? ¿Por qué quieres cambiar de empleo?',
    'Cuéntame de algún momento de tu vida laboral en el que hayas cometido un error, ¿cómo lo solucionaste?',
    '¿Cuál es tu mayor virtud o habilidad?',
    '¿Cuál es tu mayor debilidad o defecto?',
    '¿Por qué deberíamos contratarte?'
]
var countPreguntas=0;

let mediaRecorder;
//finción que acutua de forma secuencial para el btn, 
videoButton.onclick=()=>{
    console.log(videoButton.textContent);
    
    switch(videoButton.textContent){
        case 'Listo':
            videoButton.textContent ='Siguiente';
            texto.style.marginTop="40%";
            texto.textContent=preguntas[0];
            texto.style.fontSize= "300%"
            startRecording();
            cronometrar();
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
            texto.textContent="¡Muchas gracias por completar la entrevista! proximamente te contactaremos para informarte del proceso."
            videoButton.style.display='none';
            stopRecording();
            clearInterval(id);
            break;    
    }
}
//solicita el acceso de audio y video desde la pag web
async function init(){
    //inicializa cronometro en ceros )
    
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
    m = 0;
    s = 0;
    cronometro.innerHTML="00:00";
    
}
//fn que inicia cámara
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
//--Cronómetro
function cronometrar(){
    escribir();
    id = setInterval(escribir,1000);
}
function escribir(){
    var mAux, sAux;
    s++;
    if (s>59){m++;s=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}

    cronometro.innerHTML = mAux + ":" + sAux; 
 } 
//
init();