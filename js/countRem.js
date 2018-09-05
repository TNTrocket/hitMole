var deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
if (deviceWidth > 750) {
    deviceWidth = 750;
}
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';