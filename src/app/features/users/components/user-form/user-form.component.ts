import { Component } from '@angular/core';
import { UserMetaService } from '../services/user-meta.service';
import { CommonModel } from '../../../../shared/models/common.model';

@Component({
    selector: 'app-user-form',
    imports: [],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent {

    userRoles: CommonModel[] = [];
    userStatuses: CommonModel[] = [];
    departments: CommonModel[] = [];


    constructor(private metaService: UserMetaService) { }

    ngOnInit(): void {
        this.loadDropDowns();
    }

    loadDropDowns(): void {
        this.metaService.getUserRoles().subscribe((res) => {
            this.userRoles = res;
            console.log(this.userRoles);
        })

        this.metaService.getUserStatuses().subscribe((res) => {
            this.userStatuses = res;
            console.log(this.userStatuses);
        })

        this.metaService.getDepartments().subscribe((res) => {
            this.departments = res;
            console.log(this.departments);
        })
    }





}
