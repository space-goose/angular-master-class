import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {TabComponent} from './tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      this.select(tab);
    }
    this.tabs.toArray().push(tab);
  }

  select(tab: TabComponent) {
    this.tabs.forEach(x => x.selected = false);
    tab.selected = true;
  }

  ngAfterContentInit(): void {
    this.select(this.tabs.first);
  }
}
