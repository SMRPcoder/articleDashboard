import React, { useState } from 'react'
import "./login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {


    const navigator=useNavigate();

    function HandleLogin(event: React.FormEvent) {
        event.preventDefault();
        navigator("/user/dashboard");
    }


    return (
        <div className='login_main_div' >
            <div className='login-d-flex login-gap-2'>
                <div className='login_image_div login-flex-1'>
                    <img className='login_image' src='/visual-data.png' alt='data.png' />
                </div>
                <div className="login-flex-1 login-mt-10">
                    <div className='login-text-center login-ruby'>
                        <div className="login-container">
                            <div className="brand-logo"></div>
                            <div className="brand-title">STATS</div>
                            <div className="inputs">
                                <form onSubmit={HandleLogin} action="">
                                    <label className='login-label'>EMAIL</label>
                                    <input required className='login-input' type="email" value="test@test.com" placeholder="test@test.com" />
                                    <label className='login-label'>PASSWORD</label>
                                    <input required className='login-input' type="password" value="123456789" placeholder="123456789" />
                                    <button className='login-button' type="submit">LOGIN</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
