function generateEasterEggHTML(songTitle) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>ZZ Top Easter Egg</title>
  <style>
    body {
      background: #000;
      color: #fff;
      text-align: center;
      padding-top: 100px;
      font-family: monospace;
      overflow: hidden;
      margin: 0;
    }
    h1 {
      font-size: 3em;
      color: #ffcc00;
      margin-top: 200px;
    }
    .subtitle {
      font-size: 1.5em;
      color: #ccc;
      margin-top: 20px;
    }
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background-color: turquoise;
      border-radius: 50%;
      opacity: 0;
    }
    @keyframes fly-in {
      to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 0.2; }
    }
  </style>
</head>
<body>
  <h1>${songTitle}</h1>
  <div class="subtitle">Tillykke, du har fundet det hemmelige easter egg!</div>

  <script>
    window.onload = function() {
      const letters = {
        Z: [...Array(20).fill().map((_, i) => [i, 0]),
            ...Array(20).fill().map((_, i) => [19 - i, i]),
            ...Array(20).fill().map((_, i) => [i, 19])],
        T: [...Array(20).fill().map((_, i) => [i, 0]),
            ...Array(20).fill().map((_, i) => [10, i])],
        o: [...Array(12).fill().map((_, i) => [4 + i, 0]),
            ...Array(12).fill().map((_, i) => [4 + i, 12]),
            ...Array(11).fill().map((_, i) => [4, 1 + i]),
            ...Array(11).fill().map((_, i) => [15, 1 + i])],
        p: [...Array(20).fill().map((_, i) => [0, i]),
            ...Array(8).fill().map((_, i) => [1 + i, 0]),
            ...Array(8).fill().map((_, i) => [1 + i, 7]),
            ...Array(6).fill().map((_, i) => [8, 1 + i])]
      };

      function drawLetter(letter, offsetX, offsetY, scale = 4, delayOffset = 0) {
        letters[letter].forEach(function(pos, index) {
          const x = pos[0], y = pos[1];
          const star = document.createElement('div');
          star.className = 'star';
          const finalX = x * scale + offsetX;
          const finalY = y * scale + offsetY;

          const angle = Math.random() * 2 * Math.PI;
          const distance = 1000 + Math.random() * 500;
          const startX = Math.cos(angle) * distance;
          const startY = Math.sin(angle) * distance;

          star.style.left = finalX + 'px';
          star.style.top = finalY + 'px';
          star.style.transform = 'translate3d(' + startX + 'px, ' + startY + 'px, 0)';
          star.style.animation = 'fly-in 2s ease-out ' + (delayOffset + index * 0.01) + 's forwards, twinkle 2s infinite ease-in-out';

          document.body.appendChild(star);
        });
      }

      const scale = 4;
      const spacing = 140;
      const totalWidth = spacing * 5;
      const centerX = (window.innerWidth - totalWidth) / 2;
      const offsetY = 100;

      drawLetter('Z', centerX + spacing * 0, offsetY, scale, 0);
      drawLetter('Z', centerX + spacing * 1, offsetY, scale, 0.5);
      drawLetter('T', centerX + spacing * 2, offsetY, scale, 1);
      drawLetter('o', centerX + spacing * 3, offsetY + 10, scale, 1.5);
      drawLetter('p', centerX + spacing * 4, offsetY + 10, scale, 2);
    };
  </script>
</body>
</html>
`;
}

module.exports = generateEasterEggHTML;
