import {Component, HostListener, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, InitWebChatAction, RootStoreState} from '../../store';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-trigger-button',
  templateUrl: './trigger-button.component.html',
  styleUrls: []
})
export class TriggerButtonComponent implements OnInit {

  public hidden = false;
  public mobileHidden = false;
  backgroundColor = '';

  constructor(private readonly store: Store<RootStoreState.AppState>) {

  }

  ngOnInit() {
    this.store.pipe(select(selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
        if (window.innerWidth < 451) {
          this.mobileHidden = !resp;
        } else {
          this.mobileHidden = true;
        }
      });
    this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(map(mapper => mapper.caption.headerBackgroundColor))
      .subscribe(resp => this.backgroundColor = resp);
  }

  public initWebChat() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    if (event.target.innerWidth < 451) {
      this.mobileHidden = this.hidden;
    } else {
      this.mobileHidden = true;
    }
  }
}
