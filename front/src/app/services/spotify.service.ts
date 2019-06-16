import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
//importar map reactive extentions
import { URLSearchParams } from 'url';
import { MapOperator } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';






// Por lo general cuando se trabaja con API
// Es necesario Centralizar la Informacion por eso este Service

// Este servicio se va a poder Inyectar en otros Componentes
@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    // console.log('Spotify Service Listo');
  }



  getToken(): Observable<boolean> {
    let grant_type = 'client_credentials';
    let client_id = 'f51d1fe409c44f6cbaeac667db163e6f';
    let client_secret = 'fe522770d407488c9c079ec6e6361c8d';
    const body = new HttpParams()
      .set(`grant_type`, 'grant_type')
      .set(`client_id`, 'f51d1fe409c44f6cbaeac667db163e6f')
      .set(`client_secret`, 'fe522770d407488c9c079ec6e6361c8d');
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`https://accounts.spotify.com/api/token`, body.toString(), { headers, observe: 'response' })
    .pipe(map((res: HttpResponse<Object>) => res.ok))

  }



  getCredential(){

    

    let body = `grant_type=${'client_credentials'}&client_id=${'f51d1fe409c44f6cbaeac667db163e6f'}&client_secret=${'fe522770d407488c9c079ec6e6361c8d'}`;
    // body.set('client_id', 'f51d1fe409c44f6cbaeac667db163e6f');
    // body.set('client_secret', 'fe522770d407488c9c079ec6e6361c8d');

    return this.http.post(`https://accounts.spotify.com/api/token`, body.toString()).pipe(map((response: any) => response.json()));
  }
  
 


  // Para  consulta generica
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    //Pipe transformacion de Datos
    // Defino Headers que API de Spotify Necesita
    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQBdJiEkMesMm5oVgIAO-32qaZrJwmf5cFdnZW3UbEIiE92N9fsu1xnrbodLfYrIWa5bJsQPjnhGMqZuJ8Y"
        // ('Bearer ' + clave)
    });

    return this.http.get(url, { headers });
  }

  //Cuando API Spotify envia la respuesta envia demasiada informacion y MAP
  //simplemente me filtra lo que a mi me sirve

  getAlbums(termino: string) {
    return this.getQuery(`search?q=${termino}&type=album&limit=5`).pipe(
      map(data => data['albums'].items)
    );
  }
  href: "https://api.spotify.com/v1/playlists/37i9dQZF1DXaxEKcoCdWHD/tracks"

  
  getAlbumData(idAlbum: string){
    return this.getQuery(`albums/${idAlbum}`).pipe(
      map(data => data)
      );
    }
    
    getTopEspaña(){
      return this.getQuery(`playlists/37i9dQZF1DXaxEKcoCdWHD/tracks?fields=items&limit=10`).pipe(
        map(data => data['items']) 
      );
    }
    getTopRock(){
      return this.getQuery(`playlists/37i9dQZF1DX8FwnYE6PRvL/tracks?fields=items&limit=20`).pipe(
        map(data => data['items']) 
      );
    }

    getPhotoAlbum(idAlbum: string){
      return this.getQuery(`albums/${idAlbum}`).pipe(
        map(data => data['images'][1].url)
        );
    }




    /**Recomendaciones */
//37i9dQZF1DXdOEFt9ZX0dh Rock
//37i9dQZF1DWTcqUzwhNmKv Metal
//37i9dQZF1DX3LDIBRoaCDQ Punk
//37i9dQZF1DX10zKzsJ2jva Latino
//37i9dQZF1DX6J5NfMJS675 Techno
//37i9dQZF1DX3sCT1ItXgNd Pop
//37i9dQZF1DX7YCknf2jT6s Jazz
//37i9dQZF1DX7Y7BqFok9IQ Blues

    searchPlaylist(){
      return this.getQuery(`search?q=%22Rock%22&type=playlist`).pipe(
        map(data => data) 
      );
    }
    getRock(){
      return this.getQuery(`playlists/37i9dQZF1DXdOEFt9ZX0dh/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getMetal(){
      return this.getQuery(`playlists/37i9dQZF1DWTcqUzwhNmKv/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getPunk(){
      return this.getQuery(`playlists/37i9dQZF1DX3LDIBRoaCDQ/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getLatino(){
      return this.getQuery(`playlists/37i9dQZF1DX10zKzsJ2jva/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getTechno(){
      return this.getQuery(`playlists/37i9dQZF1DX6J5NfMJS675/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getPop(){
      return this.getQuery(`playlists/37i9dQZF1DX3sCT1ItXgNd/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getJazz(){
      return this.getQuery(`playlists/37i9dQZF1DX7YCknf2jT6s/tracks?fields=items&limit=40`).pipe(
        map(data => data['items']) 
      );
    }
    getBlues(){
      return this.getQuery(`playlists/37i9dQZF1DX7Y7BqFok9IQ/tracks?fields=items&limit=17`).pipe(
        map(data => data['items']) 
      );
    }

}
