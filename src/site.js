import { sidebar } from "./modules/sidebar.js";
import { themeMode } from "./modules/theme-mode.js";
import { dropdown } from "./modules/dropdown.js";
import { changePicture } from "./modules/change-picture.js";
import { settingsMenu } from "./modules/settings-menu.js";
import { faqs } from "./modules/faqs.js";
import { tabs } from "./modules/tabs.js";
import { audioPlayer } from "./modules/audio-player.js";
import { inputMask } from './modules/input-mask.js';
import { profileSelect } from './modules/profile-select.js';
import { paymentMethod } from './modules/payment-method.js';
import { initDataTable } from "./modules/datatable.js";

document.addEventListener("DOMContentLoaded", () => {
  
  sidebar();
  dropdown();
  changePicture();
  themeMode();
  faqs();
   tabs();
   audioPlayer();
   inputMask();
   profileSelect();
   paymentMethod();
   settingsMenu();
  initDataTable();

});