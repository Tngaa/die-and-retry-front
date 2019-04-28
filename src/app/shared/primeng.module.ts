import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [],
  providers: [ConfirmationService],
  exports: [ButtonModule, ConfirmDialogModule, DropdownModule, FieldsetModule, InputTextModule, ProgressBarModule, TableModule]
})
export class PrimengModule { }
