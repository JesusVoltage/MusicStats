import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.scss']
})
export class TopsComponent implements OnInit {


  private topEspana : any[] = [];
  private topEspana2 : any[] = [];

  constructor(private spotify: SpotifyService, private router : Router) { }

  ngOnInit() {
    this.getTopEspaña();
  }

  getTopEspaña(){


    this.spotify.getTopEspaña()
    .subscribe((data: any) => {
      
        this.topEspana.push(data[0],data[1],data[2],data[3],data[4]);
        this.topEspana2.push(data[5],data[6],data[7],data[8],data[9]);
    });
  }
  goToAlbum(id: String): void{
    this.router.navigate(['album/:id']);
  }
}
