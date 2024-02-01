
const {
    getAllUserController,
    // getUserNameController,
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
        return res.status(400).json({message: error});
    }
};

// const getUserByName = async () => {
//     try {
        
//     } catch (error) {
//         return res.status(400).json({message: error});
//     }
// };

//!HANDLER QUE MANEJA LA PETICION GET A /USERS/:ID PARA TRAER UN USUARIO MEDIANTE UN ID ESPECIFICO
const getUserByID = async (req, res) => {
    const {id} = req.params
    try {
        const result = await userIDController(id)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

const putUser = async (req, res) => {
    const {id} = req.params
    const {name, lastName, email, address, size, image, phone, is_Admin, is_Delete} = req.body
    try {
        const data = {
            name: name,
            lastName: lastName,
            email: email,
            address: address,
            size: size,
            image: image,
            phone: Number(phone),
            is_Admin: is_Admin
        }
        const result = await putUserController(id, data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params

    try {
        const deleteUser = await deleteUserController(id);
        return res.status(200).json({message: `El usuario ${deleteUser.name} fue eliminado correctamente`})
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

const postUser = async (req, res) => {
   
    const {uid, name, lastName, email, address, size, image, phone, is_Admin, is_Delete} = req.body
    try {
        const data = {
            uid: uid,
            name: name,
            lastName: lastName,
            email: email,
            address: address,
            size: size,
            image: image,
            phone: Number(phone),
            is_Admin: is_Admin,
            is_Delete: is_Delete
        }
        const result = await postUserController(data)
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

module.exports = {
    getAllUser,
    
    getUserByID,
    putUser,
    deleteUser,
    postUser
}
