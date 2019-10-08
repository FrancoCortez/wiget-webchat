import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputUiModel} from '../../models/ui-model/input.ui-model';
import {ConfigAction, ConfigSelector, LoginAction, LoginSelector, RootStoreState, RouterSelector} from '../../store';
import {select, Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validationGeneric, validationOfNull} from '../../validation/parametric.validation';
import {Subscription} from "rxjs";
import {emailValidation, rutValidation, urlValidation} from "../../validation/default.validation";
import {ValidationEnum} from "../../models/utils/validation.enum";

export interface ValidationInput {
  msg?: string;
  input?: string;
  errorCode?: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: []
})
export class InputComponent implements OnInit, OnDestroy {
  /**
   * Input model for configuration
   */
  public inputConfig: InputUiModel[];
  public form: FormGroup;
  public loginState = false;
  public inputValidationFront: any[] = [];
  loginStateSub: Subscription = new Subscription();
  selectConfig: Subscription = new Subscription();
  selectFirstLoginState: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }
  ngOnDestroy(): void {
    this.loginStateSub.unsubscribe();
    this.selectConfig.unsubscribe();
    this.selectFirstLoginState.unsubscribe();
    this.store.dispatch(LoginAction.loginState({payload: false}));
  }

  ngOnInit() {
    this.loginStateSub = this.store.pipe(select(LoginSelector.loginState)).subscribe(resp => this.loginState = resp);
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig))
      .subscribe(resp => {
      if(resp.input === undefined) {
        this.selectFirstLoginState = this.store.pipe(select(RouterSelector.selectFirstLoginState)).subscribe(respState => {
          if(!respState) {
              resp.input = JSON.parse(localStorage.getItem('state')).config.config.input;
          }
        });
      }
      let count = 0;
      this.form = new FormGroup({});
      resp.input.forEach(row => {
        const validation: any = [];
        validation.push((row.validation !== undefined) ? validationGeneric(row.validation) : validationOfNull);
        validation.push((row.required !== undefined && row.required !== false && row.required !== null) ? Validators.required : validationOfNull);
        validation.push((row.max !== undefined && row.max !== null) ? Validators.maxLength(row.max): validationOfNull);
        validation.push((row.min !== undefined && row.min !== null) ? Validators.minLength(row.min): validationOfNull);
        if(row.defaultValidation.length > 0) {
          row.defaultValidation.forEach(validations => {
            if(typeof validations === 'string') {
              switch (validations) {
                case ValidationEnum.EMAIL: {
                  validation.push(emailValidation);
                  this.inputValidationFront.push({key: validations, msg: `Error en el formato del correo`});
                  break;
                }
                case ValidationEnum.RUT: {
                  validation.push(rutValidation);
                  this.inputValidationFront.push({key: validations, msg: `El rut ingresado es incorrecto`});
                  break;
                }
                case ValidationEnum.URL: {
                  validation.push(urlValidation);
                  this.inputValidationFront.push({key: validations, msg: `El formato de la url es incorrecto`});
                  break;
                }
                default: {validation.push(validationOfNull);}
              }
            } else {
              switch (validations.validation) {
                case ValidationEnum.EMAIL: {
                  validation.push(emailValidation);
                  this.inputValidationFront.push({key: validations.validation, msg: validations.message});
                  break;
                }
                case ValidationEnum.RUT: {
                  validation.push(rutValidation);
                  this.inputValidationFront.push({key: validations.validation, msg: validations.message});
                  break;
                }
                case ValidationEnum.URL: {
                  validation.push(urlValidation);
                  this.inputValidationFront.push({key: validations.validation, msg: validations.message});
                  break;
                }
                default: {validation.push(validationOfNull);}
              }
            }
          });
        }
        row.id = `input_${count}`;
        this.form.addControl(row.id, new FormControl('',
          validation));
        if (row.choices !== undefined && row.choices.length > 0) {
          this.form.controls[row.id].setValue(row.choices[0]);
        }
        count++;
      });
      this.inputConfig = resp.input;
      this.store.dispatch(ConfigAction.loadConfig({payload: resp}));
      console.log(this.inputValidationFront)
    });
  }

  addErrorControl (key: string): any {
    return this.inputValidationFront.filter(fill => fill.key === key)[0];
  }
}
