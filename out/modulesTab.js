"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulesToTabData = exports.getTabImageAttachment = void 0;
const Discord = require("discord.js");
const { CanvasTable } = require("canvas-table");
const { createCanvas } = require("canvas");
/**
 * Création du canvas avec les matières et les UE
 * @param userModules
 * @return la canvas mis en forme
 */
exports.getTabImageAttachment = async (subjects) => {
    const canvas = createCanvas(1965 / 3, 25 * subjects.length + 100);
    const data = exports.modulesToTabData(subjects);
    const ct = new CanvasTable(canvas, {
        data,
        columns,
        options
    });
    await ct.generateTable();
    await ct.renderToFile("test-table.png");
    return new Discord.MessageAttachment(canvas.toBuffer(), "image.png");
};
/**
 * Transforme une liste de module sous une forme utilisée pour générer un tableau
 * @param subjects liste des modules a afficher dans le tableau
 * @return Les modules sous forme lisible pour canvas-table
 */
exports.modulesToTabData = (subjects) => {
    let data = [];
    let i = 1;
    data.push(["", "", ""]);
    subjects.forEach((subject) => {
        const ligne = [i.toString(), subject.displayId + " - " + subject.displayName];
        data.push(ligne);
        i++;
    });
    data.push(["", "", ""]);
    return data;
};
/**
 * Affichage des colonnes pour le canvas
 */
const columns = [
    {
        title: "Numéro",
        options: {
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "arial",
            color: "#afdab9",
            lineHeight: 21,
        }
    },
    {
        title: "Module",
        options: {
            textAlign: "left",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "arial",
            color: "white",
            lineHeight: 21,
        },
    },
];
/**
 * Options pour le canvas
 */
const options = {
    devicePixelRatio: 1,
    background: "#2f3136",
    borders: {
        table: { color: "#bababa", width: 2 },
    },
    fit: true,
    options: {
        textAlign: "center",
    },
    header: {
        fontSize: 16,
        fontFamily: "arial",
        color: "#afdab9",
    },
};
//# sourceMappingURL=modulesTab.js.map