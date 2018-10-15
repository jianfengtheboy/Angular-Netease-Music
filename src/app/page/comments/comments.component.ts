import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteLoaderComponent } from 'ngx-weui';
import api from '../../app.api';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
    @ViewChild(InfiniteLoaderComponent) il;
        id;
        offset = 0;
        ctype = 1;
        rec = {
        hotComments: [],
        comments: [],
        total: 0,
        more: true
    };
    loaded = false;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });
        this.route.queryParams.subscribe(queryParams => {
            const ctype = queryParams.ctype;
            this.ctype = ctype ? ctype : 1;
            this.getcomments(false, this.il);
        });
    }
    getcomments(more = true, comp: InfiniteLoaderComponent) {
        if (more && !this.rec.more) {
            return;
        }
        api.comments(this.id, this.offset, this.ctype).then(res => {
            const data = res.data;
            if (data.code !== 200) {
                return;
            }
            if (more) {
                data.hotComments = this.rec.hotComments;
                data.comments = this.rec.comments.concat(data.comments);
            }
            this.loaded = true;
            this.rec = data;
            this.offset = data.comments ? data.comments.length : 0;
            if (!this.rec.more) {
                comp.setFinished();
                return;
            }
            comp.resolveLoading();
        });
    }
}
