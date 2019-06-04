import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

//importar map reactive extentions
import { map } from "rxjs/operators";

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

  // Para  consulta generica
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    //Pipe transformacion de Datos
    // Defino Headers que API de Spotify Necesita
    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQByHNIxWvydd86IjkZVyoERuFdqAzlCsROxFXroyMvrnAwNeSrAPYKyaOf06RICHijdVAxfusShtAIvvhg"
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

  getTopEspaña(){
    return this.getQuery(`playlists/37i9dQZF1DXaxEKcoCdWHD/tracks?fields=items&limit=10`).pipe(
      map(data => data['items']) 
    );
  }

  getAlbumData(idAlbum: string){
    return this.getQuery(`albums/${idAlbum}`).pipe(
      map(data => data)
    );
  }

}
