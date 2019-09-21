import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentsPage } from './assessments';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AssessmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AssessmentsPage),
    NgxDatatableModule
  ],
  exports: [
    AssessmentsPage
  ],
  entryComponents: [
  ],
})
export class AssessmentsPageModule {}
