import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {


  private beCritic: boolean = false;

  constructor() { }

  ngOnInit() {
 }

}
