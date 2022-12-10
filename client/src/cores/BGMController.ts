class BGMController {
  private static _bgm = new Audio();
  private static _originalVolume = 1;
  private static _volume = 1;
  private static _muted = false;

  private constructor() {}

  static get volume() {
    return this._volume;
  }

  static get muted() {
    return this._muted;
  }

  static setBGM(bgm: any) {
    this._bgm = bgm;
    this._originalVolume = bgm.volume;
  }

  static setVolume(param: number | ((volume: number) => number)) {
    if (typeof param === 'number') {
      this._volume = param;
      this._bgm.volume = this._volume * this._originalVolume;
    } else {
      this.setVolume(param(this._volume));
    }
  }

  static off() {
    this._bgm.volume = 0;
    this._muted = true;
  }

  static on() {
    this._bgm.volume = this._volume * this._originalVolume;
    this._muted = false;
  }

  static play() {
    this._bgm.volume = this.muted ? 0 : this._volume * this._originalVolume;
    this._bgm.play();
  }

  static pause() {
    this._bgm.pause();
  }
}

export { BGMController };
