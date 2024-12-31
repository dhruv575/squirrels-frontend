import React from 'react';
import styled from 'styled-components';

const Lobby = ({ gameState, onStartGame }) => {
  const isHost = gameState.currentPlayer.role === 'JUDGE';
  const canStart = gameState.players.length >= 3;

  return (
    <LobbyContainer>
      <ContentWrapper>
        <Title>Game Lobby</Title>

        <GameInfo>
          <GameId>Game ID: {gameState.gameId}</GameId>
          <Instruction>Share this ID with your friends to join the game!</Instruction>
          <InfoText>Need at least 3 players to start the game. Games end when a player gets 5 points. Judge rotates every round.</InfoText>
          <InfoText>
            Your Role: <strong>{gameState.currentPlayer.role}</strong>
          </InfoText>
        </GameInfo>

        <PlayerSection>
          <SectionTitle>Players ({gameState.players.length}/8)</SectionTitle>
          <PlayerList>
            {gameState.players.map((player) => (
              <PlayerTag key={player.id} $isJudge={player.role === 'JUDGE'}>
                {player.name}
                {player.role === 'JUDGE' && ' (Host)'}
              </PlayerTag>
            ))}
          </PlayerList>
        </PlayerSection>

        {isHost ? (
          <StartButton onClick={onStartGame} disabled={!canStart}>
            Start Game {canStart ? '' : '(Need 3+ players)'}
          </StartButton>
        ) : (
          <WaitingMessage>Waiting for the host to start the game...</WaitingMessage>
        )}
      </ContentWrapper>
    </LobbyContainer>
  );
};

export const LobbyContainer = styled.div`
  background-color: #333;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ContentWrapper = styled.div`
  background-color: #444;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 600px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const GameInfo = styled.div`
  background-color: maroon;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const GameId = styled.h3`
  color: #bbb;
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const Instruction = styled.p`
  color: #ddd;
  font-size: 1rem;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const InfoText = styled.p`
  color: #eee;
  font-size: 1rem;
  margin: 5px 0;

  strong {
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const PlayerSection = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const PlayerTag = styled.div`
  background-color: ${(props) => (props.$isJudge ? '#ffd700' : '#666')};
  color: ${(props) => (props.$isJudge ? '#000' : '#fff')};
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 14px;
  }
`;

export const StartButton = styled.button`
  background-color: maroon;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #990000;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 18px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 16px;
  }
`;

export const WaitingMessage = styled.p`
  color: white;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export default Lobby;
