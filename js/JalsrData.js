
  // Importar funciones necesarias de Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  import {
    getDatabase,
    ref,
    onValue,
  } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

  // Configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAa6DWSdE6uD6QF_L8qfCkFNwwWqkuB4AY",
    authDomain: "mi-portafolio-1c005.firebaseapp.com",
    databaseURL: "https://mi-portafolio-1c005-default-rtdb.firebaseio.com",
    projectId: "mi-portafolio-1c005",
    storageBucket: "mi-portafolio-1c005.appspot.com",
    messagingSenderId: "675487166976",
    appId: "1:675487166976:web:fdd54505d6682e76ea9ee5",
    measurementId: "G-H5FNZ5RWD4",
  };

  // Inicializar Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Función para cargar las experiencias desde Firebase
  function loadExperiencias() {
    const experienciasRef = ref(database, "experiencias");

    onValue(experienciasRef, (snapshot) => {
      const experiencias = snapshot.val();
      const experienciasContainer = document.querySelector("#experience-section"); // Selector del contenedor en el HTML

      // Limpiar contenido existente
      experienciasContainer.innerHTML = "";

      for (let id in experiencias) {
        const experiencia = experiencias[id];

        // Crear el elemento HTML para cada experiencia
        const div = document.createElement("div");
        div.classList.add("row", "g-0", "resume-lines__item", "animate-in-up");

        div.innerHTML = `
          <div class="col-12 col-md-2">
            <span class="resume-lines__date animate-in-up">${experiencia.añoInicio} - ${experiencia.añoFin}</span>
          </div>
          <div class="col-12 col-md-5">
            <h5 class="resume-lines__title animate-in-up">${experiencia.titulo}</h5>
            <p class="resume-lines__source animate-in-up">
              en
              <a href="#0" class="text-link-bold">${experiencia.lugar}</a>
            </p>
          </div>
          <div class="col-12 col-md-5">
            <p class="small resume-lines__descr animate-in-up">${experiencia.descripcion}</p>
          </div>
        `;

        experienciasContainer.appendChild(div);
      }
    });
  }

  // Función para cargar los estudios desde Firebase
  function loadEstudios() {
    const estudiosRef = ref(database, "estudios");

    onValue(estudiosRef, (snapshot) => {
      const estudios = snapshot.val();
      const estudiosContainer = document.querySelector("#education-section"); // Selector del contenedor en el HTML

      // Limpiar contenido existente
      estudiosContainer.innerHTML = "";

      for (let id in estudios) {
        const estudio = estudios[id];

        // Crear el elemento HTML para cada estudio
        const div = document.createElement("div");
        div.classList.add("row", "g-0", "resume-lines__item", "animate-in-up");

        div.innerHTML = `
          <div class="col-12 col-md-2">
            <span class="resume-lines__date animate-in-up">${estudio.añoInicio} - ${estudio.añoFin}</span>
          </div>
          <div class="col-12 col-md-5">
            <h5 class="resume-lines__title animate-in-up">${estudio.titulo}</h5>
            <p class="resume-lines__source animate-in-up">
              cursado en
              <a href="#0" class="text-link-bold">${estudio.lugar}</a>
            </p>
          </div>
          <div class="col-12 col-md-5">
            <p class="small resume-lines__descr animate-in-up">${estudio.descripcion}</p>
          </div>
        `;

        estudiosContainer.appendChild(div);
      }
    });
  }


  // Llamar a las funciones para cargar las secciones
  document.addEventListener("DOMContentLoaded", () => {
    loadExperiencias();
    loadEstudios();
  });

