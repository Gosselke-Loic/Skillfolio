import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ConfigService } from "../core/localStorage";

@Injectable({ providedIn: "root" })
export class HttpService {
    private hostUrl: string;

    constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {
        this.hostUrl = this.configService.getAPiUrl();
    }
};