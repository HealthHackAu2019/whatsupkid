import { DatabaseSnapshot } from "@angular/fire/database";

export interface Assessment {
	$key?: string
	$ref?: DatabaseSnapshot<Assessment>['ref']
	kidId: string
	mood: string
	painAreas: PainArea[]
	createDate: string
}

enum PainIntensity {
	'NONE' = 0,
	'LOW' = 1,
	'WINCE' = 2,
	'GRIT' = 3,
	'CRY' = 4,
	'SCREAM' = 5,
}

enum PainLocation {
	'HEAD',
	'NOT-HEAD'
}

export interface PainArea {
	intensity: PainIntensity
	location: PainLocation
}