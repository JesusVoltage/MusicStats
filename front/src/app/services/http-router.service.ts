import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';



@Injectable({
	providedIn: 'root'
})
export class HttpRouterService implements Resolve<any>
{

	constructor(private http: HttpClient) { }

	resolve(route: ActivatedRouteSnapshot) {

		switch (route.routeConfig.path) {

			case 'album':
				return Promise.all([
					this.http.get("/doctorsgateusers/" + route.paramMap.get("idPublic")).toPromise()
				]);

			// case 'users/:idPublic':
			// 	return Promise.all([
			// 		this.http.get("/doctorsgateusers/" + route.paramMap.get("idPublic")).toPromise(),
			// 		this.http.post("/stats/user/" + route.paramMap.get("idPublic"), {}).toPromise()]);



			// case 'user/:idPublic':
			// 	return this.http.get("/user/" + route.paramMap.get("idPublic"));

			// case 'verifications/:idPublicUser':
            // case 'verifications/:idPublicUser/:idPublicRequest':
            //     return this.http.get("/verifications/" + route.paramMap.get("idPublicUser"));

			// case 'uploads/:idPublic':
			// 	return this.http.get("/uploads/" + route.paramMap.get("idPublic"));





			default:
				console.log('ruta no reconocida')
				break;
		}
	}
}
