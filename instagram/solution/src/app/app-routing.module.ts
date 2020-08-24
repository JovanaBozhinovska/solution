import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { EditComponent } from './edit/edit.component';
import { ImageDetailsComponent } from './image/image-details/image-details.component';

const routes: Routes = [
  {path: '', redirectTo: "/images", pathMatch : 'full'},
  {path: "images", component: ImageComponent},
  {path: "new", component: EditComponent},
  {path : "edit/:id", component: EditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
