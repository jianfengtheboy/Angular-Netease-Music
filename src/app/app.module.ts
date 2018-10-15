import { BrowserModule, enableDebugTools } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeUiModule } from 'ngx-weui';
import { RouterModule } from '@angular/router';

import { NzCarouselModule } from './components/swiper/nz-carousel.module';
import { appRoutes } from './app.route';

//store
import { NgxsModule, NgxsReduxDevtoolsPluginModule } from 'ngxs';
import { TodoState } from './store/music/music.reducer';

//page
import { IndexComponent } from './page/index/index.component';
import { HomeComponent } from './page/home/home.component';
import { PlayListComponent } from './page/playlist/playlist.component';
import { PlayIngComponent } from './page/playing/playing.component';
import { IndexPlaylistComponent } from './page/indexPlaylist/indexPlaylist.component';
import { IndexSortComponent } from './page/indexSort/indexSort.component';
import { IndexDjlistComponent } from './page/indexDjlist/indexDjlist.component';
import { SearchComponent } from './page/search/search.component';
import { FmComponent } from './page/fm/fm.component';
import { RadioComponent } from './page/radio/radio.component';
import { ProgramComponent } from './page/program/program.component';
import { CommentsComponent } from './page/comments/comments.component';
import { UserComponent } from './page/user/user.component';

//component
import { BackComponent } from './components/back/back.component';
import { TabComponent } from './components/tab/tab.component';
import { PlayIconComponent } from './components/playicon/playicon.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SongListComponent } from './components/songlist/songlist.component';
import { PlayActionComponent } from './components/playaction/playaction.component';
import { LrcComponent } from './components/lrc/lrc.component';
import { PlComponent } from './components/playlist/playlist.component';
import { CommentslistComponent } from './components/commentslist/commentslist.component';

//root
import { AppComponent } from './app.component';

//pipe
import {
    PplaycountPipe,
    PtimePipe,
    PemojiPipe,
    PbtdtoPipe,
    PdateMPipe,
    PdateSPipe
} from './utils/filter';

@NgModule({
    declarations: [
        PplaycountPipe,
        PtimePipe,
        PemojiPipe,
        PbtdtoPipe,
        PdateMPipe,
        PdateSPipe,
        AppComponent,
        IndexComponent,
        HomeComponent,
        PlayListComponent,
        PlayIngComponent,
        IndexPlaylistComponent,
        IndexDjlistComponent,
        IndexSortComponent,
        SearchComponent,
        FmComponent,
        CommentsComponent,
        RadioComponent,
        ProgramComponent,
        UserComponent,
        LoadingComponent,
        SongListComponent,
        PlayActionComponent,
        LrcComponent,
        BackComponent,
        TabComponent,
        PlayIconComponent,
        PlComponent,
        CommentslistComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        WeUiModule.forRoot(),
        NzCarouselModule.forRoot(),
        NgxsModule.forRoot([TodoState]),
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    enableDebugTools;
}
