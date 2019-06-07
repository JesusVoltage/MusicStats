import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router, ActivatedRoute, UrlSegment, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.scss']
})
export class TopsComponent implements OnInit {


  private topEspana : any[] = [];
  private topEspana2 : any[] = [];

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
    this.getTopEspaña();
  }

  getTopEspaña(){


    this.spotify.getTopEspaña()
    .subscribe((data: any) => {
        // this.topEspaña[index].id = data.items[index].track.album.id;
        // this.topEspaña[index].nombre = data.items[index].track.album.name;
        // this.topEspaña[index].foto = data.items[index].track.album.images[0];
        // this.topEspañaIds.push(data.items[index].track.album.id);
        // this.topEspañafotos.push(data.items[index].track.album.images[0]);
        // this.topEspañaNames.push(data.items[index].track.album.name);
      
        this.topEspana.push(data[0],data[1],data[2],data[3],data[4]);
        this.topEspana2.push(data[5],data[6],data[7],data[8],data[9]);
    });
  }

}
