import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './sign-up/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TODOComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'todo', component: TODOComponent, canActivate: [AuthGuard] },
  { path: '**', component: TODOComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
