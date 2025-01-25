import { getUsers, getUserById, createUser, deleteUser, updateuser, getUserByMobileNumber, getUserByCarNumber } from '../db/database.js'

export const userModels = {

    queryGetAllUsers : async () => await getUsers(),

    queryGetUserById : async (id) => await getUserById(id),
    
    queryCreateUser: async (firstName, lastName, category, carNumber, mobileNumber) => {
        try {
            if (!firstName || !lastName || !category || !carNumber || !mobileNumber) {
                throw new Error('All fields are required.');
            }

            const existingUser = await getUserByCarNumber(carNumber);

            if(existingUser != undefined){
                throw new Error('Given carNumber already Exist');
            }
            
            const newUser = await createUser(firstName, lastName, category, carNumber, mobileNumber);
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    queryDeleteUser : async (id) => await deleteUser(id),

    queryUpdateUser: async (id , firstName, lastName, category, carNumber, mobileNumber) => {
        try {
            const newUser = await updateuser(id,firstName, lastName, category, carNumber, mobileNumber);
            return newUser;
        } catch (error) {
            console.error('Error update user:', error);
            throw error;
        }
    },

}