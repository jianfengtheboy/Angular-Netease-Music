import { Component } from '@angular/core'

@Component({
    selector : 'loading',
    template : `
        <div class="cntloading">
            加载中
            <div>
                <span class="cl1"></span>
                <span class="cl2"></span>
                <span class="cl3"></span>
            </div>
        </div>
    `
})

export class LoadingComponent {}
