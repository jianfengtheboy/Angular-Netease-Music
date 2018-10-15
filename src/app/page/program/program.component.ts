import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import api from '../../app.api';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.css']
})

export class ProgramComponent implements OnInit {
    showlrc = false;
    loaded = false;
    playing = false;
    id = 0;
    pop_tg = 0;
    list_dj = [];
    music: any = {};
    playurl;
    program: any = {};
    playtime;
    audio;
    index_dj = 0;
    commentscount = 0;
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.audio = document.getElementById('music');
        this.route.params.subscribe(params => {
            this.id = params.id;
            this.get();
        });
    }
    get() {
        api.program_detail(this.id).then(res => {
            this.program = res.data.program;
            this.getcommit();
            api.music_detail(this.program.mainSong.id).then(re => {
                this.music = re.data.songs[0];
                this.getplayurl();
            });
        });
    }
    getcommit() {
        api.comments(this.program.commentThreadId, 0, 1).then(res => {
            this.commentscount = res.data.total;
        });
    }
    heart() {
        if (this.program.id ) {
          api.program_like(this.program.commentThreadId, this.program.liked ? 0 : 1)
            .then(res => {
                if (res.data.code !== 200) {
                    return;
                }
                this.program.liked = !this.program.liked;
                this.program.liked ? this.program.likedCount++ : this.program.likedCount--;
          });
        }
    }
    djradio_sub() {
        api.dj_sub(this.program.radio.id, this.program.radio.subed ? 0 : 1)
            .then(res => {
                if (res.data.code === 200) {
                    this.program.radio.subed = !this.program.radio.subed;
                }
            });
    }
    psaction() {
        this.pop_tg = 3;
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

    }
    getplayurl() {
        api.music_url(this.music.id).then(res => {
            this.playurl = res.data.data[0].url;
        });
    }
    playingtime(v) {
        let time = this.audio.currentTime;
        time = Math.round(time * 1000);
        this.playtime = time;
    }
    setplaying() {
        this.audio.play();
        this.playing = true;
    }
}
