import { Component, Input } from '@angular/core';

@Component({
    selector : 'app-comp-playicon',
    styles : [
        `
            .cntloading {
                position : relative;
                display: inline-block;
                height: 1.2em;
                overflow: hidden;
                padding: 0;
            }

            .cntloading span {
                background-color: #fff;
                margin-left: 4px;
                float: left;
                height: 100%;
                transform: translateY(40%);
            }

            .cntloading span.cl2 {
                animation-delay: -.6s !important;
                transform: translateY(0%);
            }

            .cntloading span.cl4 {
                animation-delay: -.3s !important;
                transform: translateY(20%);
            }

            .cntloading span.cl3 {
                animation-delay: 0s !important;
                transform: translateY(50%);
            }

            .playingico span {
                animation: none;
            }
        `
    ],
    templateUrl : 'playicon.component.html'
})

export class PlayIconComponent {
    playing : Boolean = true;
    playtype : Number = 1;
    music = { id : 2, pic_str : '', pic : ''}
}
