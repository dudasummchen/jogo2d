const brenda = document.querySelector('.brenda');
const tubos = document.querySelectorAll('.tubo');

const jump = () => {
  brenda.classList.add('jump');
  setTimeout(() => {
    brenda.classList.remove('jump');
  }, 500);
}

const reposicionarTubos = () => {
  tubos.forEach(tubo => {
    const tuboPosition = tubo.offsetLeft;
    
    // Se o tubo saiu da tela, reposiciona
    if (tuboPosition <= -60) {
      // Adiciona uma distância aleatória entre os tubos
      const distanciaMinima = 200; // Distância mínima entre os tubos
      const distanciaMaxima = 300; // Distância máxima entre os tubos
      const novaPosicao = window.innerWidth + Math.floor(Math.random() * (distanciaMaxima - distanciaMinima) + distanciaMinima);
      tubo.style.left = `${novaPosicao}px`;

      // Adiciona uma altura aleatória para o tubo (opcional)
      // tubo.style.top = `${Math.floor(Math.random() * (window.innerHeight - 300) + 100)}px`;
    }
  });
}

const loop = setInterval(() => {
  console.log('loop');

  tubos.forEach(tubo => { // Loop sobre todos os tubos
    const tuboPosition = tubo.offsetLeft;
    const brendaPosition = +window.getComputedStyle(brenda).bottom.replace('px', '');
    
    // Verifica colisão
    if (tuboPosition <= 120 && tuboPosition > 0 && brendaPosition < 80) {
      // Quando a Brenda colide, pausa todos os tubos
      tubos.forEach(t => {
        t.style.animationPlayState = 'paused';
        t.style.left = `${t.offsetLeft}px`; // Mantém o tubo na mesma posição
      });
      
      brenda.style.animation = 'none'; 
      brenda.style.bottom = `${brendaPosition}px`; 
      brenda.src = 'img/brenda_morta-1.png-removebg-preview.png'; 
      brenda.style.width = '150px'; 
      brenda.style.transition = 'none'
      brenda.style.position = 'absolute'; 

      clearInterval(loop);
    }

    reposicionarTubos(); // Reposiciona os tubos
  });
}, 10);

document.addEventListener('keydown', jump); 
