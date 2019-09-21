import { DatabaseSnapshot } from "@angular/fire/database";

export interface Kid {
	$key?: string
	$ref?: DatabaseSnapshot<Kid>['ref']
	name: string
	spiritEmoji: string
	createDate: string
	userId: string
	colour: string
}