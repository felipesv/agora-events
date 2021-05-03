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
    onSite: newEvent.onsite === "0" ? false : true,
    venue: newEvent.venue,
    capacity: newEvent.capacity
  }
};
