import { Component, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '../../components/tab/tab.component';
import { PlayIconComponent } from '../../components/playicon/playicon.component';

@Component({
    selector : 'app-index',
    styleUrls : ['./index.component.css'],
    template : `
        <div el-container direction='vertical' class='demo-box'>
            <div class='page page_t page_b'>

            </div>
        </div>
    `
})

export class IndexComponent {
    tabs = [
        {
            name : '个性推荐',
            url : '/index/find'
        },
        {
            name : '歌单',
            url : '/index/playlist'
        },
        {
            name : '主播电台',
            url : '/index/djlist'
        },
        {
            name : '排行榜',
            url : '/index/sort'
        }
    ]
}
