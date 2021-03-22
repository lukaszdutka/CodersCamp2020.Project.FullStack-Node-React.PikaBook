import { Router } from "express";
import { getUsers, getUserById, createUser, getUsersBooksById } from "../entities/User/User.controller"

const router = Router();

router
    .get("", getUsers)
    .get("/:id", getUserById)
    .get ("/:id/books", getUsersBooksById)
    .post("/", createUser)

export default router;