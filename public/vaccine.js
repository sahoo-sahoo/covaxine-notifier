 
let submit = document.getElementById('submit');

let tbody = document.querySelector('tbody');
let enteredState = document.getElementById('selectState');
let enteredDistrict = document.getElementById('selectDistrict');

enteredState.addEventListener('blur', () => {
    // console.log(enteredState.value);

    const state_id = enteredState.value;
    getDistrictIdByName(state_id);
})

//This function will give the state id
// getStateIdByName(enteredState);


//Find the state id
// function getStateIdByName(enteredStateName) {
//     const url = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';

//     fetch(url).then((response) => {
//         return response.json();
//     }).then(data => {
//         //list all the state id with names

//         //get the array of states from the data object
//         let stateArray = data.states;


//         //Check the state name from the state array and compare them with the entered state name to find the state id 

//         stateArray.forEach(element => {
//             console.log(element);

//             if (element.state_name === enteredStateName) {
//                 const state_id = element.state_id;


//                 //This function gives list of all  districts
//                 getDistrictIdByName(state_id);
//             }

//         })

//     });
// }


function getDistrictIdByName(state_id) {

    const url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`;

    fetch(url).then((response) => {
        return response.json();
    }).then(data => {
        //list all the districts id with names

        //get the array of districts from the data object
        let districtArray = data.districts;
        // console.log(districtArray);

        let select_District_Element = document.getElementById('selectDistrict');


        let stringOf_options = "";

        districtArray.forEach(element => {
            stringOf_options += `<option value="${element.district_id}">${element.district_name}</option>`;

        })

        select_District_Element.innerHTML = `<option selected value disabled>Choose from the drop down</option>
        ${stringOf_options}`;


        //get the details of availabilty of slots


        submit.addEventListener('click', () => {
            let district_id = enteredDistrict.value;
            getSlotAvailabilty(district_id);
        });


    });

}

//get slot details of a district by id of district
function getSlotAvailabilty(district_id) {

    // console.clear();

    //code to get the data string

    let dateArr = new Date();
    let month = dateArr.getMonth();
    month++;
    if (month < 10)
        month = "0" + month;

    dateArr = dateArr.toDateString().split(" ").join("-");
    dateArr = dateArr.substr(8, 3) + month + dateArr.slice(-5);

    let date = dateArr;
    

    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`;

    fetch(url).then((response) => {
        return response.json();
    }).then(data => {

        console.log(data);
        //Array of  vaccination centers

        let centerArray = data.centers;


        let htmlStr = "";
        //Checking of Centers one by one
        centerArray.forEach(element => {
            const center = element;

            //Check the details of slot availabilty of the center

            const sessions = element.sessions;
 
            //List all the sessions of a center

            let session_counter = 1;
            for (const session of sessions) {


                //Check available capacity of the session of that center

                if (session.available_capacity == 0 & session.min_age_limit == 18) {
                    // if (session.available_capacity > 0 && session.min_age_limit == 18) {
                    const Total_Doses = session.available_capacity;
                    const Dose1 = session.available_capacity_dose1;
                    const Dose2 = session.available_capacity_dose2;
                    const Date = session.date;
                    const Vaccine = session.vaccine;
                    const min_age = session.min_age_limit;
                    const Address = center.address;
                    const Center_name = center.name;
                    const Block_name = center.block_name;
                    const District_name = center.district_name;
                    const Fee_type = center.fee_type;
                    const State_name = center.state_name;
                    console.log("Slots available at ", Center_name, "( Session : " + session_counter, ")");
                    console.log("Total_Doses : ", Total_Doses,
                        "\nDose1 : ", Dose1, "\nDose2 : ", Dose2, "\nDate : ", Date, "\nVaccine : ", Vaccine,"\nMin_age : ", min_age, "\nCenter_name : ", Center_name, "\naddress : ", Address, "\nBlock_name : ", Block_name, "\nDistrict_name : ", District_name, "\nfee_type : ", Fee_type, "\nState_name : ", State_name
                    );
                    let data = `Total_Doses : ${Total_Doses}                                                                                   Dose1 : ${Dose1}                                                                                    Dose2 : ${Dose2}                                                                                   \nDate : ${Date}                                                                                   \nVaccine : ${Vaccine}                                                                                   \nMin_age : ${min_age}                                                                                   \nCenter_name : ${Center_name}                                                                                   \naddress : ${Address}"\nBlock_name : ${Block_name}                                                                                   \nDistrict_name : ${District_name}                                                                                   \nFee_type : ${Fee_type}                                                                                   \nState_name :  ${State_name}                                                                                   Schedule Appointment here
                                                                                                                                                                                
                    https://selfregistration.cowin.gov.in/`;

                    // console.log(data);

                    // fetch(`https://api.telegram.org/bot1860024210:AAGuaXvQEREDrsUZ0jypdn5JgBXwz14v1dg/sendMessage?chat_id=-1001257858094&text=${data}`)
                    //     .then(response => response.json())
                    //     .then(data => console.log("heigala"));




                    htmlStr += ` <tr>
                    <th scope="row">${Total_Doses}</th>
                    <td>${Dose1}</td>
                    <td>${Dose2}</td>
                    <td>${Date}</td>
                    <td>${Vaccine}</td>
                    <td>${min_age}</td>
                    <td>${Address}</td>
                    <td>${Center_name}</td>
                    <td>${Block_name}</td>
                    <td>${District_name}</td>
                    <td>${Fee_type}</td>
                    <td>${State_name}</td>
                     
                    
                  </tr>`;




                    //Increment the session counter
                    session_counter++;

                }



            }
            tbody.innerHTML = htmlStr;


        })

    });


}


