import { Router } from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);

router.get("/users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);

router.patch(
  "/users/:id/block",
  checkAuth(Role.ADMIN),
  UserControllers.blockUser
);

export const UserRoutes = router;
