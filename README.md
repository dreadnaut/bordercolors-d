# BorderColors D

If you have Thundebird configured with multiple accounts or identities, you
might have sent emails from the wrong one once or twice. This add-on tries to
prevent that mistake by adding a colorful border around the "New message"
window.

You can configure each identity to have a different color, and choose among a
number of border styles: partial borders, gradients, etc.

Add-ons like [Identity Chooser][ic] can re-use the configured colors for other
functionality, helping you identify the correct account.

  [ic]: https://addons.thunderbird.net/en-US/thunderbird/addon/identity-chooser/

This add-on builds on [BorderColors][bc] and [BorderColors-GT][bc-gt].

  [bc]: https://addons.thunderbird.net/thunderbird/addon/bordercolors/
  [bc-gt]: https://addons.thunderbird.net/thunderbird/addon/bordercolors-gt/


## How to install

Head over to [addons.thunderbird.net][bc-d] to find the current version.
Development releases might be available earlier in the [Releases] section.

Remember to uninstall other BorderColors add-ons if you are using this version!

  [bc-d]: https://addons.thunderbird.net/thunderbird/addon/bordercolors-d/
  [releases]: https://github.com/dreadnaut/bordercolors-d/releases


## Extension developers

This add-on exposes a minimal API to other Thunderbird add-ons, based on 
[`runtime.onExternalMessage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessageExternal).

At the moment, there is only one operation available. Open an issue if you have
any suggestions!

### Identity colors

You can query the colors configured for each identity using the `colors.all`
message:

```js
await messenger.runtime.sendMessage(
    'bordercolors-d@addonsdev.mozilla.org',
    { command: 'colors.all' }
);
```

```
Object { id1: "#fcb1ca", id2: "#f2ccbb", id3: "#0c35dc", id6: "#00ff00", id4: "#ff0000" }
```
