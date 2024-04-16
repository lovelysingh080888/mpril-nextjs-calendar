import { WorkoutDTO } from "../interfaces/calendar";
import { createWorkout, updateWorkout } from "./actions";

const dragEventService = async (data: any, events: WorkoutDTO[]) => {
  const result = await Promise.all(events.map(async (event) => {
    if (event.id === data.event.id) {
      const updatedEvent = { ...event, date: data.event.startStr };
      const res = await updateWorkout(updatedEvent); 
      return updatedEvent;
    } else {
      return event;
    }
  }));
  return result;
};


const showEventService = (data: any) => {
  const event = data.event;
  return `Workout: ${event.title}\n****************\nExcersise List: ${event.extendedProps.details}`;
};

const addEventService = async (data: any, events: WorkoutDTO[]) => {
  const title = prompt("Enter Workout Program");
  if (title) {
    let details = prompt("Enter Exercise");
    details = details || "";
    const newEvent = {
      title,
      date: data.startStr,
      details,
    };
    const response = await createWorkout(newEvent);
    return [...events, response];
  }
  return [];
};

export { dragEventService, showEventService, addEventService };
