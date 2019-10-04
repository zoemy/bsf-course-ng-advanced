import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameState, getCurrentHand, getUserPlayer, getCurrentStory, updateCurrentTurn, getTurnInfo, setUserHand } from '../../../store/game';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../../models';
import { StoryCard } from '../../../models/StoryCard';
import { BoardCard } from '../../../models/BoardCard';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { StatusBoardFirebaseService, StatusBoard } from '../../../core/services/state.firebase.service';

@Component({
	selector: 'gt-hand',
	templateUrl: './hand.component.html',
	styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit, OnDestroy {
	handCards$: Observable<number[]>;
	isPlayersTurn$: Observable<boolean>;
	isStoryTellerTurn$: Observable<boolean>;
	userPlayer$: Observable<Player>;

	private playerHand$: Subscription;
	private currentTurn$: Subscription;
	boardCard: BoardCard;
	selectedCardIndex: number;

	constructor(private gameStore: Store<GameState>,
		private stateService: StatusBoardFirebaseService) { }

	ngOnInit() {
		this.handCards$ = this.gameStore.pipe(select(getCurrentHand));
		this.userPlayer$ = this.gameStore.pipe(select(getUserPlayer));

		this.playerHand$ = this.gameStore.pipe(select(getTurnInfo), distinctUntilChanged((x, y) => x.isUserTurn === y.isUserTurn)).subscribe((turnInfo) => {
			console.log("turnInfo", turnInfo);
			if (turnInfo.isUserTurn)
				this.gameStore.dispatch(setUserHand({ cardsCount: turnInfo.cardsCount }));
		});
		this.isStoryTellerTurn$ = this.gameStore.pipe(select(getCurrentStory),
			switchMap(story => this.userPlayer$.pipe(map(user => user.isStoryTeller && story === null)))
		);
		this.isPlayersTurn$ = this.gameStore.pipe(select(getCurrentStory),
			switchMap(story => this.userPlayer$.pipe(map(user => !user.isStoryTeller && story !== null && !user.hasThrowCard)))
		);
		this.currentTurn$ = this.stateService.doc$(StatusBoard.CurrentPlayerTurn).subscribe(state => {
			console.log("hand CurrentPlayerTurn", state);
			this.gameStore.dispatch(updateCurrentTurn({ currentTurn: state.currentTurn }));
		});
	}

	ngOnDestroy() {
		// if (!this.currentTurn$)
		this.currentTurn$.unsubscribe();

		this.playerHand$.unsubscribe();
	}

	getCardImage(cardIndex: number): string {
		const card_index = cardIndex >= 10 ? cardIndex : `0${cardIndex}`;
		return `assets/cards/card_000${card_index}.jpg`;
	}

	selectCard(cardIndex: number) {
		this.selectedCardIndex = cardIndex;
	}

}
