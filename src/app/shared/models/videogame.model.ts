import { Platform } from './platform.model';
import { Publisher } from './publisher.model';
import { Developer } from './developer.model';

export class Videogame {

    public id: number;

    public title: string;

    public releaseDate: string;

    public platform: Platform;

    public publisher: Publisher;

    public developer: Developer;

    public _isModifying = false;
}