# Security

## CORS

对于 webview 来说 加上 `disablewebsecurity` 属性后即可忽略 CORS 检查.

对于 browserwindow 来说加上 `webpreferences.webSecurity = false` 属性后即可忽略 CORS 检查.

## SSL

使用 `app.commandLine.appendSwitch("--ignore-certificate-errors", "true")` 可以忽略 ssl 检查
