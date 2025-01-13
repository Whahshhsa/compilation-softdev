document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const songImage = document.getElementById('song-image');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const remainingTimeEl = document.getElementById('remaining-time');

    let isPlaying = false;

    const songs = [
        { title: 'Valentina', src:'/mp3v2/songs/Daniel Caesar - Valentina (Lyric Video) - DanielCaesarVEVO.opus', img:'/mp3v2/images/valentina.jpeg', class: 'music' },
        { title: 'Sining', src: '/mp3v2/songs/Dionela - sining (Official Lyric Video) ft. Jay R - DionelaVEVO.opus', img:'/mp3v2/images/sining.jpg', class: 'music2' },
        { title: 'Connections', src: '/mp3v2/songs/connections ft yume.mp3', img:'/mp3v2/images/connections.jpg', class: 'music3' },
    ];

    function loadSong(index) {
        audio.src = songs[index].src;
        document.getElementById('song-title').textContent = songs[index].title;
        songImage.src = songs[index].img;
        resetProgressBar();
    }

    function playSong(index) {
        loadSong(index);
        audio.play();
        playButton.textContent = 'Pause';
        isPlaying = true;

        // Remove the playing class from all songs
        document.querySelectorAll('.music, .music2, .music3').forEach(el => el.classList.remove('playing'));
        // Add the playing class to the current song
        document.querySelector(`.${songs[index].class}`).classList.add('playing');
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playButton.textContent = 'Play';
        } else {
            audio.play();
            playButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
        console.log(`isPlaying: ${isPlaying}`);
    }

    function updateProgressBar() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        // Update remaining time overlay
        remainingTimeEl.style.width = `${100 - progress}%`;

        // Update current time and duration
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }

    function resetProgressBar() {
        progressBar.value = 0;
        remainingTimeEl.style.width = '100%';
        currentTimeEl.textContent = '0:00';
        durationEl.textContent = '0:00';
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

    playButton.addEventListener('click', togglePlay);
    audio.addEventListener('timeupdate', updateProgressBar);
    audio.addEventListener('ended', () => {
        playButton.textContent = 'Play';
        isPlaying = false;
        document.querySelectorAll('.music, .music2, .music3').forEach(el => el.classList.remove('playing'));
    });
    progressContainer.addEventListener('click', setProgress);
    loadSong(0); // Load the initial song

    // Attach playSong to the global scope
    window.playSong = playSong;
});
