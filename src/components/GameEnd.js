import React from 'react';
import styled from 'styled-components';

const GameEndContainer = styled.div`
  background-color: #333;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
`;

const PlayerItem = styled.li`
  background-color: #444;
  margin: 5px 0;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.5rem;
  text-align: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const GameEnd = ({ winner, players, onRestart }) => {
  return (
    <GameEndContainer>
      <Header>Game Over</Header>
      <SubHeader>Winner: {winner.name} ({winner.points} points)</SubHeader>
      <PlayerList>
        {players.map((player) => (
          <PlayerItem key={player.id}>
            {player.name}: {player.points} points
          </PlayerItem>
        ))}
      </PlayerList>
      <Button onClick={onRestart}>Restart Game</Button>
    </GameEndContainer>
  );
};

export default GameEnd;
