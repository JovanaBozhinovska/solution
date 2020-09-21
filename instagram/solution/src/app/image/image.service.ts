import { Injectable } from '@angular/core';
import { Image } from './image.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
loadIndex : number = 10;
imgChanged = new Subject<Image[]>()
imgSelected = new Subject<Image>();
images : Image[]= [];

constructor(private http : HttpClient)
{

}
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
   

   //this.imgChanged.next(this.images)
  
   return this.http.post('https://jsonplaceholder.typicode.com/photos', {
      title: title,
      url : url,
      thumbnailUrl : url
    }
    
  )
  
  
 }

 delete(image : Image)
 {
   var index= this.images.indexOf(image);
   if(index>-1)
   {
    this.http.delete('https://jsonplaceholder.typicode.com/photos/'+index).subscribe(
      (res)=>{console.log(res)
     console.log("deleteeed");
     this.images.splice(index,1);
     this.imgChanged.next(this.images);
    });
    }

  
 }

 getIdOfImage ( image : Image)
 {
   return this.images.indexOf(image);
 }
 getImagebyId(id : number)
 {
   return this.images[id];

  }

  edit (form_values, id : number)
  {
  
    return this.http.put('https://jsonplaceholder.typicode.com/photos/'+this.images[id].id,
    {
      title: form_values["title"],
      url : form_values["url"],
      thumbnailUrl : form_values["url"]
    }
    
    )
  }
}
