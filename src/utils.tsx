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

// function kFormatter(num) {
//     return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
// }

function amountFormatter(amount : number | null)
{
    if (!amount)
        return amount
    const absAmount = Math.abs(amount);
    const sign = Math.sign(amount);
    const tmp1 = `${sign < 0 ? '-' : ''}${(absAmount/1000).toFixed(2)}K`
    const tmp2 = `${sign < 0 ? '-' : ''}${(absAmount/1_000_000).toFixed(2)}M`
    return absAmount <= 99_999.99 ? amount.toFixed(2) :
        absAmount <= 999_999.99 ? tmp1 : tmp2
}

export {changeDay, changeWeek ,changeMonth, getStartOfWeek, getStartOfMonth, getEndOfMonth, amountFormatter}