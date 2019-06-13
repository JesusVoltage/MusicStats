import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-critica',
  templateUrl: './critica.component.html',
  styleUrls: ['./critica.component.scss']
})
export class CriticaComponent implements OnInit {


  @Input() critica;

  constructor() { }

  ngOnInit() {
    console.log(this.critica);
  }


  

}
