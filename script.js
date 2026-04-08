var audio = document.getElementById("aud1");
const playbtn = document.getElementById("playpausebtn");
const nextbtn = document.getElementById("nextbtn");
const previousbtn = document.getElementById("previousbtn");
const songlistelement = document.getElementById("songlist");
const songtitle = document.getElementById("songtitle");
const progressbar = document.getElementById("progressbar")

const playlists = {
  filmy: [
    { title: "jugraafiya", file: "songs/Jugraafiya - Full Video  Super 30  Hrithik Roshan & Mrunal Thakur  Udit Narayan & Shreya Ghoshal.mp3" },
    { title: "Phir le aaya dil", file: "songs/Phir Le Aya Dil - Video Edit - BarfiPritamArijitRanbirPriyankaIleana D'Cruz.mp3" },
    { title: "Nazar na lag jaaye", file: "songs/Nazar Na Lag Jaaye With Lyrics  STREE  Rajkummar Rao, Shraddha Kapoor  Ash King & Sachin-Jigar.mp3" },
    { title: "Khairiyat", file: "songs/Full Song_ KHAIRIYAT (BONUS TRACK)  CHHICHHORE  Sushant, Shraddha  Pritam, Amitabh BArijit Singh.mp3" }
  ],
  viral: [
    { title: "Line Without A Hook", file: "songs/Ricky Montgomery - Line Without a Hook (Official Lyric Video).mp3" },
    { title: "Pretty Little Baby", file: "songs/Connie Francis - Pretty Little Baby.mp3" },
    { title: "Sunflower", file: "songs/Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse) (Official Video).mp3" },
    { title: "Bye Bye Bye", file: "songs/NSYNC - Bye Bye Bye (Lyrics) (Deadpool 3 Soundtrack).mp3" },
    { title: "We Don't Talk Anymore", file: "songs/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez) [Official Video].mp3" }
  ],
  punjabi: [
    { title: "53 BARS", file: "songs/52 Bars  (Official Video) Karan Aujla  Ikky  Four You EP  First Song  Latest Punjabi Songs 2023.mp3" },
    { title: "HASS HASS", file: "songs/Hass Hass (Official Video) Diljit X Sia.mp3" },
    { title: "Illegal Weapon", file: "songs/ILLEGAL WEAPON  GARRY SANDHU JASMINE SANDLAS  INTENSE  FRESH MEDIA RECORDS.mp3" },
    {title:"DESI KALAKAR" , file:"songs/LYRICAL_ Desi Kalakaar Full Song with LYRICS  Yo Yo Honey Singh  Sonakshi Sinha.mp3"}
  ],
  old: [
    { title: "Abhi Na Jao Chhod Kar", file: "songs/Abhi Na Jaao Chhod Kar  Dev Anand  Sadhana  Mohd Rafi  Asha Bhosle  Hum Dono (1961).mp3" },
    { title: "Itna na Mujhse Pyaar Badha", file: "songs\Itna Na Mujhse Tu Pyaar Badha  Lata Mangeshkar, Talat Mahmood  Bollywood Classic Hit Song  Chhaya.mp3" },
   
  ],
  dance:[
    {title:"Soni de Nakhre", file:"songs/Full Video_ Soni De Nakhre  Partner  Govinda, Salman Khan, Katrina Kaif  Sajid - Wajid.mp3"}
  ],
  moody:[
    {title:"Old Town Road", file:"songs/Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus.mp3"}
  ],
  haryanvi:[
    {title:"Lofar", file:"songs/Lofar Masoom Sharma (Official Video) Swara verma  Pinna Music  New Haryanvi Song Haryanvi 2024.mp3"}
  ]
};

let songs = playlists.filmy;
let currentindex = 0;

function loadSong(index) {
  audio.src = songs[index].file;
  audio.load();
  songtitle.textContent = songs[index].title;
}

function rendersonglist() {
  songlistelement.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.style.cursor = "pointer";

    li.addEventListener("click", function () {
      currentindex = index;
      loadSong(currentindex);
      audio.play();
    });

    songlistelement.appendChild(li);
  });
}

playbtn.addEventListener("click", function () {
  if (audio.src === "") {
    loadSong(currentindex);
  }
  if (audio.paused) {
    audio.play();
  }
  else {
    audio.pause();
  }
});

nextbtn.addEventListener("click", function () {
  currentindex = (currentindex + 1) % songs.length;
  audio.pause();
  loadSong(currentindex);
  audio.play();
});

// Previous song
previousbtn.addEventListener("click", function () {
  currentindex = (currentindex - 1 + songs.length) % songs.length;
  loadSong(currentindex);
  audio.play();
});

loadSong(currentindex);
rendersonglist();

document.querySelectorAll(".card[data-playlist]").forEach(card => {
  card.addEventListener("click", function () {
    const playlistKey = card.getAttribute("data-playlist");
    if (playlists[playlistKey]) {
      songs = playlists[playlistKey];
      currentindex = 0;
      loadSong(currentindex);
      rendersonglist();
      audio.play();
    }
  });
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressbar.value = percent;
  }
});




