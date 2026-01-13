# Hotel Booking Web Application

A modern web application for managing hotel bookings, including daily meal selections, cost calculations, and summary exports. The app is built with a scalable architecture, providing a responsive user interface and smooth user experience.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)  
- [Technology Choices and Justifications](#technology-choices-and-justifications)  
- [Architecture Decisions](#architecture-decisions)  
- [Known Limitations / Future Improvements](#known-limitations--future-improvements)  

---

## Setup Instructions

### Prerequisites

- Node.js >= 20.x  
- npm >= 9.x or yarn >= 3.x  
- Git  

### Installation

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd hotel-app

2. npm install
 or
yarn install

3. npm run dev
or
yarn dev

4. npm run build
npm run preview
or
yarn build
yarn preview

## Technology Choices and Justifications

React: Provides a component-based architecture that simplifies UI development and maintenance. Chosen for its widespread adoption and ecosystem support.

TypeScript: Ensures type safety and reduces runtime errors, making the codebase more maintainable.

Redux Toolkit: Simplifies global state management for booking steps, daily selections, and cost calculations.

React Hook Form + Zod: Facilitates form validation with strong typing, making it easier to handle booking forms reliably.

Vite: Modern, fast build tool optimized for React projects, offering faster development server and build times than alternatives.

Tailwind CSS: Utility-first CSS framework for responsive and easily maintainable UI.

## Architecture Decisions
Component-based UI: Divided the app into reusable components such as DailyPlanTable, ConfigSummary, and TotalCost for better maintainability.

Slice-based state management: Booking state is managed via Redux slices for clear separation of concerns: initialConfig, dailySelections, and step.

Modular data handling: Meals, hotels, and board types are stored in separate static data modules to allow easy updates without changing core logic.

Step-based workflow: Users progress through booking steps in a controlled manner, reducing errors and improving user experience.


## Known Limitations / Future Improvements

PDF Summary:Need to be added

Internationalization: Currently supports only one language. Adding multi-language support would expand usability.

Unit and Integration Tests: Test coverage is limited; adding tests would improve maintainability and reduce regression risk
