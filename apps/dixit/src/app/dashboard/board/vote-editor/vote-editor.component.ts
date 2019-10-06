import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState, setVote } from '../../../store/game';
import { Player } from '../../../models';
import { BoardCard } from '../../../models/BoardCard';
import { SnackbarService } from '@glotrix/ui/snackbar';

@Component({
	selector: 'gt-vote-editor',
	templateUrl: './vote-editor.component.html',
	styleUrls: ['./vote-editor.component.scss']
})
export class VoteEditorComponent implements OnChanges {

	@Input() selectedCard: BoardCard;
	@Input() userPlayer: Player;

	constructor(private gameStore: Store<GameState>,
		private snackbarService: SnackbarService) { }

	ngOnChanges() { }

	get message() {
		return this.selectedCard ? 'Do you want to vote for this card?' : 'Select the card you want to vote for';
	}

	vote(): void {
		if (!this.selectedCard) {
			this.snackbarService.showWarning("You have to select a card to vote for!", 'Dixit');
			return;
		}
		this.gameStore.dispatch(setVote({ boardCard: this.selectedCard, userPlayer: this.userPlayer }));
	}
}
