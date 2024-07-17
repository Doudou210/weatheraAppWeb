import React, { useState } from 'react'

interface FormDataPros{
    username:string;
    email: string;
    password: string;
}
export default function AuthUsers() {
    const [formData, setFormData] = useState<FormDataPros>({
        username:"",
        email:"",
        password:"",
    });
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
            if (response.status === 201) {
                console.log("Inscription réussie !");
                setFormData({
                    username:"",
                    email:"",
                    password:"",
                });
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