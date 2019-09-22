import { DatabaseSnapshot } from "@angular/fire/database";

export interface Assessment {
	$key?: string
	$ref?: DatabaseSnapshot<Assessment>['ref']
	kidId: string
	mood: Mood
	location: Location
	reason: Reason
	createDate: string
}

export interface MoodData {
    mood: Mood
    img: string
    label: string
}

export enum Mood {
	'HAPPY' = 0,
	'LOW' = 1,
	'WINCE' = 2,
	'GRIT' = 3,
	'CRY' = 4,
	'SCREAM' = 5,
}

export interface LocationData {
    location: Location
    img: string
    label: string
}

export enum Location {
	'FRONT_HEAD' = 0,
	'FRONT_BODY_ARMS' = 1,
	'FRONT_LEGS' = 2,
	'BACK_HEAD' = 3,
	'BACK_BODY_ARMS' = 4,
	'BACK_LEGS' = 5,
}

export enum Reason {
	'TOILET' = 0,
	'COLD' = 1,
	'HOT' = 2,
	'HOME_SICK' = 3,
	'HUNGRY' = 4,
	'THIRSTY' = 5,
}

export interface ReasonData {
    reason: Reason
    img: string
    label: string
}