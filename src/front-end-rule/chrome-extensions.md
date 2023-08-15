# chrome-extensions

## 配置文件

```json
{
  "name": "扩展程序名",
  "version": "1.0",
  "manifest_version": 3,
  "description": "描述",
  "icons": {
    "32": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "permissions": ["activeTab", "scripting", "tabs"],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["content.js"]
    }
  ]
}
```
