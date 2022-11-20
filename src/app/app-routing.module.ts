import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShellComponent } from './app-shell/app-shell.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { MyResultsComponent } from './my-results/my-results.component';
import { RegistrationComponent } from './registration/registration.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'test', component: TestComponent },
      { path: 'my-results', component: MyResultsComponent, canActivate: [AuthGuard] },
      { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
      { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
