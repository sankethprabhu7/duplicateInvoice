import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
// @Input() date1;
// @Input() date2;
  constructor() { }

  ngOnInit() {
    // console.log('this is fotter ' + this.date1 + '' + this.date2);
  }
  // funcontamination() {
  //   console.log('this is fotter ' + this.date1 + '' + this.date2);
  // }
}
