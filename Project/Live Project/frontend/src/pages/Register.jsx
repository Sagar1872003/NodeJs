import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()



        try {
            if (!name || !email || !password) {
                toast.error('All field required')
                return false
            }
            let res = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })

            })
            let user = await res.json()
            if(user.success){
                toast.success(user.message)
                setName('')
                setEmail('')
                setPassword('')
            }else{
                toast.error(user.message)

            }
            
        }
        catch (err) {
            console.log(err);
            return false

        }

    }
    return (
        <>

            <div className='container'>
                <div className="my-auto d-flex justify-content-center align-items-center p-3" style={{ height: '80vh' }}>
                    <form className="border p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputName"
                                placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label >Email address</label>
                            <input
                                type="email"
                                className="form-control"

                                placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">
                            Register
                        </button>
                        <div className="text-center mt-3">
                            <p className="mb-0">If you are already a user,</p>
                            <Link to={'/'} className="btn btn-link p-0">
                                Login here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right"
                autoClose={2000} />
        </>
    )
}

export default Register
