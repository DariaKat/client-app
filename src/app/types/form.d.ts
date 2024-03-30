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

    enum UserProfileRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
        MASTER = 'MASTER',
    }

    interface Profile {
        name: string;
        description: string;
        role: 'ADMIN' | 'USER' | 'MASTER',
        avatarUrl?: string,
        backgroundUrl?: string,
    }
}