import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Home from './Home';
import Lobby from './Lobby';
import JudgePick from './JudgePick';
import PlayersPick from './PlayersPick';
import JudgeSelect from './JudgeSelect';
import RoundOver from './RoundOver';
import GameEnd from './GameEnd'
import styled from 'styled-components';

const SOCKET_URL = 'https://squirrels-backend-54753f98cee7.herokuapp.com';

const Game = () => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [roundOverData, setRoundOverData] = useState(null); // State to handle Round Over data
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('gameUpdated', ({ gameState }) => {
      console.log('Game state updated:', gameState); // Debug log
      setGameState(gameState);
    });

    newSocket.on('roundOver', ({ winnerId, winnerName, winnerCard, questionCard, players }) => {
      console.log('Round over data received:', { winnerId, winnerName, winnerCard, questionCard, players });
      setRoundOverData({ winnerId, winnerName, winnerCard, questionCard, players });
      setGameState((prev) => ({ ...prev, phase: 'ROUND_OVER' })); // Update phase to ROUND_OVER
    });

    newSocket.on('error', (errorMessage) => {
      setError(errorMessage);
    });

    newSocket.on('gameCreated', ({ gameId, gameState }) => {
      setGameState(gameState);
      setError(null);
    });

    newSocket.on('playerJoined', ({ gameState }) => {
      setGameState(gameState);
    });

    newSocket.on('gameStarted', ({ gameState }) => {
      console.log('Received gameStarted event. Game state:', gameState); // Debug log
      setGameState(gameState);
    });

    newSocket.on('gameEnded', ({ winner, players }) => {
      console.log('Game ended. Winner:', winner);
      setGameState({
          phase: 'GAME_END',
          winner,
          players,
      });
    });

    newSocket.on('playerLeft', ({ gameState }) => {
      setGameState(gameState);
    });

    newSocket.on('gameEnded', ({ reason, gameState }) => {
      setError(reason);
      setGameState(null);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleJoinGame = ({ name, gameId, isNew }) => {
    if (isNew) {
      socket.emit('createGame', { playerName: name });
    } else {
      socket.emit('joinGame', { gameId, playerName: name });
    }
  };

  const handleStartGame = () => {
    if (gameState) {
      socket.emit('startGame', { gameId: gameState.gameId });
    } else {
      console.error('No game state available');
    }
  };

  const handleSubmitQuestion = (cardId) => {
    console.log('Submitting the question');
    if (gameState) {
      socket.emit('submitQuestion', {
        gameId: gameState.gameId,
        cardId,
      });
    }
  };

  const handleSubmitAnswer = (cardId) => {
    console.log(`Submitting answer card: ${cardId}`); // Debug log
    socket.emit('submitAnswer', {
      gameId: gameState.gameId,
      cardId,
    });
  };

  const handleSelectWinner = (playerId) => {
    console.log(`Selecting winner: ${playerId}`); // Debug log
    socket.emit('selectWinner', {
      gameId: gameState.gameId,
      playerId,
    });
  };

  const handleStartNextRound = () => {
    console.log('Starting the next round'); // Debug log
    socket.emit('startNextRound', { gameId: gameState.gameId });
    setRoundOverData(null); // Clear Round Over data
  };


  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  if (!gameState) {
    return (
      <>
        <Home onJoinGame={handleJoinGame} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    );
  }

  switch (gameState.phase) {
    case 'LOBBY':
      return <Lobby gameState={gameState} onStartGame={handleStartGame} />;
    case 'JUDGE_PICK':
      return <JudgePick gameState={gameState} onSubmitQuestion={handleSubmitQuestion} />;
    case 'PLAYERS_PICK':
      return <PlayersPick gameState={gameState} onSubmitAnswer={handleSubmitAnswer} />;
    case 'JUDGE_SELECT':
      return <JudgeSelect gameState={gameState} onSelectWinner={handleSelectWinner} />;
    case 'ROUND_OVER':
      return <RoundOver data={roundOverData} onStartNextRound={handleStartNextRound} />;
      case 'GAME_END':
        return (
          <GameEnd
            winner={gameState.winner}
            players={gameState.players}
            onRestart={() => {
              setGameState(null); // Reset game state to return to the home screen
              setError(null);
            }}
          />
        );
    default:
      return <InfoText>Unknown phase: {gameState.phase}</InfoText>;
  }
};

const InfoText = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 20px;
`;

export default Game;
