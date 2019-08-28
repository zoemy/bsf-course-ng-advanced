import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'glotrix-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss']
})
export class ColComponent implements OnInit {
  @HostBinding('class') someClass: string;

  constructor() {
    this.someClass = 'col-3';
  }

  ngOnInit() {}
}