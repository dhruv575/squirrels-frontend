import React, { useEffect } from 'react';
import styled from 'styled-components';

const JudgeSelect = ({ gameState, onSelectWinner }) => {
  // Log the entire gameState on each render
  useEffect(() => {
    console.log('Received gameState:', gameState);
  }, [gameState]);

  const currentPlayer = gameState.currentPlayer;
  const isJudge = currentPlayer.role === 'JUDGE';

  const handleSelectWinner = (playerId) => {
    if (isJudge) {
      console.log(`Judge selected winner: ${playerId}`);
      onSelectWinner(playerId);
    }
  };

  return (
    <PhaseContainer>
      <Header>{isJudge ? 'Pick a Winner' : 'The Judge is Picking'}</Header>
      <QuestionCard>{gameState.round?.question?.text || 'No Question'}</QuestionCard>
      <Instruction>
        {isJudge
          ? 'Choose the best answer from the submissions:'
          : 'Waiting for the judge to select the winner...'}
      </Instruction>
      <CardGrid>
        {gameState.round?.submissions?.map((submission) => (
          <AnswerCard
            key={submission.playerId}
            onClick={() => handleSelectWinner(submission.playerId)}
            className={!isJudge ? 'disabled' : ''}
          >
            {submission.card?.text || 'No Text'}
          </AnswerCard>
        ))}
      </CardGrid>
    </PhaseContainer>
  );
};

const PhaseContainer = styled.div`
  text-align: center;
  color: white;
  background-color: #333;
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

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
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
  margin-bottom: 20px;

  width: 12rem;
  height: 0;
  padding-bottom: 16rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 10rem;
    padding-bottom: 14rem;
  }
`;

const Instruction = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

export default JudgeSelect;
