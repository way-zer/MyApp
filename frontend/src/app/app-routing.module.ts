import {Injectable, NgModule} from '@angular/core';
import {PreloadingStrategy, Route, Router, RouterModule, Routes} from '@angular/router';
import {UsefulLinksComponent} from './pages/useful-links/useful-links.component';
import {TimeTableComponent} from './pages/time-table/time-table.component';
import {Observable} from 'rxjs';
import {RouteLinkService} from './services/route-link.service';
import {MyScheduleComponent} from './pages/my-schedule/my-schedule.component';
import {environment} from '../environments/environment';
import {TestPageComponent} from './pages/test-page/test-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/timeTable', pathMatch: 'full'},
  {path: 'usefulLinks', component: UsefulLinksComponent},
  {path: 'timeTable', component: TimeTableComponent},
  {path: 'mySchedule', component: MyScheduleComponent},
  {path: 'todos', loadChildren: () => import('../todos/todos.module').then(m => m.TodosModule)},
];

if (!environment.production) {
  routes.push({path: 'develop', component: TestPageComponent});
}

@Injectable()
export class MyPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    }
    return undefined;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: MyPreloadingStrategy})],
  exports: [RouterModule],
  providers: [RouteLinkService, MyPreloadingStrategy],
})
export class AppRoutingModule {
  constructor(private router: Router, private ser: RouteLinkService) {
    router.errorHandler = error => {
      console.warn(error);
      this.router.navigate([]).then();
    };
    ser.registerLinks(
      {path: '/usefulLinks', label: '常用链接'},
      {path: '/timeTable', label: '课程表'},
      {path: '/mySchedule', label: '计划表'},
    );
    if (!environment.production) {
      ser.registerLinks({path: '/develop', label: '测试'});
    }
  }
}
