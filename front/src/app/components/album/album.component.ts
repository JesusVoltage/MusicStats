import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {


  private beCritic: boolean = false;
  private idAlbum: string = "";
  private albumData: any;
  private img: string = '';
  private type: string = '';
  private name: string = '';
  private artistas: string = '';
  private ano: string = '';
  private canciones: any[] = []; 
  constructor(private spotify: SpotifyService, private activatedRouter: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.activatedRouter.params.subscribe(routeParams => {
      this.idAlbum = this.activatedRouter.snapshot.params['id'];
      console.log(this.idAlbum);

      this.artistas = '';
      this.canciones = [];
      this.spotify.getAlbumData(this.idAlbum)
      .subscribe((data: any) => {
        this.albumData = data;
        console.log(this.albumData);
        this.img = this.albumData['images'][0].url
        this.name = this.albumData['name'];
        for (let index = 0; index < this.albumData.artists.length; index++) {
          this.artistas += (String(this.albumData.artists[index].name));
          if(index > 0 && index < this.albumData.artists.length){
            this.artistas += ' - ';
          }
        }
        for (let index = 0; index < data['tracks'].items.length; index++) {
          this.canciones.push(data['tracks'].items[index].name);
          
        }
         this.ano = data['release_date'];
         this.type = data['album_type'];
      });
    });
    console.log(this.activatedRouter.snapshot.params['id']);
    
  }

 getAlbumData(id: any) {
    // this.loading = true;


  }

}
