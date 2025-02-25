import React, { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = lazy(() => import("Login/Login"));

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    function ParentCallBack(data) {
        localStorage.setItem("authToken", data);
        setTimeout(() => {
            navigate("/");
        }, 100);
    }
    return (
        <div>
            <Suspense fallback={null}>
                <Login formData={formData} setFormData={setFormData} callBack={ParentCallBack} />
            </Suspense>
        </div>
    )
}

export default LoginPage