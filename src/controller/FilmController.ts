import "reflect-metadata";
import {getRepository, Repository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Film} from "../entity/Film";

export class FilmController {
    private filmRepository: Repository<Film>;

    constructor() {
        this.filmRepository = getRepository(Film);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.filmRepository.find();
    }

    async allWithReviews() {
        return this.filmRepository.createQueryBuilder("film")
        .leftJoinAndSelect("film.review", "review")
        .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.filmRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.filmRepository.save(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const film = await this.filmRepository.findOne(request.params.id);
        const merged = await this.filmRepository.merge(film, request.body);
        return this.filmRepository.save(merged);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let filmToRemove = await this.filmRepository.findOne(request.params.id);
        return this.filmRepository.remove(filmToRemove);
    }
}