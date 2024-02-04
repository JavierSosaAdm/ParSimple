import { validations } from './validations'

const CreateUserForm = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });


return (
    <div>
        <form>
            <label>Nombre de usuario:</label>
                <input type="text" id="username">Nombre de Usuario</input>
            <label>Email:</label>
                <input type="email" id="email">Email:</input>
            <label>Contraseña:</label>
                <input type="password" id="password">Contraseña:</input>
        </form>
    </div>
)};

export default CreateUserForm;