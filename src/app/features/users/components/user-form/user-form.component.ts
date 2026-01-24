import { Component } from '@angular/core';
import { UserMetaService } from '../services/user-meta.service';
import { CommonModel } from '../../../../shared/models/common.model';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequest } from '../../../../shared/models/user-request.model';

@Component({
    selector: 'app-user-form',
    imports: [ReactiveFormsModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent {

    userRoles: CommonModel[] = [];
    userStatuses: CommonModel[] = [];
    departments: CommonModel[] = [];

    userForm!: FormGroup;

    constructor(
        private metaService: UserMetaService,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) { }
    ngOnInit(): void {
        this.loadDropDowns();
        this.userForm = this.formBuilder.group({
            name: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100),
                Validators.pattern('^[A-Za-z ]+$') // Only letters and spaces
            ]],
            email: ['', [
                Validators.required,
                Validators.email,
                Validators.maxLength(100)
            ]],
            // Note: renamed 'phone' to 'mobile' to match your DTO if necessary
            mobile: ['', [
                Validators.required,
                Validators.pattern('^0\\d{9}$') // Starts with 0, exactly 10 digits
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
                // Complexity patterns
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*')
            ]],
            userRoleId: ['', Validators.required],
            userStatus: ['', Validators.required],
            departmentId: ['', Validators.required],
        });
        console.log(this.userForm.value);
    }
    get formControls() {
        return this.userForm.controls;
    }

    addUser() {
        if (this.userForm.valid) {
            const newUser: UserRequest = {
                name: this.userForm.value.name,
                email: this.userForm.value.email,
                mobile: this.userForm.value.mobile,
                password: this.userForm.value.password,
                userRoleId: Number(this.userForm.value.userRoleId),
                userStatusId: Number(this.userForm.value.userStatus),
                departmentId: Number(this.userForm.value.departmentId),
            }

            this.userService.addUser(newUser).subscribe((res) => {
                console.log(res);
                this.resetForm();
            })
        }
    }
    resetForm() {
        this.userForm.reset();
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
