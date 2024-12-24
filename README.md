# Pokémon Search App

## Overview

The Pokémon Search App is a responsive web application that allows users to search and filter Pokémon by name and type. Users can view a list of Pokémon and navigate to a detailed page for each Pokémon. This project demonstrates expertise in React.js, Redux Toolkit, Tailwind CSS, and TypeScript.

## Features

### 1. Search and Filter

- Users can search Pokémon by name using a search bar.
- A dropdown allows filtering Pokémon by their type, populated dynamically from the [PokeAPI](https://pokeapi.co/docs/v2).

### 2. Pokémon List

- Displays Pokémon cards with their names and images.
- Includes a loading indicator while fetching data.
- Shows an error message if the API call fails.

### 3. Pokémon Details Page

- Clicking on a Pokémon card navigates to a detailed page with:
  - Stats such as height, weight, and abilities.
  - Types and additional Pokémon information.
- Breadcrumb navigation (`Home > Pokémon Name`) for easy navigation.

### 4. Responsive Design

- Works seamlessly across mobile, tablet, and desktop.
- Dynamically adjusts the grid layout based on screen size.

### 5. State Management

- Manages UI states and API data using React hooks and Redux Toolkit.

### 6. Testing

- Includes unit tests for critical components like rendering Pokémon lists and navigating to the details page.

### 7. Tech Stack

- **Frontend Framework**: React.js with functional components and hooks.
- **State Management**: Redux Toolkit.
- **Styling**: Tailwind CSS for responsive and modern UI.
- **Routing**: React Router for navigation.
- **API Integration**: [PokeAPI](https://pokeapi.co/docs/v2) for fetching Pokémon data.
- **Testing**: Jest with React Testing Library.

1. Clone the repository:

   ```bash
   git clone https://github.com/ManishgandotraCoder/pokemon_ui
   cd pokemon_ui
   ```

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Open your browser and visit:
   http://localhost:3000

### 8. Project Structure

src/
├── assets/ # Static assets
├── components/ # Reusable components
│ ├── Card/ # Pokémon card component
│ ├── Header/ # Header component
│ ├── Input/ # Input field component
│ ├── Loader/ # Loading indicator
│ ├── Select/ # Dropdown component
├── pages/ # Page components
│ ├── Home/ # Home page with Pokémon list
│ ├── Details/ # Pokémon details page
├── redux/ # Redux state management
│ ├── pokemonSlice.ts # Redux slice for Pokémon
│ ├── pokemonThunks.ts # Thunks for API calls
│ ├── pokemonSelectors.ts # Selectors for Redux state
├── App.tsx # Main application component
├── main.tsx # Application entry point
├── index.css # Global CSS styles
├── vite-env.d.ts # TypeScript definitions for Vite

### 9.Approach

Core Features
• Built reusable and modular components (e.g., Card, Input, Select).
• Used Redux Toolkit for efficient state management and to handle asynchronous API calls.
• Implemented responsive UI using Tailwind CSS.

API Integration
• Used the PokeAPI to fetch Pokémon data.
• Created a dedicated utility for API calls to ensure code modularity.

Testing
• Added tests for:
• Rendering the Pokémon list.
• Navigating to the Pokémon details page.
• Handling API loading and error states.

Responsive Design
• Ensured the app looks and works great across different devices using Tailwind CSS grid and media queries.

### Deliverables

    •	Deployment Link: https://pokemon-ui-lime.vercel.app/
    •	StackBlitz Link: https://stackblitz.com/~/github.com/ManishgandotraCoder/pokemon_ui
    •	GitHub Repository: https://github.com/ManishgandotraCoder/pokemon_ui
