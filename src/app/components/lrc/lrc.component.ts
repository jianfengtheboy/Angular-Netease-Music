import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'lrc',
    templateUrl: 'lrc.component.html'
})

export class LrcComponent implements OnChanges {
    @Input() lrcindex: any = 0;
    @Input() showlrc: Boolean = false;
    @Input()
    lrc = {
        code: 200,
        nolyric: false,
        scroll: false,
        lrc: [],
        uncollected: false
    };
    @Input() playtime: string;
    ngOnChanges() {
        let v = parseInt(this.playtime, 10);
        v = Math.floor(v / 1e3);
        this.lrcindex = 0;
        for (let i = 0; i < this.lrc.lrc.length; i++) {
            if (v >= this.lrc.lrc[i].lrc_sec) {
                this.lrcindex = i;
            }
        }
    }
}
