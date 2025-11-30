import { check, validationResult } from "express-validator";
import { body } from "express-validator";
export const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


// export const registerValidator = [
//     body('nama')
//         .notEmpty().withMessage("Wajib diisi")
//         .isLength({max:50}).withMessage("Nama Maksimal 50 karakter"),
//     body('email')
//         .notEmpty().withMessage( "Wajib diisi")
//         .isEmail().withMessage("Email Tidak valid"),
//     body('password')
//         .notEmpty().withMessage("Wajib diisi")
//         .isLength({ min: 8 }).withMessage("Password" )
// ]

// export const loginValidator = [
//     body('email')
//         .notEmpty().withMessage("Wajib diisi")
//         .isEmail().withMessage("Email Tidak valid"),
//     body('password')
//         .notEmpty().withMessage("Wajib diisi")
//         .isLength({ min: 8 }).withMessage("Password")
// ]

export const validatePassword = password => {
    // Password minimal 5 karakter, mengandung setidaknya 1  huruf besar, 1 angka, dan 1 simbol 
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{5,}$/;
    return re.test(password);
}