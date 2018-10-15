import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-comp-playaction',
   styleUrls: ['./playaction.component.css'],
   templateUrl: './playaction.component.html',
   encapsulation: ViewEncapsulation.None
})

export class PlayActionComponent {
    constructor(private router: Router) {}
    @Input() commentscount;
    @Input() playtime: Number = 0;
    @Input() shuffle_am: Number = 1;
    @Input() shuffle_dj: Number = 1;
    @Input() playtype: Number = 1;
    @Input() playing: Boolean = false;
    @Input() music: any = {};
    @Input() star: Boolean = false;
    @Output() Esetplaying = new EventEmitter<boolean>();
    @Output() EseekMusic = new EventEmitter<Number>();
    @Output() EnextFm = new EventEmitter();
    seekmusic(v) {
        this.EseekMusic.emit(v);
    }
    nextfm() {
        this.EnextFm.emit();
    }
    heart() {}
    setplaying() {
        this.Esetplaying.emit(!this.playing);
    }
    del_fm() {}
    psaction() {}
    next() {}
    prev() {}
    shuffle() {}
}
