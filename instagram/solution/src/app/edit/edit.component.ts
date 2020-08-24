import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../image/image.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editMode = false;
  form: FormGroup;
  id : number;
  constructor(private imgService : ImageService,
     private router : Router, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
    (params: Params) => { this.id = +params['id'];
        this.editMode = params['id'] != null;}

      )
      this.initForm();
    }



  onSave()
  {
    if (!this.editMode)
     {
       this.imgService.add(this.form.value['title'], this.form.value['url']);
       this.router.navigate(["../images"], {relativeTo:this.activeRoute})
     }
     else
     {
       this.imgService.edit(this.form.value,this.id)
       this.router.navigate(["../../images"], {relativeTo:this.activeRoute})

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
      console.log(title);
    }
    this.form=new FormGroup({
      'title': new FormControl(title, Validators.required),
      'url' : new FormControl(url, Validators.required),
    });

}
}
