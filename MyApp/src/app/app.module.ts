import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import{HomeService} from '../pages/home/home.service';
import{VerifyPage} from  '../pages/Verify/verify';
import{VerifyService} from '../pages/Verify/verify.service';
import{ConstantsService} from '../app/app.service';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VerifyPage,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,VerifyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HomeService,
    VerifyService,
    ConstantsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
