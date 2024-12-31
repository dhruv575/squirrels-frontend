import React from 'react';
import styled from 'styled-components';

const JudgePickContainer = styled.div`
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
  gap: 15px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 10rem;
    padding-bottom: 14rem;
  }
`;

const JudgePick = ({ gameState, onSubmitQuestion }) => {
  const isJudge = gameState.currentPlayer.role === 'JUDGE';

  if (!isJudge) {
    return (
      <JudgePickContainer>
        <Header>Judge Pick Phase</Header>
        <Instruction>The Judge is Picking...</Instruction>
      </JudgePickContainer>
    );
  }

  const handleSelectCard = (cardId) => {
    onSubmitQuestion(cardId);
  };

  return (
    <JudgePickContainer>
      <Header>Judge Pick Phase</Header>
      <Instruction>Choose a question card to start the round:</Instruction>
      <CardGrid>
        {gameState.currentPlayer.hand.map((card) => (
          <QuestionCard key={card.id} onClick={() => handleSelectCard(card.id)}>
            {card.text || 'No Text'}
          </QuestionCard>
        ))}
      </CardGrid>
    </JudgePickContainer>
  );
};

export default JudgePick;
