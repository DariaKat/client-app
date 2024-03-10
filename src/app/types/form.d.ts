export {};

declare global {
    interface FormInterface {
        login: string;
        password: string;
        name?: string;
    }

    interface FormEditProfile { 
        name?: string;
        description?: string;
    }

    type NameType = 'login' | 'password' | 'name' | 'description';
}