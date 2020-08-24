import { Injectable } from '@angular/core';
import { Image } from './image.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
loadIndex : number = 10;
imgChanged = new Subject<Image[]>()
imgSelected = new Subject<Image>();
images : Image[]= [];

 setImages (images : Image[])
 {
   this.images=images;
   this.imgChanged.next(this.images)
   console.log('times set images have been called')
 }
 get10Images()
 {
    var newimg= this.images.slice(0,10);
    return newimg;
 }

 getImages ()
 {
   return this.images;

 }

 add(title: string, url : string)
 {
   const imgcopy= this.images;
   this.images=[];
   this.images[0]=new Image (1,1,title,url,url);
   for (let i =0; i< imgcopy.length;i++)
   this.images.push(imgcopy[i]);

   this.imgChanged.next(this.images)

 }

 delete(image : Image)
 {
   var index= this.images.indexOf(image);
   if(index>-1)
   {
     this.images.splice(index,1);
     console.log("deleteeed");
   }
   this.imgChanged.next(this.images)

 }

 getIdOfImage ( image : Image)
 {
   return this.images.indexOf(image);
 }
 getImagebyId(id : number)
 {
   return this.images[id];

  }

  edit (values, id : number)
  {
    this.images[id].title=values["title"];
    this.images[id].url=values['url'];
    this.images[id].thumbnailUrl=values['url'];
    this.imgChanged.next(this.images);
  }
}
