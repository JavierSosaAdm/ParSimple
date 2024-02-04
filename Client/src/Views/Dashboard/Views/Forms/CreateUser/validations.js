const validations = (form) => {

    let errors = {}

    if(!form.username) {
        errors.username = 'Se necesita un nombre de usuario.'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.username)) {
        errors.username = 'El nombre de usuario es invalido.'
    }
    if (!form.email) {
        errors.email = 'Necesita ingresar un Email.'
    }
    if (form.password) {
        errors.password = 'Se necesita una contraseña.'
    }
    return errors;
}

export default validations;