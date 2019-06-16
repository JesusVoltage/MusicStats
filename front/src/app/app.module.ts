import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AlbumComponent } from './components/album/album.component';
import { FooterComponent } from './components/footer/footer.component';
import { IniciaSesionComponent } from './components/inicia-sesion/inicia-sesion.component';
import { TopsComponent } from './components/tops/tops.component';
import { WellcomeComponent } from "./components/wellcome/wellcome.component";
import { ProfileComponent } from './components/profile/profile.component';
import { CriticaComponent } from './components/critica/critica.component';
import { ProfilePointsComponent } from './components/profile-points/profile-points.component';
// import { RouterModule, Routes } from '@angular/router';

// const appRoutes: Routes = [
//   { path: 'album', component: AlbumComponent},
// ];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserComponent,
    CreateUserComponent,
    AlbumComponent,
    FooterComponent,
    IniciaSesionComponent,
    TopsComponent,
    WellcomeComponent,
    ProfileComponent,
    CriticaComponent,
    ProfilePointsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
