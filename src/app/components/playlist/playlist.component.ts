import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comp-pl',
    template: `<div class='songs'>
            <a *ngFor='let re of list' [routerLink]="['/playlist/'+re.id]"
               [queryParams]="{img:re.coverImgId?re.coverImgId:urltn(re.coverImgUrl),name:re.name}"
                class='flexlist flex-image'>
                <div class='flexleft fl-image'>
                    <img [src]="re.coverImgUrl+'?param=100y100'" class='album_cover' />
                </div>
                <div class='flexlist'>
                    <div class='flexmain'>
                        <div>{{re.name}}</div>
                        <div class='relistdes'>{{re.trackCount}}首，<span *ngIf='showcreator'>By{{re.creator.nickname}}，</span>播放{{re.playCount}}次</div>
                    </div>
                </div>
            </a>
        </div>
    `
})

export class PlComponent {
    @Input() list: Array<any>;
    @Input() showcreator: Boolean = false;

    urltn(str) {
        if (!str) {
            return '';
        }
        str = str.split('/');
        str = str[str.length - 1];
        return str.split('.')[0];
  }
}
