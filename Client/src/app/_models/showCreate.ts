export class ShowCreate{
    title: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    actors: string[];
    directors: string[];
    duration: number;
    timeStart: Date;
    hallId: number;

    constructor(title, description, dateStart, dateEnd, actors, direcors, duration, timestart, hallId){
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.actors = actors;
        this.directors = direcors;
        this.duration = duration;
        this.timeStart = timestart;
        this.hallId = hallId;
    }
}