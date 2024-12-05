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
    

    if (tuboPosition <= -60) { //distância dos tubos
      const distanciaMinima = 200; // distância mínima entre os tubos
      const distanciaMaxima = 300; // distância máxima entre os tubos
      const novaPosicao = window.innerWidth + Math.floor(Math.random() * (distanciaMaxima - distanciaMinima) + distanciaMinima);
      tubo.style.left = `${novaPosicao}px`;

    }
  });
}

const loop = setInterval(() => {
  console.log('loop');

  tubos.forEach(tubo => { // Loop sobre todos os tubos
    const tuboPosition = tubo.offsetLeft;
    const brendaPosition = +window.getComputedStyle(brenda).bottom.replace('px', '');
    
    // verifica colisão
    if (tuboPosition <= 120 && tuboPosition > 0 && brendaPosition < 80) {
      // quando a Brenda colide, os tubos param
      tubos.forEach(t => {
        t.style.animationPlayState = 'paused';
        t.style.left = `${t.offsetLeft}px`; //tubo na mesma posição
      });
      
      brenda.style.animation = 'none'; 
      brenda.style.bottom = `${brendaPosition}px`; 
      brenda.src = 'img/brenda_morta-1.png-removebg-preview.png'; 
      brenda.style.width = '196px'; 
      brenda.style.transition = 'none'
      brenda.style.position = 'absolute'; 

      clearInterval(loop);
    }

    reposicionarTubos();
  });
}, 10);

document.addEventListener('keydown', jump); 
