import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { tap, Subject, takeUntil } from 'rxjs';

import { validateUrl } from 'src/app/_helpers/custom-validators/url.validator';

import { initialValues } from 'src/app/_helpers/initialValues/initialValues-collaborator';

import { UpdateCollaboratorModel } from 'src/app/_helpers/interfaces';

import { CollaboratorService } from 'src/app/store-collaborator/http.client.service';
import { MessagesService } from 'src/app/shared/messageService/message.service';

@Component({
  selector: 'app-new-collaborator',
  templateUrl: './new-collaborator.component.html',
  styleUrls: ['./new-collaborator.component.scss']
})
export class NewCollaboratorComponent implements OnInit, OnDestroy {

    dataFromParams$!: UpdateCollaboratorModel | Data;
    destroy$: Subject<boolean> = new Subject<boolean>();

    initialValues = initialValues;
    profileForm!: FormGroup;
 
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private collaboratorService: CollaboratorService,
        private message: MessagesService
    ) {}

    ngOnInit():void {
        this.route.data.pipe(
            tap((data: UpdateCollaboratorModel | Data) =>
                this.dataFromParams$ = data
            ),
            takeUntil(this.destroy$)
        ).subscribe();

        this.profileForm = this.fb.group({
            _id: [this.dataFromParams$.entity._id],
            file: [this.dataFromParams$.entity.file, [validateUrl]],
            name: [this.dataFromParams$.entity.name, [Validators.required]],
            lastname: [this.dataFromParams$.entity.lastname, [Validators.required]],
            age: [this.dataFromParams$.entity.age, [Validators.required, Validators.min(18), Validators.max(99)]],
            year: [this.dataFromParams$.entity.year, [Validators.required, Validators.min(1984), Validators.max(2022)]],
            departament: [this.dataFromParams$.entity.departament, [Validators.required]],
            language: [this.dataFromParams$.entity.language, [Validators.required]],
            research: [this.dataFromParams$.entity.research, [Validators.required]],
            jobCoach: [this.dataFromParams$.entity.jobCoach, [Validators.required]],
            coachCordinator: [this.dataFromParams$.entity.coachCordinator, [Validators.required]],
            teacher: [this.dataFromParams$.entity.teacher, [Validators.required]]
        });
    };

    //controls
    get file() { return this.profileForm.get("file"); };
    get name() { return this.profileForm.get("name"); };
    get lastname() { return this.profileForm.get("lastname"); };
    get age() { return this.profileForm.get("age"); };
    get year() { return this.profileForm.get("year"); };
    get departament() { return this.profileForm.get("departament"); };
    get language() { return this.profileForm.get("language"); };
    get research() { return this.profileForm.get("research"); };
    get jobCoach() { return this.profileForm.get("jobCoach"); };
    get coachCordinator() { return this.profileForm.get("coachCordinator"); };
    get teacher() { return this.profileForm.get("teacher"); };
    
    onSubmit(form: any): Promise<boolean> {
        const path = this.router.url;

        if(this.profileForm.valid) {
            this.message.clear();

            try {
                this.collaboratorService.update(form);
                this.message.addMsg("collaborator Updated");
            } catch (error) {
                this.message.addMsg("Error to update, try again later");
            };
        }

        if(path.includes("secured-feat")) {
            return this.router.navigateByUrl('secured-feat')
        };

        return this.router.navigateByUrl('/home/profile-collaborator');
    };

    redirect(): Promise<boolean> {
        const path = this.router.url;
        if(path.includes("secured-feat")) {
            return this.router.navigateByUrl('secured-feat')
        };

        return this.router.navigateByUrl('/home/profile-collaborator');
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}