import { getAllParkings, getParkingById, createParking, createBooking, allocateParking, removeAllocateParking, getAllBookedParkings } from '../db/database.js'

export const parkingModels = {

    queryGetAllParkings : async () => await getAllParkings(),

    queryGetParkingById : async (id) => await getParkingById(id),
    
    queryCreateParking: async (count) => {
        try {
            for (let i = 1; i <= count; i++) {
                const parkingNo = `P${i}`; 
                await createParking(parkingNo, false);
            }
            return getAllParkings();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    queryCreateBooking: async (userId, bookingTime, graceTime,id) => {
        return await createBooking(userId, bookingTime, graceTime,id);
    },

    queryAllocateParking: async (isAllocated, userId, id) => {
        return await allocateParking(isAllocated, userId, id);
    },

    queryRemoveAllocateParking: async (isAllocated, userId, id) => {
        return await removeAllocateParking(isAllocated, userId, id);
    },

    queryGetAllBookedParkings: async () => {
        return await getAllBookedParkings();
    },

    // queryDeleteUser : async (id) => await deleteUser(id),

    // queryUpdateUser: async (id , firstName, lastName, category, carNumber, mobileNumber) => {
    //     try {
    //         const newUser = await updateuser(id,firstName, lastName, category, carNumber, mobileNumber);
    //         return newUser;
    //     } catch (error) {
    //         console.error('Error update user:', error);
    //         throw error;
    //     }
    // },

}