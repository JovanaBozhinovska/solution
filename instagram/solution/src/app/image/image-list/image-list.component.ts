import { Component, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../image.model'
import { ImageService } from '../image.service';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  images : Image[] = [];
  imgSub : Subscription;
  loadIndex : number = 10;
  constructor(private imgService : ImageService, private dataService : DataService,
    private router : ActivatedRoute) { }



  ngOnInit(): void {

    this.images=this.imgService.get10Images()
    this.imgSub = this.imgService.imgChanged.subscribe(
      (images : Image []) => {
        for (let i=0; i<this.loadIndex;i++)
        {
          this.images[i]=images[i];
        }
        console.log(this.images);
      }
    )



  }

  onSelect(i : number)
  {
    this.imgService.imgSelected.next(this.images[i]);

  }

  load()
  {
    this.loadIndex+=10;
    var imgs=this.imgService.getImages()
    for(let i = 0 ; i < this.loadIndex; i++)
    {
      this.images[i]=imgs[i];
    }
    this.imgService.imgChanged.next(this.images)
  }


}
