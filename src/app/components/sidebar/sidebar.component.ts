import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input()  displayFilter: boolean | null;
  @Output() displayFilterChanged = new EventEmitter<void>();


  checkChangedFilter(): void {
    this.displayFilterChanged.emit();  
  }


}
