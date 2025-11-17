fetch("../../data/portafolio.json")
    .then(response=>response.json())
    .then(data=>{
        const contenedor = document.getElementById("contenedor");
        data.forEach(item=>{
            const figure = document.createElement("figure");
            figure.className="col-12 col-md-6 gallery__item grid-item animate-card-2";

            figure.innerHTML= `
                              <a
                    href="${item.imagenGrande}"
                    data-image="${item.imagenPequena}"
                    class="gallery__link"
                    itemprop="contentUrl"
                    data-size="${item.dataSize}"
                  >
                    <img
                      src="${item.imagenGrande}"
                      class="gallery__image"
                      alt="${item.alt}"
                    />
                  </a>
                  <figcaption class="gallery__descr opposite">
                    <h5 class="opposite">Descripcion</h5>
                    <div class="card__tags d-flex flex-wrap">
                        ${item.tecnologias.map(tecnologias => `<span class="rounded-tag">${tecnologias}</span>`).join('')}
                    </div>
                    <p class="small">
                        ${item.descripcion}
                        <a href="${item.link}" class="text-link-enlace">Visita el sitio</a>
                    </p>
                    
                  </figcaption>
            `;

            contenedor.appendChild(figure);

            $('.gallery__link').each(function(){
                $(this)
                .append('<div class="picture"></div>')
                .children('.picture').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
              });
        })
    })




fetch("../../data/data.json")
    .then(response=>response.json())
    .then(data=>{
        const contenedor_educacion = document.getElementById("contenedor_educacion")
        const contenedor_experiencia = document.getElementById("contenedor_experiencia")
        const contenedor_skills = document.getElementById("contenedor_skills")

        data.educacion.forEach(item=>{
          const div = document.createElement("div")

          div.className="row g-0 resume-lines__item animate-in-up"

          div.innerHTML=`
          <div class="col-12 col-md-2">
                  <span class="resume-lines__date animate-in-up"
                    >${item.tiempo}</span
                  >
                </div>
                <div class="col-12 col-md-5">
                  <h5 class="resume-lines__title animate-in-up">
                  ${item.carrera}
                  </h5>
                  <p class="resume-lines__source animate-in-up">
                    Cursado en 
                    <a href="#0" class="text-link-bold" target="_blank"
                      >${item.institucion}</a
                    >
                  </p>
                </div>
                <div class="col-12 col-md-5">
                  <p class="small resume-lines__descr animate-in-up">
                  ${item.descripcion}
                  </p>
                </div>
          `;
        
          contenedor_educacion.appendChild(div);

        })
        data.experiencia.forEach(item=>{
          const div = document.createElement("div")

          div.className="row g-0 resume-lines__item animate-in-up"

          div.innerHTML=`<div class="col-12 col-md-2">
                  <span class="resume-lines__date animate-in-up"
                    >${item.meses}</span
                  >
                  <span class="resume-lines__date animate-in-up"
                    >${item.año}</span
                  >
                </div>
                <div class="col-12 col-md-5">
                  <h5 class="resume-lines__title animate-in-up">${item.cargo}</h5>
                  <p class="resume-lines__source animate-in-up">
                    en la empresa 
                    <a href="${item.link}" class="text-link-bold" target="_blank"
                      >${item.empresa}</a
                    >
                    
                  </p>
                </div>
                <div class="col-12 col-md-5">
                  <p class="small resume-lines__descr animate-in-up">
                  ${item.descripcion}
                  </p>
                </div>`;
        
          contenedor_experiencia.appendChild(div);
        })



        data.skills.forEach(item=>{
          const div = document.createElement("div")

          div.className="tools-cards__item d-flex grid-item-s animate-card-5"

          div.innerHTML=`<div class="tools-cards d-flex justify-content-start flex-wrap">
          <div class="tools-cards__card">
                   
                    <h6 class="tools-cards__caption animate-in-up">${item.skill}</h6>
                  </div>
                  </div>`;
        
          contenedor_skills.appendChild(div);
        })
    })
