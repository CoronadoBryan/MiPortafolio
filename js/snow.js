/**
 * Efecto de Nieve Navideña
 */
(function() {
  'use strict';

  const SNOWFLAKE_COUNT = 50;
  const SNOWFLAKE_CHARS = ['❄', '❅', '❆'];

  function createSnow() {
    const container = document.createElement('div');
    container.className = 'snow-container';
    document.body.appendChild(container);

    for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = SNOWFLAKE_CHARS[Math.floor(Math.random() * SNOWFLAKE_CHARS.length)];
      
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.top = Math.random() * -100 + 'px';
      
      const size = Math.random() * 1.5 + 0.5;
      snowflake.style.fontSize = size + 'em';
      
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      snowflake.style.animationDuration = duration + 's';
      snowflake.style.animationDelay = delay + 's';
      
      const horizontalMovement = (Math.random() - 0.5) * 150;
      snowflake.style.setProperty('--snow-drift', horizontalMovement + 'px');
      
      container.appendChild(snowflake);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSnow);
  } else {
    createSnow();
  }
})();

