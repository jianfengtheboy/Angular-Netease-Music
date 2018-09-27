import { Injectable } from '@angular/core';

const defaultMusic = {
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

@Injectable()
export class StoreService {
    music = defaultMusic;
    index_am;
    index_dj;
    index_fm;
    list_fm;
    list_am;
    list_dj;
    playing;
    playtype;
    bgmchange;
    shuffle_am;
    shuffle_dj;
    playtime;
    commentsCount;
    lrc;
    playurl;
    likeall;
    musicloading;
    constructor() {}
    setplaying(t) {
        this.playing = t;
        if (this.playing) {
            this.musicloading = false;
            // document.getElementById('audio').play()
        }else{
            // document.getElementById('audio').pause()
        }
    }
    setmusic(res) {
        res = res || defaultMusic;
        res.heart = false;
        if (res.id && this.likeall.indexOf(res.id) > -1) {
            res.heart = true
        }
        this.music = res;
    }
    waiting(this) {
        this.musicloading = true;
    }
    setlrc(res) {
        this.lrc = res;
    }
    setplaytype(type) {
        this.playtype = type;
    }
    setmusicload(type) {
        this.musicloading = type;
    }
    setplaylist(arr) {
        this.playtype === 1 ? (this.list_am = arr) : (this.list_dj = arr);
    }
    setindex(i) {
        this.playtype === 1 ? (this.index_am = i) : (this.index_dj = i);
    }
    playindex(i) {
        if (this.playtype === 1) {
            this.index_am = i;
            // this.music = this.music.id == this.list_am[i].id ? this.music : this.list_am[i]
        } else {
            this.index_dj = i;
            // this.music = this.music.id == this.list_dj[i].id ? this.music : this.list_dj[i]
        }
        // this.commit('resetmusic')
    }
    resetmusic() {
        //初始音乐
        //document.getElementById('audio').pause()
        this.commentsCount = 0;
        this.playurl = '';
        this.playing = false;
        this.lrc = {
            lrc : [{}]
        };
        this.musicloading = true;
        this.playtime = 0;
    }
}
