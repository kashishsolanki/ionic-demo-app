import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CameraMock } from './mocks/camera-mock';
import { DirectivesModule } from '../directives/directives.module';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { UserListFilterPipe } from '../pipes/user-filter-pipe';
import { DirectivePage } from '../pages/directive/directive';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    UserListFilterPipe,
    DirectivePage,
    AboutPage,
    TabsPage,
    SignupPage,
    LoginPage,
    WelcomePage,
    HomePage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DirectivePage,
    AboutPage,
    TabsPage,
    SignupPage,
    LoginPage,
    WelcomePage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // { provide: Camera, useClass: CameraMock}
  ]
})
export class AppModule {}
