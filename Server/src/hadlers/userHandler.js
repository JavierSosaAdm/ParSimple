
const {
    getAllUserController,
    getUserNameController,
    userIDController,
    putUserController,
    deleteUserController,
    postUserController
} = require('../controllers/userController'); 

//!HANDLER QUE MANEJA LA PETICION GET A /USERS, PARA TRAER TODOS LOS USUARIOS (SOLO LA VA A UTILIAR EL PERFIL DE ADMIN)

const getAllUser = async (req, res) => {
    try {
        const result = await getAllUserController()
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getUserByName = async (req, res) => {
    const { name } = req.query;

    try {
        const userName = await getUserNameController(name);
        res.status(200).json(userName);
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//!HANDLER QUE MANEJA LA PETICION GET A /USERS/:ID PARA TRAER UN USUARIO MEDIANTE UN ID ESPECIFICO
const getUserByID = async (req, res) => {
    const {id} = req.params
    try {
        const result = await userIDController(id)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const putUser = async (req, res) => {
    const {id} = req.params
    const {uid, email, password, name, lastName, address, phone, image, is_Admin, is_Delete} = req.body
    try {
        const data = {
            uid: uid,
            email: email,
            password: password,
            name: name,
            lastName: lastName,
            address: address,
            phone: phone,
            image: image,
            is_Admin: is_Admin,
            is_Delete: is_Delete
        }
        const result = await putUserController(id, data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params

    try {
        const deleteUser = await deleteUserController(id);
        return res.status(200).json({message: `El usuario ${deleteUser.uid} fue eliminado correctamente`})
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const postUser = async (req, res) => {
   
    const {uid, email, password, name, lastName, address, phone, image, is_Admin, is_Delete} = req.body
    try {
        const data = {
            uid: uid,
            email: email,
            password: password,
            name: name,
            lastName: lastName,
            address: address,
            phone: phone,
            image: image,
            is_Admin: false,
            is_Delete: is_Delete
        }
        const newUser = await postUserController(data)
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    getAllUser,
    getUserByName,
    getUserByID,
    putUser,
    deleteUser,
    postUser
}
    
