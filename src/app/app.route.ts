import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { HomeComponent } from './page/home/home.component';
import { IndexComponent } from './page/index/index.component';
//import { PlayListComponent } from './page/playlist/playlist.component';
//import { PlayIngComponent } from './page/playing/playing.component';
//import { IndexPlaylistComponent } from './page/indexPlaylist/indexPlaylist.component';
//import { IndexDjlistComponent } from './page/indexDjlist/indexDjlist.component';
//import { IndexSortComponent } from './page/indexSort/indexSort.component';
//import { SearchComponent } from './page/search/search.component';
//import { CommentsComponent } from './page/comments/comments.component';
//import { FmComponent } from './page/fm/fm.component';
//import { RadioComponent } from './page/radio/radio.component';
//import { ProgramComponent } from './page/program/program.component';

export const appRoutes = [
    {
        path : 'index',
        component : IndexComponent,
        children : [

        ]
    }
]
