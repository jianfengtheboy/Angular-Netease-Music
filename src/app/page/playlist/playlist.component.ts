import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import Api from '../../app.api';
import { id2Url } from '../../utils/base64';
import { Store } from '@ngrx/store';
import { Music, initMusic } from '../../store/music/music.model';

@Component({
    selector: 'app-playlist',
    styleUrls: ['./playlist.component.css'],
    templateUrl: './playlist.component.html'
})

export class PlayListComponent implements OnInit {
    music: Music = initMusic;
    constructor(private route: ActivatedRoute, private router: Router, private store$: Store<any>) {
        // console.log('asdasd:', this.store$, this.music);
        this.store$.select('musicReducer').subscribe(_list => {
            if (_list) {
                console.log('store music ', _list);
            }
        });
    }
    loaded: Boolean = false;
    title = '歌单';
    cover: String = '';
    name: String = '';
    id: String;
    istoptype: Number = 0;
    canplay: Array<Object> = [];
    list: any = { playlist: { creator: {} } };
    ngOnInit() {
        this.store$.dispatch({type: 'SET_MUSIC', payload: 519935113});
        this.route.queryParams.subscribe(queryParams => {
            this.name = queryParams.name || '';
            this.istoptype = queryParams.istop || 0;
        });
        this.route.params.subscribe(params => {
            this.GetPlayListById(params.id);
        });
    }
    GetPlayListById(id: String) {
        this.id = id;
        Api.playlist(id, 0).then(res => {
            this.loaded = true;
            if (res.data.code !== 200) {
                alert(res.data.msg);
                return;
            }
            const canplay = res.data.playlist.tracks.map(item => {
                if (item.st >= 0) {
                    return item;
                }
            });
            this.canplay = this.canplay.concat(canplay);
            this.cover =
                this.cover ||
                id2Url(
                    res.data.playlist.coverImgId_str || res.data.playlist.coverImgId
                );
            this.list = res.data;
        });
    }
    playall() {}
}
