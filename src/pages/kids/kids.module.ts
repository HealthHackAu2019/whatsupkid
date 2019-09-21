import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KidsPage } from './kids';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AssessmentsPage } from '../assessments/assessments';
import { AssessmentsPageModule } from '../assessments/assessments.module';
import { KidProvider } from '../../providers/kid/kid';

@NgModule({
  declarations: [
    KidsPage,
  ],
  imports: [
    IonicPageModule.forChild(KidsPage),
    NgxDatatableModule,
  ],
  providers: [KidProvider]
})
export class KidsPageModule {}
