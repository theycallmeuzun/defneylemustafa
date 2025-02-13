function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-20px';
    heart.style.opacity = '0.8';
    heart.style.zIndex = '-1';
    heart.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
    document.querySelector('.floating-hearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Müzik kontrolü
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const button = document.getElementById('music-toggle');
    const icon = button.querySelector('.icon');
    const text = button.querySelector('span:not(.icon)');
    
    // Ses ayarı
    audio.volume = 0.3;
    
    // Müzik durumunu kontrol et ve güncelle
    function toggleMusic() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    icon.textContent = '🔊';
                    text.textContent = 'Durdur';
                    button.style.background = 'linear-gradient(45deg, #ff8e8e, #ff6b6b)';
                })
                .catch(err => {
                    console.error('Müzik başlatılamadı:', err);
                });
        } else {
            audio.pause();
            icon.textContent = '🎵';
            text.textContent = 'Müzik';
            button.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
        }
    }

    // Müzik yüklenme kontrolü
    audio.addEventListener('loadeddata', () => {
        button.disabled = false;
        console.log('Müzik yüklendi');
    });

    // Müzik hata kontrolü
    audio.addEventListener('error', (e) => {
        console.error('Müzik yüklenemedi:', e);
        button.disabled = true;
    });

    // Butona tıklama olayı
    button.addEventListener('click', toggleMusic);

    // Zarf kontrolü
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    let isLetterOpen = false;

    envelope.addEventListener('click', () => {
        if (!isLetterOpen) {
            letter.classList.add('active');
            envelope.style.transform = 'scale(0.9) translateY(10px)';
            envelope.style.display = 'none';
            isLetterOpen = true;
        }
    });

    // Herhangi bir yere tıklandığında mektubu kapat
    document.addEventListener('click', (e) => {
        if (isLetterOpen && !letter.contains(e.target) && e.target !== envelope) {
            letter.classList.remove('active');
            envelope.style.display = 'inline-block';
            envelope.style.transform = 'none';
            isLetterOpen = false;
        }
    });
}); 