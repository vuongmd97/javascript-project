function actionBuld(action) {
  let buldImgSrc = "assets/turn-off.png";
  if (action === "on") {
    buldImgSrc = "assets/turn-on.png";
  }
  document.getElementById("buld").src = buldImgSrc;
}
