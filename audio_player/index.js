const song = document.querySelector('.song'),
      playBtn = document.querySelector('.play-pause'),
      musicCurrentTime = document.querySelector('.currentTime'),
      progressBar = document.querySelector('.progress-bar'),
      durationTime = document.querySelector('.durationTime'),
      songTitle = document.querySelector('song-title'),
      songArtist = document.querySelector('.song-artist'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      title = document.querySelector('.song-title'),
      artist = document.querySelector('.song-artist'),
      cover = document.querySelector('.cover'),
      musicBox = document.querySelector('.box');


let isPlay = false;
let songNum = 0;      


const coverArr = ['./assets/img/tv_girl.jpg', './assets/img/this_charmig_man.jpg', './assets/img/This_must_be_the_place.jpeg'];
const songsArr = ['./assets/audio/TV Girl - Cigarettes out the Window.mp3', './assets/audio/The Smiths - This Charming Man.mp3', './assets/audio/Talking_Heads_This_Must_Be_The_Place.mp3'];
const artistArr = ['TV Girl', 'The Smiths', 'Talking Heads'];
const titleArr = ['Cigarettes out the Window', 'This Charming Man', 'This Must Be The Place'];
let songsLength = coverArr.length - 1;

window.addEventListener("load", ()=>{
  changeDuration();
}); 

function changeDuration() {
  let duration = song.duration;
  let minutes = Math.floor(Math.floor(duration) / 60);
  let seconds = Math.floor(duration) % 60;
  progressBar.max = Math.floor(duration);
  durationTime.textContent = `${minutes}:${seconds}`;
}

function playAudio() {
  if(!isPlay) {
      song.play();
      isPlay = true;
      playBtn.src = './assets/svg/music_pause_button.svg';
      musicBox.classList.add('active');
  } else {
    song.pause();
    isPlay = false;
    playBtn.src = './assets/svg/music_play_button.svg';
    musicBox.classList.remove('active');
  }
}

playBtn.addEventListener('click', () => {
  playAudio();
});

document.addEventListener('keydown', (e) => {
  if (e.code == 'Space') {
    e.preventDefault();
    playAudio(song);
  }
});

const currentTime = progressBar.value;
let totalMin = Math.floor(currentTime / 60);
let totalSec = Math.floor(currentTime % 60);
musicCurrentTime.textContent = `${totalMin}:0${totalSec}`;

song.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  progressBar.value = `${currentTime}`;
  let totalMin = Math.floor(currentTime / 60);
  let totalSec = Math.floor(currentTime % 60);
  if(totalSec < 10){ 
    totalSec = `0${totalSec}`;
  }
  musicCurrentTime.textContent = `${totalMin}:${totalSec}`;
});

function changeSong(){
  song.src = songsArr[songNum];
  cover.src = coverArr[songNum];
  title.textContent = titleArr[songNum];
  artist.textContent = artistArr[songNum];
}


progressBar.addEventListener('click', () => {
  const currentTime = progressBar.value;
  let totalMin = Math.floor(currentTime / 60);
  let totalSec = Math.floor(currentTime % 60);
  musicCurrentTime.textContent = `${totalMin}:${totalSec}`;
  song.currentTime = currentTime;
});

progressBar.addEventListener('touchend', () => {
  const currentTime = progressBar.value;
  let totalMin = Math.floor(currentTime / 60);
  let totalSec = Math.floor(currentTime % 60);
  musicCurrentTime.textContent = `${totalMin}:${totalSec}`;
  song.currentTime = currentTime;
  console.log('touch');
});

nextBtn.addEventListener('click', () => {
  songNum += 1;
  if (songNum > songsLength) {
    songNum = 0;
  }
  changeSong();
  if (isPlay){
    isPlay = false;
    playAudio(song);
  } else{
    playAudio(song);
  }
});

prevBtn.addEventListener('click', () => {
  songNum -= 1;
  if (songNum < 0) {
    songNum = songsLength;
  }
  changeSong();
  if (isPlay){
    isPlay = false;
    playAudio(song);
  } else{
    playAudio(song);
  }
});

song.addEventListener('ended', () => {
  songNum += 1;
  if (songNum > songsLength) {
    songNum = 0;
  }
  changeSong();
  if (isPlay){
    isPlay = false;
    playAudio(song);
  } else{
    playAudio(song);
  }
});

song.addEventListener('canplay', () => {
  changeDuration();
});


console.log('60/60 \n 1. Есть кнопка play/pause, "Вперёд" и "Назад"; Есть футер \n\
2. Кнопка play/pause работает \n\
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек.\n\
4. При смене аудиотрека меняется изображение - обложка аудиотрека \n\
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека \n\
6. Отображается продолжительность аудиотрека и его текущее время проигрывания \n\
7. Есть небольшой дополнительный функционал: При клике на пробел работает функция остановки и включения трека');
