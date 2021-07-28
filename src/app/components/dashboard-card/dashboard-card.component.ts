import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {


  @Input('totalConfirmed')
  totalConfirmed: any;
  @Input('totalDeaths')
  totalDeaths: any;
  @Input('totalActive')
  totalActive: any;
  @Input('totalRecovered')
  totalRecovered: any;

  constructor() { }

  ngOnInit(): void {
  }

}
