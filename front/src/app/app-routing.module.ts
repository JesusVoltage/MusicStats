import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AlbumComponent } from './components/album/album.component';
import { IniciaSesionComponent } from './components/inicia-sesion/inicia-sesion.component';
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { ProfileComponent } from "./components/profile/profile.component";


const routes: Routes = [
  { path: '', component: HomeComponent, runGuardsAndResolvers: "always" },
  { path: 'album/:id', component: AlbumComponent, runGuardsAndResolvers: "always" },
  { path: 'login', component: IniciaSesionComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'profile', component: ProfileComponent },
  
];

@NgModule({
  imports: 
    [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
