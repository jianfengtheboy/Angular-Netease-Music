import { Component, OnInit, ViewChild } from '@angular/core';
import api from '../../app.api';
import { InfiniteLoaderComponent } from 'ngx-weui';

@Component({
    selector : 'app-playlist',
    styleUrls : ['./indexPlaylist.component.css'],
    templateUrl : 'indexPlaylist.component.html'
})

export class IndexPlaylistComponent implements OnInit {
    offset = 0;
    list : any = {};
    loaded : Boolean = false;
    catelist : any = {
        checked : { name : ''},
        res : { all: {}, sub : [{ name : ''}], categories : []}
    };
    hiqulity: any = { name: '' };
    busy: Boolean = false;

    @ViewChild(InfiniteLoaderComponent) il;
    constructor() {}

    ngOnInit() {
        this.getcatelist()
    }
    getcatelist() {
        api.index_plcate().then(res => {
            this.catelist = {
                isShow : false,
                res : res.data,
                checked : res.data.all
            };
            this.catelist.res.categories = Object.values(
                this.catelist.res.categories
            );
            this.getplaylist(true, this.il);
            api.index_hqpl('全部', this.offset).then(res => {
                this.hiqulity = res.data.playlists[0] || {};
            })
        })
    }
    getplaylist(d : Boolean, comp : InfiniteLoaderComponent) {
        api.index_playlist(this.catelist.checked.name, this.offset)
            .then(res => {
                this.offset += res.data.playlists.length;
                if (!d) {
                    res.data.playlists = this.list.playlists.concat(res.data.playlists)
                }
                this.list = res.data;
                this.loaded = true;
                if (!this.list.more) {
                    comp.setFinished();
                    return
                }
                comp.resolveLoading()
           })
    }
    catecheck(idx) {
        this.catelist.checked = idx < 0 ? this.catelist.res.all : this.catelist.res.sub[idx];
        this.catelist.isShow = false;
        this.offset = 0;
        this.loaded = false;
        this.getplaylist(true, this.il);
    }
}
