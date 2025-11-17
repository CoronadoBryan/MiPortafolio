let ruta = "./documents/cv.pdf"
let nombre = "cv-bryan-coronado-santi.pdf"


function Descargar_boton (ruta,nombre){
    const enlace = document.createElement("a")
    enlace.href=ruta
    enlace.download = nombre
    enlace.click()
}


const boton_descargar = document.getElementById("download-cv")
boton_descargar.addEventListener("click",function(){
    Descargar_boton(ruta,nombre);
})

const boton_descargar2 = document.getElementById("download-cv2")
boton_descargar2.addEventListener("click",function(){
    Descargar_boton(ruta,nombre);
})


