import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const LUGARES_QUERY = gql`
query buscarLugar(){
    lugares() {
    }
}`;

export interface LugaresType {
    id?: number;
    codigo?: string;
    nombre?: string;
    nivel?: number;
    idLugarReferencia?: LugaresType;

}

interface LugarResponse {
    lugares: LugaresType;
}

interface LugaresResponse {
    lugares: LugaresType[];
}

@Injectable({
    providedIn: 'root',
})

export class LugarService {
    constructor(private apollo: Apollo) {
    }

    public async getLugar(cedula: string) {
        const query = await this.apollo.query<LugarResponse>({
            query: LUGARES_QUERY,
            variables: { cedula: cedula }
        });
        return await query.toPromise().then(res => res.data.lugares);
    }
}