import { showLoadingScreen } from './shopgateApp';

const LOADING_SCREEN_TIMEOUT_SECONDS = 20;

/**
 * Hook when the register user should happen.
 */
export function onRegister() {
  document.addEventListener('submit', (e) => {
    if (/action=save_new_account$/.test(e.target.action)) {
      if (e.returnValue === true) {
        showLoadingScreen(LOADING_SCREEN_TIMEOUT_SECONDS);
      }
    }
  });
}
