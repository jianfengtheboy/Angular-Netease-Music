import { Component, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '../../components/tab/tab.component';
import { PlayIconComponent } from '../../components/playicon/playicon.component';

@Component({
  selector: 'app-index',
  styleUrls: ['./index.component.css'],
  template: `
  <div el-container direction='vertical' class='demo-box'>
    <div class='page page_t page_b'>
            <div class='we-header'><a routerLink='/search' id='header_search'>单曲/歌单/电台</a>
                <app-comp-playicon></app-comp-playicon>
            </div>
            <div class='page_tab' el-main>
                <app-comp-tab [tabs]='tabs' class="fixedtab" [url]='true'></app-comp-tab>
                <router-outlet></router-outlet>
            </div>
      <div class='weui-tabbar'>
        <div class='weui-tabbar__item weui-bar__item_on'>
          <div class='weui-tabbar__icon'>
            <img src='./assets/images/cm2_btm_icn_discovery_prs.png'>
          </div>
         <p class='weui-tabbar__label'>发现</p>
        </div>
        <div class='weui-tabbar__item'>
          <div class='weui-tabbar__icon'>
          <img src='./assets/images/cm2_btm_icn_account.png'>
          </div>
            <p class='weui-tabbar__label'>我的</p>
          </div>
      </div>
  </div>`,
  encapsulation: ViewEncapsulation.None
})

export class IndexComponent {
  tabs = [
    {
      name: '个性推荐',
      url: '/index/find'
    },
    {
      name: '歌单',
      url: '/index/playlist'
    },
    {
      name: '主播电台',
      url: '/index/djlist'
    },
    {
      name: '排行榜',
      url: '/index/sort'
    }
  ];
}
