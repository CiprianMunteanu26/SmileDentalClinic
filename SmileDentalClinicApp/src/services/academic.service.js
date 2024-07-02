import axios from "axios";

const API_URL = "https://localhost:5013/";

const getAllAppointments = async () =>
{
    try
    {
        const response = await axios.get(API_URL + "appointments");
        if (response)
        {
            return (response.data);
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}

const getAppointmentsByUid = async (uid) =>
{
    console.log(uid);
    try
    {
        const response = await axios.get(API_URL + "get/" + uid);
        console.log(response);
        if (response)
        {
            return (response.data);
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}

const getAppointmentByAppointmentUid = async (uid) =>
    {
        console.log(uid);
        try
        {
            const response = await axios.get(API_URL + "getappointment/" + uid);
            if (response)
            {
                return (response.data);
            }
        }
        catch (error)
        {
            return Promise.reject(error);
        }
    }

// const setuserAppointment = async (uid, cuid) =>
// {
//     try
//     {
//         const response = await axios.post(API_URL + "appointments/setuser/", { UserId: uid, AppointmentId: cuid });
//         if (response)
//         {
//             return (response.data);
//         }
//     }
//     catch (error)
//     {
//         return Promise.reject(error);
//     }
// }

// const setAppointment = async (uid, cuid) =>
//     {
//         try
//         {
//             const response = await axios.post(API_URL + "appointments/set/", { UserId: uid, AppointmentId: cuid });
//             if (response)
//             {
//                 return (response.data);
//             }
//         }
//         catch (error)
//         {
//             return Promise.reject(error);
//         }
//     }
// const setAppointment = async (pacientID, starttime, endtime, type, doctorID) =>
//     {
//         try
//         {
//             const response = await axios.post(API_URL + "appointments/set/", { pacientID, starttime, endtime, type, doctorID});
//             if (response)
//             {
//                 return (response.data);
//             }
//         }
//         catch (error)
//         {
//             return Promise.reject(error);
//         }
//     }
const updateAppointment = async (appointmentId, startTime, endTime, status) =>
    {
        try
        {
            await axios.put(API_URL + "put/" + appointmentId, {AppointmentId:appointmentId, StartTime: startTime, EndTime: endTime, Status: status}, {
                
            });
        }
        catch (error)
        {
            return Promise.reject(error);
        }
    }
const setAppointment = async (pacientID, starttime, type, doctorID, status, doctorName, pacientName) => {
    try {
      const response = await axios.post(API_URL + "appointments/set", { 
          
              UserId: pacientID, 
              StartTime: starttime,
              Type: type,
              DoctorId: doctorID,
              Status: status,
              DoctorName: doctorName,
              PacientName: pacientName
          
      });
  
      if (response) {
        return response.data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

const AcademicService = {
    getAllAppointments,
    setAppointment,
    getAppointmentsByUid,
    getAppointmentByAppointmentUid,
    updateAppointment
};

export default AcademicService;