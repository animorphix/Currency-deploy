import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class YaMetrikaModule {
  private ym;
  constructor(
    private router: Router,
    private location: Location,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    if ( ! isPlatformBrowser(this._platformId)) return;
    this.ym = window.ym;
    this.router.events.filter(event => (event instanceof NavigationEnd))
        .subscribe(() => {
            let url = this.location.path();
            this.ym(97439730, 'hit', url);
        });
  }
}