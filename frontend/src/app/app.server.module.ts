import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {LoadingComponent} from './pages/loading/loading.component';
import {AppModule} from './app.module';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [LoadingComponent],
  declarations: [LoadingComponent],
})
export class AppServerModule {
}
