import { Component, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'gt-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
	cardImage: string;
	private readonly reverseCardUrl = "assets/cards/reverse_card.jpg";

	@Input() isRevealed: boolean;
	@Input() isJumping: boolean;
	@Input() isSelected: boolean;
	@Input() cardIndex: number;

	constructor() {
		this.cardImage = this.reverseCardUrl;
	}

	ngOnChanges(): void {
		this.cardImage = this.isRevealed ? this.getImageUrl() : this.reverseCardUrl;
	}

	getImageUrl(): string {
		const card_index = this.cardIndex >= 10 ? this.cardIndex : `0${this.cardIndex}`;
		return `assets/cards/card_000${card_index}.jpg`;
	}

}
