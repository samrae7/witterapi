import userRoutes from "./user-routes";
import filmRoutes from "./film-routes";
import reviewRoutes from "./review-routes";

export const Routes = [...userRoutes, ...filmRoutes, ...reviewRoutes];