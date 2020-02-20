import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ConfigSelector, RootStoreState} from "../../store";
import {SocialMediaUiModel} from "../../models/ui-model/social-media.ui-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: []
})
export class SocialMediaComponent implements OnInit, OnDestroy {
  socialMedia?: SocialMediaUiModel[] = [];
  selectConfig: Subscription = new Subscription();
  constructor(private readonly store: Store<RootStoreState.AppState>) { }

  ngOnInit() {
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.socialMedia = resp.finish.socialMedia);
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
  }

  public routing(item: SocialMediaUiModel) {
    window.open(item.url, "_blank");
  }

}
