import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule} from '@ionic/storage'
import { ImagePicker } from '@ionic-native/image-picker';
import { MyApp } from './app.component';
import { CustomerPage} from '../pages/customer/customer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';


@NgModule({
  declarations: [
    MyApp,
    CustomerPage
    
  ],
  imports: [
  
  BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CustomerPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    SpinnerDialog,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
