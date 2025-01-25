import { getAllParkings, getParkingById, createParking } from '../db/database.js'

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