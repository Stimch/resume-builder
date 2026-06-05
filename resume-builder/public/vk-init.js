(function () {
  function initVkApp() {
    if (window.vkBridge) {
      window.vkBridge.send('VKWebAppInit');
      return;
    }
    setTimeout(initVkApp, 30);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVkApp);
  } else {
    initVkApp();
  }
})();
