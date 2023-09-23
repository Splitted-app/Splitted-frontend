function changeDay(date:Date, offset:number) 
{
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + offset);
    return dateCopy;
}

function changeWeek(date:Date , offset:number) 
{
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + 7 * offset);
    return dateCopy;
}

function changeMonth(date:Date, offset:number) 
{
    const dateCopy = new Date(date);
    dateCopy.setMonth(date.getMonth() + offset);
    return dateCopy;
}

function getStartOfWeek(date :Date)
{
    const dateCopy = new Date(date);
    const dayOfWeek = ((dateCopy.getDay() + 6) % 7)
    dateCopy.setDate(dateCopy.getDate() - dayOfWeek);
    return dateCopy;
}

function getStartOfMonth(date :Date)
{
    const dateCopy = new Date(date);
    dateCopy.setDate(1);
    return dateCopy;
}

function getEndOfMonth(date: Date)
{
    return changeDay(getStartOfMonth(changeMonth(date, 1)), -1);
}



export {changeDay, changeWeek ,changeMonth, getStartOfWeek, getStartOfMonth, getEndOfMonth}