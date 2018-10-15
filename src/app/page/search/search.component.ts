import { Component, OnInit, ViewChild } from '@angular/core';
import api from '../../app.api';
import { st } from '../../utils/st';
import { deepclone } from '../../utils/utils';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfiniteLoaderComponent } from 'ngx-weui';

@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
    @ViewChild(InfiniteLoaderComponent) il;

    recent_s = {};
    cur = 0;
    songs = {};
    tab = st;
    value = '';
    sts = deepclone(st);
    prevalue = '';
    suggest: any = {};
    multimatch: any = {};
    hot: Array<any> = [];
    focus = false;
    loaded = false;
    searching = false;
    music;
    recent = JSON.parse(localStorage.getItem('recent')) || [];

    constructor(private route: ActivatedRoute, private router: Router) {}
    ngOnInit() {
        api.search_hot().then(res => {
            this.hot = res.data.result.hots || [];
        });
    }
    loadmore() {
        console.log(this.router);
    }
    switchtab(index) {
        this.cur = index;
        if (!this.sts[index].loaded) {
            this.il.restart();
            this.search(false, false, this.il);
        }
    }
    searchFkey(v) {
        this.value = v;
        this.search(true, false, this.il);
    }
    clearecent(all = false, i = 0, event) {
        if (all) {
            this.recent = [];
        } else {
            this.recent.splice(i, 1);
        }
        localStorage.setItem('recent', JSON.stringify(this.recent));
        if (event) {
            event.stopPropagation();
        }
    }
    search_sug() {
        this.focus = true;
        if (!this.value) {
            return false;
        }
        api.search_suggest(this.value).then(res => {
            this.suggest = res.data.result || {};
            console.log(this.suggest);
        });
    }
    search(notw = true, more = false, comp: InfiniteLoaderComponent) {
        if ( this.searching ) {
            return;
        }
        this.searching = true;
        comp = comp || this.il;
        console.log(comp, this.value);
        // 关键词,是否是新搜索，是否是更多搜索
        if ( notw ) {
            this.sts = deepclone(st);
            comp.restart();
        }
        const curt = this.sts[this.cur];
        if (curt.none || !this.value) {
            return false;
        }
        if (notw && curt.type === 1) {
            api.search_multimatch(this.value, curt.type).then(res => {
                this.multimatch = res.data.result;
            });
        }
        api.search(this.value, curt.type, curt.offset).then(re => {
            const res = re.data.result;
            this.searching = false;
            this.loaded = true;
            this.focus = false;
            this.prevalue = this.value;
            const rarry =
                res.songs ||
                res.artists ||
                res.albums ||
                res.playlists ||
                res.mvs ||
                res.djprograms ||
                res.userprofiles ||
                [];
            let size =
                res.songCount ||
                res.artistCount ||
                res.albumCount ||
                res.playlistCount ||
                res.mvCount ||
                res.djprogramCount ||
                res.userprofileCount;
            size = size ? size : 0;
            curt.offset += rarry.length;
            curt.loaded = true;
            curt.none = curt.offset >= size || rarry.length < 20 ? true : false;
            if (more) {
                if ( this.cur === 0 ) {
                    curt.relist.songs = curt.relist.songs.concat(res.songs);
                }
                if ( this.cur === 1 ) {
                    curt.relist.artists = curt.relist.artists.concat(res.artists);
                }
                if ( this.cur === 2 ) {
                    curt.relist.albums = curt.relist.albums.concat(res.albums);
                }
                if ( this.cur === 3 ) {
                    curt.relist.playlists = curt.relist.playlists.concat(res.playlists);
                }
                if ( this.cur === 4 ) {
                    curt.relist.mvs = curt.relist.mvs.concat(res.mvs);
                }
                if ( this.cur === 5 ) {
                    curt.relist.djprograms = curt.relist.djprograms.concat(
                        res.djprograms
                    );
                }
                if ( this.cur === 6 ) {
                    curt.relist.userprofiles = curt.relist.userprofiles.concat(
                        res.userprofiles
                    );
                }
            } else {
                let t = true;
                for (const i in this.recent) {
                    if (this.recent[i] === this.value) {
                        t = false;
                    }
                }
                if ( t ) {
                    this.recent.unshift(this.value);
                }
                localStorage.setItem('recent', JSON.stringify(this.recent));
                curt.relist = res;
            }
            this.sts[this.cur] = curt;
            if (curt.none) {
                comp.setFinished();
                return;
            }
            comp.resolveLoading();
        });
    }
    urltn(str) {
        if (!str) {
            return '';
        }
        str = str.split('/');
        str = str[str.length - 1];
        return str.split('.')[0];
    }
    mo2name(v) {
        switch (v) {
            case 'mv':
                return 'MV';
            case 'radio':
                return '电台';
            case 'album':
                return '专辑';
            case 'artist':
                return '歌手';
            case 'user':
                return '用户';
            case 'video':
                return '视频';
        }
    }
}
