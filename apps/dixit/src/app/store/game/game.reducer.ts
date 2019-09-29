import { Action, createReducer, on } from '@ngrx/store';
import {
	fetchBoardCards, setGuessingTime, setBoardCard, setCurrentStory, updatePlayer,
	setAvaiableCards, setVotesVisibility, setVote, nextRound, setUserHand
} from './game.actions';
import { GameState, initalState } from './game.state';
import { Player } from '../../models';
import { BoardCard } from '../../models/BoardCard';


const reducer = createReducer(
	initalState,
	on(fetchBoardCards, (state, { }) => ({ ...state, isLoading: true })),
	on(setBoardCard, (state, { boardCard }) => ({ ...state, userPlayer: updateUserOnCardThrowed(state.userPlayer), players: updatePlayersOnCardThrow(state.players, boardCard.owner), boardCards: addBoardCard(state.boardCards, boardCard), isGuessingTime: state.players.length === state.boardCards.length + 1, currentHand: state.currentHand.filter(card => card !== boardCard.cardIndex) })),
	on(setVote, (state, { cardIndex, player }) => ({ ...state, userPlayer: updateUserOnPlayerVoted(state.userPlayer), players: updatePlayersVotes(state.players, player), boardCards: updateCardsOnVoted(state.boardCards, cardIndex, player) })),
	on(setGuessingTime, (state, { isGuessingTime }) => ({ ...state, isGuessingTime })),
	on(setVotesVisibility, (state, { areVotesVisible }) => ({ ...state, areVotesVisible, players: updatedPlayesScore(state) })),
	on(setAvaiableCards, (state, { cards }) => ({ ...state, avaiableCards: cards })),
	on(setCurrentStory, (state, { currentStory }) => ({ ...state, currentStory, boardCards: addBoardCard(state.boardCards, { cardIndex: currentStory.cardIndex, owner: currentStory.storyTeller, votes: [] }), currentHand: state.currentHand.filter(card => card !== currentStory.cardIndex) })),
	on(updatePlayer, (state, { player }) => ({ ...state, players: update(state.players, player) })),
	on(nextRound, (state, { }) => ({ ...state, currentTurn: state.userPlayer.order + 1, currentStory: null, boardCards: [], userPlayer: state.players.find(player => player.playerId === state.userPlayer.playerId) })),
	on(setUserHand, (state, { cardsCount }) => ({ ...state, currentTurn: state.userPlayer.order + 1, userPlayer: state.players.find(player => player.playerId === state.userPlayer.playerId), currentHand: add(state.currentHand, getHandCards(state.avaiableCards, cardsCount)), avaiableCards: state.avaiableCards.filter(card => !getHandCards(state.avaiableCards, cardsCount).includes(card)) })),
);

function getHandCards(avaiableCards: number[], cardsCount: number): number[] {
	return avaiableCards.slice(0, cardsCount);
}

function updateCardsOnVoted(boardCards: BoardCard[], cardIndex: number, player: Player) {
	const cards = boardCards.map(card => {
		const newCard = Object.assign({}, card);
		newCard.votes = Object.assign([], card.votes);
		return newCard;
	});
	cards.forEach(card => {
		if (card.cardIndex === cardIndex) {
			card.votes.push(player);
		}
	});
	return cards;
}

function updateUserOnCardThrowed(player: Player): Player {
	const newPlayer = Object.assign({}, player)
	newPlayer.hasThrowCard = true;
	return newPlayer;
}

function updateUserOnPlayerVoted(player: Player): Player {
	const newPlayer = Object.assign({}, player)
	newPlayer.hasVoted = true;
	return newPlayer;
}

function updatePlayersVotes(players: Player[], userPlayer: Player) {
	const newPlayers = players.map(player => Object.assign({}, player));
	newPlayers.forEach(player => {
		if (player.playerId === userPlayer.playerId)
			player.hasVoted = true;
	});
	return newPlayers;
}

function updatePlayersOnCardThrow(players: Player[], userPlayer: Player) {
	const newPlayers = players.map(player => Object.assign({}, player));
	newPlayers.forEach(player => {
		if (player.playerId === userPlayer.playerId)
			player.hasThrowCard = true;
	});
	return newPlayers;
}

function updatedPlayesScore(state: GameState): Player[] {
	const correctCard = state.boardCards.find(boardCard => boardCard.cardIndex === state.currentStory.cardIndex);
	const correctCardVotesCount = correctCard.votes.length;
	const newPlayers = state.players.map(player => Object.assign({}, player));//Object.assign([], state.players);
	const newStoryTeller = newPlayers.find(player => player.isStoryTeller).order + 1;
	if (correctCardVotesCount === newPlayers.length - 1 || correctCardVotesCount === 0) {
		newPlayers.forEach((player, index) => {
			if (!player.isStoryTeller)
				newPlayers[index].score += 2;
		});
	} else {
		const playersWhoGuessed = correctCard.votes.map(x => x.playerId);
		newPlayers.forEach(player => {
			if (player.isStoryTeller || playersWhoGuessed.includes(player.playerId)) {
				player.score += 3;
			}
		});
	}

	newPlayers
		.forEach(player => {
			if (!player.isStoryTeller) {
				const playerCard = state.boardCards.find(boardCard => boardCard.owner.playerId === player.playerId);
				player.score += playerCard.votes.length;
			}
			player.hasThrowCard = false;
			player.hasVoted = false;
			player.isStoryTeller = newStoryTeller === player.order;
		});

	return newPlayers;
}

function add(list: number[], item: number[]) {
	const newList = Object.assign([], list);
	return newList.concat(item);
}

function addBoardCard(list: any[], item: any) {
	const newList = add(list, item);
	shuffle(newList);
	return newList;
}

function update(players: any[], player: any): any[] {
	const index = players.indexOf(player);
	players.splice(index, 0, player);
	return players;
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function gameReducer(state: GameState | undefined, action: Action) {
	return reducer(state, action);
}
