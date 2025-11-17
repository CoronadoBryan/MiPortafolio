// Esperar a que el DOM y jQuery estén listos
(function() {
    function initDinamicos() {
        // Verificar que jQuery esté disponible
        if (typeof $ === 'undefined' || typeof jQuery === 'undefined') {
            console.error('jQuery no está cargado, reintentando...');
            setTimeout(initDinamicos, 100);
            return;
        }

        // Verificar que los datos estén disponibles
        if (typeof portafolioData === 'undefined') {
            console.error('Los datos del portafolio no están disponibles');
            return;
        }

        if (typeof resumeData === 'undefined') {
            console.error('Los datos del resume no están disponibles');
            return;
        }

        console.log("✅ Cargando datos del portafolio...");
        
        // Cargar portafolio desde los datos JavaScript
        const contenedor = document.getElementById("contenedor");
        
        if (!contenedor) {
            console.error("No se encontró el contenedor del portafolio");
            return;
        }

        // Limpiar contenedor si tiene contenido previo
        contenedor.innerHTML = '';

        // Configuración de paginación
        const proyectosPorPagina = 4;
        let proyectosMostrados = 0;
        const totalProyectos = portafolioData.length;

        // Función para crear un elemento de proyecto
        function crearProyecto(item) {
            const figure = document.createElement("figure");
            figure.className = "col-12 col-md-6 gallery__item grid-item animate-card-2";

            figure.innerHTML = `
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
                    <h5 class="opposite">Descripción</h5>
                    <div class="card__tags d-flex flex-wrap">
                        ${item.tecnologias.map(tecnologia => `<span class="rounded-tag">${tecnologia}</span>`).join('')}
                    </div>
                    <p class="small">
                        ${item.descripcion}
                        <a href="${item.link}" class="text-link-enlace" target="_blank">Visita el sitio</a>
                    </p>
                </figcaption>
            `;

            return figure;
        }

        // Función para mostrar proyectos
        function mostrarProyectos(cantidad) {
            const proyectosAmostrar = portafolioData.slice(proyectosMostrados, proyectosMostrados + cantidad);
            
            proyectosAmostrar.forEach(item => {
                const figure = crearProyecto(item);
                contenedor.appendChild(figure);
                proyectosMostrados++;
            });

            // Ejecutar código jQuery para los nuevos elementos
            $('.gallery__link').each(function() {
                if (!$(this).find('.picture').length) {
                    $(this)
                        .append('<div class="picture"></div>')
                        .children('.picture').css({'background-image': 'url(' + $(this).attr('data-image') + ')'});
                }
            });

            // Mostrar u ocultar botón "Cargar más"
            const btnCargarMas = document.getElementById('btn-cargar-mas');
            if (btnCargarMas) {
                if (proyectosMostrados >= totalProyectos) {
                    btnCargarMas.style.display = 'none';
                } else {
                    btnCargarMas.style.display = 'block';
                }
            }
        }

        // Mostrar primeros proyectos
        mostrarProyectos(proyectosPorPagina);

        // Crear botón "Cargar más" si hay más proyectos
        if (totalProyectos > proyectosPorPagina) {
            const contenedorPadre = contenedor.parentElement;
            const btnContainer = document.createElement("div");
            btnContainer.className = "text-center mt-4";
            btnContainer.innerHTML = `
                <button id="btn-cargar-mas" class="btn btn-primary">
                    Cargar más proyectos
                </button>
            `;
            contenedorPadre.appendChild(btnContainer);

            // Event listener para el botón
            document.getElementById('btn-cargar-mas').addEventListener('click', function() {
                mostrarProyectos(proyectosPorPagina);
            });
        }

        console.log("✅ Portafolio cargado correctamente");

        // Cargar datos de educación, experiencia y skills
        console.log("✅ Cargando datos de educación, experiencia y skills...");
        
        const contenedor_educacion = document.getElementById("contenedor_educacion");
        const contenedor_experiencia = document.getElementById("contenedor_experiencia");
        const contenedor_skills = document.getElementById("contenedor_skills");

        if (!contenedor_educacion || !contenedor_experiencia || !contenedor_skills) {
            console.error("No se encontraron los contenedores de datos");
            return;
        }

        // Limpiar contenedores si tienen contenido previo
        contenedor_educacion.innerHTML = '';
        contenedor_experiencia.innerHTML = '';
        contenedor_skills.innerHTML = '';

        // Cargar educación
        resumeData.educacion.forEach(item => {
            const div = document.createElement("div");
            div.className = "row g-0 resume-lines__item animate-in-up";

            div.innerHTML = `
                <div class="col-12 col-md-2">
                    <span class="resume-lines__date animate-in-up">${item.tiempo}</span>
                </div>
                <div class="col-12 col-md-5">
                    <h5 class="resume-lines__title animate-in-up">${item.carrera}</h5>
                    <p class="resume-lines__source animate-in-up">
                        Cursado en 
                        <a href="#0" class="text-link-bold" target="_blank">${item.institucion}</a>
                    </p>
                </div>
                <div class="col-12 col-md-5">
                    <p class="small resume-lines__descr animate-in-up">${item.descripcion}</p>
                </div>
            `;

            contenedor_educacion.appendChild(div);
        });

        // Cargar experiencia
        resumeData.experiencia.forEach(item => {
            const div = document.createElement("div");
            div.className = "row g-0 resume-lines__item animate-in-up";

            div.innerHTML = `
                <div class="col-12 col-md-2">
                    <span class="resume-lines__date animate-in-up">${item.meses}</span>
                    <span class="resume-lines__date animate-in-up">${item.año}</span>
                </div>
                <div class="col-12 col-md-5">
                    <h5 class="resume-lines__title animate-in-up">${item.cargo}</h5>
                    <p class="resume-lines__source animate-in-up">
                        en la empresa 
                        ${item.link ? `<a href="${item.link}" class="text-link-bold" target="_blank">${item.empresa}</a>` : `<span class="text-link-bold">${item.empresa}</span>`}
                    </p>
                </div>
                <div class="col-12 col-md-5">
                    <p class="small resume-lines__descr animate-in-up">${item.descripcion}</p>
                </div>
            `;

            contenedor_experiencia.appendChild(div);
        });

        // Mapeo de tecnologías con sus iconos (usando Simple Icons CDN)
        const techIcons = {
            "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
            "Laravel": "https://logospng.org/download/laravel/logo-laravel-icon-1024.png",
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
            "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            "Sass": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
            "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
            "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
            "n8n": "https://docs.gotohuman.com/img/n8n-logo.png",
            "Meta Developer": "https://pngimg.com/uploads/meta/meta_PNG12.png",
            "Framework7": "https://framework7.io/i/logo.svg",
            "Filament": "https://google.github.io/filament/images/filament_logo_small.png",
            "WhatsApp API": "https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png"
        };

        // Categorías de skills con sus títulos
        const skillCategories = {
            "frontend": "Frontend",
            "frameworks": "Frameworks",
            "backend": "Backend",
            "basesDatos": "Bases de Datos",
            "herramientas": "Herramientas",
            "apisAutomatizacion": "APIs y Automatización"
        };

        // Crear navegador de pestañas
        const tabsContainer = document.createElement("div");
        tabsContainer.className = "skills-tabs";
        
        const tabsNav = document.createElement("div");
        tabsNav.className = "skills-tabs__nav d-flex flex-wrap justify-content-center";
        
        const tabsContent = document.createElement("div");
        tabsContent.className = "skills-tabs__content";

        let firstTab = true;
        Object.keys(resumeData.skills).forEach((categoryKey, index) => {
            const category = resumeData.skills[categoryKey];
            const categoryTitle = skillCategories[categoryKey];

            // Crear botón de pestaña
            const tabButton = document.createElement("button");
            tabButton.className = `skills-tabs__button btn ${firstTab ? 'active' : ''}`;
            tabButton.textContent = categoryTitle;
            tabButton.setAttribute('data-category', categoryKey);
            tabButton.setAttribute('role', 'tab');
            tabButton.setAttribute('aria-selected', firstTab ? 'true' : 'false');
            tabsNav.appendChild(tabButton);

            // Crear contenido de la pestaña
            const tabPanel = document.createElement("div");
            tabPanel.className = `skills-tabs__panel ${firstTab ? 'active' : ''}`;
            tabPanel.setAttribute('data-category', categoryKey);
            tabPanel.setAttribute('role', 'tabpanel');
            tabPanel.setAttribute('aria-hidden', firstTab ? 'false' : 'true');
            tabPanel.id = `tab-${categoryKey}`;

            const categoryItemsDiv = document.createElement("div");
            categoryItemsDiv.className = "skills-category__items row";

            // Agregar skills de esta categoría
            category.forEach(item => {
                const div = document.createElement("div");
                div.className = "tools-cards__item d-flex grid-item-s animate-card-5";

                const iconUrl = techIcons[item.skill] || null;
                const iconHtml = iconUrl 
                    ? `<img class="tools-cards__icon animate-in-up" src="${iconUrl}" alt="${item.skill}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />`
                    : '';

                div.innerHTML = `
                    <div class="tools-cards d-flex justify-content-start flex-wrap">
                        <div class="tools-cards__card">
                            ${iconHtml}
                            <h6 class="tools-cards__caption animate-in-up" ${!iconUrl ? 'style="display:block;"' : ''}>${item.skill}</h6>
                        </div>
                    </div>
                `;

                categoryItemsDiv.appendChild(div);
            });

            tabPanel.appendChild(categoryItemsDiv);
            tabsContent.appendChild(tabPanel);

            firstTab = false;
        });

        tabsContainer.appendChild(tabsNav);
        tabsContainer.appendChild(tabsContent);
        contenedor_skills.appendChild(tabsContainer);

        // Agregar event listeners para cambiar de pestaña
        tabsNav.querySelectorAll('.skills-tabs__button').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remover clase active de todos los botones y paneles
                tabsNav.querySelectorAll('.skills-tabs__button').forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                tabsContent.querySelectorAll('.skills-tabs__panel').forEach(panel => {
                    panel.classList.remove('active');
                    panel.setAttribute('aria-hidden', 'true');
                });
                
                // Agregar clase active al botón y panel seleccionados
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                const selectedPanel = tabsContent.querySelector(`[data-category="${category}"]`);
                if (selectedPanel) {
                    selectedPanel.classList.add('active');
                    selectedPanel.setAttribute('aria-hidden', 'false');
                }
            });
        });

        console.log("✅ Todos los datos cargados correctamente");
    }

    // Intentar inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDinamicos);
    } else {
        // DOM ya está listo
        initDinamicos();
    }
})();
