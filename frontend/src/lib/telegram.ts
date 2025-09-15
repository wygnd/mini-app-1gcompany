
let telegramSDK: any = null;

export const importTelegram = async () => {
	if(!telegramSDK) {
		telegramSDK = await import("@telegram-apps/sdk");
	}
	return telegramSDK;
}