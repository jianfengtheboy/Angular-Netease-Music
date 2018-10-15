import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import Api from '../../app.api';
import { TabComponent } from '../../components/tab/tab.component';
import { PlayIconComponent } from '../../components/playicon/playicon.component';

@Component({
    selector : 'app-home',
    styleUrls : ['./home.component.css'],
    templateUrl : './home.component.html',
    encapsulation : ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
    banner : any = [];
    rec_pl = [];
    thisday = new Date().getDate();
    rec_ns = [];
    rec_mv = [];
    rec_dj = [];
    bannerheight = (document.body.offsetWidth * 0.3888).toFixed(0) + 'px';
    loaded = false;
    ngOnInit() {
        Api.index_rec().then(res => {
            this.loaded = true;
            this.banner = res[0];
            const pl_arr = res[1];
            pl_arr.forEach(v => {
                v.pic = this.picurlTn(v.picUrl);
            });
            this.rec_pl = pl_arr;
            this.rec_ns = res[2].splice(0, 6);
            this.rec_mv = res[3];
            this.rec_dj = res[4];
        })
    }
    private picurlTn(s) {
        let arr = s.split('/');
        arr = arr[arr.length - 1];
        return arr.split('.')[0];
    }
}
