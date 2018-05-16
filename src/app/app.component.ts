import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { CustomerPage } from '../pages/customer/customer';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CustomerPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private spinnerDialog: SpinnerDialog) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [ 
      { title: 'NukList', component: CustomerPage },
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
