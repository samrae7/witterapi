import "reflect-metadata";
import {getRepository, Repository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Review} from "../entity/Review";
import { Film } from "../entity/Film";

export class ReviewController {
    private reviewRepository: Repository<Review>;
    private filmRepository: Repository<Film>;

    constructor() {
        this.reviewRepository = getRepository(Review);
        this.filmRepository = getRepository(Film);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.reviewRepository.find({ relations: ["film"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.reviewRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let film: Film;
        if (request.body.film.id) {
            film = await this.filmRepository.findOne(request.body.film.id);
        }
        if (film) {
            return this.reviewRepository.save({youTubeVideoId: request.body.youTubeVideoId, film});
        } else {
            return this.reviewRepository.save(request.body);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const reviewToRemove = await this.reviewRepository.findOne(request.params.id);
        await this.reviewRepository.remove(reviewToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const review = await this.reviewRepository.findOne(request.params.id);
        const merged = await this.reviewRepository.merge(review, request.body);
        return this.reviewRepository.save(merged);
    }
}