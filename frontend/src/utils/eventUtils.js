import { number } from "prop-types";

export const constructHeader = () => {
  if (localStorage.getItem("token")) {
    return {
      headers: {'x-auth-token': localStorage.getItem("token")}
    };
  };
  return {}   
};

export const eventFormat = (newEvent) => {
  return {
    title: newEvent.title,
    description: newEvent.description,
    date: `${newEvent.date} ${newEvent.time}:00Z`,
    duration: {
      length: newEvent.duration,
      format: newEvent.format
    },
    onSite: newEvent.onsite,
    venue: newEvent.venue,
    capacity: parseInt(newEvent.capacity)
  }
};
