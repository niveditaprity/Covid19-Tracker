import { Component, OnInit ,Input} from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServicesService } from 'src/app/services/data-services.service';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  
  globalData: GlobalDataSummary[] = [];
  countries:string[]=[];
  totalConfirmed:number = 0;
  totalActive:number = 0;
  totalDeaths:number = 0;
  totalRecovered:number = 0;
  constructor(private dataService:DataServicesService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
      next:(result: any) =>
      {
        console.log(result);
        this.globalData = result;
        result.forEach((cs: { confirmed: number; active: number; deaths: number; recovered: number; country: string;}) =>{
            if(!Number.isNaN(cs.confirmed)){
            this.countries.push(cs.country);
             
            }

        })
      }
      })
    
  }
updateValue(country: string){
  this.dataService.getGlobalData().subscribe(
    {
    next:(result: any) =>
    {
      console.log(result);
      this.globalData = result;
      result.forEach((cs: { confirmed: number; active: number; deaths: number; recovered: number; country: string;}) =>{
          if(cs.country==country){
          this.totalActive = cs.active;
          this.totalDeaths = cs.deaths;
          this.totalRecovered = cs.recovered;
          this.totalConfirmed = cs.confirmed;
           
          }

      })
    }
    })
}
}
