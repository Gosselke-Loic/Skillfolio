import { Component, ViewChild, OnInit, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

import { CollaboratorService } from 'src/app/store-collaborator/http.client.service';

import { CollaboratorModel, TableModelCollaborator } from 'src/app/_helpers/interfaces';

@Component({
    selector: 'app-dashboard-collaborators',
    templateUrl: './dashboard-collaborators.component.html',
    styleUrls: ['./dashboard-collaborators.component.scss']
})
export class DashboardCollaboratorsComponent implements OnInit, OnDestroy {

    collaboratorList$!: CollaboratorModel[];
    displayedColumns: string[] = ['name', 'lastname', 'age', 'year', 'departament', 'language', 'research', 'actions'];
    destroy$: Subject<boolean> = new Subject<boolean>();
    data!: CollaboratorModel[];
    clicked = new Array();

    @Input() dataSource!: MatTableDataSource<TableModelCollaborator>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private collaboratorService: CollaboratorService,
    ) {}

    ngOnInit(): void {
        this.collaboratorService.entities$.pipe(takeUntil(this.destroy$)).subscribe(
            res => { if(res)
                this.data = res.filter(item => item.lastname !== "");
                let dataToSource = this.data.map((item: CollaboratorModel) => this.buildTable(item));
                
                this.dataSource = new MatTableDataSource(dataToSource);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        )
        this.dataSource.data.forEach(item => {
            this.clicked.push(false)
        })
    }

    buildTable(item: CollaboratorModel) {
        return {
            _id: item._id,
            name: item.name,
            lastname: item.lastname,
            age: item.age,
            year: item.year,
            departament: item.departament,
            language: item.language,
            research: item.research
        }
    }

    FilteredCollaborator(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage()
        }
    };

    interesedClick(item: TableModelCollaborator) {
        console.log(item);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
