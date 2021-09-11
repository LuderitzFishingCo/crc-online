import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";

export function GetCurrentRouteParams(route: ActivatedRoute): Observable<Params> {
    return route.queryParams;
}

export function GetCurrentPathParams(route: ActivatedRoute): Observable<Params> {
    return route.params;
}

// export function GetCurrentRoute() {
//     this.route.queryParams
//       .subscribe(params => {
//         console.log(params); // { orderby: "price" }
//         this.orderby = params.orderby;
//         console.log(this.orderby); // price
//       }
//       );
//   }

// route.params.subscribe(params => {
//     this.id = +params['id']; // (+) converts string 'id' to a number

//     // In a real app: dispatch action to load the details here.
//  });