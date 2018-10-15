import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastComponent } from 'ngx-weui';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comp-songlist',
    styles: [
        `.flexnum img {
        	width: 1.3em
        }
        .topindex {
        	color: #BB2C08;
        }
        .ftp {
        	font-size: .5em;
        	font-weight: lighter;
        }
        .weui-toast{min-height:auto;width:auto;padding:.2em 1em;top:50%; transform:translate(-50%,-50%);margin-left:0}
        .ftp img {
        	height: .8em;
        	width: auto;
        }`
    ],
    templateUrl: 'songlist.component.html',
    encapsulation: ViewEncapsulation.None
})

export class SongListComponent {
    constructor(private router: Router) {}
    @ViewChild('toast') tipToast: ToastComponent;
    @Input() nonum = 1;
    @Input() curplay: Number = -1;
    @Input() trackids: Array<Object>;
    @Input() toplist: any;
    @Input() privileges: Array<Object>;
    @Input() list: any;

    playindex(index, re, privileges) {
        // 歌曲下架st<0
        if (
          (re.privilege && re.privilege.st < 0) ||
          (privileges && privileges[index].st < 0)
        ) {
            this.tipToast.onShow();
            return;
        }
        this.router.navigate(['playing', re.id], {
            queryParams: { img: re.al.pic_str || re.al.pic }
        });
        // this.$store.commit('setbgmchange', false)
        // this.$emit('playindex', index)
    }
}
