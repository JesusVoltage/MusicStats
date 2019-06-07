import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }from './components/home/home.component';
import { AlbumComponent } from "./components/album/album.component";
import { TopsComponent } from "./components/tops/tops.component";
import { HttpRouterService } from './services/http-router.service';

const routes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent,
    resolve: { data: HttpRouterService },
  },
  {
    path: 'album',
    component: AlbumComponent,
    resolve: { data: HttpRouterService },
  },
  {
    path: 'tops',
    component: TopsComponent,
    resolve: { data: HttpRouterService },
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
