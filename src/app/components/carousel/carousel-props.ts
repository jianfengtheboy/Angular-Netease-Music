import { EventEmitter, Input, Output } from '@angular/core';

export class ElCarouselProps {
    @Input() height : String = '150px';
    @Input() trigger : String = 'click'; // click, hover
    @Input() indicatorTrigger : String = 'click'; //click, hover
    @Input() autoplay : Boolean = true;
    @Input() interval : Number = 3000;

    @Input('initial-index') initialIndex: Number = 0;
    @Input('indicator-position') indicatorPosition : String; //outside, none

    @Input() arrow : String = 'hover'; //always, hover, never
    @Input() type : String;

    @Input() model : number = 0;
    @Output() modelChange : EventEmitter<any> = new EventEmitter<any>()
}
