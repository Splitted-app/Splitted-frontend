import RegisterFormDataInterface from "./RegisterFormDataInterface";
import '../../css/RegisterPages/RegisterForm.css';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {UserTokenState} from '../../atoms/UserToken';
// import {BudgetIdState} from '../../atoms/BudgetId';
import { useState } from "react";
import FormError from "../Common/FormError";


interface RegisterFormInterface
{
    data : RegisterFormDataInterface,
    setData : Function,
    setState : Function
}

function LogInForm({data, setData, setState} : RegisterFormInterface)
{
    const navigate = useNavigate();
    const setToken = useSetRecoilState(UserTokenState)
    // const setBudgetId = useSetRecoilState(BudgetIdState);
    const [errors, setErrors] = useState({
        invalidPassword: false
    });

    // function fetchBudgetId(token : string)
    // {
    //     fetch('https://localhost:7012/api/users/budgets?budgetType=Personal',{
    //     headers: { 
    //         'Accept': '*',
    //         'Content-Type': 'application/json',
    //         'Authorization' : `Bearer ${token}`
    //     },
    //     })
    //     .then(res=>{
    //         if(!res.ok)
    //         {
    //             throw Error('could not fetch the data for that resource');
    //         }
    //         return res.json();
    //     })
    //     .then((data)=>{
    //         setBudgetId(data[0].id);
    //     })
    // }

    function handleSubmit(e : any)
    {
        // use `newErrors` to clear errors before validation
        // we cannot use `setErrors` because `errors` will not update until after
        // we finish executing handleSubmit
        let newErrors = {
            invalidPassword: false
        }


        e.preventDefault();
        fetch('https://localhost:7012/api/users/login',{
            method: 'POST',
            headers: { 
                'Accept': '*',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
               email: data.email,
               password: data.password
              })
        })
        .then(res=>{
          if(!res.ok)
          {
            if (res.status === 401)
            {
                newErrors.invalidPassword = true;
            }
            throw Error('could not fetch the data for that resource');
          }
          if(res.ok)
          {
            navigate('/home');
          }
          return res.json();
        })
        .then((data)=>
        {
            // fetchBudgetId(data.token)
            setToken(data.token);
        })
        .catch((err)=>{
            setErrors(newErrors);
            console.log(err)
        });
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="register-form">
                <div className="form-fields">
                    <input className="form-element" type="email" name="email" value={data.email} disabled/>
                    <input className="form-element"
                        type="password" name="password" placeholder='password' 
                        value={data.password} 
                        onChange={(e)=>setData({...data, password:e.target.value})}/>
                    <div className="form-element">
                        {errors.invalidPassword && <FormError message="Invalid Email or Password" details="AAVS"></FormError>}
                    </div>
                </div>
                <div className="form-button-container">
                    <input type='submit' className='register-button' value="Log In"/>
                </div>
            </div>
        </form>
    )
}

export default LogInForm;