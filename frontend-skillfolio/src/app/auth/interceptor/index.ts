import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";

import { AuthInterceptor } from "./auth.interceptors";

export const authInterceptorProvider: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];