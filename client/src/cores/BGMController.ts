class BGMController {
  private static _bgm = new Audio();
  private static _originalVolume = 1;
  private static _volume = 1;

  private constructor() {}

  static get volume() {
    return BGMController._volume;
  }

  static setBGM(bgm: any) {
    this._bgm = bgm;
    this._originalVolume = bgm.volume;
  }

  static setVolume(volume: number) {
    BGMController._volume = volume;
    BGMController._bgm.volume =
      BGMController._volume * BGMController._originalVolume;
  }

  static off() {
    BGMController._bgm.volume = 0;
  }

  static on() {
    BGMController._bgm.volume =
      BGMController._volume * BGMController._originalVolume;
  }

  static play() {
    BGMController._bgm.play();
  }

  static pause() {
    BGMController._bgm.pause();
  }
}

export { BGMController };
