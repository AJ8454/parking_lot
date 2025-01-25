import { createResponse } from '../helpers/response_helper.js';
import { userModels } from '../models/user_model.js';

export const userController = {

    getAllUsers : async (req, res) => {
        const users = await userModels.queryGetAllUsers();
        res.status(200).send(createResponse({status: 200, data: users, message: "Get Request successfull"}));
    },

    createUser : async (req, res) => {
        try {            
            const {firstName, lastName, category, carNumber, mobileNumber} =  req.body;
            const user = await userModels.queryCreateUser(firstName, lastName, category, carNumber, mobileNumber);
            res.status(200).send(createResponse({status: 200, data: user, message: "user Created successfull"}));
        } catch (error) {
            res.status(400).send(createResponse({status: 400, success: false, error: error.message}));
        }
    },

    updateUser : async (req, res) => {
        try {            
            const {id, firstName, lastName, category, carNumber, mobileNumber} =  req.body;
            const user = await userModels.queryUpdateUser(id,firstName, lastName, category, carNumber, mobileNumber);
            res.status(200).send(createResponse({status: 200, data: user, message: "user Created successfull"}));
        } catch (error) {
            res.status(400).send(createResponse({status: 400, success: false, error: error.message}));
        }
    },

    deleteUser : async (req, res) => {
        try {            
            const id =   req.params.id;
            await userModels.queryDeleteUser(id);
            res.status(200).send(createResponse({status: 200, message: "user deleted successfull"}));
        } catch (error) {
            res.status(400).send(createResponse({status: 400, success: false, error: error.message}));
        }
    },


}