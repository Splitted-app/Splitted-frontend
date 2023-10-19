

export default async function fetchBudgetId(token : string)
{
    let id : string|null = null;
    id = await fetch('https://localhost:7012/api/users/budgets?budgetType=Personal',{
        headers: { 
            'Accept': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        })
        .then(res=>{
            if(!res.ok)
            {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data)=>{
            return data[0].id;
    })
    return id;
}