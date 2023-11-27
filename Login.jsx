import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState({ Email: "", error: "" });
    const [password, setPassword] = useState({ Password: "", error: "" });
    const [role, setRole] = useState({ Role: "", error: "" });
    const [authenticationError, setError] = useState("");
    const [users, setUsers] = useState({});
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        const value = event.target.value;
        if (value == "") {
            setEmail({ Email: "", error: "Email is Required" })
        } else {
            setEmail({ Email: value, error: "" })
        }
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        if (value == "") {
            setPassword({ Password: "", error: "Password is Required" })
        } else {
            setPassword({ Password: value, error: "" })
        }
    }

    const handleRole = (event) => {
        const value = event.target.value;
        if (value === "") {
            setRole({ Role: "", error: "Role is Required" });
        } else {
            setRole((prevState) => ({ ...prevState, Role: value, error: "" }));
        }
    }

    async function handleLogin() {

        if (!email || !password || !role) {
            setError('All fields are required');
            return;
        }

     
        const user = {
            UserName: email.Email,
            Password: password.Password,
            Role: role.Role
        }

        await fetch("https://localhost:7077/api/User/Login/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error();
                }
                if (response.status === 404) {
                    setError("Invalid Username, Password Or Role");
                    throw new Error();
                }
                if (response.status === 401) {
                    alert("Invalid Username, Password Or Role");
                    throw new Error();
                }

                return response.json();
            })
            .then((result) => {
                console.log(result);
                props.setUserName(result.userName);
                props.setRole(result.role); // Set the role value from the response
                localStorage.setItem('user', JSON.stringify(result));
            })
            .then(() => {
                props.setLoggedIn(true);
                    navigate('/');                
            });
    }

    return (
        <div className='container'>
            <div className='w-50 mt-5 mx-auto'>
                <h2>LOGIN</h2>
                <div className='text-danger'>
                    <p className="text-danger">Fields marked with * are mandatory</p>
                    {email.error !== "" && <li>{email.error}</li>}
                    {password.error !== "" && <li>{password.error}</li>}
                    {authenticationError !== "" && <li>{authenticationError}</li>}
                </div>
                <div className='form-group mt-2'>
                    <p>Email Address<span className="text-danger">*</span></p>
                    <input className='form-control' type="email" value={email.Email} name='Email' onChange={handleEmailChange} required />
                </div>
                <div className='form-group mt-2'>
                    <p>Password<span className="text-danger">*</span></p>
                    <input className='form-control' type="password" value={password.Password} name='Password' onChange={handlePasswordChange} required />
                </div>
                <div className="form-group mt-2">
                    <p>Role<span className="text-danger">*</span></p>
                    <select
                        className="form-control"
                        value={role.Role}
                        name="Role"
                        onChange={handleRole}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="A">Admin</option>
                        <option value="U">User</option>
                    </select>
                </div>
                <div className='mt-2'>
                    <button className='btn btn-primary' onClick={handleLogin}>Login</button>
                </div>

                <p className="mt-2">
                    <Link to="/ForgotPass">Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;