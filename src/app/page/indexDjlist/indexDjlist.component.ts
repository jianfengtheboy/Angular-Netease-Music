import { Component, OnInit, ViewChild } from '@angular/core';
import api from '../../app.api';
import { InfiniteLoaderComponent } from 'ngx-weui';

@Component({
    selector: 'app-djlist',
    styleUrls: ['./indexDjlist.component.css'],
    templateUrl: 'indexDjlist.component.html'
})

export class IndexDjlistComponent implements OnInit {
    @ViewChild(InfiniteLoaderComponent) il;
    offset = 0;
    djcate: any = {
        categories: []
    };
    loaded: Boolean = false;
    djrecs: any = {
        rec_p: {},
        rec_d: {}
    };
    djlist = [];
    constructor() {}
    ngOnInit() {
        this.djall();
    }
    djall() {
        api.index_dj().then(res => {
            this.djcate = res[0].data;
            this.djrecs = {
                rec_p: res[1].data,
                rec_d: res[2].data
            };
            this.loaded = true;
            this.djlist = res[3].data.djRadios;
            this.offset = res[3].data.djRadios.length;
        });
    }
    getdjlist(comp: InfiniteLoaderComponent) {
        api.index_djlist(this.offset)
            .then(res => {
                this.offset += res.data.djRadios.length;
                res.data.djRadios = this.djlist.concat(res.data.djRadios);
                this.djlist = res.data.djRadios;
                if ( !res.data.hasMore ) {
                    comp.setFinished();
                    return;
                }
                comp.resolveLoading();
            })
            .catch(res => {
                console.log(res);
            });
    }
}
