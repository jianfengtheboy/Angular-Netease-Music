import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector : 'back',
    styles : [`:host svg{vertical-align:text-bottom}`],
    template : `
    <div (click)='back()'>
        <svg t='1520836526684' *ngIf='showIcon' class='icon' style='' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1895' xmlns:xlink='http://www.w3.org/1999/xlink' width='20' height='20'><defs><style type='text/css'></style></defs><path d='M877.216 491.808' p-id='1896' fill='#ffffff'></path><path d='M758.528 949.984c12.512-12.512 13.248-31.872 2.048-43.776L384.096 529.696c-16.16-15.328-16.096-19.328 0-35.424L760.576 117.824c11.232-11.872 10.464-31.264-2.048-43.776-12.736-12.736-32.608-13.44-44.448-1.632L295.872 490.592C290.72 495.744 288.416 502.464 288 509.376l0 5.248c0.448 6.944 2.752 13.632 7.872 18.784l418.176 418.176C725.92 963.392 745.824 962.688 758.528 949.984z' p-id='1897' fill='#ffffff'></path></svg>
        <ng-content></ng-content>
    </div>
    `
})

export class BackComponent {
    constructor(private route : Router) {}
    @Input() showIcon : Boolean = true
    back() {
        if (document.referrer) {
            window.history.go(-1)
        } else {
            this.route.navigate(['home'])
        }
    }
}
