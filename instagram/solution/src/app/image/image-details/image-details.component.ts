import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit, OnDestroy{
  ImgSub : Subscription;
  selectedImage : Image = null;
  selected = false;
  constructor(private imageService : ImageService, private router : Router,
    private path: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.selectedImage=this.imageService.getImages()[0];
    this.ImgSub=this.imageService.imgSelected.subscribe(
      (image : Image) =>
      {
        this.selectedImage=image;
        this.selected = true;
      }
    )

  }
  onDelete()
  {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '200px',
      width: '400px', })
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
        {
          this.imageService.delete(this.selectedImage);
          this.selected=false;
        }
      }
          );
    

    }
  

  onEdit()
  {
    if(this.selectedImage!=null)
    {
    var id = this.imageService.getIdOfImage(this.selectedImage);
    this.router.navigate(["../edit/"+id],{relativeTo: this.path })
    this.selected=false;
    }
  }

  ngOnDestroy() : void
  {
    this.ImgSub.unsubscribe();
    this.selected=false;
  }

}
