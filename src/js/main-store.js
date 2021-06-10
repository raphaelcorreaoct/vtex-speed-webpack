import { HOME_SCREEN } from "./configs";

const Home = {
  init: () => {
    console.log("Tudo certo !");
  },
};

$(document).ready(function () {
  if (HOME_SCREEN) Home.init();
});
