import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Api from '../../app.api';
import { id2Url } from '../../utils/base64';
import { parse_lrc } from '../../utils/utils';

@Component({
    selector: 'app-fm',
    templateUrl: './fm.component.html',
    styleUrls: ['./fm.component.css']
})

export class FmComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}
    loaded: Boolean = false;
    cover: String = '';
    id: String;
    canplay: Array<Object> = [];
    playtime;
    playing: Boolean = false;
    playurl;
    music: any = { name: '', al: {picUrl: ''}, ar: [{}] };
    star: Boolean = false;
    showlrc: Boolean = false;
    lrcObj: any = {
        code: 0,
        nolyric: false,
        scroll: false,
        lrc: [],
        uncollected: false
    };
    commentscount: any;
    audio;
    ngOnInit() {
        this.audio = document.getElementById('music');
        this.getfm();
    }
    getfm() {
        this.playtime = 0;
        Api.fm().then(res => {
            if (res.data.code !== 200) {
                return;
            }
            this.GetMusicDetailById(res.data.data[0].id);
        });
    }
    GetMusicDetailById(id: String) {
        this.id = id;
        Api.music_detail(id).then(res => {
            this.music = res.data.songs[0];
            this.getcommit();
            this.getplayurl();
            this.loadlrc();
        });
    }
    getcommit() {
        Api.comments(this.music.id, 0, 2).then(res => {
            this.commentscount = res.data.total;
        });
    }
    getplayurl() {
        Api.music_url(this.music.id).then(res => {
            this.playurl = res.data.data[0].url;
        });
    }
    loadlrc() {
        Api.lyric(this.music.id).then(res => {
            if (res.data.code !== 200) {
                return;
            }
            const lrc = parse_lrc(
                res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : ''
            );
            const tlrc = parse_lrc(
                res.data.tlyric && res.data.tlyric.lyric ? res.data.tlyric.lyric : ''
            );
            const tlrcs = tlrc.now_lrc;
            if (tlrcs.length) {
                lrc.now_lrc.map((v, i) => {
                    tlrcs.forEach(k => {
                        if (k.lrc_sec === v.lrc_sec) {
                            v.tlrc = k.lrc === v.lrc ? '' : k.lrc;
                        }
                    });
                    return v;
                });
            }
            res.data.lrc = lrc.now_lrc;
            res.data.scroll = lrc.scroll ? 1 : 0;
            this.lrcObj = res.data;
        });
    }
    heart() {}
    playingtime(v) {
        let time = this.audio.currentTime;
        time = Math.round(time * 1000);
        this.playtime = time;
    }
    Esetplaying(v) {
        this.playing = v;
        if (v) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }
    EseekMusic(v) {
        const time = Math.round(v * 1000);
        // this.audio.currentTime = time;
    }
    next_music() {
        this.getfm();
    }
    setplaying() {
        this.audio.play();
        this.playing = true;
    }
}
