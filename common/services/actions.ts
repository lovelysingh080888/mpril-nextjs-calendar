import { ADD_WORKOUT, GET_WORKOUTS, UPDATE_WORKOUT } from "../query";

const endpoint = "http://localhost:8000/graphql";


const callApi = async(query:any, variables:any) =>{
    try {
        const response = await fetch(`${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query, 
            variables,
          }),
        });
    
        if (!response.ok) throw Error("Failed to fetch data");
    
        const { data, errors } = await response.json();
    
        if (errors) 
          throw new Error(errors[0].message);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
}
export const fetchWorkouts = async (variables:any) => {
   const response = await callApi(GET_WORKOUTS, variables);
   return response.getWorkouts;
};


export const createWorkout = async (variables:any) => {
    const response = await callApi(ADD_WORKOUT, variables);
    return response.createWorkout;
};

export const updateWorkout = async (variables:any) => {
    const response = await callApi(UPDATE_WORKOUT, variables);
    return response.updateWorkout;
};