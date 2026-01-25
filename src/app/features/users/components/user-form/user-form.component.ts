import { Component } from '@angular/core';
import { UserMetaService } from '../services/user-meta.service';
import { CommonModel } from '../../../../shared/models/common.model';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequest } from '../../../../shared/models/user-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../../../app.routes';

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

    updateId = 0;

    userForm!: FormGroup;

    constructor(
        private metaService: UserMetaService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private activiatedRoute: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit(): void {
        this.loadDropDowns();
        this.activiatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.updateId = Number(params['id']);
                this.userService.getUserById(Number(params['id'])).subscribe((res) => {
                    const userCreateRequest: UserRequest = {
                        name: res.name,
                        email: res.email,
                        mobile: res.mobile,
                        password: res.password,
                        userRoleId: res.userRole.id,
                        userStatusId: res.userStatus.id,
                        departmentId: res.department.id,
                    }
                    console.log(res.userStatus.id);
                    this.userForm.patchValue(userCreateRequest);
                })
            }
        })
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
            userStatusId: ['', Validators.required],
            departmentId: ['', Validators.required],
        });
        console.log(this.userForm.value);
    }
    get formControls() {
        return this.userForm.controls;
    }


    processFrom() {
        this.activiatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.updateUser();
                this.resetForm();
                this.router.navigate(['/view']);
            } else {
                this.addUser();
                this.resetForm();
                this.router.navigate(['/view']);
            }
        })
    }

    addUser() {
        if (this.userForm.valid) {
            const newUser: UserRequest = {
                name: this.userForm.value.name,
                email: this.userForm.value.email,
                mobile: this.userForm.value.mobile,
                password: this.userForm.value.password,
                userRoleId: Number(this.userForm.value.userRoleId),
                userStatusId: Number(this.userForm.value.userStatusId),
                departmentId: Number(this.userForm.value.departmentId),
            }

            this.userService.addUser(newUser).subscribe((res) => {
                console.log(res);
                this.resetForm();
            })
        }
    }


    updateUser() {
        if (this.userForm.valid) {
            const newUser: UserRequest = {
                name: this.userForm.value.name,
                email: this.userForm.value.email,
                mobile: this.userForm.value.mobile,
                password: this.userForm.value.password,
                userRoleId: Number(this.userForm.value.userRoleId),
                userStatusId: Number(this.userForm.value.userStatusId),
                departmentId: Number(this.userForm.value.departmentId),
            }

            this.userService.updateUser(this.updateId, newUser).subscribe((res) => {
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
