import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ImageService } from './image/image.service';
import { Image } from './image/image.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient, private imageService : ImageService) { }

  storeImages()
  {

    this.http.get<Image[]>('http://jsonplaceholder.typicode.com/photos').subscribe
    (
      (data) => {
        this.imageService.setImages(data)
      }

    )
  }
}
