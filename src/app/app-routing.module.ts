import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TimePageComponent} from "./time-page/time-page.component";
import {MainComponent} from "./main/main.component";


const routes: Routes = [
  {path: "time", component: TimePageComponent},
  {path: "main", component: MainComponent},
  {path: "", redirectTo: "time", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

