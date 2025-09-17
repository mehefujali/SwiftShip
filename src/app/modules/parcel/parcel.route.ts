import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelValidationSchema } from "./parcel.validation";
import { ParcelControllers } from "./parcel.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.SENDER),
  validateRequest(createParcelValidationSchema),
  ParcelControllers.createParcel
);

router.get(
  "/me",
  checkAuth(Role.SENDER, Role.RECEIVER),
  ParcelControllers.getMyParcels
);

router.get("/", checkAuth(Role.ADMIN), ParcelControllers.getAllParcels);

router.patch(
  "/:id/cancel",
  checkAuth(Role.SENDER),
  ParcelControllers.cancelParcel
);

router.patch(
  "/:id/status",
  checkAuth(Role.ADMIN),
  ParcelControllers.updateParcelStatus
);

router.patch(
  "/:id/confirm-delivery",
  checkAuth(Role.RECEIVER),
  ParcelControllers.confirmDelivery
);

export const ParcelRoutes = router;
