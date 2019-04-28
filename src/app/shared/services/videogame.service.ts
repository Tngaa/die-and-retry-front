import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Videogame } from '../models/videogame.model';
import { environment } from 'src/environments/environment';
import { Platform } from '../models/platform.model';
import { Publisher } from '../models/publisher.model';
import { Developer } from '../models/developer.model';

@Injectable()
export class VideogameService {

    constructor(private httpClient: HttpClient) {}

    public getAllVideogames(): Observable<Videogame[]> {
        return this.httpClient.get<Videogame[]>(environment.url_videogames);
    }

    public getAllPlatforms(): Observable<Platform[]> {
        return this.httpClient.get<Platform[]>(environment.url_platforms);
    }
    
    public getAllPublishers(): Observable<Publisher[]> {
        return this.httpClient.get<Publisher[]>(environment.url_publishers);
    }
    
    public getAllDevelopers(): Observable<Developer[]> {
        return this.httpClient.get<Developer[]>(environment.url_developers);
    }

    public createVideogame(videogame: Videogame): Observable<Videogame> {
        return this.httpClient.post<Videogame>(environment.url_videogames, videogame);
    }

    public updateVideogame(videogame: Videogame): Observable<Videogame> {
        return this.httpClient.put<Videogame>(environment.url_videogames + '/' + videogame.id, videogame);
    }

    public deleteVideogame(id: number): Observable<any> {
        return this.httpClient.delete<any>(environment.url_videogames + '/' + id);
    }
}