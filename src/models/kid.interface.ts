import { DatabaseSnapshot } from "@angular/fire/database";

export interface Kid {
	$key?: string
	$ref?: DatabaseSnapshot<Kid>['ref']
	name: string
	color?: string
	spiritEmoji?: string
	createDate: string
	userId: string
	colour: string
}