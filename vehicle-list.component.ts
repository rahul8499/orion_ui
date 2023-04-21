import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { debounceTime, filter, take } from 'rxjs/operators';
import { filterToQueryParam, Sort } from 'src/app/core/api.types';
import { AdminService } from '../admin.service';
// import
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  public sites: any[] = [];
  public gridView!: GridDataResult;
  public sort!: Sort;
  public filter!: CompositeFilterDescriptor;
  public page = 0;
  public skip = 0;
  public size = 10;
  public query:any = '';
  public loading: boolean = false;

  @ViewChild('txtSearchStringInput', { static: false })
  set txtSearchStringInput(txtSearchStringInput: TextBoxComponent) {
    if (txtSearchStringInput) {
      txtSearchStringInput.valueChange
        .pipe(
          debounceTime(1000)
        ).subscribe(
          (q: any) => {
            this.query = q;
            this.loadVehiclesData(this.query,this.size, this.page, this.sort, this.filter);
          });
    }
  }

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadVehiclesData(this.query,this.size, this.page, this.sort, this.filter);
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.size = event.take;
    this.page = ((event.skip + event.take) / event.take) - 1;
    this.loadVehiclesData(this.query,this.size, this.page, this.sort, this.filter);
  }
  
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = {'field':sort[0].field, 'dir':sort[0].dir};
    this.loadVehiclesData(this.query,this.size, this.page, this.sort, this.filter);
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadVehiclesData(this.query,this.size, this.page, this.sort, this.filter);
  }

  loadVehiclesData(query:any,size: any, page: any, sort: any, filter: any): void {
    this.loading = true;
    this.adminService.getVehiclesData(query,size, page, sort, 
        filter?filterToQueryParam(filter):[]
      ).pipe(take(1)).subscribe(res => {
      this.sites = res['content'];
      this.gridView = {
        data: this.sites,
        total: res['page']['totalElements']
      };
      this.loading = false;
    }, err => {
      console.log(err);
    })
  }

  


  // query, size, page ,sort
   public exportAllData(): Observable<any> {
    return  this.adminService.getVehiclesData(this.query, this.adminService.sizeForExcelExport, "0", this.sort,  
              this.filter?filterToQueryParam(this.filter):[]
        ).pipe(              // add new key value pair with formatted data 
          take(1),
          map((res)=>{
              // add new key value pair with formatted data 
              return <GridDataResult>{
              data: res["content"],
              total: parseInt(res['page']['totalElements']),
            }
          })
        )  
  }


  editHandler(event: any){
    this.router.navigateByUrl(`/admin/edit-vehicle/${event.dataItem.id}`)  
  }

  viewHandler(event: any){
    this.router.navigateByUrl(`/admin/view-vehicle/${event.dataItem.id}`)  
  }


}
