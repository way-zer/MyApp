import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Class, ClassTime} from '../../../services/types/Class';
import {JsonHelper} from '../../../../utils/json-helper';
import {TimeTableService} from '../../../services/time-table.service';
import {removeFrom} from '../../../../utils/functions';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.scss']
})
export class ClassEditComponent implements OnInit {
  data: Class;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly initData: { class: Class, selected: any }, private s: TimeTableService) {
    // initData.class = s.settings.value.classList[0];
    this.data = initData.class ? JsonHelper.parseObject(Class, initData.class) : new Class();
  }

  ngOnInit() {
  }

  save() {
    // TODO Check Data
    this.data.times.forEach(v => {
      v.weekDay = +v.weekDay || 1;
    });
    this.data = JsonHelper.parseObject(Class, this.data); // Try fix Range
    if (this.initData.class) {
      Object.assign(this.initData.class, this.data);
      this.s.updateSetting({});
    } else {
      this.s.updateSetting({classList: this.s.settings.value.classList.concat(this.data)});
    }
  }

  addTime() {
    const time = new ClassTime();
    // Prevent Null
    time.weekStr = '1-16';
    time.sessionStr = '1-2';
    this.data.times.push(time);
  }

  removeTime(time: ClassTime) {
    removeFrom(this.data.times, time);
  }

  removeThis() {
    removeFrom(this.s.settings.value.classList, this.initData.class);
    this.s.updateSetting({});
  }
}
