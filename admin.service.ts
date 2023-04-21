import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { SearchQueryParam, Sort } from '../core/api.types';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private configService:AppConfigService,
    private notificationService: NotificationService) { }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  formErrorNotification(appendTo: ViewContainerRef | undefined) {
    this.notificationService.show({
      content: 'Form is invalid',
      appendTo: appendTo,
      hideAfter: 600,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true }
    });
  }

  passwordErrorNotification(appendTo: ViewContainerRef | undefined) {
    this.notificationService.show({
      content: 'Password does not match',
      appendTo: appendTo,
      hideAfter: 600,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true }
    });
  }

  apiErrorNotification(appendTo: ViewContainerRef | undefined, message: any) {
    this.notificationService.show({
      content: message,
      appendTo: appendTo,
      hideAfter: 800,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true }
    });
  }

  getUsersData(query:string,size: string, page: string, sort: Sort, filters:  Array<SearchQueryParam>) {
    let apiParams:HttpParams = new HttpParams();
    apiParams = apiParams.set("size", size);
    apiParams = apiParams.set("page", page);
    if(sort!=undefined){
      apiParams = apiParams.set("sort", sort.field + ',' + sort.dir);
    }
    filters.forEach(f=>{
      apiParams = apiParams.set(f.queryKey, f.queryValue);
    })
    return this.http.get<any>
      (this.configService.SERVER_API_URL + '/admin/users?query='+query,{params:apiParams})
  }

  createUser(usersData: any){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
      return this.http.post(this.configService.SERVER_API_URL + '/admin/users', usersData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUserDetailsById(id:any){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/admin/users/'+id).pipe(
      catchError(this.handleError)
    )
  }

  editUser(userData: any, id: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.patch(this.configService.SERVER_API_URL + '/admin/users/' + id, userData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCountriesList(){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/countries?query=&size=5000000&page=0').pipe(
      catchError(this.handleError)
    )
  }

  getSitesData(query:string,size: string, page: string, sort: Sort, filters:  Array<SearchQueryParam>){
    let apiParams:HttpParams = new HttpParams();
    apiParams = apiParams.set("size", size);
    apiParams = apiParams.set("page", page);
    if(sort!=undefined){
      apiParams = apiParams.set("sort", sort.field + ',' + sort.dir);
    }
    filters.forEach(f=>{
      apiParams = apiParams.set(f.queryKey, f.queryValue);
    })
    return this.http.get<any>
      (this.configService.SERVER_API_URL + '/sites?query='+query,{params:apiParams})
  }

  getSiteDetailsById(id:any){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/sites/'+id).pipe(
      catchError(this.handleError)
    )
  }

  editSite(siteData: any, id: string){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.patch(this.configService.SERVER_API_URL + '/sites/' + id, siteData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  createSite(sitesData: any){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
      return this.http.post(this.configService.SERVER_API_URL + '/sites', sitesData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

    public sizeForExcelExport = this.configService.sizeForExport; 
// query:string,size: string, page: string, sort: Sort, filters:  Array<SearchQueryParam>
  getVehiclesData(query: string, size: any, page: any, sort: Sort, filters: Array<SearchQueryParam>){
    let apiParams:HttpParams = new HttpParams();
    apiParams = apiParams.set("size", size);
    apiParams = apiParams.set("page", page);
    if(sort!=undefined){
      apiParams = apiParams.set("sort", sort.field + ',' + sort.dir);
    }
    filters.forEach(f=>{
      apiParams = apiParams.set(f.queryKey, f.queryValue);
    })
    return this.http.get<any>
      (this.configService.SERVER_API_URL + '/vehicles?query='+query,{params:apiParams})
  }

  getVehicleDetailsById(id:any){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/vehicles/'+id).pipe(
      catchError(this.handleError)
    )
  }

  editVehicle(vehicleData: any, id: string){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.patch(this.configService.SERVER_API_URL + '/vehicles/' + id, vehicleData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  createVehicle(vehicleData: any){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
      return this.http.post(this.configService.SERVER_API_URL + '/vehicles', vehicleData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCompaniesList(){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/companies?query=&size=5000000&page=0').pipe(
      catchError(this.handleError)
    )
  }

  getManufacturersList(){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/manufacturers?query=&size=5000000&page=0').pipe(
      catchError(this.handleError)
    )
  }

  getSitesList(){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/sites?query=&size=5000000&page=0').pipe(
      catchError(this.handleError)
    )
  }

  getRolesList(){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/roles?query=&size=5000000&page=0').pipe(
      catchError(this.handleError)
    )
  }
  
  getModelsList(){
    return this.http.get<any>(this.configService.SERVER_API_URL + '/models?query=&size=5000000&page=0').pipe(
      catchError(this.handleError)
    )
  }

  resetPassword(passwordData: any,idmRefId:string){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
      return this.http.patch(this.configService.SERVER_API_URL + '/admin/users/me/'+idmRefId, passwordData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  getBowserData(query:string,size: string, page: string, sort: Sort, filters:  Array<SearchQueryParam>){
    let apiParams:HttpParams = new HttpParams();
    apiParams = apiParams.set("size", size);
    apiParams = apiParams.set("page", page);
    if(sort!=undefined){
      apiParams = apiParams.set("sort", sort.field + ',' + sort.dir);
    }
    filters.forEach(f=>{
      apiParams = apiParams.set(f.queryKey, f.queryValue);
    })
    return this.http.get<any>
      (this.configService.SERVER_API_URL + '/admin-bowsers?query='+query,{params:apiParams})
  }

  getBowserDetailsById(id: any) {
    return this.http.get<any>(this.configService.SERVER_API_URL + '/admin-bowsers/'+id).pipe(
      catchError(this.handleError)
    )
  }

  createBowser(bowserData: any){
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
      return this.http.post(this.configService.SERVER_API_URL + '/admin-bowsers', bowserData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  editBowser(bowserData: any, id: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.patch(this.configService.SERVER_API_URL + '/admin-bowsers/' + id, bowserData, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }


  //   getVehiclesData(query: string, size: any, page: any, sort: Sort, filters: Array<SearchQueryParam>) {
  //   let apiParams: HttpParams = new HttpParams();
  //   apiParams = apiParams.set("size", size);
  //   apiParams = apiParams.set("page", page);
  //   if (sort != undefined) {
  //     apiParams = apiParams.set("sort", sort.field + ',' + sort.dir);
  //   }
  //   filters.forEach(f => {
  //     apiParams = apiParams.set(f.queryKey, f.queryValue);
  //   })

  

  //   return this.http.get<any>
  //     (this.configService.SERVER_API_URL + '/dashboards/all-transactions?fromDate=' + 
  //      + '&query=' + query, { params: apiParams })
  // }
}
