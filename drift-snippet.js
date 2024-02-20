/** Snippet for the parent page to properly resize the iframe and pass context */

// create dummy page context for analytics / targeting
// you can omit / clean data any sensitive data from these values
const generateNewContext = ()=>  {
  return {
    window: {
      location: {
        hash: window.location.hash,
        host: window.location.host,
        hostname: window.location.hostname,
        href: window.location.href,
        origin: window.location.origin,
        pathname: window.location.pathname,
        port: window.location.port,
        protocol: window.location.protocol,
        search: window.location.search
      },
      navigator: {
          language: window.navigator.language,
        browserLanguage: window.navigator.browserLanguage,
        userAgent: window.navigator.userAgent
      },
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth
    },
    document: {
      title: document.title,
      referrer: document.referrer
    }
  }
}

window.addEventListener("resize", () => {
  const iframe = document.getElementById('drift-iframe')
  iframe.contentWindow.postMessage({ type: 'driftUpdateContext', data: generateNewContext() }, '*')
})

window.addEventListener('scroll', (event) => {
  const iframe = document.getElementById('drift-iframe')
  iframe.contentWindow.postMessage({type: 'driftParentScroll', data:{scroll:true}, target:'drift.parentScroll'},'*')
})

window.addEventListener('message', function (event) {
  var iframe = document.getElementById('drift-iframe')
  if  (!(iframe && iframe.contentWindow) && event.source === iframe.contentWindow) {
    return
  }

  // on startup - pass created context into iframe
  var message = event.data
  if (message.type === 'driftIframeReady') {
    iframe.contentWindow.postMessage({ type: 'driftSetContext', data: generateNewContext() }, '*')
  }

  // on widget size change - apply new size / positioning to iframe
  if (message.type === 'driftIframeResize') {
    var styles = message.data.styles
    for (var key in styles) {
      if (!styles.hasOwnProperty(key)) {
        continue
      }
      iframe.style.setProperty(key,  styles[key])
    }
  }
})