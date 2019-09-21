import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsPage } from './kids';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    KidsPage,
  ],
  imports: [
    IonicPageModule.forChild(KidsPage),
    NgxDatatableModule,
  ],
})
export class KidsPageModule {}
