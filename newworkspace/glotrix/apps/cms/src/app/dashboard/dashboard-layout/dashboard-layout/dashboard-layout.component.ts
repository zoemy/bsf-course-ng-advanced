import { Component, OnInit, Input } from '@angular/core';
import { LinkOption } from '@glotrix/ui/navigation';

@Component({
  selector: 'gt-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  protected options: LinkOption[] = [
    { Text: 'Products', Url: '/product' },
    { Text: 'Analytics', Url: '/profile' },
    { Text: 'Profile', Url: '/product' },
    { Text: 'Sold Products', Url: '/profile' }
  ];

  protected isSidebarActive: Boolean = true;

  constructor() {}

  ngOnInit() {}
}