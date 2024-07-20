import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface FormDataPros{
    username:string;
    email: string;
    password: string;
}
export default function RegisUser() {
    const [formData, setFormData] = useState<FormDataPros>({
        username:"",
        email:"",
        password:"",
    });
    const [messages, setMessages] = useState<string>("")

    const navigate = useNavigate();

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/create",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            });
            setFormData({
                username:"",
                email:"",
                password:"",
            });
            if (response.ok) {
                navigate('/')
            }
            setMessages("Inscription réussie !");
        } catch (error) {
            console.error(error);
            setMessages("error")
        }
    };

    const handleChange = (e:any) =>{
        const {name, value} = e.target;
        setFormData({ ...formData, [name]:value})
    };

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height :"100vh"}}>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input 
                    name='username'
                    type="text" 
                    placeholder='Name' 
                    // value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <input 
                    name='email'
                    type="email" 
                    placeholder='email' 
                    // value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <input 
                    name='password'
                    type="password" 
                    placeholder='password' 
                    // value={formData.password}
                    onChange={handleChange}
                />
                <br />
                {messages && <p> {messages} </p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}