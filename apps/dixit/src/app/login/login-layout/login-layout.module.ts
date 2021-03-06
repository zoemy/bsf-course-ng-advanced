import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLayoutRoutingModule } from './login-layout-routing.module';
import { LoginComponent } from '../login/login.component';
import { UiLoginModule } from '@glotrix/ui/login';
import { UiFormsModule } from '@glotrix/ui/forms';
import { UiSpinnerModule } from '@glotrix/ui/spinner';
import { UiAvatarModule } from '@glotrix/ui/avatar';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		LoginLayoutRoutingModule,
		UiLoginModule,
		UiFormsModule,
		UiSpinnerModule,
		UiAvatarModule
	]
})
export class LoginLayoutModule { }
