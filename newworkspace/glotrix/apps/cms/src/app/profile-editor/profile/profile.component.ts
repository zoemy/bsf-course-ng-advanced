import { TextboxEntry } from './../../../../../../libs/ui/forms/src/lib/entries/textbox-entry';
import { DropdownEntry } from './../../../../../../libs/ui/forms/src/lib/entries/dropdown-entry';
import { EntryBase } from './../../../../../../libs/ui/forms/src/lib/entries/entry-base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'glotrix-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  entries: EntryBase<any>[];

  constructor() { }

  ngOnInit() {
    this.entries = this.getEntrys();
  }

  getEntrys() {

    const entries: EntryBase<any>[] = [

      // new DropdownEntry({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),

      new TextboxEntry({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
        valitationMessages: {
          required: 'First name is required.',
          minlength: 'First name must be at least three characters.',
          maxlength: 'First name cannot exceed 30 characters.'
        }
      }),

      new TextboxEntry({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
        valitationMessages: {
          minlength: 'Email must be at least three characters.',
          maxlength: 'Email exceed 30 characters.'
        }
      })
    ];

    return entries.sort((a, b) => a.order - b.order);
  }

}
