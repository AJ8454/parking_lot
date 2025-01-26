import express from 'express'

import { parkingController } from '../controllers/parking_controllers.js';

export const router = express.Router()

router.get("/allParkings", parkingController.getAllParkings);

router.post("/createParking", parkingController.createParking);

router.post("/createBooking", parkingController.createBooking);

router.post("/allocateParking", parkingController.allocateParking);

router.get("/allBookedParkings", parkingController.getAllBookedParkings);

// router.put("/user", parkingController.updateUser);

// router.delete("/user/:id", parkingController.deleteUser);