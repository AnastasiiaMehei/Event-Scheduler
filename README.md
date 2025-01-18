# Event Scheduler

Event Scheduler is a React application designed to help users manage events, view event details, and schedule new events. The application provides a user-friendly interface for organizing and tracking events efficiently.

### Links

- **Frontend Repository**: [GitHub](https://github.com/AnastasiiaMehei/Event-Scheduler)
- **Deployed Frontend**: [Vercel](https://event-scheduler-liard.vercel.app/events)
- **Backend Repository**: [GitHub](https://github.com/AnastasiiaMehei/Event-Scheduler-Server)
- **Deployed Backend**: [Render](https://event-scheduler-server.onrender.com/)


## Features

- Create, update, and delete events
- Filter events by name, date, and category
- Responsive design for various devices
- Notifications for event actions
- Loading spinners for data fetching

## Technologies Used 

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides fast development and server-side rendering.
- **Redux Toolkit**: A library for managing global state in the application.
- **Axios**: A promise-based HTTP client for making requests to the server.
- **Date-fns**: A library for date manipulation and formatting.
- **React Router DOM**: A library for handling routing within the application.
- **React Toastify**: A library for displaying notifications to the user.
- **React Loader Spinner**: A library for showing loading spinners during data fetching.
- **React Select**: A library for creating custom select dropdowns.
- **Redux Persist**: A library for persisting the Redux store data.

## Project Structure

- **`src/components`**: Contains reusable UI components like Event, EventForm, EventList, Layout, Loader, Modal, etc.
- **`src/data`**: Contains static data files like `events.json`.
- **`src/images`**: Contains images used in the application.
- **`src/pages`**: Contains different pages of the application like EventPage and HomePage.
- **`src/redux`**: Contains Redux store configuration, slice, selectors, and operations for managing events and filters.
- **`index.css`** and **`main.jsx`**: Entry point files for the application.

