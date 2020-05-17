interface BasicAuth {
    basicAuthUname: string;
    basicAuthPword: string;
}
export interface Credentials {
    xAuthorisationKey?: string;
    basicAuthUname?: string;
    basicAuthPword?: string;
    basicAuthArray?: BasicAuth[];
}
export {};
