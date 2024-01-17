const container = document.getElementById('container');
const ant = document.createElement('div');
ant.id = 'ant';
container.appendChild(ant);

function moveAnt() {
  const randomX = Math.random() * (container.offsetWidth - ant.offsetWidth);
  const randomY = Math.random() * (container.offsetHeight - ant.offsetHeight);
  ant.style.left = randomX/100 + 'px';
  ant.style.top = randomY/100 + 'px';
}

setInterval(moveAnt, 1000); // Move the ant every 100 milliseconds
