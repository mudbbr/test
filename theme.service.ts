import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ThemeService implements OnInit {

  /**************
   indigopink/DEFAULT
   pinkbluegrey/GRAY_PINK
   purplegreen/PURPLE
   purpleamber/PURPLE_DELIGHT
   **************/
  uiTheme: string;
  private mapThemeSrc = new Subject<string>();
  linkEl: any;
  mapTheme$ = this.mapThemeSrc.asObservable();

  constructor (
    private http: Http
    , @Inject(DOCUMENT) private document: any
  ) {
    this.mapThemeSrc.next('MANILA');
    this.linkEl = document.createElement('link');
    this.linkEl.setAttribute('rel', 'stylesheet');
    this.linkEl.setAttribute('type', 'text/css');
    this.linkEl.setAttribute('href', '/assets/css/indigo-pink.css');
    this.document.getElementsByTagName('head')[0].appendChild(this.linkEl);
  }

  ngOnInit (): void {}

  get (): Promise<any> {
    return this.http
      .post('/theme/getcurrent', this.getUsername())
      .toPromise()
      .then(resp => resp['_body'] )
      .catch(err => Promise.reject(err));
  }

  getUsername (): any {
    let reqbod: any;

    // FIXME : Not sure why we need to parse 2x... but pulling the decoded string out of localstorage requires it
    // basically, the first parse removes escapes, and the second is the true parse
    localStorage['currentUser'] ? reqbod = { username: JSON.parse(JSON.parse(decodeURIComponent(localStorage['currentUser']))).username } : reqbod = {};

    return reqbod;
  }

  load (): void {
    this
      .get()
      .then(resp => { this.swap(JSON.parse(resp).theme); })
      .catch(err => { console.error(err); });
  }

  save (theme: string): Promise<any> {
    const reqbod: any = this.getUsername();
    reqbod.theme = theme;
    return this.http.post('/theme/savecurrent', reqbod)
      .toPromise()
      .then(resp => { console.log(resp); })
      .catch( err => { console.error(err); } );
  }

  // TODO : This is hacky, but NGMat uses strict sass. Stylus doesn't like the sass mixins in _theming for some reason
  swap (theme: string): void {
    if (theme === 'indigopink') {
      this.linkEl.setAttribute('href', '/assets/css/indigo-pink.css');
      this.mapThemeSrc.next('DEFAULT');
    } else if (theme === 'pinkbluegrey') {
      this.linkEl.setAttribute('href', '/assets/css/pink-bluegrey.css');
      this.mapThemeSrc.next('GRAY_PINK');
    } else if (theme === 'purplegreen') {
      this.linkEl.setAttribute('href', '/assets/css/purple-green.css');
      this.mapThemeSrc.next('PURPLE');
    } else if (theme === 'purpleamber') {
      this.linkEl.setAttribute('href', '/assets/css/deeppurple-amber.css');
      this.mapThemeSrc.next('PURPLE_DELIGHT');
    }
  }

  swapAndSave (theme: string): void {
    this.swap(theme);
    this.save(theme);
  }

}



