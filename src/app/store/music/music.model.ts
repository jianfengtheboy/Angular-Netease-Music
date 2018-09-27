export class Music {
    constructor(
        public al,
        public ar,
        public artists,
        public album,
        public dj,
        public radio,
        public mainSong
    ){}
}

export const initMusic : Music = {
    al : {},
    ar : [{}],
    artists : [{}],
    album : {},
    dj : {},
    radio : {},
    mainSong : {
        album : {}
    }
}
