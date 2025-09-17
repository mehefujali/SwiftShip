import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { ParcelRoutes } from "../modules/parcel/parcel.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/", route: UserRoutes },
  { path: "/parcels", route: ParcelRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
