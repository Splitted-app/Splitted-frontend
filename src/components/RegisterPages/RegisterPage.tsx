import '../../css/RegisterPages/RegisterPage.css'
import Form from './Form'
import { useEffect, useState } from 'react';

function RegisterPage() {
  
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>
  {
    
    fetch('http://localhost:8000/users')
      .then(res=>{
        if(!res.ok)
        {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data)=>{
        setError(null);
        setUsers(data);
      })
      .catch((err)=>{
        setError(err.message);
      })

  },[]);
  
  return (
    <div className="register-page">
        {error && <div>{error}</div>}
        {users && <Form users={users}></Form>}
    </div>
  );
}

export default RegisterPage;