import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { INewUser, IUserModel, UpdateUser } from 'src/app/_helpers/interfaces';

import { UserStoreService } from 'src/app/store-users/http.client.service';
import { MessagesService } from 'src/app/shared/messageService/message.service';

import { DeleteUserDialogComponent } from './delete-user/deleteUser-dialog.component';
import { UpdateUserDialogComponent } from './update-user/updateUser-dialog.component';
import { NewUserDialogComponent } from './new-user/newUser-dialog.component';

@Component({
    selector: 'app-super-admin-feat',
    templateUrl: './super-admin-feat.component.html',
    styleUrls: ['./super-admin-feat.component.scss']
})
export class SuperAdminFeatComponent implements OnInit, OnDestroy {

    readonly goBack = {link: "/secured-feat", label: "Go back"};

    allUsers$: Observable<IUserModel[]> = this.userService.entities$;
    destroy$: Subject<boolean> = new Subject<boolean>();
    search!: string;
    selectedId = "";
    newUserBind: INewUser = {
        name: "",
        email: "",
        password: "",
        type: "",
        role: ""
    }

    constructor(
        private userService: UserStoreService,
        private message: MessagesService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {}

    openDialog(email: string, id: string): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            width: '300px',
            data: {
                email,
                id
            },
        })

        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(res => {
            if(res) {
                this.delete(res)
            }
        })
    };

    openDialog2(item: UpdateUser) {
        const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
            width: '400px',
            data: {
                id: item.id,
                name: item.name,
                email: item.email,
                password: item.password,
                type: item.type,
                role: item.role
            }
        });

        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(res => {
            if(res) {
                this.updateUser(res);
            }
        })
    };

    openDialog3() {
        const dialogRef = this.dialog.open(NewUserDialogComponent, {
            width: '400px',
            data: {
                name: this.newUserBind.name,
                email: this.newUserBind.email,
                password: this.newUserBind.password,
                type: this.newUserBind.type,
                role: this.newUserBind.role
            }
        });

        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(res => {
            if(res) {
                this.createUser(res);
            }
        });
    };

    delete(id: string): void {
        this.message.clear();
        try {
            this.userService.delete(id);
            this.message.addMsg("User Deleted")
        } catch (error) {
            this.message.addMsg("Error to delete, try again later")
        }
    };

    updateUser(item: UpdateUser): void {
        this.message.clear();
        try {
            if(item.password === null) {
                const itemWithoutPassword = {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    type: item.type,
                    role: item.role
                }
                this.userService.update(itemWithoutPassword);
                this.message.addMsg("Updated User, password unchanged")
            };

            if(item.password !== null) {
                this.userService.update(item);
                this.message.addMsg("Updated User, password changed")
            }
        } catch (error) {
            this.message.addMsg("Error to update, try again later")
        }
    };

    createUser(item: INewUser): void {
        try {
            if(item.type === "collaborator") {
                this.userService.add(item, { isOptimistic: false });
                this.message.addMsg("User and Collaborator created");
            }

            if(item.type !== "collaborator") {
                this.userService.add(item, { isOptimistic: false });
                this.message.addMsg("User created");
            }
        } catch (error) {
            this.message.addMsg("Error to create, try again later")
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
