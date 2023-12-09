export const commentDate = () => {
let myDate = new Date(); 
let day = myDate.getDate();
let month = myDate.getMonth();
let year = myDate.getFullYear(); 
let hour = myDate.getHours(); 
let minute = myDate.getMinutes(); 

if (day < 10) { 
    day = "0" + day; 
}
if (month < 10) { 
    month = "0" + month; 
}
if (hour < 10) { 
    hour = "0" + hour; 
}
if (minute < 10) { 
    minute = "0" + minute; 
}

let userDate = day + "." + month + "." + year + " " + hour + ":" + minute; 
}