import { Component, OnInit } from '@angular/core';
import api from '../../app.api';

@Component({
    selector: 'app-djlist',
    styleUrls: ['./indexSort.component.css'],
    templateUrl: 'indexSort.component.html'
})

export class IndexSortComponent implements OnInit {
    loaded = false;
    re = {
        list: [],
        artistToplist: { artists: [], coverUrl: '', updateFrequency: '' }
    };
    constructor() {}
    ngOnInit() {
        this.getsort();
    }
    getsort() {
        api.index_sort().then(res => {
            this.re = res.data;
            this.loaded = true;
        });
    }
}
