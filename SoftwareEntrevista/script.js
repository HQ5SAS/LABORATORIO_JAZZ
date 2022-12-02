const videoButton= document.getElementById('next_bttn');
const video = document.getElementById('video_');
var texto =document.getElementById('pregunta_txt');
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
var transcripcion="";

let mediaRecorder;
//función que acutua de forma secuencial para el btn, 
videoButton.onclick=()=>{
    console.log(videoButton.textContent);
    
    switch(videoButton.textContent){
        case 'Listo':
            videoButton.textContent ='Siguiente';
            texto.style.marginTop="40%";
            texto.textContent=preguntas[0];
            texto.style.fontSize= "250%"
            startRecording();
            recognition.start();
            nuPregunta=preguntas[0]
            readTxt(nuPregunta);
            break;
        case 'Siguiente':
            countPreguntas ++;
            if(countPreguntas<preguntas.length)
            {
                nuPregunta=preguntas[countPreguntas];
                texto.textContent=nuPregunta;
                readTxt(nuPregunta);
            }
            else if (countPreguntas==preguntas.length)
            {
                stopRecording();
                videoButton.style.display='none'; 
                recognition.abort();   
                texto.style.fontSize= "150%"
                texto.textContent = texto.textContent="¡Muchas gracias por completar la entrevista! proximamente te contactaremos para informarte del proceso."; 
                console.log(transcripcion);   
            }   
    }
}
//solicita el acceso de audio y video desde la pag web
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
//fn que inicia cámara
function startWebCamera(stream) 
{
    video.srcObject.volume
    video.srcObject = stream;
    window.stream = stream;
}
//fn que inicia grabación del video
function startRecording(){
    if (video.srcObject===null){
        video.srcObject =  window.stream;
    }
    mediaRecorder= new MediaRecorder(window.stream,{mimeType:'video/webm;codecs=vp9'});
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordVideo;
}
//fn que almacena el video
function recordVideo(event){
    if (event.data && event.data.size > 0){
        video.srcObject=null;
        let videoUrl=URL.createObjectURL(event.data);
        video.src=videoUrl;
    }
}
//fn que detine el video
function stopRecording(){
    mediaRecorder.stop();
}
//inicializa la camara
init();
//------section transcripcion video
//-verificar acceso a API
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang='es-ES';
    recognition.continuous =true;
    recognition.interimResults = false;

  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
  recognition.onresult = (event) => {
    const results = event.results;
    const frase=results[results.length-1][0].transcript;
    transcripcion += frase;

  }
  //--lectura de texto
  function readTxt(txt){
    const hablar = new SpeechSynthesisUtterance();
    hablar.text = txt;
    hablar.volume =1;
    hablar.rate =1;
    hablar.pitch = 1;
    window.speechSynthesis.speak(hablar);

  }