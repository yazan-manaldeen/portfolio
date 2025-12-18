import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "@app/app.component";

const routes: Routes = [
  {
    path: ':lang',
    children: [
      {path: '', component: AppComponent},
      {path: '', redirectTo: '', pathMatch: 'prefix'},
      {path: '**', redirectTo: '', pathMatch: 'prefix'},
    ]
  },
  {path: '', redirectTo: 'en/', pathMatch: 'full'},
  {path: '', redirectTo: 'en/', pathMatch: 'full'},
  {path: '**', redirectTo: 'en/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
