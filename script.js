// script.js
// Contador que atualiza o conteúdo do <h1 id="contador"> em tempo real
// Coloque uma data inicial no atributo `data-start` do h1 no formato ISO (ex: "2024-11-25T00:00:00").
// Se não houver `data-start`, o contador iniciará a partir do carregamento da página.

(function () {
    const h1 = document.getElementById('contador');
    const botao = document.getElementById('botao-inicio');
    let startTime = null; // em ms
    let paused = false;
    let intervalId = null;

    function pad(num) {
        return String(num).padStart(2, '0');
    }

    function computeAndRender() {
        const now = Date.now();
        const diff = now - startTime; // ms

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Exibe no formato: "X dias HH:MM:SS"
        h1.textContent = `${days} Dias Junto${days !== 1 ? 's' : ''} ${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos `;
    }

    function startCounter() {
        if (!startTime) {
            // tenta ler data inicial do atributo data-start
            const ds = h1.getAttribute('data-start');
            if (ds) {
                const parsed = Date.parse(ds);
                if (!isNaN(parsed)) startTime = parsed;
                else startTime = Date.now();
            } else {
                startTime = Date.now();
            }
        }

        if (intervalId) clearInterval(intervalId);
        computeAndRender();
        intervalId = setInterval(computeAndRender, 1000);
        paused = false;
        
    }

    // Função global chamada pelo botão
    window.iniciar = function () {
        if (!intervalId) startCounter();
        else stopCounter();
    };

    // Inicia automaticamente ao carregar (se preferir, remova esta linha e dependa do botão)
    document.addEventListener('DOMContentLoaded', () => {
        // Se houver data-start vazia, não iniciamos automaticamente (espera o botão)
        const ds = h1.getAttribute('data-start');
        if (ds) startCounter();
        // Caso queira iniciar sempre automaticamente, descomente a linha abaixo:
        startCounter();
    });

    /* ---------- Slideshow simples para #imagens ---------- */
    const fotoEl = document.getElementById('imagens');
    const fotos = [
        'photo/inicio/imagens01.jpeg',
        'photo/inicio/imagens02.jpeg',
        'photo/inicio/imagens03.jpeg',
        'photo/inicio/imagens04.jpeg',
        'photo/inicio/imagens05.jpeg',
        'photo/inicio/imagens06.jpeg',
        'photo/inicio/imagens07.jpeg',
        'photo/inicio/imagens08.jpeg',
        'photo/inicio/imagens09.jpeg',
        'photo/inicio/imagens10.jpeg',
        'photo/inicio/imagens11.jpeg'

    ];
    let slideIndex = 0;
    let slideshowId = null;

    function showCurrentPhoto() {
        if (!fotoEl) return;
        fotoEl.src = fotos[slideIndex];
    }

    function nextPhoto() {
        slideIndex = (slideIndex + 1) % fotos.length;
        showCurrentPhoto();
    }

    function startSlideshow(intervalMs = 2500) {
        if (!fotoEl) return;
        showCurrentPhoto();
        if (slideshowId) clearInterval(slideshowId);
        slideshowId = setInterval(nextPhoto, intervalMs);
    }

    function stopSlideshow() {
        if (slideshowId) {
            clearInterval(slideshowId);
            slideshowId = null;
        }
    }

    // Inicia slideshow automaticamente após o carregamento
    document.addEventListener('DOMContentLoaded', () => {
        startSlideshow(3000);
    });

    // expõe funções de controle caso queira chamar pelo console
    window.startSlideshow = startSlideshow;
    window.stopSlideshow = stopSlideshow;

})();

function iniciarCarta() {
    // Abre o arquivo local `carta.html` em nova aba; se bloqueado, abre na mesma aba.
    const opened = window.open('carta.html', '_self');
    if (!opened) {
        window.location.href = 'carta.html';
    }
}