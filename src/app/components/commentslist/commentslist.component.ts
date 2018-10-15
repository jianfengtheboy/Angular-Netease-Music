import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-comp-cmt',
    templateUrl: './commentslist.component.html',
    styleUrls: ['./commentslist.component.css']
})

export class CommentslistComponent implements OnInit {
    @Input() list: Array<any>;
    constructor() {}
    ngOnInit() {}
}
