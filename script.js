(function () {

  // Chave usada para salvar a escolha do usuário no cookie do navegador
  var STORAGE_KEY = 'cookie-consent';

  // Tempo que a escolha fica salva (em meses)
  var COOKIE_EXPIRATION_MONTHS = 12;

  // Referências aos elementos HTML do banner
  var banner = document.getElementById('cookieConsent');
  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');

  // Lê o cookie salvo no navegador e retorna o valor ('accepted', 'rejected' ou null)
  function getConsent() {
    var name = STORAGE_KEY + '=';
    var cookies = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < cookies.length; i++) {
      var c = cookies[i].replace(/^\s+/, '');
      if (c.indexOf(name) === 0) {
        return decodeURIComponent(c.substring(name.length));
      }
    }
    return null;
  }

  // Salva a escolha do usuário em um cookie com data de expiração
  function setConsent(value) {
    var expires = new Date();
    expires.setMonth(expires.getMonth() + COOKIE_EXPIRATION_MONTHS);
    var secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie =
      STORAGE_KEY + '=' + encodeURIComponent(value) +
      '; expires=' + expires.toUTCString() +
      '; path=/' +
      '; SameSite=Lax' +
      secure;
  }

  // Esconde o banner com animação de saída
  function hideBanner() {
    banner.classList.remove('is-visible');
    setTimeout(function () { banner.style.display = 'none'; }, 400);
  }

  // Exibe o banner com animação de entrada
  function showBanner() {
    banner.style.display = 'flex';
    requestAnimationFrame(function () { banner.classList.add('is-visible'); });
  }

  // Verifica se o usuário já fez uma escolha anteriormente
  // Se já aceitou, mantém o banner oculto. Caso contrário, exibe
  if (getConsent() === 'accepted') {
    banner.style.display = 'none';
  } else {
    showBanner();
  }

  // Quando o usuário clica em "Aceitar"
  acceptBtn.addEventListener('click', function () {
    setConsent('accepted');
    hideBanner();

    // No projeto (Webflow), atualiza o Google Consent Mode
    // liberando o rastreamento de analytics e anúncios:
    // gtag('consent', 'update', {
    //   'analytics_storage': 'granted',
    //   'ad_storage': 'granted',
    //   'ad_user_data': 'granted',
    //   'ad_personalization': 'granted'
    // });
  });

  // Quando o usuário clica em "Recusar"
  rejectBtn.addEventListener('click', function () {
    setConsent('rejected');
    hideBanner();

    // No projeto (Webflow), mantém o Google Consent Mode bloqueado:
    // gtag('consent', 'update', {
    //   'analytics_storage': 'denied',
    //   'ad_storage': 'denied',
    //   'ad_user_
   });

})();