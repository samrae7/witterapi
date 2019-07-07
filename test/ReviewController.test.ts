import "reflect-metadata";
import {Request, Response} from "express";
import { Repository } from "typeorm";
import * as typeorm from "typeorm";
import * as sinon from "sinon";
import { Film } from "../src/entity/Film";
import { Review } from "../src/entity/Review";
import { ReviewController } from '../src/controller/ReviewController';
import * as td from "testdouble";

let films: Film[];
let reviewController: ReviewController;
let mockedFilmRepository;
let mockedReviewRepository;

beforeAll(() => {
  films = [{id: 1, name: "Back to the Future"}, {id: 2, name: "Time Bandits"}];
  mockedFilmRepository = td.object<Repository<Film>>();
  const getRepositoryStub = sinon.stub(typeorm, "getRepository")
  getRepositoryStub.withArgs(Film).returns(mockedFilmRepository);
  mockedReviewRepository = td.object<Repository<Review>>();
  getRepositoryStub.withArgs(Review).returns(mockedReviewRepository);
  reviewController = new ReviewController();
});

test('reviewController - save review of existing film', async () => {
  td.when(mockedFilmRepository.findOne("1")).thenResolve(films[0]);
  const mockRequest = td.object<Request>();
  const mockResponse = td.object<Response>();
  const youTubeVideoId = "12AAAXY";
  mockRequest.body = {"youTubeVideoId": youTubeVideoId, "film": {id: "1"}};
  await reviewController.save(mockRequest, mockResponse, () => {})
  td.verify(mockedReviewRepository.save({youTubeVideoId, film: films[0]}));
});

test('reviewController - save review of new film', async () => {
  const mockRequest = td.object<Request>();
  const mockResponse = td.object<Response>();
  const youTubeVideoId = "1BBBAB";
  const newFilmPayload = {name: "Avengers: End Game"};
  mockRequest.body = {"youTubeVideoId": youTubeVideoId, "film": newFilmPayload};
  await reviewController.save(mockRequest, mockResponse, () => {})
  td.verify(mockedReviewRepository.save({youTubeVideoId, film: newFilmPayload}));
});


