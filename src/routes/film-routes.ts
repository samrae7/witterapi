import {FilmController} from "../controller/FilmController";

const filmRoutes = [{
  method: "get",
  route: "/films",
  controller: FilmController,
  action: "all"
}, {
  method: "get",
  route: "/films-with-reviews",
  controller: FilmController,
  action: "allWithReviews"
}, {
  method: "get",
  route: "/films/:id",
  controller: FilmController,
  action: "one"
}, {
  method: "post",
  route: "/films",
  controller: FilmController,
  action: "save"
}, {
  method: "delete",
  route: "/films/:id",
  controller: FilmController,
  action: "remove"
}];

export default filmRoutes;