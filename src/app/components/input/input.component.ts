import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputUiModel} from '../../models/ui-model/input.ui-model';
import {ConfigAction, ConfigSelector, LoginAction, LoginSelector, RootStoreState, RouterSelector} from '../../store';
import {select, Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validationGeneric, validationOfNull} from '../../validation/parametric.validation';
import {Subscription} from "rxjs";
import {emailValidation, rutValidation, urlValidation} from "../../validation/default.validation";
import {ValidationEnum} from "../../models/utils/validation.enum";

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
  private soloRut = false;

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
        if (resp.input === undefined) {
          this.selectFirstLoginState = this.store.pipe(select(RouterSelector.selectFirstLoginState)).subscribe(respState => {
            if (!respState) {
              resp.input = JSON.parse(localStorage.getItem('state')).config.config.input;
            }
          });
        }
        let count = 0;
        this.form = new FormGroup({});
        resp.input.forEach(row => {
          const validation: any = this.addValidationToControl(row);
          row.id = `input_${count}`;
          row.soloRut = this.soloRut;
          this.form.addControl(row.id, new FormControl('', {validators: validation, updateOn: "change"}
          ));
          if (row.choices !== undefined && row.choices.length > 0) {
            this.form.controls[row.id].setValue(row.choices[0]);
          }
          count++;
        });
        this.inputConfig = resp.input;
        this.store.dispatch(ConfigAction.loadConfig({payload: resp}));
      });
  }

  addErrorControl(key: string): any {
    return this.inputValidationFront.filter(fill => fill.key === key)[0];
  }

  private addValidationToControl(row: InputUiModel) {
    const validation: any = [];
    validation.push((row.validation !== undefined) ? validationGeneric(row.validation) : validationOfNull);
    validation.push((row.required !== undefined && row.required !== false && row.required !== null) ? Validators.required : validationOfNull);
    if (row.max !== undefined && row.max !== null) {
      if (typeof row.max === 'number') {
        (row.soloNumber) ? validation.push(Validators.maxLength(row.max)) : validation.push(Validators.maxLength(row.max));
        this.inputValidationFront.push({key: 'maxlength', msg: `La cantidad maxima de caracteres es ${row.max}`})
      } else {
        (row.soloNumber) ? validation.push(Validators.maxLength(row.max.value)) : validation.push(Validators.maxLength(row.max.value));
        this.inputValidationFront.push({key: 'maxlength', msg: `${row.max.message}`})
      }
    }
    if (row.min !== undefined && row.min !== null) {
      if (typeof row.min === 'number') {
        (row.soloNumber) ? validation.push(Validators.minLength(row.min)) : validation.push(Validators.minLength(row.min));
        this.inputValidationFront.push({key: 'minlength', msg: `La cantidad minima de caracteres es ${row.min}`})
      } else {
        (row.soloNumber) ? validation.push(Validators.minLength(row.min.value)) : validation.push(Validators.minLength(row.min.value));
        this.inputValidationFront.push({key: 'minlength', msg: `${row.min.message}`})
      }
    }

    if (row.defaultValidation !== undefined && row.defaultValidation.length > 0) {
      row.defaultValidation.forEach(validations => {
        if (typeof validations === 'string') {
          switch (validations) {
            case ValidationEnum.EMAIL: {
              this.soloRut = false;
              validation.push(emailValidation);
              this.inputValidationFront.push({key: validations, msg: `Error en el formato del correo`});
              break;
            }
            case ValidationEnum.RUT: {
              this.soloRut = true;
              validation.push(rutValidation);
              this.inputValidationFront.push({key: validations, msg: `El rut ingresado es incorrecto`});
              break;
            }
            case ValidationEnum.URL: {
              this.soloRut = false;
              validation.push(urlValidation);
              this.inputValidationFront.push({key: validations, msg: `El formato de la url es incorrecto`});
              break;
            }
            default: {
              this.soloRut = false;
              validation.push(validationOfNull);
            }
          }
        } else {
          switch (validations.validation) {
            case ValidationEnum.EMAIL: {
              this.soloRut = false;
              validation.push(emailValidation);
              this.inputValidationFront.push({key: validations.validation, msg: validations.message});
              break;
            }
            case ValidationEnum.RUT: {
              this.soloRut = true;
              validation.push(rutValidation);
              this.inputValidationFront.push({key: validations.validation, msg: validations.message});
              break;
            }
            case ValidationEnum.URL: {
              this.soloRut = false;
              validation.push(urlValidation);
              this.inputValidationFront.push({key: validations.validation, msg: validations.message});
              break;
            }
            default: {
              this.soloRut = false;
              validation.push(validationOfNull);
            }
          }
        }
      });
    }
    return validation;
  }

}
