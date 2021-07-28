import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GoogleChartComponent } from 'angular-google-charts';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed=0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  globalData: GlobalDataSummary[] = [];
  constructor(private dataService: DataServicesService) { }


  initChart()
  {
    let dataTable=[];
    dataTable.push(["Country","Cases"]);
    this.globalData.forEach(element=>{
      dataTable.push([element.country,element.confirmed])
    })
    console.log(dataTable);
    
    const pieChart={   
      chartType:'PieChart',
       dataTable:dataTable,
    //firstRowIsData: true,
    options: { 
      height:500
    },
  };
  const columnChart={   
    chartType:'ColumnChart',
     dataTable:dataTable,
  //firstRowIsData: true,
  options: { 
    height:500
  },
};
 
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
      next:(result: any) =>
      {
        console.log(result);
        this.globalData = result;
        result.forEach((cs: { confirmed: number; active: number; deaths: number; recovered: number; }) =>{
            if(!Number.isNaN(cs.confirmed)){
            this.totalConfirmed+=cs.confirmed;
             this.totalActive+=cs.active;
             this.totalDeaths +=cs.deaths;
             this.totalRecovered+=cs.recovered;
             
            }

        })
        this.initChart();
      }
      }
      )
  }
}
