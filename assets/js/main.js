document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. VARIABLES Y SELECTORES
       ========================================================================== */
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    const mainHeader = document.querySelector('.main-header');
    
    // Filtros de Eventos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Modal de Detalles
    const eventModal = document.getElementById('event-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCloseAction = document.querySelector('.close-modal-action-btn');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    
    // Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    const charCounter = document.getElementById('char-counter');
    const messageInput = document.getElementById('contact-message');
    const formFeedback = document.getElementById('form-feedback');
    const feedbackText = document.getElementById('feedback-text');

    /* ==========================================================================
       2. TEMA CLARO / OSCURO (THEME TOGGLE)
       ========================================================================== */
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    // Inicializar Tema segun Preferencia Guardada o del Sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    /* ==========================================================================
       3. MENÚ DE NAVEGACIÓN MÓVIL
       ========================================================================== */
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            navMenu.classList.remove('open');
            hamburgerMenu.classList.remove('open');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('open');
            hamburgerMenu.classList.add('open');
            hamburgerMenu.setAttribute('aria-expanded', 'true');
        }
    }

    hamburgerMenu.addEventListener('click', toggleMobileMenu);

    // Cerrar menú al hacer clic en un enlace de navegación
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburgerMenu.classList.remove('open');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        });
    });

    /* ==========================================================================
       4. CABECERA PEGAJOSA Y SECCIÓN ACTIVA EN SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Cabecera Pegajosa
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        // Resaltar sección activa en el menú de navegación
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Compensación por altura del header
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       5. FILTRO DE EVENTOS
       ========================================================================== */
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de todos los botones y añadir al actual
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const type = card.getAttribute('data-type');
                if (filterValue === 'all' || category === filterValue || type === filterValue) {
                    card.style.display = 'flex';
                    // Sutil micro-animación de entrada
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       6. BASE DE DATOS Y MODAL DE EVENTOS
       ========================================================================== */
    const eventsData = {
        pes_day: {
            title: 'PES Day 2026: Conmemoración Anual y Liderazgo Estudiantil',
            category: 'Realizado',
            badgeClass: 'visita',
            date: 'Abril 2026',
            image: 'assets/images/events/event_PES_Day.jpeg',
            description: `
                <p>El PES Day es la celebración más importante a nivel mundial para los miembros de la IEEE Power & Energy Society. Este año, bajo el lema global de sostenibilidad y redes del futuro, el capítulo estudiantil organizó una serie de actividades especiales.</p>
                <p>Las conferencias magistrales abarcaron la transición energética sostenible y el papel de las nuevas generaciones de ingenieros en el desarrollo e implementación de tecnologías limpias. Se llevó a cabo un foro abierto sobre la importancia de la divulgación técnica y se fomentó el networking entre estudiantes y exalumnos integrados en el sector laboral.</p>
            `,
            specs: {
                'Ubicación': 'Auditorio y explanada de la UPIITA-IPN',
                'Duración': '4 horas',
                'Modalidad': 'Presencial',
                'Alcance': 'Comunidad estudiantil e ingenieros asociados'
            }
        },
        wie_pes_day: {
            title: 'WIE x PES: Women\'s Day en el Sector Energético',
            category: 'Realizado',
            badgeClass: 'panel',
            date: 'Marzo 2026',
            image: 'assets/images/events/event_WIE_PES.jpeg',
            description: `
                <p>En colaboración estrecha con el grupo de afinidad WIE (Women in Engineering) de la UPIITA, organizamos un panel y conversatorio para celebrar el Día de la Mujer en la Ingeniería y la Tecnología.</p>
                <p>El evento contó con la participación de ingenieras investigadoras y directivas del sector público y privado, quienes compartieron sus experiencias profesionales, los retos que han superado en la industria y sus perspectivas sobre la equidad y el rol de las mujeres en el desarrollo tecnológico y científico de la energía en México.</p>
            `,
            specs: {
                'Ubicación': 'Auditorio de Graduados, UPIITA-IPN',
                'Duración': '3 horas',
                'Colaboradores': 'IEEE WIE UPIITA y Sección México',
                'Costo': 'Acceso libre con registro previo'
            }
        },
        curso_fronius: {
            title: 'Curso de Sistemas Fotovoltaicos en Colaboración con Fronius',
            category: 'Realizado',
            badgeClass: 'taller',
            date: 'Mayo 2026',
            image: 'assets/images/events/event_fronius.jpeg',
            description: `
                <p>Taller teórico-práctico de capacitación técnica especializada sobre dimensionamiento, instalación y configuración de inversores interactivos, desarrollado de forma directa con el fabricante Fronius México.</p>
                <p>Los participantes estudiaron la teoría del silicio, cálculo de arreglos fotovoltaicos, normatividad de interconexión (NOM-001-SEDE) y realizaron prácticas reales de comisionamiento de inversores Fronius Primo y Symo. También se capacitó sobre el uso de la plataforma de monitoreo Solar.web para análisis energético digital.</p>
            `,
            specs: {
                'Ubicación': 'Laboratorio de Ingeniería en Energía, UPIITA',
                'Duración': '12 horas en total (3 sesiones presenciales)',
                'Requisitos': 'Conocimientos de electricidad y multímetro',
                'Certificación': 'Constancia avalada por Fronius México y el capítulo'
            }
        },
        cenace: {
            title: 'Visita Técnica a las Salas de Control Nacional de CENACE',
            category: 'Realizado',
            badgeClass: 'visita',
            date: 'Mayo 2026',
            image: 'assets/images/events/event_cenace.jpeg',
            description: `
                <p>Recorrido de campo técnico exclusivo a las oficinas y salas de despacho del Centro Nacional de Control de Energía (CENACE). Los alumnos pudieron visualizar en tiempo real la operación física del Sistema Eléctrico Nacional.</p>
                <p>Los ingenieros explicaron el control primario de frecuencia y voltaje, la gestión operativa ante fallas y la integración de energías limpias variables como parques eólicos y solares, además de cómo se operan los mercados de energía en el corto y largo plazo.</p>
            `,
            specs: {
                'Ubicación': 'Centro Nacional de Control de Energía, CDMX',
                'Duración': '5 horas',
                'Requisitos': 'Credencial IPN, calzado industrial cerrado y pantalón de mezclilla grueso.',
                'Cupo Máximo': '25 participantes'
            }
        },
        los_humeros: {
            title: 'Visita Técnica a la Planta Geotérmica Los Humeros',
            category: 'Por Realizar',
            badgeClass: 'visita',
            date: 'Octubre 2026',
            image: 'assets/images/events/event_humeros.jpg',
            description: `
                <p>Viaje de estudios técnico y de campo programado para conocer las instalaciones del Campo Geotérmico Los Humeros (Puebla), operado por la Comisión Federal de Electricidad (CFE).</p>
                <p>Los alumnos inspeccionarán el proceso de perforación y extracción de vapor a altas presiones y temperaturas, el funcionamiento de los separadores ciclónicos y la operación de las turbogeneradoras a condensación. Se analizará la importancia de la geotermia como energía de base no variable dentro de la red.</p>
            `,
            specs: {
                'Ubicación': 'Chignautla / Tlatlauquitepec, Puebla',
                'Duración': 'Día completo (Salida 5:00 AM desde UPIITA)',
                'Requisitos': 'EPP Completo (Casco, lentes, chaleco y botas con casquillo), seguro vigente del IMSS.',
                'Cupo Máximo': '30 participantes'
            }
        },
        la_yesca: {
            title: 'Visita Técnica a la Central Hidroeléctrica La Yesca',
            category: 'Por Realizar',
            badgeClass: 'visita',
            date: 'Noviembre 2026',
            image: 'assets/images/events/event_yesca.jpg',
            description: `
                <p>Visita técnica de alta especialización a la presa y Central Hidroeléctrica "Alfredo Elías Ayub" (La Yesca), ubicada en el cauce del Río Grande de Santiago.</p>
                <p>Los estudiantes podrán ingresar a la imponente casa de máquinas subterránea para ver la operación de las turbinas generadoras tipo Francis, y estudiar el funcionamiento del vertedor de demasías y la impresionante cortina de enrocamiento con cara de concreto (una de las más altas del mundo).</p>
            `,
            specs: {
                'Ubicación': 'Límites de Nayarit y Jalisco',
                'Duración': '2 días (Incluye transporte y hospedaje programado)',
                'Requisitos': 'Equipo de seguridad reglamentario, aprobación de carta de deslinde y seguro estudiantil activo.',
                'Cupo Máximo': '25 participantes'
            }
        },
        magdalena: {
            title: 'Visita Técnica al Parque Solar Magdalena II (220 MW)',
            category: 'Por Realizar',
            badgeClass: 'visita',
            date: 'Septiembre 2026',
            image: 'assets/images/events/event_magdalena.jpeg',
            description: `
                <p>Recorrido técnico guiado por ingenieros de Enel Green Power en el megaparque fotovoltaico de 220 MW en Tlaxcala, que abastece de energía verde a grandes industrias mexicanas.</p>
                <p>El estudio de campo se centrará en la lógica de control de los seguidores solares de un solo eje, la eficiencia de los paneles bifaciales frente a la irradiación del suelo y el diseño de la subestación colectora de media y alta tensión.</p>
            `,
            specs: {
                'Ubicación': 'Tlaxco, Tlaxcala',
                'Duración': 'Día completo (Salida 6:00 AM)',
                'Requisitos': 'EPP (Casco, botas de casquillo, chaleco y lentes de seguridad).',
                'Cupo Máximo': '30 participantes'
            }
        },
        ipec_2026: {
            title: 'IPEC 2026: Electromobility Edition (Congreso Anual)',
            category: 'Por Realizar',
            badgeClass: 'panel',
            date: 'Octubre 2026',
            image: 'assets/images/events/event_IPEC_2026.jpeg',
            description: `
                <p>El Congreso Estudiantil insignia del capítulo PES UPIITA se renueva en su edición 2026 con un enfoque exclusivo en la **Electromovilidad y Transporte Eléctrico**.</p>
                <p>Tendremos tres días de conferencias magistrales, exposiciones de prototipos y paneles con expertos de la industria automotriz y del sector de distribución eléctrica. Se abordará la infraestructura de cargadores inteligentes (EVSE), la degradación de baterías de litio y el impacto que tendrá la carga masiva de vehículos eléctricos en la calidad de la energía y en las redes inteligentes.</p>
            `,
            specs: {
                'Ubicación': 'Auditorio Principal de la UPIITA-IPN',
                'Duración': '3 días consecutivos',
                'Modalidad': 'Híbrida (Presencial y transmisión digital en vivo)',
                'Costo': 'Acceso libre con pre-registro en línea'
            }
        },
        curso_cv: {
            title: 'Taller de Desarrollo Profesional: Currículum y LinkedIn de Alto Impacto',
            category: 'Por Realizar',
            badgeClass: 'taller',
            date: 'Noviembre 2026',
            image: 'assets/images/events/event_cv.jpeg',
            description: `
                <p>Taller interactivo diseñado para potenciar la inserción laboral de los egresados y estudiantes avanzados de las ingenierías de la UPIITA en el sector energético nacional e internacional.</p>
                <p>Aprenderás a estructurar un CV técnico de alto impacto, redactar perfiles profesionales efectivos, optimizar tu cuenta de LinkedIn para búsquedas de headhunters en el ámbito de la energía y automatización, y ensayar simulaciones de entrevistas de trabajo técnicas en español e inglés.</p>
            `,
            specs: {
                'Ubicación': 'Aulas de Cómputo de la UPIITA / Plataforma Teams',
                'Duración': '6 horas (2 sesiones de 3 horas)',
                'Requisitos': 'Laptop y borrador inicial de CV',
                'Costo': 'Completamente gratuito y exclusivo para alumnos de UPIITA'
            }
        }
    };

    function openModal(eventId, cardImgSrc) {
        const data = eventsData[eventId];
        if (!data) return;

        // Poblar campos del modal
        document.getElementById('modal-image').src = cardImgSrc || data.image;
        document.getElementById('modal-image').alt = data.title;
        
        const badge = document.getElementById('modal-badge');
        badge.textContent = data.category;
        badge.className = `modal-badge ${data.badgeClass}`;
        
        document.getElementById('modal-date').textContent = data.date;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-description').innerHTML = data.description;
        
        // Formatear especificaciones técnicas
        const specsContainer = document.getElementById('modal-specs');
        let specsHTML = `<h4 class="specs-title">Detalles Técnicos</h4><div class="specs-list">`;
        
        for (const [key, value] of Object.entries(data.specs)) {
            specsHTML += `
                <div class="spec-item">
                    <span class="spec-key">${key}:</span>
                    <span class="spec-val">${value}</span>
                </div>
            `;
        }
        specsHTML += `</div>`;
        specsContainer.innerHTML = specsHTML;

        // Configurar acción del boton CTA del modal
        const actionBtn = document.getElementById('modal-action-link');
        actionBtn.href = `#contacto`;
        actionBtn.addEventListener('click', () => {
            closeModal();
            // Llenar asunto automáticamente
            document.getElementById('contact-subject').value = `Interés en evento: ${data.title}`;
        });

        // Mostrar Modal
        eventModal.classList.add('open');
        eventModal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden'; // Evitar scroll de fondo
    }

    function closeModal() {
        eventModal.classList.remove('open');
        eventModal.setAttribute('aria-hidden', 'true');
        body.style.overflow = 'visible';
    }

    // Event Listeners para abrir y cerrar el modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = button.getAttribute('data-event');
            const card = button.closest('.event-card');
            const cardImg = card ? card.querySelector('.event-img') : null;
            const cardImgSrc = cardImg ? cardImg.src : '';
            openModal(eventId, cardImgSrc);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalCloseAction.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera del contenedor del modal
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eventModal.classList.contains('open')) {
            closeModal();
        }
    });

    /* ==========================================================================
       7. ANIMACIONES DE APARICIÓN AL DESPLAZARSE (REVEAL EFFECT)
       ========================================================================== */
    const animatables = document.querySelectorAll('.animate-up');
    
    // Añadir clase js-reveal para habilitar la animación solo si hay JS
    animatables.forEach(element => {
        element.classList.add('js-reveal');
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // Dejar de observar una vez que ha aparecido
                }
            });
        }, {
            threshold: 0.02, // Activación rápida
            rootMargin: '0px 0px -20px 0px'
        });

        animatables.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback en caso de que no sea soportado
        animatables.forEach(element => {
            element.classList.add('appear');
        });
    }

    /* ==========================================================================
       8. VALIDACIÓN DEL FORMULARIO Y REDIRECCIÓN DE CORREO (MAILTO)
       ========================================================================== */
    
    // Contador de caracteres para el Textarea
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            const count = messageInput.value.length;
            charCounter.textContent = `${count} / 1000 caracteres`;
            
            if (count > 1000) {
                messageInput.value = messageInput.value.substring(0, 1000);
                charCounter.textContent = `1000 / 1000 caracteres`;
                charCounter.style.color = '#ef4444';
            } else {
                charCounter.style.color = 'var(--text-muted)';
            }
        });
    }

    // Procesar envio del formulario
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores
        const name = document.getElementById('contact-name').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        let isValid = true;

        // Ocultar mensajes de error previos
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'none';

        // Validaciones sencillas
        if (!name) {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        if (!subject) {
            document.getElementById('subject-error').style.display = 'block';
            isValid = false;
        }

        if (!message) {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            showFeedback('Por favor llena los campos requeridos marcados con (*).', 'error');
            return;
        }

        // Mostrar Feedback de carga
        showFeedback('Enviando tu mensaje...', 'success');
        
        // Intentar enviar mediante AJAX a FormSubmit (ideal para entornos estáticos como GitHub Pages)
        fetch('https://formsubmit.co/ajax/uricasmel@ieee.org', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                subject: subject,
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al enviar a FormSubmit');
            }
        })
        .then(data => {
            showFeedback('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
            charCounter.textContent = '0 / 1000 caracteres';
            
            // Ocultar mensaje de éxito tras 5 segundos
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            console.warn('FormSubmit submission failed, falling back to mailto:', error);
            // Fallback a mailto si falla o no hay conexión
            showFeedback('Preparando tu cliente de correo para enviar...', 'success');
            
            setTimeout(() => {
                const emailRecipient = 'uricasmel@ieee.org';
                const emailSubject = encodeURIComponent(`[IEEE PES Contacto] ${subject}`);
                const emailBody = encodeURIComponent(
                    `Hola Uriel Castelán y Mesa Directiva de IEEE PES UPIITA,\n\n` +
                    `Mi nombre es: ${name}\n` +
                    `Asunto de mi mensaje: ${subject}\n\n` +
                    `Detalles de mi mensaje:\n${message}\n\n` +
                    `Quedo en espera de su respuesta.\n\n` +
                    `Atentamente,\n` +
                    `${name}`
                );

                const mailtoUrl = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
                window.location.href = mailtoUrl;
                
                showFeedback('¡Validado! Se ha abierto tu gestor de correo para completar el envío.', 'success');
                contactForm.reset();
                charCounter.textContent = '0 / 1000 caracteres';
                
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    });

    function showFeedback(text, type) {
        formFeedback.className = `form-feedback ${type}`;
        feedbackText.textContent = text;
        formFeedback.style.display = 'flex';
    }

});
