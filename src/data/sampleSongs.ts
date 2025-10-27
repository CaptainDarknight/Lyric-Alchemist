// Sample songs with LRC format lyrics for the Lyric Alchemist

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  lrcLyrics: string;
  url?: string;     // optional to match your object
}

export const SAMPLE_SONGS: Song[] = [
  {
    id: "1",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    duration: 262,
    url: "/songs/ThumHiho.mp3",
    lrcLyrics: `[00:10.00]Hum tere bin ab reh nahi sakte
[00:15.00]Tere bina kya wajood mera
[00:20.00]Hum tere bin ab reh nahi sakte
[00:26.00]Tere bina kya wajood mera
[00:36.00]Tujh se juda agar ho jayenge
[00:40.00]To khud se hi ho jayenge juda
[00:48.00]Kyunki tum hi ho
[00:51.00]Ab tum hi ho
[00:54.00]Zindagi ab tum hi ho
[00:55.00]Chain bhi mera dard bhi
[01:00.00]Meri aashiqui ab tum hi ho
[01:05.00]Tera mera rishta hai kaisa
[01:10.00]Ik pal door gawara nahi
[01:15.00]Tere liye har roz hai jeete
[01:20.00]Tujhko diya mera waqt sabhi
[01:25.00]Koi lamha mera na ho tere bina
[01:30.00]Har saans pe naam tera
[01:35.00]Kyunki tum hi ho
[01:40.00]Ab tum hi ho
[01:45.00]Zindagi ab tum hi ho
[01:50.00]Chain bhi mera dard bhi
[01:55.00]Meri aashiqui ab tum hi ho
[02:00.00]Tere liye hi jiya main
[02:05.00]Khud ko jo yun de diya hai
[02:10.00]Teri wafa ne mujhko sambhala
[02:15.00]Saare ghamo ko dil se nikala
[02:20.00]Tere saath mera hai naseeb juda
[02:25.00]Tujhe paake adhoora na raha
[02:30.00]Kyunki tum hi ho
[02:35.00]Ab tum hi ho
[02:40.00]Zindagi ab tum hi ho
[02:45.00]Chain bhi mera dard bhi
[02:50.00]Meri aashiqui ab tum hi ho
[02:55.00]Meri aashiqui ab tum hi ho
[03:00.00]Meri aashiqui ab tum hi ho
[03:05.00]Meri aashiqui ab tum hi ho
[03:10.00]Meri aashiqui ab tum hi ho`
  },
  {
    id: "2",
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik & Arijit Singh",
    duration: 341, // 5 min 41 sec
    url: "/songs/Tum_sath_ho.mp3",
    lrcLyrics: `
[00:00.00]Gar tum saath ho
[00:04.00]Teri nazron mein hai tere sapne
[00:08.00]Tere sapno mein hai naraazi
[00:12.00]Mujhe lagta hai ki baatein dil ki
[00:16.00]Hoti lafzon ki dhokebaazi
[00:20.00]Tum saath ho ya na ho
[00:24.00]Kya fark hai
[00:28.00]Bedard thi zindagi bedard hai
[00:33.00]Agar tum saath ho


`
  }
];
