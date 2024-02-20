/** Snippet for the iframe. Initializes the inner Drift iframe and acts as a communcation layer for the parent page. */
window.drift=window.drift||function(){(drift.q=drift.q||[]).push(arguments)};

// rebroadcast drift widget API events to parent page
drift('on', 'iframeResize', function (data) {
  window.parent.postMessage({ type: 'driftIframeResize', data }, '*')
})

window.addEventListener('message', function (event) {
  if (event.source !== window.parent) {
    return
  }

  var message = event.data

  if (message && message.type === 'driftUpdateContext') {
    drift('setContext', message.data)
  }

  // set initial context, put widget in "iframeMode", load widget
  if (message && message.type === 'driftSetContext') {
    drift('setContext', message.data);
    drift('config', {
      iframeMode: true,
      iframeSandbox: 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms'
    })
    drift('page')
    drift('init','m9grgi63d3nh') // Your Drift embed ID goes in the second argument
  }

})

// indicate iframe is ready to receive context
window.parent.postMessage({ type: 'driftIframeReady' }, '*')