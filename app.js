// Selection
const image = document.querySelector('.image');
const disc = document.querySelector('.disc');
const mName = document.querySelector('.m-name');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const duration = document.querySelector('.duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');

let songIndex = 0;

// songs info
const songs = [
    {
        image: "./images/playdate.jpg",
        disc: "./music/playdate.mp3",
        name: "Play Date",
        duration: "3:00"
    },
    {
        image: "./images/memories.jpg",
        disc: "./music/memories.mp3",
        name: "Memories",
        duration: "3:15"
    },
    {
        image: "./images/taylor-swift.jpg",
        disc: "./music/taylor-swift.mp3",
        name: "Taylor Swift",
        duration: "4:12"
    }
];

// load songs
loadSongs(songs[songIndex]);

// load song information
function loadSongs(song) {
    image.src = song.image;
    disc.src = song.disc;
    mName.textContent = song.name;
    duration.textContent = song.duration;
}


function playPauseCheck() {
    if (disc.paused) {
        disc.play();
    } else {
        disc.pause();
    }
}

play.addEventListener('click', playPauseCheck);

// play/pause icon check 
function iconCheck() {
    if (disc.paused) {
        play.classList.add('fa-play');
        play.classList.remove('fa-pause');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}

disc.addEventListener('play', iconCheck);
disc.addEventListener('pause', iconCheck);

// update progress-bar
function progressBar() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    time.textContent = `${minutes}:${seconds}`;
}

disc.addEventListener('timeupdate', progressBar);

// progress container setup
function setProgress(e) {
    const totalWidth = this.clientWidth;
    const clickWidth = e.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}

progressContainer.addEventListener('click', setProgress);

// click next song
function nextSong() {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
        console.log(songIndex);
    } else {
        songIndex = songIndex + 1;
        console.log(songIndex);
    }
    loadSongs(songs[songIndex]);
    iconCheck();
    reset();
}

next.addEventListener('click', nextSong);

// click previous song
function previousSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }
    loadSongs(songs[songIndex]);
    iconCheck();
    reset();
}

prev.addEventListener('click', previousSong);

//reset progress bar
function reset() {
    progress.style.width = 0 + '%';
    time.textContent = '0:00';
}