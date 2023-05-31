import axios from 'axios';

// create
export const CreateRoomApiCall = async (requestbody) => {

    const respones = await axios.post("https://localhost:7128/api/rooms",requestbody);
    console.log(respones.data)
    return respones;
}



// Get All Hotels
export const GetAllRoomApiCall = async () => {
    const response = await axios.get('https://localhost:7128/api/rooms');
    return response.data;
}

//Get One Hotel
export const GetOneRoomApiCall = async (id) => {
    const response = await axios.get('https://localhost:7128/api/rooms/'+id);
    return response.data;
}

//delete payroll
export const DeleteRoomApiCall = async (id) => {
    console.log(id);
    const response = await axios.delete('https://localhost:7128/api/rooms/'+id);
    return response;
}

//update payroll
export const UpdateRoomApiCall = async (id,requestBody) => {
    console.log(id);
    console.log(requestBody);
    const response = await axios.put('https://localhost:7128/api/rooms/'+id,requestBody);
    console.log(response.data);
    return response;
}

/*
//get all payroll of one employee
export const GetEmployeePayrollApiCall = async (eId) => {
    const response = await axios.get('https://localhost:7128/api/hotels');

    let payRollList = [];

    for(let i=0 ; i<response.data.length ; i++){
        console.log(response.data[i].eId)
        console.log(eId)
        if(response.data[i].eId == eId)
        payRollList.push(response.data[i]);
    }
    console.log(payRollList)
    return payRollList;
}
*/