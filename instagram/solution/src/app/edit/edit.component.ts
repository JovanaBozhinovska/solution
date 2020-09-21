import { Component, OnInit, ViewChild, AfterViewInit, Input, AfterContentChecked, DoCheck, AfterContentInit, OnChanges, AfterViewChecked } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../image/image.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Image } from '../image/image.model';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterContentInit{

  
  pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  editMode = false;
  imgValid = false;
  form: FormGroup;
  id : number;
  error = null;
  constructor(private imgService : ImageService,
     private router : Router, private activeRoute : ActivatedRoute,
     private http : HttpClient) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
    (params: Params) => { this.id = +params['id'];
        this.editMode = params['id'] != null;}
      )
      this.initForm();
    }


   
    ngAfterContentInit()
    {
      this.initForm();
    }
    

  onSave()
  {
    
    if (!this.editMode)
     {
       this.imgService.add(this.form.value['title'], this.form.value['url']).
       subscribe((response: Image) => 
       {
         //console.log(response) 
         var newImg : Image;
         newImg =new Image(response.id,response.albumid,response.title, response.url, response.url);
       this.imgService.images.unshift(newImg)
       this.imgService.imgChanged.next(this.imgService.images);
       this.router.navigate(["../images"], {relativeTo:this.activeRoute})
       },
       (error) => 
       {
         this.error=error.message; 
       });
      
     }
     else
     {
       this.imgService.edit(this.form.value,this.id).subscribe(
        (res : Image) => { console.log(res)
          this.imgService.images[this.id].title=res.title;
      this.imgService.images[this.id].url=res.url;
      this.imgService.images[this.id].thumbnailUrl=res.thumbnailUrl;
      this.imgService.imgChanged.next(this.imgService.images);
      this.router.navigate(["../../images"], {relativeTo:this.activeRoute})
    },
      (error) => {
        console.log(error);
        this.error = error.message;
      }
      ) 
       

     }

  }

  initForm()
  {
    let title= '';
    let url='';
    if(this.editMode==true)
    {
      title=this.imgService.getImagebyId(this.id).title;
      url=this.imgService.getImagebyId(this.id).url;
    }
    this.form=new FormGroup({
      'title': new FormControl(title, Validators.required),
      'url' : new FormControl(url, [Validators.required, Validators.pattern(this.pattern)]),
    });

}

get formControl() {
  return this.form.controls;
}

onLoad()
{
  if(this.form.value['url']!=="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png")
  {this.imgValid=true;
  console.log(this.imgValid);}
  else
  {
  this.imgValid=false;
  }
}
OnError()
{
  this.form.value['url']="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png";
}
}
