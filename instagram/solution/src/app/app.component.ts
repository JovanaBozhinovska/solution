import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'solution';

  constructor(private dataService : DataService)
  {

  }
  ngOnInit()
  {
    this.dataService.storeRecipe();

  }

}
