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
let mockedFilmRepository;

beforeAll(() => {
  films = [{id: 1, name: "Back to the Future"}, {id: 2, name: "Time Bandits"}];
  mockedFilmRepository = td.object<Repository<Film>>();
  sinon.stub(typeorm, "getRepository").returns(mockedFilmRepository as Repository<any>);
  filmController = new FilmController();
})

test('filmController - get all', async () => {
  td.when(mockedFilmRepository.find()).thenResolve(films);
  const mockRequest = td.object<Request>();
  const mockResponse = td.object<Response>();
  const result = await filmController.all(mockRequest, mockResponse, () => {})
  expect(result).toEqual(films);
});

test('filmController - get one', async () => {
  td.when(mockedFilmRepository.findOne(1)).thenResolve(films[0]);
  const mockRequest = td.object<Request>();
  const mockResponse = td.object<Response>();
  mockRequest.params.id = 1;
  const result = await filmController.one(mockRequest, mockResponse, () => {})
  expect(result).toEqual(films[0]);
});