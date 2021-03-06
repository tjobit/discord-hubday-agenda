/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

import * as Discord from 'discord.js';
import * as Embed from './embed';

import BotLog from './Classes/BotLog';
import AgendaSlashCommands from './Classes/SlashCommands/AgendaSlashCommands';
import config from './config';

const client = new Discord.Client();

/**
 * Vérification du setup de variables d'environnement
 */
if (process.env.DISCORD_BOT_TOKEN === undefined
	|| process.env.RTDB_URL === undefined
	|| process.env.RTDB_AUTH_TOKEN === undefined) {
	const result = dotenv.config({ path: 'env.local' });
	if (
		result.error
		|| process.env.DISCORD_BOT_TOKEN === undefined
		|| process.env.RTDB_URL === undefined
		|| process.env.RTDB_AUTH_TOKEN === undefined
	) {
		BotLog.error('Impossible de récupérer les variables d\'environnement de configuration. Vérifiez que vous avez bien un fichier \'env.local\' correctement configuré.');
		process.exit(1);
	}
}

/**
 * Quand le bot est prêt
 * - On enregistre les slash commands
 * - On ajoute un listener sur les commandes pour ensuite lancer les actions du bot en fonction de commandes reçus
 */
client.on('ready', async () => {

	// AgendaSlashCommands.getSlashCommands(client, '796320431569109012');
	// AgendaSlashCommands.deleteSlashCommand(client, '820352959455690762', '796320431569109012');

	/**
	 * Création des slashs commands
	 * 823566121629909014
	 */
	if(client.user?.id && process.env.DISCORD_BOT_TOKEN != undefined)
		AgendaSlashCommands.addAgendaSlashCommand(client);
	else
		BotLog.error('Erreur de mise à jour slash commands');

	/**
	 * Enregistrement listener des slash commands
	 */
	client.ws.on(('INTERACTION_CREATE' as Discord.WSEventType), async interaction => {
		AgendaSlashCommands.processInteraction(client, interaction);
	});

	BotLog.log('========================================');
	BotLog.log('              Bot lancé !               ');
	BotLog.log('========================================');

	//Gestion du message de sstatus du bot (Change toutes les 20 secondes)
	const status = async () => {
		try {
			setTimeout(() => {
				client.user?.setActivity('/agenda').catch((e) => BotLog.error(e));
				setTimeout(() => {
					client.user?.setActivity('hubday.fr', { type: 'WATCHING' }).catch((e) => BotLog.error(e));
					status();
				}, 20000);
			}, 20000);
		} catch (e) {
			BotLog.error('Erreur de mise à jour du status du bot \n' + e);
		}
	};
	status();

	if(process.platform !== 'win32'){
		const startLog = new BotLog('Démarrage');
		startLog.info('Lancement du bot en version ' + config.bot.version);
		startLog.hookLogMessages();
	}
});

/**
 * Commandes classiques du bot
 * on 'message' = quand le bot recoit un message n'importe ou
 */
client.on('message', async msg => {
	if (msg.channel.type === 'dm') {//On accepte que les message en MP

		// On regarde si le message commence bien par le prefix (!)
		if (msg.content.startsWith(config.bot.prefix)) {//Si le message ne commence pas par le prefix du config.json
			switch (msg.content.substr(1).split(' ')[0]) {
				case 'agenda-version':
					msg.author.send(Embed.getDefaultEmbed(config.bot.version)).catch((e) => BotLog.error(e));
					return;

				case 'agenda-help':
					msg.author.send(Embed.getHelpEmbed()).catch((e) => BotLog.error(e));
					return;

				case 'agenda-logs':
					msg.author.send(BotLog.Instance.getMessagesFile()).catch((e) => BotLog.error(e));
					return;

				case 'agenda-runtime':
					msg.author.send(await Embed.getRuntimeEmbed()).catch((e) => BotLog.error(e));
					return;

				default :
					msg.author.send('Commande non reconnue : !agenda-(version/help/logs/runtime)').catch((e) => BotLog.error(e));
					return;
			}
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN).catch((e) => BotLog.error('Le bot na pas pu se connecter, vérifiez le token dans le fichier de config\n' + e));
