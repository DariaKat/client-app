export {};

declare global {
    interface FormInterface {
        login: string;
        password: string;
        name?: string;
    }

    type NameType = 'login' | 'password' | 'name';
}