let instance = null;

export default class AudioManager {

  constructor() {

    if (instance) return instance;

    this.sounds = new Map();
    this.music = null;
    this.masterVolume = 0.5;

    instance = this;
  }

  static getInstance() {
    return instance;
  }

  loadSound(name, src) {

    const audio = new Audio(src);
    audio.volume = this.masterVolume;

    this.sounds.set(name, audio);
  }

  playSound(name) {

    const sound = this.sounds.get(name);
    if (!sound) return;

    const clone = sound.cloneNode();
    clone.volume = this.masterVolume * 0.2;

    clone.play();
  }

  playMusic(src) {

    if (this.music) {
      this.music.pause();
    }

    this.music = new Audio(src);
    this.music.loop = true;
    this.music.volume = this.masterVolume;

    this.music.play();
  }

  setVolume(volume) {

    this.masterVolume = volume;

    if (this.music) {
      this.music.volume = volume;
    }

    this.sounds.forEach(sound => {
      sound.volume = volume;
    });

  }

  stopMusic() {

    if (this.music) {
      this.music.pause();
    }

  }

}