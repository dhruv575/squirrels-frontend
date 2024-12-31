import React from 'react';
import styled from 'styled-components';
import Game from './components/Game';

// Styled component for the bottom-left text
const SuggestionText = styled.div`
  position: fixed;
  bottom: 1rem; /* Adjust distance from the bottom */
  left: 1rem; /* Adjust distance from the left */
  opacity: 0.5; /* Low opacity to make it non-intrusive */
  font-size: 0.8rem; /* Adjust font size for readability */
  color: #fff; /* Use a neutral color, can be changed */
  z-index: 100; /* Ensure it's above other elements */
  pointer-events: none; /* Make it non-interactive */
  text-align: right;

  /* Make mobile-friendly adjustments */
  @media (max-width: 768px) {
    font-size: 0.7rem; /* Smaller font size on mobile */
    bottom: 0.5rem; /* Adjust position on smaller screens */
    left: 0.5rem; /* Adjust position on smaller screens */
  }
`;


const SignalText = styled.div`
  position: fixed;
  bottom: 3rem; /* Adjust distance from the bottom */
  left: 1rem; /* Adjust distance from the left */
  opacity: 0.5; /* Low opacity to make it non-intrusive */
  font-size: 0.8rem; /* Adjust font size for readability */
  color: #fff; /* Use a neutral color, can be changed */
  z-index: 100; /* Ensure it's above other elements */
  pointer-events: none; /* Make it non-interactive */
  text-align: right;

  /* Make mobile-friendly adjustments */
  @media (max-width: 768px) {
    font-size: 0.7rem; /* Smaller font size on mobile */
    bottom: 2rem; /* Adjust position on smaller screens */
    left: 0.5rem; /* Adjust position on smaller screens */
  }
`;

function App() {
  return (
    <div className="App">
      <Game />
      <SuggestionText>Suggest cards to @droov.gupta</SuggestionText>
      <SignalText>Made by The Signal Society</SignalText>
    </div>
  );
}

export default App;
