import {
	setDebug,
	mountBackButton,
	restoreInitData,
	init as initSDK,
	bindThemeParamsCssVars,
	mountViewport,
	bindViewportCssVars,
	miniApp,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(options: {
	debug: boolean;
	eruda: boolean;
	mockForMacOS: boolean;
}): Promise<void> {
	// Set @telegram-apps/sdk-react debug mode and initialize it.
	setDebug(options.debug);
	initSDK();

	// Add Eruda if needed.
	options.eruda && void import('eruda').then(({ default: eruda }) => {
		eruda.init();
		eruda.position({ x: window.innerWidth - 50, y: 0 });
	});

	// Mount all components used in the project.
	mountBackButton.ifAvailable();
	restoreInitData();

	if (miniApp.mountSync.isAvailable()) {
		miniApp.mountSync();
		bindThemeParamsCssVars();
	}

	mountViewport.isAvailable() && mountViewport().then(() => {
		bindViewportCssVars();
	});
}