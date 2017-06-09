import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';

import { EXAMPLES } from './examples.component';
import { DragulaDemoComponent } from './dragula-demo.component';

@NgModule({
  declarations: [
    DragulaDemoComponent,
    ...EXAMPLES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [DragulaDemoComponent]
})

export class DragulaDemoModule {
}
