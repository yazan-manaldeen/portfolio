export class SetAppLanguage {
  static readonly type = 'SetAppLanguage';

  constructor(public lang: string) {
  }
}

export class SetAppTheme {
  static readonly type = 'SetAppTheme';

  constructor(public theme: string) {
  }
}

export class DownloadCV {
  static readonly type = 'DownloadCV';

  constructor() {
  }
}
