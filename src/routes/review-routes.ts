import {ReviewController} from "../controller/ReviewController";

const reviewRoutes = [{
  method: "get",
  route: "/reviews",
  controller: ReviewController,
  action: "all"
}, {
  method: "get",
  route: "/reviews/:id",
  controller: ReviewController, 
  action: "one"
}, {
  method: "post",
  route: "/reviews",
  controller: ReviewController,
  action: "save"
}, {
  method: "delete",
  route: "/reviews/:id",
  controller: ReviewController,
  action: "remove"
}];

export default reviewRoutes;