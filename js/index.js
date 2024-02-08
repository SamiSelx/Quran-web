let audio = new Audio();
let numberSurah = 5;
audio.src = `https://download.quranicaudio.com/qdc/abdul_baset/murattal/${numberSurah}.mp3`;

// btn.onclick = () => {
//   if (audio.paused) {
//     audio.play();
//   } else {
//     audio.pause();
//     audio.load();
//   }
// };

let playing = false;
let surahPlaylist = document.querySelector(".surah-playlist");

surahPlaylist.innerHTML = "";

fetch("https://api.quran.com/api/v4/chapters")
  .then((response) => response.json())
  .then((data) => {
    let surah = data.chapters;
    surah.forEach((element) => {
      surahPlaylist.innerHTML += `
      <div class="surah-box">
      <div>
          <span class="number">${element.id}</span>
          <div class="img">
              <img src="./img/quran.png" alt="">
              <i class="fa-solid fa-play"></i>
          </div>
          <p class="surah">سورة ${element.name_arabic}</p>
      </div>
      <div class="time">2min</div>
  </div>
      `;
    });
    document.querySelectorAll(".surah-box").forEach((sur, index) => {
      sur.addEventListener("click", () => {
        handleClickAudio(index);
      });
    });
  })
  .catch((e) => console.log(e));

function handleClickAudio(id) {
  fetch("https://api.quran.com/api/v4/chapter_recitations/2/" + (id + 1))
    .then((response) => response.json())
    .then((data) => {
      if (!playing) {
        audio.src = data.audio_file.audio_url;
        audio.play();
        playing = true;
      } else {
        audio.pause();
        playing = false;
      }
    })
    .catch((e) => console.log("Audio Not Found"));
}
