const SEMESTER_TRANSITION_DATE = new Date('2021-01-24');
const YEAR_START_DATE = new Date('2020-09-06 00:00:00');
const YEAR_END_DATE = new Date('2021-06-30 23:59:59');

/*
logHookLevel :
 - 0: Toutes les logs sont envoyés sur discord via webhook
 - 1: Les warning + les erreurs ...
 - 2: Uniquement les erreurs ...
 - 3: Rien
 Pour que le webhook fonctionne, sont url doit être configuré (Voir README - configuration, pour plus de détails)
*/

export default {
	global: {
		getSubjectsFromFile: false,
		logHookLevel: 1
	},
	bot: {
		version: '1.0.1',
		prefix: '!'
	},
	date : {
		yearStart: YEAR_START_DATE,
		yearEnd: YEAR_END_DATE,
		semesterTransition: SEMESTER_TRANSITION_DATE,
		semester: new Date() < SEMESTER_TRANSITION_DATE ? 1 : 2
	}
};
