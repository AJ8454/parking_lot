import { createResponse } from '../helpers/response_helper.js';
import { parkingModels } from '../models/parking_model.js';
import { userModels } from '../models/user_model.js';

export const parkingController = {

    getAllParkings : async (req, res) => {
        const parkings = await parkingModels.queryGetAllParkings();
        res.status(200).send(createResponse({status: 200, data: parkings, message: "Get parkings Request successfull"}));
    },

    getAllBookedParkings : async (req, res) => {
        const parkings = await parkingModels.queryGetAllBookedParkings();
        res.status(200).send(createResponse({status: 200, data: parkings, message: "getAllBookedParkings Request successfull"}));
    },

    createParking : async (req, res) => {
        try {
            const {count} =  req.body;
            const allParkings = await parkingModels.queryGetAllParkings(); 
            const rowCount = allParkings.length;
            if (count != 120) {
                res.status(400).send(createResponse({status: 400, success: false, error: `Maximum ${120} allowed`}));
            }else{
                if(rowCount != 120){
                    const user = await parkingModels.queryCreateParking(count);
                    res.status(200).send(createResponse({status: 200, data: user, message: "createParking successfull"}));
                }else{
                    res.status(400).send(createResponse({status: 400, success: false, error: `Maximum ${120} allowed`}));
                }
            }    
        } catch (error) {
            res.status(400).send(createResponse({status: 400, success: false, error: error.message}));
        }
    },

    createBooking :  async (req, res) => {
        const {userId} =  req.body;

        // check in user table if user is available or not
        const user = await userModels.queryGetUserById(userId); 

        if(user === undefined){
            res.status(404).send(createResponse({status: 404, success: false,message: "User Not Found"}));   
        }else{
            // get all available parking in a sequence and allocated the user in a FCFS Order
            const allParkings = await parkingModels.queryGetAllParkings(); 

            var firstNullUserIdIndex = null;
            // first 24 parking space is not firstclass and pregnant users, rest other for general
            // but if first 24 space is Allocated then use general space for special user with priority
            if(user.category === 'general'){
                 // Allocate from index 24 onwards
                const availableSlot = allParkings.findIndex((parking, index) => index >= 24 && parking.userId === null);
                if (availableSlot !== -1) {
                    firstNullUserIdIndex = availableSlot;
                } else {
                    res.status(400).send(createResponse({status: 400, message: "No available parking."}));
                }
            }else{
                // Allocate from index 0 to 23
                const availableSlot = allParkings.findIndex((parking, index) => index >= 0 && index <= 23 && parking.userId === null);
                if (availableSlot !== -1) {
                    firstNullUserIdIndex = availableSlot;
                } else {
                    // if slot not available for special user the user general space to park
                    const availableSlot = allParkings.findIndex((parking, index) => index >= 24 && parking.userId === null);
                    firstNullUserIdIndex = availableSlot;
                }
            }
            const parkingData = allParkings[firstNullUserIdIndex];
            if(parkingData.isAllocated === 1){
                res.status(400).send(createResponse({status: 400, message: "Parking already Allocated"}));
            }else{
                // Get the current time
                const currentTime = new Date();
                // Create a variable for current time + 30 minutes
                const timePlus30Minutes = new Date(currentTime.getTime() + 30 * 60 * 1000); // Add 30 minutes in milliseconds
                const Bookedparking = await parkingModels.queryCreateBooking(userId, currentTime, timePlus30Minutes, parkingData.id);
                res.status(200).send(createResponse({status: 200, data: Bookedparking, message: "Bookedparking Request successfull"}));   
            }
        }
    },

    allocateParking : async (req, res) => {

        const {id,userId,parkingNo} =  req.body;

        const allParkings = await parkingModels.queryGetAllParkings(); 

        const bookedUserParkingIndex = allParkings.findIndex(parking => parking.id === id && parking.userId === userId && parking.parkingNo === parkingNo);
        if(bookedUserParkingIndex === -1){
            res.status(200).send(createResponse({status: 200, message: "Parking Not booked Yet!!"}));
        }else{
            console.log(`${bookedUserParkingIndex} ${allParkings[bookedUserParkingIndex].id}`);
            // need to get the object of booked user and check grace time is before current time the allocate the parking, else remove that user from that parking space
            const userBookedParking = allParkings[bookedUserParkingIndex];

            if(userBookedParking.isAllocated === 1){
                res.status(200).send(createResponse({status: 200, message: "Parking already Allocated"}));
            }else{
                // Get the current time
                const currentTime = new Date();

                // Convert graceTime to a Date object
                const graceTimeDate = new Date(userBookedParking.graceTime);

                // Check if the current time is before graceTime
                if (currentTime < graceTimeDate) {
                    const BookedparkingAllocated = await parkingModels.queryAllocateParking(true, userBookedParking.userId, userBookedParking.id);
                    res.status(200).send(createResponse({status: 200, data: BookedparkingAllocated, message: "BookedparkingAllocated Request successfull"}));
                } else {
                    // if time after grace the remove userid and allocated status to false
                    const removedAllocatedParking = await parkingModels.queryRemoveAllocateParking(false, NULL, userBookedParking.id);
                    res.status(200).send(createResponse({status: 200, data: removedAllocatedParking, message: "removedAllocatedParking Request successfull"}));
                }
            }
        }
    },


    // updateParking : async (req, res) => {
    //     try {            
    //         const {id, firstName, lastName, category, carNumber, mobileNumber} =  req.body;
    //         const user = await parkingModels.queryUpdateUser(id,firstName, lastName, category, carNumber, mobileNumber);
    //         res.status(200).send(createResponse({status: 200, data: user, message: "user Created successfull"}));
    //     } catch (error) {
    //         res.status(400).send(createResponse({status: 400, success: false, error: error.message}));
    //     }
    // },

    // deleteUser : async (req, res) => {
    //     try {            
    //         const id =   req.params.id;
    //         await parkingModels.queryDeleteUser(id);
    //         res.status(200).send(createResponse({status: 200, message: "user deleted successfull"}));
    //     } catch (error) {
    //         res.status(400).send(createResponse({status: 400, success: false, error: error.message}));
    //     }
    // },


}