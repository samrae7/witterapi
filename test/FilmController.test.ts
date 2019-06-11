import "reflect-metadata";
import {Request, Response} from "express";
import { Repository } from "typeorm";
import * as typeorm from "typeorm";
import * as sinon from "sinon";
import { Film } from "../src/entity/Film";
import { FilmController } from '../src/controller/FilmController';
import * as td from "testdouble";

let films: Film[];
let filmController: FilmController;

beforeEach(() => {
  films = [{id: 1, name: "Back to the Future"}, {id: 2, name: "Time Bandits"}];
  const mockedFilmRepository = td.object<Repository<Film>>();
  td.when(mockedFilmRepository.find()).thenResolve(films);
  sinon.stub(typeorm, "getRepository").returns(mockedFilmRepository);
  filmController = new FilmController();
})

test('filmController - all', async () => {
  const mockRequest = td.object<Request>();
  const mockResponse = td.object<Response>();
  const result = await filmController.all(mockRequest, mockResponse, () => {})
  expect(result).toEqual(films);
});