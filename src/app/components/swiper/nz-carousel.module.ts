import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { NzCarouselComponent } from './nz-carouse-component';

@NgModule({
    declarations: [NzCarouselComponent, NzCarouselContentDirective],
    exports: [NzCarouselComponent, NzCarouselContentDirective],
    imports: [CommonModule]
})

export class NzCarouselModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: NzCarouselModule, providers: [] };
    }
}
