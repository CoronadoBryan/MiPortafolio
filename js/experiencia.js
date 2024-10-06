// Importar funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAa6DWSdE6uD6QF_L8qfCkFNwwWqkuB4AY",
    authDomain: "mi-portafolio-1c005.firebaseapp.com",
    databaseURL: "https://mi-portafolio-1c005-default-rtdb.firebaseio.com",
    projectId: "mi-portafolio-1c005",
    storageBucket: "mi-portafolio-1c005.appspot.com",
    messagingSenderId: "675487166976",
    appId: "1:675487166976:web:fdd54505d6682e76ea9ee5",
    measurementId: "G-H5FNZ5RWD4"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Obtener y mostrar datos de estudios
const estudiosContainer = document.querySelector('.estudios-container');
const estudiosRef = ref(database, 'estudios');

onValue(estudiosRef, (snapshot) => {
    const estudios = snapshot.val();
    estudiosContainer.innerHTML = ''; // Limpiar contenido existente

    estudios.forEach((estudio) => {
        estudiosContainer.innerHTML += `
            <div class="row g-0 resume-lines__item animate-in-up">
                <div class="col-12 col-md-2">
                    <span class="resume-lines__date animate-in-up">${estudio.año_inicio} - ${estudio.año_fin}</span>
                </div>
                <div class="col-12 col-md-5">
                    <h5 class="resume-lines__title animate-in-up">${estudio.nombre_estudio}</h5>
                    <p class="resume-lines__source animate-in-up">
                        cursado en <a href="#0" class="text-link-bold" target="_blank">${estudio.lugar_estudio}</a>
                    </p>
                </div>
                <div class="col-12 col-md-5">
                    <p class="small resume-lines__descr animate-in-up">${estudio.descripcion}</p>
                </div>
            </div>`;
    });
});

// Obtener y mostrar datos de experiencias
const experienciasContainer = document.querySelector('.experiencias-container');
const experienciasRef = ref(database, 'experiencias');

onValue(experienciasRef, (snapshot) => {
    const experiencias = snapshot.val();
    experienciasContainer.innerHTML = ''; // Limpiar contenido existente

    experiencias.forEach((experiencia) => {
        experienciasContainer.innerHTML += `
            <div class="row g-0 resume-lines__item animate-in-up">
                <div class="col-12 col-md-2">
                    <span class="resume-lines__date animate-in-up">${experiencia.año_inicio} - ${experiencia.año_fin}</span>
                </div>
                <div class="col-12 col-md-5">
                    <h5 class="resume-lines__title animate-in-up">${experiencia.nombre_experiencia}</h5>
                    <p class="resume-lines__source animate-in-up">
                        en <a href="#0" class="text-link-bold" target="_blank">${experiencia.lugar_experiencia}</a>
                    </p>
                </div>
                <div class="col-12 col-md-5">
                    <p class="small resume-lines__descr animate-in-up">${experiencia.descripcion}</p>
                </div>
            </div>`;
    });
});

// Obtener y mostrar datos de herramientas
const toolsContainer = document.querySelector('.tools-container');
const toolsRef = ref(database, 'tools');

onValue(toolsRef, (snapshot) => {
    const tools = snapshot.val();
    toolsContainer.innerHTML = ''; // Limpiar contenido existente

    tools.forEach((tool) => {
        toolsContainer.innerHTML += `
            <div class="tools-cards__item d-flex grid-item-s animate-card-5">
                <div class="tools-cards__card">
                    <img class="tools-cards__icon animate-in-up" src="${tool.icon_url}" alt="${tool.nombre_tool}" />
                    <h6 class="tools-cards__caption animate-in-up">${tool.nombre_tool}</h6>
                </div>
            </div>`;
    });
});