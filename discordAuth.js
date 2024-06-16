import * as alt from 'alt';
import * as game from 'natives';

const DISCORD_APP_ID = '1090391947950162076';

async function getOAuthToken() {

    try {
        const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
        alt.emitServer('Server:DiscordAuthDone', token);
    } catch (e) {
        // Error can be due invalid app id, discord server issues or the user denying access.
        alt.logError(e);
    }
}

alt.onServer('discord:BeginAuth', getOAuthToken);
