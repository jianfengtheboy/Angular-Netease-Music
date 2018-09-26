import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector : 'app-comp-tab',
    templateUrl : 'tab.component.html'
})

export class TabComponent {
    @Input() url : Boolean = false;
    @Input() ids : String = '';
    @Input() tabidx;
    @Input() tabs : Array<any>;
    @Output() Eswitchtab  = new EventEmitter<Number>();
    switchtab(v) {
        this.Eswitchtab.emit(v);
    }
}
