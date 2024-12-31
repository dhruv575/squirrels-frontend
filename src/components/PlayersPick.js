import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo512.png';

const PlayerPicksContainer = styled.div`
  background-color: #333;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Arial Black', sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
`;

const Instruction = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
`;

const AnswerCard = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  overflow-wrap: break-word;
  word-wrap: break-word;

  width: 12rem;
  height: 0;
  padding-bottom: 16rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 10rem;
    padding-bottom: 14rem;
  }
`;

const WaitingMessage = styled.div`
  font-size: 1.5rem;
  font-style: italic;
  color: #bbb;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 15px;
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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  overflow-wrap: break-word;
  word-wrap: break-word;

  width: 12rem;
  height: 0;
  padding-bottom: 16rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 10rem;
    padding-bottom: 14rem;
  }
`;

const SelectedContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
`;

const BackCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 12rem;
  height: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 50%;
    max-height: 50%;
  }

  @media (max-width: 768px) {
    width: 10rem;
    height: 14rem;
  }
`;

const PlayerPicks = ({ gameState, onSubmitAnswer }) => {
  const isPlayer = gameState.currentPlayer.role === 'PLAYER';
  const isJudge = gameState.currentPlayer.role === 'JUDGE';

  const handleSelectCard = (cardId) => {
    if (!gameState.currentPlayer.currentSubmission) {
      console.log(`Submitting card ${cardId}`); // Debug log
      onSubmitAnswer(cardId);
    }
  };

  if (isJudge) {
    return (
      <PlayerPicksContainer>
        <Header>Waiting for Players</Header>
        <CardGrid>
          {gameState.round.submissions.map((submission, index) => (
            <BackCard key={index}>
              <img src={logo} alt="Card Back" />
            </BackCard>
          ))}
        </CardGrid>
      </PlayerPicksContainer>
    );
  }

  if (!isPlayer) {
    return (
      <PlayerPicksContainer>
        <Header>Player Picks Phase</Header>
        <WaitingMessage>Waiting for players to submit their answers...</WaitingMessage>
      </PlayerPicksContainer>
    );
  }

  return (
    <PlayerPicksContainer>
      <Header>Player Picks Phase</Header>
      {gameState.currentPlayer.currentSubmission ? (
        <>
          <WaitingMessage>Waiting for other players...</WaitingMessage>
          <SelectedContainer>
            <QuestionCard>{gameState.round.question.text || 'No Question'}</QuestionCard>
            <AnswerCard>{gameState.currentPlayer.currentSubmission.text || 'No Text'}</AnswerCard>
          </SelectedContainer>
        </>
      ) : (
        <>
          <QuestionCard>{gameState.round.question.text || 'No Question'}</QuestionCard>
          <Instruction>Select an answer card to submit:</Instruction>
          <CardGrid>
            {gameState.currentPlayer.hand.map((card) => (
              <AnswerCard
                key={card.id}
                onClick={() => handleSelectCard(card.id)}
                className={gameState.currentPlayer.currentSubmission ? 'disabled' : ''}
              >
                {card.text || 'No Text'}
              </AnswerCard>
            ))}
          </CardGrid>
        </>
      )}
    </PlayerPicksContainer>
  );
};

export default PlayerPicks;
