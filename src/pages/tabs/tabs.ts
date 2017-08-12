import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { InventoryPage } from '../inventory/inventory';
import { KitsPage } from '../kits/kits';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = InventoryPage;
  tab3Root: any = KitsPage;

  constructor() {}

}
