import React, { useEffect } from 'react';
import styled from 'styled-components';

const RoundOver = ({ data, onStartNextRound }) => {
  useEffect(() => {
    if (onStartNextRound) {
      const timer = setTimeout(() => {
        onStartNextRound();
      }, 5000); // Automatically start the next round after 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [onStartNextRound]);

  if (!data) {
    return <InfoText>Loading round results...</InfoText>;
  }

  const { winnerName, winnerCard, players, questionCard } = data;

  return (
    <Container>
      <Header>Round Over</Header>
      <WinnerSection>
        <CardsContainer>
          <QuestionCard>{questionCard}</QuestionCard>
          <WinnerCard>{winnerCard}</WinnerCard>
        </CardsContainer>
        <WinnerName>Winner: {winnerName}</WinnerName>
      </WinnerSection>
      <PlayerScores>
        <ScoresHeader>Player Scores</ScoresHeader>
        <ScoresList>
          {players.map((player) => (
            <ScoreItem key={player.id}>
              <PlayerName>{player.name}</PlayerName>
              <PlayerPoints>{player.points} points</PlayerPoints>
            </ScoreItem>
          ))}
        </ScoresList>
      </PlayerScores>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  color: white;
  min-height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const WinnerSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const QuestionCard = styled.div`
  background-color: black;
  color: white;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5;

  width: 12rem;
  height: 0;
  padding-bottom: 16rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 10rem;
    padding-bottom: 14rem;
  }
`;

const WinnerCard = styled(QuestionCard)`
  background-color: white;
  color: black;
`;

const WinnerName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 5px;
  }
`;

const PlayerScores = styled.div`
  margin-bottom: 30px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const ScoresHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const ScoresList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #444;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const PlayerName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PlayerPoints = styled.span`
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default RoundOver;
