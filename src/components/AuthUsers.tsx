import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface FormDataPros{
    email: string;
    password: string;
}
export default function AuthUsers() {
    const [formData, setFormData] = useState<FormDataPros>({
        email:"",
        password:"",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            });
            setFormData({
                email:"",
                password:"",
            });
            if (response.ok) {
                console.log("Inscription réussie !");
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e:any) =>{
        const {name, value} = e.target;
        setFormData({ ...formData, [name]:value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder='email' 
                    // value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    // value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}