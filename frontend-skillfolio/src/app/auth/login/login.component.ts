import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UserStoreService } from 'src/app/store-users/http.client.service';
import { InterceptorRoleService } from 'src/app/services/interceptor-role.service';
import { MessagesService } from 'src/app/shared/messageService/message.service';
import { IUserModel } from 'src/app/_helpers/interfaces';
import { AuthFacade } from '../store/auth.facade';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    Users$!: IUserModel[];
    destroy$: Subject<boolean> = new Subject<boolean>();

    isloading$ = this.authFacade.isLoadingLogin$;
    isError$ = this.authFacade.hasLoginError$;
    profileForm!: FormGroup;
    user = {
        email: "",
        password: ""
    }

    constructor(
        private fb: FormBuilder, 
        private authFacade: AuthFacade,
        private userStore: UserStoreService,
        private router: Router,
        private messageService: MessagesService,
        private roleService: InterceptorRoleService
    ) {
        this.userStore.entities$.pipe(takeUntil(this.destroy$)).subscribe(res => this.Users$ = res)
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            email: [this.user.email, [Validators.required, Validators.email]],
            password: [this.user.password, [Validators.required]]
        })
    }

    get email() { return this.profileForm.get("email"); };
    get password() { return this.profileForm.get("password"); };

    onSubmit(): void {
        const { email, password } = this.profileForm.value;
        
        const checkAuth: boolean = this.roleService.getRole(email, this.router.url);
        if(checkAuth === false) {
            this.messageService.addMsg("Incorrect credentials or no permissions");
        } else {
            this.authFacade.login(email, password);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}