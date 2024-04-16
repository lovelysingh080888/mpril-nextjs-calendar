"use client"
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  addEventService,
  dragEventService,
  showEventService,
} from "@/common/services/calendar";
import { WorkoutDTO } from "@/common/interfaces/calendar";
import { fetchWorkouts } from "@/common/services/actions";

function Calendar() {
  /**
   * State defined to add events
   */
  const [events, setEvents] = useState<WorkoutDTO[]>([]);

  
  useEffect(()=>{
    const getdata = async()=>{
      const variables = {limit:100, offset:0}
      const events = await fetchWorkouts(variables)
      setEvents(events)
    }
    getdata()
  },[])
  /**
   *  Getting used to update workout event in different date on drag
   * @param data
   */
  const handleEventDrag = async(data: any) => {
    setEvents(await dragEventService(data, events));
  };

  /**
   *  Getting used to handle workout click to show detail
   * @param data
   */
  const handleEventClick = (data: any) => {
    alert(showEventService(data));
  };

  /**
   *  Getting use to add workout event in calendar
   * @param data
   */
  const handleDateClick = async(data: any) => {
    setEvents(await addEventService(data, events));
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      height={"90vh"}
      editable={true}
      events={events}
      selectable={true}
      eventDrop={handleEventDrag}
      select={handleDateClick}
      eventClick={handleEventClick}
    />
  );
}

export default Calendar;
