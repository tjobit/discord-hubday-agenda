"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validURL = exports.dateValid = exports.convertIsoToDate = exports.convertDateIso = exports.gatherResponse = exports.libelleJour = void 0;
const moment = require("moment");
/**
  * Remplace le nombre de jours par une string selon certaines conditions
  * @param jours le nombre de jours avant la remise
  * @return un libellé particulier si le nombre de jour correspond a un nombre particulier, sinon return le nombre de jours
*/
const libelleJour = (jours) => {
    if (jours === 0)
        return "Pour aujourd'hui";
    else if (jours === 1)
        return "Pour demain";
    else if (jours === 2)
        return "Pour après-demain";
    else if (jours === 7)
        return "Pour dans une semaine";
    else if (jours >= 30 && jours < 30 * 2)
        return "Pour dans 1 mois";
    else if (jours >= (30 * 2) && jours < (30 * 3))
        return "Pour dans 2 mois";
    else if (jours >= (30 * 3) && jours < (30 * 4))
        return "Pour dans 3 mois";
    else if (jours >= (30 * 4) && jours < (30 * 5))
        return "Pour dans 4 mois";
    else if (jours >= (30 * 5) && jours < (30 * 6))
        return "Pour dans 5 mois";
    else if (jours >= (30 * 6) && jours < (30 * 7))
        return "Pour dans 6 mois";
    else if (jours >= (30 * 7) && jours <= (30 * 8))
        return "Pour dans 7 mois";
    else if (jours > 240)
        return "Pour dans trop longtemps (tu t'es pas trompé de date ?)";
    else
        return `Pour dans ${jours} jours`;
};
exports.libelleJour = libelleJour;
const gatherResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
    const { headers } = response;
    const contentType = headers.get("content-type");
    if (contentType.includes("application/json")) {
        return yield response.json();
    }
    else if (contentType.includes("application/text")) {
        return yield response.text();
    }
    else if (contentType.includes("text/html")) {
        return yield response.text();
    }
    else {
        return yield response.text();
    }
});
exports.gatherResponse = gatherResponse;
// static dateValidFormat(date) {
// 	if (date.length !== 5)
// 		return false;
// 	const splitArr = date.split("/");
// 	if (splitArr.length !== 2)
// 		return false;
// 	if (+splitArr[0] !== parseInt(splitArr[0]))
// 		return false;
// 	if (+splitArr[1] !== parseInt(splitArr[1]))
// 		return false;
// 	if (parseInt(splitArr[0]) > 31 || parseInt(splitArr[0]) <= 0)
// 		return false;
// 	if (parseInt(splitArr[1]) > 12 || parseInt(splitArr[1]) <= 0)
// 		return false;
// 	return true;
// }
const convertDateIso = (date) => {
    return moment(date).format("YYYY-MM-DD");
};
exports.convertDateIso = convertDateIso;
// static convertDateIso(date) {
// 	let dateDevoir = date;
// 	// Crée un tableau de taille 2, à l'index 0 on a le jour et à l'index 1 on a le mois 
// 	const splitArr = dateDevoir.split("/");
// 	const dayDevoir = parseInt(splitArr[0]);
// 	const monthDevoir = parseInt(splitArr[1]);
// 	return dateDevoir = new Date(2021, monthDevoir - 1, dayDevoir + 1);
// }
const convertIsoToDate = (iso) => {
    return `${("0" + iso.getDate()).slice(-2)}/${("0" + (iso.getMonth() + 1)).slice(-2)}`;
};
exports.convertIsoToDate = convertIsoToDate;
const dateValid = (date) => {
    const SEMESTER_TRANSITION_DATE = new Date("2021-01-24");
    const YEAR_START_DATE = new Date("2020-09-06 00:00:00");
    const YEAR_END_DATE = new Date("2021-06-30 23:59:59");
    const today = new Date();
    var homeworkDate = moment(date, "DD/MM/YYYY").toDate();
    if ((today > SEMESTER_TRANSITION_DATE && homeworkDate > SEMESTER_TRANSITION_DATE && homeworkDate < YEAR_END_DATE)
        || (today <= SEMESTER_TRANSITION_DATE && homeworkDate > YEAR_START_DATE && homeworkDate < SEMESTER_TRANSITION_DATE)) {
        return homeworkDate;
    }
    else {
        return null;
    }
    // let diffDate = Math.round((dateDevoir - today) / (1000 * 60 * 60 * 24)) - 1;
    // return (diffDate >= 0);
};
exports.dateValid = dateValid;
const validURL = (str) => {
    let pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
    return (!!pattern.test(str));
};
exports.validURL = validURL;
//# sourceMappingURL=utils.js.map