(function () {
  'use strict';
  var key = 'integraflo.analyticsConsent.v1';
  var measurementId = 'G-GVZ0W075EJ';
  var started = false;
  var choice = null;
  try { choice = localStorage.getItem(key); } catch (error) { /* Choice remains session-only when storage is unavailable. */ }

  function clearAnalyticsCookies() {
    ['_ga', '_ga_' + measurementId.slice(2)].forEach(function (name) {
      document.cookie = name + '=; Max-Age=0; Path=/';
      document.cookie = name + '=; Max-Age=0; Path=/; Domain=' + location.hostname;
      if (location.hostname.slice(0, 4) === 'www.') {
        document.cookie = name + '=; Max-Age=0; Path=/; Domain=' + location.hostname.slice(4);
      }
    });
  }

  if (choice !== 'allow') clearAnalyticsCookies();

  function startAnalytics() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    var referrerOrigin = '';
    try { if (document.referrer) referrerOrigin = new URL(document.referrer).origin; } catch (error) { /* Ignore malformed referrers. */ }
    window.gtag('config', measurementId, {
      page_location: location.origin + location.pathname,
      page_referrer: referrerOrigin,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href^="mailto:"]');
      if (link) window.gtag('event', 'contact_click', { page_path: location.pathname });
    });
  }

  function saveChoice(value) {
    choice = value;
    try { localStorage.setItem(key, value); } catch (error) { /* Keep choice for this page only. */ }
    var banner = document.getElementById('analytics-banner');
    if (banner) banner.remove();
    if (value === 'allow') startAnalytics();
    else {
      if (started) window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      clearAnalyticsCookies();
      if (started) location.reload();
    }
  }

  function showChoices() {
    if (document.getElementById('analytics-banner')) return;
    var banner = document.createElement('aside');
    banner.id = 'analytics-banner';
    banner.className = 'analytics-banner';
    banner.setAttribute('aria-label', 'Analytics choices');
    var message = document.createElement('p');
    message.textContent = 'May we use Google Analytics to understand site visits and contact clicks? It loads only if you allow it. ';
    var privacy = document.createElement('a');
    privacy.href = 'privacy.html';
    privacy.textContent = 'Read our privacy notice';
    message.appendChild(privacy);
    banner.appendChild(message);
    var actions = document.createElement('div');
    actions.className = 'choices';
    [['Allow analytics', 'allow'], ['Decline', 'decline']].forEach(function (option) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = option[0];
      if (option[1] === 'decline') button.className = 'secondary';
      button.addEventListener('click', function () { saveChoice(option[1]); });
      actions.appendChild(button);
    });
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  if (choice === 'allow') startAnalytics();
  document.addEventListener('DOMContentLoaded', function () {
    var control = document.getElementById('privacy-choices');
    if (control) control.addEventListener('click', showChoices);
    if (choice !== 'allow' && choice !== 'decline') showChoices();
  });
}());
