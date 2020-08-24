import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthenticationGuard } from "./authentication.guard";
import { ConsumerComponent } from "./roles/consumer/consumer.component";
import { ModeratorComponent } from "./roles/moderator/moderator.component";
import { AdministratorComponent } from "./roles/administrator/administrator.component";
import { UnauthorizedComponent } from './roles/unauthorized/unauthorized.component';
import { RoleGuard } from './roles/role.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "consumer",
        component: ConsumerComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: ['consumer', 'moderator', 'administrator']
        }
      },
      {
        path: "moderator",
        component: ModeratorComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: ['moderator', 'administrator']
        }
      },
      {
        path: "administrator",
        component: AdministratorComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: ['administrator']
        }
      },
      {
        path: "unauthorized",
        component: UnauthorizedComponent
      }
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
