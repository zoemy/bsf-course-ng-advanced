import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileEditorRoutingModule } from './profile-editor-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UiAvatarModule } from '@glotrix/ui/avatar';
import { UiFormsModule } from '@glotrix/ui/forms';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileEditorRoutingModule,
    UiAvatarModule,
    UiFormsModule
  ]
})
export class ProfileEditorModule { }
