import {Component, OnInit} from '@angular/core';
import {InputUiModel} from '../../models/ui-model/input.ui-model';
import {ConfigAction, RootStoreState} from '../../store';
import {select, Store} from '@ngrx/store';
import {selectConfig} from '../../store/config-store/selector';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validationGeneric, validationOfNull} from '../../validation/parametric.validation';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: []
})
export class InputComponent implements OnInit {
  /**
   * Input model for configuration
   */
  public inputConfig: InputUiModel[];
  public form: FormGroup;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectConfig)).subscribe(resp => {
      let count = 0;
      this.form = new FormGroup({});
      resp.input.forEach(row => {
        row.id = `input_${count}`;
        this.form.addControl(row.id, new FormControl('',
          [
            (row.validation !== undefined) ? validationGeneric(row.validation) : validationOfNull,
            (row.required !== undefined && row.required !== false && row.required !== null) ? Validators.required : validationOfNull,
          ]));
        count++;
      });
      this.inputConfig = resp.input;
      this.store.dispatch(ConfigAction.loadConfig({payload: resp}));
    });
  }
}
