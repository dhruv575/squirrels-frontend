import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo512.png'

const Home = ({ onJoinGame }) => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState('');

  const validateName = (name) => {
    return /^[a-zA-Z]{1,10}$/.test(name);
  };

  const handleCreateGame = () => {
    if (!validateName(name)) {
      setError('Name must be 1-10 letters, no spaces or special characters');
      return;
    }
    onJoinGame({ name, isNew: true });
  };

  const handleJoinGame = () => {
    if (!validateName(name)) {
      setError('Name must be 1-10 letters, no spaces or special characters');
      return;
    }
    if (!gameId) {
      setError('Please enter a game ID');
      return;
    }
    onJoinGame({ name, gameId, isNew: false });
  };

  return (
    <HomeContainer>
      <Logo src={logo} alt="Game Logo" />
      <Title>Squirrels Without Morality</Title>

      <InputBox>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={10}
        />
      </InputBox>

      <InputBox>
        <button onClick={handleCreateGame}>Create New Game</button>
      </InputBox>

      <CodeBox>
        <input
          type="text"
          placeholder="Enter game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value.toUpperCase())}
          maxLength={6}
        />
        <button onClick={handleJoinGame}>Join Game</button>
      </CodeBox>

      <InputBox>
        <button onClick={() => window.open('https://forms.gle/ewf4yxTTK5yNhK7C8', '_blank')}>
          Pre-Order Physical Decks
        </button>
      </InputBox>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: #333;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.img`
  width: 10%;
  margin-top: 10%;

  @media (max-width: 768px) {
    margin-top: 25%;
    width: 20%;
  }

  @media (max-width: 480px) {
    margin-top: 30%;
    width: 30%;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const InputBox = styled.div`
  background-color: maroon;
  color: white;
  width: 30%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    background-color: #555;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    width: 90%;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 8px;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 6px;
    }
  }

  button {
    background-color: #444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #666;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 8px 18px;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 6px 16px;
    }
  }

  @media (max-width: 768px) {
    width: 60%;
  }

  @media (max-width: 480px) {
    width: 60%;
  }
`;

const CodeBox = styled(InputBox)`
  input {
    margin-bottom: 0;
  }

  button {
    margin-top: 10px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid red;
  border-radius: 4px;
  background: #ffe6e6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px;
  }
`;


export default Home;
