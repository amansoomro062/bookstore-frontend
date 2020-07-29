import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';


import {
  MatButtonModule, 
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatCardModule,
  MatTooltipModule,
  MatSortModule,
  MatIconModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatSidenavModule,
}  from '@angular/material';

const MatComponent = [

      MatButtonModule,
      MatOptionModule,
      MatSelectModule,

      MatInputModule,
      MatFormFieldModule,
      MatSnackBarModule,
      MatCardModule,
      MatDividerModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      
      MatSortModule,
      
      MatTableModule,
      MatPaginatorModule,
      MatIconModule,
      MatMenuModule,
      MatAutocompleteModule,
      MatCheckboxModule,
      MatListModule,
      MatRadioModule,
      MatBadgeModule,
      MatToolbarModule,
      MatSidenavModule,
      MatDialogModule,
      MatExpansionModule
]

@NgModule({
  imports: [MatComponent],
  exports: [MatComponent]
})
export class MaterialModule { }
