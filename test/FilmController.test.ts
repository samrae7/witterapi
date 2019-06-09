import "reflect-metadata";
import {Request, Response} from "express";
import { Repository } from "typeorm";
import * as typeorm from "typeorm";
import { Film } from "../src/entity/Film";
import { FilmController } from '../src/controller/FilmController';
// jest.mock("typeorm");
// const mocked = typeorm as jest.Mocked<typeof typeorm>;
import * as td from "testdouble";

let films: Film[];
let filmController: FilmController;

beforeEach(() => {
  films = [{id: 1, name: "Back to the Future"}, {id: 2, name: "Time Bandits"}];
  const mockedFilmRepository = td.object<Repository<Film>>();
  td.when(mockedFilmRepository.find()).thenResolve(films);
  // mocked.getRepository.mockReturnValue(mockedFilmRepository);
  filmController = new FilmController(mockedFilmRepository);
})

test('filmController - all', async () => {
  const mockRequest = td.object<Request>();
  const mockResponse = td.object<Response>();
  const result = await filmController.all(mockRequest, mockResponse, () => {})
  expect(result).toEqual(films);
});