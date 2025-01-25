import { createResponse } from '../helpers/response_helper.js';
import { parkingModels } from '../models/parking_model.js';

export const parkingController = {

    getAllParkings : async (req, res) => {
        const parkings = await parkingModels.queryGetAllParkings();
        res.status(200).send(createResponse({status: 200, data: parkings, message: "Get parkings Request successfull"}));
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