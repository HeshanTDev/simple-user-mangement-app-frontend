export interface UserResponse {
    id: number;
    name: string;
    email: string;
    mobile: string;
    userType: {
        id: number;
        name: string;
    };
    userStatus: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date | null;
}
