import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HttpService } from '../http-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('resultDialog', { static: false }) oDialog: ElementRef;
  @ViewChild('resultDialog1', { static: false }) mainDialog: ElementRef;
  date1: string;
  date2: string;
  hidden = true;
  userName;
  object1 = Object;
  jsondata1: any;
  headvar;
  contvalue: number;
  alertArray: Array<any> = [];
  checkedarray: Array<any> = [];
  saverunid: any;
  dialog = document.getElementById('hello-dialog') as HTMLInputElement;
  busy: boolean;
  savestatus: any;
  stickycolumn: string;
  headerCount: number;
  constructor(private httpService: HttpService,
              public datepipe: DatePipe) {

  }


  ngOnInit() {

    setTimeout(() => {
      this.busy = false;
      this.mainDialog.nativeElement.open();
  }, 2000);
  }

 fundatepicker() {
    this.busy = true;
  //   setTimeout(() => {
  //     // this.busy = false;
  // }, 10000);
    this.mainDialog.nativeElement.close();
    this.httpService.getdata(this.date1, this.date2)
      .subscribe(
        resultArray => {
          this.alertArray = resultArray;
          const a = JSON.stringify(this.alertArray);
          this.headvar = 'Data';
          // if (resultArray.length > 0) {
          this.busy = false;
          const x = document.getElementById('myDiv1');
          x.style.display = 'block';
          // }
        });
    this.busy = true;
    // setTimeout(() => {
    //       // this.busy = false;
    //   }, 10000);
  }


  funsaverunid() {
    console.log('save id ');
    this.httpService.postresult(this.date1, this.date2, this.saverunid)
      .subscribe(
        result => {
        this.savestatus = result;
        this.savestatus = JSON.stringify(this.savestatus);
        this.savestatus = JSON.parse(this.savestatus);
          // if(this.savestatus="successfully saved")
        this.savestatus = this.savestatus.status;
        }
      );
    this.oDialog.nativeElement.open();
  }

  myDatepicker1(event) {
    this.date1 = event.detail.value;
    this.date1 = this.datepipe.transform(this.date1, 'yyyy/MM/dd');
  }
  myDatepicker2(event) {
    this.date2 = event.detail.value;
    this.date2 = this.datepipe.transform(this.date2, 'yyyy/MM/dd');
  }

  mycontamination(event) {
    this.contvalue = event.target.value;
  }
  funrunid(event) {
    this.saverunid = event.target.value;
  }
  funcontamination() {
    this.busy = true;
    setTimeout(() => {
      this.busy = false;
  }, 10000);
    this.httpService.getresult(this.date1, this.date2)
    .subscribe(
      resultArray => {this.alertArray = resultArray;
                      this.headvar = 'Result';
      });
  }
  mycheckevent(event) {
    if (event.target.checked === true) {
      this.checkedarray.push(event.target.text);
    } else {
      this.checkedarray.splice(this.checkedarray.findIndex(item => item === event.target.text), 1);
    }
  }
  closedialog() {
    this.oDialog.nativeElement.close();

  }


}
