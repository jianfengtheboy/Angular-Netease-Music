import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfiniteLoaderComponent } from 'ngx-weui';
import api from '../../app.api';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.css']
})

export class RadioComponent implements OnInit {
    @ViewChild(InfiniteLoaderComponent) il;
    djradio: any = {
        dj: {},
        subed: false,
        commentDatas: []
    };
    name = '';
    cur = 1;
    tab = [
        {
            name: '详情'
        },
        {
            name: '节目',
            text: 0
        }
    ];
    music: any = { id: 0 };
    offset = 0;
    id = -1;
    loaded = false;
    programs: any = { programs: [] };
    constructor(private route: ActivatedRoute, private router: Router) {}
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params.id;
            this.loadj();
        });
    }
    switchtab(index) {
        this.cur = index;
        if (this.cur === 0) {
            this.il.setFinished();
        } else {
            this.il.restart();
        }
    }
    async loadj() {
        await api
            .dj_detail(this.id)
            .then(res => {
                this.djradio = res.data.djRadio;
            })
            .catch(() => {});
            this.getprogram(false, this.il);
    }
    getprogram(more = true, comp: InfiniteLoaderComponent) {
        if (this.cur !== 1 || (this.loaded && !this.programs.more)) {
            return;
        }
        api.dj_getprogram(this.id, this.offset).then(res => {
            if (more) {
                res.data.programs = this.programs.programs.concat(res.data.programs);
            }
            this.programs = res.data;
            this.offset = res.data.programs.length;
            this.loaded = true;
            if (!res.data.more) {
                comp.setFinished();
                return;
            }
            comp.resolveLoading();
        });
    }
    djradio_sub() {
        api.dj_sub(this.id, this.djradio.subed ? 0 : 1).then(res => {
            if (res.data.code === 200) {
                this.djradio.subed = !this.djradio.subed;
            }
        });
    }
}
