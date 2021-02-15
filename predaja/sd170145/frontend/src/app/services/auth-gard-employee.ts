import { Injectable } from '@angular/core';
import {
    Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { ShareLoginDataService } from './share-login-data.service';

@Injectable()
export class AuthGuardEmployee implements CanActivate {

    constructor(
        private share: ShareLoginDataService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = this.share.getUser();
        if (!user) return false;
        console.log(user.type);
        if (user.type == 'zaposlen') return true;

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/errorPage']);
        return false;
    }
}