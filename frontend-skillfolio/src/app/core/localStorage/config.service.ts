import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

type AppEnv = typeof environment;

@Injectable({ providedIn: 'root' })
export class ConfigService {

    getAPiUrl(): string {
        return environment?.apiURl;
    };

    getAuthSettings(): AppEnv['setting']['auth'] {
        return environment?.setting?.auth;
    };
}