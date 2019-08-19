import {Component, OnInit} from '@angular/core';
import {InputUiModel} from '../../models/ui-model/input.ui-model';
import {RootStoreState, LoginAction} from '../../store';
import {select, Store} from '@ngrx/store';
import {selectConfig} from '../../store/config-store/selector';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LoginDto} from '../../models/login/login.dto';

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
  form: FormGroup;

  constructor(private readonly store: Store<RootStoreState.AppState>, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.store.pipe(select(selectConfig)).subscribe(resp => {
      let count = 0;
      this.form = new FormGroup({});
      resp.input.forEach(row => {
         this.form.addControl('input_' + count, new FormControl());
         count++;
      });
      this.inputConfig = resp.input;
      const loginObj: LoginDto = {
        inputValue: this.form
      };
      this.store.dispatch(LoginAction.login({payload: loginObj}));
    });
  }
}
