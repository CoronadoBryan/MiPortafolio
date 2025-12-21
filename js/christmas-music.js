/**
 * Controlador de Música Navideña
 */
(function() {
  'use strict';

  const musicButton = document.getElementById('music-toggle');
  const musicCaption = musicButton?.querySelector('.music-caption');
  const musicIcon = musicButton?.querySelector('.music-icon');
  
  // URL de música navideña - Puedes cambiar esta URL por tu propia música
  // Para usar un archivo local, colócalo en una carpeta (ej: 'audio/christmas.mp3') y usa: './audio/christmas.mp3'
  
  // Opciones de música navideña gratuita en línea:
  // Opción 1: Jingle Bells
  const musicUrl = 'https://bryancito.space/documents/navidad.mpeg';
  
  // Opción 2 (descomenta para usar): We Wish You a Merry Christmas
  // const musicUrl = 'https://archive.org/download/WeWishYouAMerryChristmas_201812/We%20Wish%20You%20a%20Merry%20Christmas.mp3';
  
  // Opción 3 (descomenta para usar): Deck the Halls
  // const musicUrl = 'https://archive.org/download/DeckTheHalls_201812/Deck%20the%20Halls.mp3';
  
  let audio = null;
  let isPlaying = false;

  // Crear elemento de audio
  function createAudio() {
    if (!audio) {
      audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.5; // Volumen al 50%
      
      // Manejar errores de carga
      audio.addEventListener('error', function(e) {
        console.error('Error al cargar la música:', e);
        alert('No se pudo cargar la música. Por favor, verifica tu conexión o agrega un archivo de música local.');
      });
      
      // Manejar cuando la música termine (aunque está en loop)
      audio.addEventListener('ended', function() {
        audio.play();
      });
    }
    return audio;
  }

  // Actualizar estado del botón
  function updateButtonState(playing) {
    isPlaying = playing;
    
    if (musicButton) {
      if (playing) {
        musicButton.classList.add('music-playing');
        if (musicCaption) musicCaption.textContent = 'Pausar';
        if (musicIcon) {
          musicIcon.style.opacity = '0.7';
        }
      } else {
        musicButton.classList.remove('music-playing');
        if (musicCaption) musicCaption.textContent = 'Música';
        if (musicIcon) {
          musicIcon.style.opacity = '1';
        }
      }
    }
  }

  // Toggle música
  function toggleMusic() {
    if (!audio) {
      createAudio();
    }

    if (isPlaying) {
      audio.pause();
      updateButtonState(false);
    } else {
      // Intentar reproducir
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateButtonState(true);
          })
          .catch(error => {
            console.error('Error al reproducir:', error);
            // Algunos navegadores requieren interacción del usuario primero
            alert('Por favor, haz clic en el botón nuevamente para activar la música.');
            updateButtonState(false);
          });
      }
    }
  }

  // Event listener
  if (musicButton) {
    musicButton.addEventListener('click', toggleMusic);
  }

  // Limpiar cuando se cierre la página
  window.addEventListener('beforeunload', function() {
    if (audio) {
      audio.pause();
      audio = null;
    }
  });

})();

