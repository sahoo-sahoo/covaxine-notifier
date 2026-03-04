let dt=new Date();
dt=dt.toISOString();
 
let dateArr=dt.split("-");
dateArr=dateArr.reverse();
dateArr=dateArr.join("-");
dateArr=dateArr.substr(0,2)+dateArr.slice(-8);
console.log(dateArr);
 