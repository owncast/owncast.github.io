---
title: "Web string translations"
slug: /web-string-translations
displayed_sidebar: devSidebar
tags: ["development", "contributing"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/web-string-translations-jg5sTtQlWd"
---
> Please provide improvements and be patient with this document as we work through all the different use cases when it comes to localizing strings in the web UI.

## Overview

Because we support localization, adding text is a little more complicated than just typing it on the page. It's all a part of a maturing project. But once you do it a couple of times, you'll have it figured out.

We use the following tools to accomplish this, but you don't have to worry about most of them.

### Tooling

| Tool | Description |
| --- | --- |
| Owncast Translation Component | Custom component used for displaying translated strings. |
| [i18next](https://www.i18next.com/) | Used for parsing and exporting translatable strings from our source code. |
| [next-export-i18n](https://github.com/martinkr/next-export-i18n) | Used to handle localization for Next.js statically exported sites. |
| [Cowdin](https://crowdin.com/project/owncast) | Web service used for performing the actual translation of strings. Users can create accounts to assist in the translation process. |

There's two parts to understand when adding a new translated string:

1. The **key** referring to the string. Each of the languages will refer to this key when translating.
2. The **string** itself you want to display.

## Adding a new translatable key

The first thing you must do when creating a new translatable string is to assign it a key.

1. Open `localization.ts`
2. Find the existing section (known as a namespace) you want to add the new string to (`Admin → EditInstanceDetails`, for example).
3. If this section doesn't already exist, create it under `Frontend` or `Admin` respectively.
4. Create a new key with a reasonable name and value. For example: `helloWorld: 'Admin.EditInstanceDetails.HelloWorld'` for a new piece of text that says "Hello, world" in the Edit Instance Details section of the Admin.

## Use the Translation component

For most cases where you want to display a string in the web interface, you will be using the `Translation` component. You don't have to know how it's built or internally how it works. But simply how to use it. It's the easiest and fastest way to get things done.

### Basic use

**Example**: You want to display "Hello, world" on the page.

You created the above key, `Admin.EditInstanceDetails.helloWorld`, so we will be using that.

In the React component you wish to display a localized string, use the Translation component:

```javascript
<Translation
	translationKey={Localization.Admin.EditInstanceDetails.helloWorld}
	defaultText=\"Hello, world\"
/>
```

This will render the text of "Hello, world". However, once the translation process has taken place, instead of rendering the default "Hello, world" it will render the correct translated text instead.

### Using with HTML

You can add HTML and assign a CSS class to the final rendered string.

**Example**: You want to render

```html
<span class=\"hello-world\"><strong>Hello, world</strong></span>
```

```javascript
<Translation
	translationKey={Localization.Admin.EditInstanceDetails.helloWorld}
	defaultText=\"<strong>Hello, world</strong>\"
	className=\"hello-world\"
/>
```

### Using with Variables

It's very common to want to insert dynamic values into your string.

**Example**: You want to render

```html
Hello, world, Bob!
```

```javascript
<Translation
	translationKey={Localization.Admin.EditInstanceDetails.helloWorld}
	defaultText=\"Hello, world, {{name}}\"
	vars={{name: 'Bob'}}
/>
```

Make sure to use the double brackets. It will replace whatever you provided for the `name` var as the `name` variable in your string.

### Pluralization

Pluralization enables you to render different text depending on the count of something. Currently this component allows you to separate 1 thing vs. more than one. For example, "1 item" and "40 item**s**".

Assuming you have two keys created that look like the following:

```javascript
{
	helloWorld_one: 'Localization.Admin.EditInstanceDetails.helloWorld_one,
	helloWorld: 'Localization.Admin.EditInstanceDetails.helloWorld
}
```

Then you can create two localized strings with those keys that can look like:

`Hello world, 1 time!`

`Hello world, 42 times!`

By specifying the `translationKey` with `_one` it will use the special singular version of the string. Otherwise it will use the standard version that is probably pluralized.

```javascript
<Translation
	translationKey={Localization.Admin.EditInstanceDetails.helloWorld}
	count=42
	vars={{name: 'Bob'}}
/>
```

---

## Using without the Translation component

If you're doing something other than simply rendering a string on the page, you will use another technique.

For example, if you want to get a translated string and set it as a button title, text field contents, accessibility value, etc.

In this case you would fetch the string using the the `t(<key>)` function. This is done with the [next-export-i18n](https://github.com/martinkr/next-export-i18n#quick-start) library, requesting the same key as you created above.

- In the file you wish to enable for translation, add `import { useTranslation } from 'next-export-i18n';` on the top of the file with the other imports.
- Inside the component (`FC`), not outside the component, add the hook: `const { t } = useTranslation();`. It's likely you'll see other hooks setup there as well, such as `useEffect`.
- Fetch a string with the `t(<key>)` function.
- For example, to print the translated "Hello, World" (as long as it's in the language file) from above to the console:

```javascript
console.log(t(Localization.Admin.EditInstanceDetails.helloWorld))
```

### Variables, placeholders, and interpolation

```javascript
t(Localization.Admin.EditInstanceDetails.helloWorld, {name: 'Bob'});
```

This would result in the final translated string of:

`Hello, world, Bob!`,

## Adding a new language

1. Add the language in the Crowdlin web interface.
2. Let the translations job run so a PR is generated with a new JSON file with this new language.
3. Once the JSON file with the strings is generated for the language and exists in `web/i18n/xx/translation.json`, add its language code to the `AVAILABLE_LOCALES` list in `web/utils/localeLoader.ts`.

Only English ships inside the app bundle. Every other language is fetched on demand in the browser as its own small file, so adding a new language does not add any weight to the initial page load. The viewer’s language is picked automatically from their browser settings, or from an explicit `?lang=` parameter.

## How code gets converted to languages

If you read through the above you may have noticed that even though you added a new translatable string, no language files got updated, and it's not clear how translations actually get performed.

When you push your JavaScript code to GitHub a job runs that looks through all the code and finds new translatable strings. It then takes the `translationKey` you assigned it, and the `defaultText` you specified and adds it to the English language file. English is our default language. So when translators are ready, they'll see it in the English version and can translate it to another file.

You can manually run this string extraction process on your own machine by running `npm run translate`. In fact it's encouraged, as you'll have a more realistic environment because the string will actually be in the language file, not just falling back to the `defaultText`.

### Manually adding to the default language

You can also manually add to the default language by editing `web/i18n/en/translation.json`. Just make sure you use the same key you used in your Javascript and follow the patterns.

## For translators: Performing string translation to another language

- Click Crowdin link above or Sign up at https://translation.owncast.online/project/owncast/invite?h=b886c4cca564f57b8a4b797314ab6b751919224
- Choose the language you'd like to translate
- If the language isn't listed, let me know and I'll add it to the list
- Select `translations.json` as the source file
- Go through the list of strings and phrases on the left
- Auto-generated machine translated suggestions will show up on the bottom. If you're happy with one of them, click on it
- Hit "Save" once you're done with that single string translation and move on to the next

## Testing

Append `?lang=<languagecode>` to the end of a page URL to force the page to that URL. For example: `http://localhost:8080/admin?lang=nl` to view the initial admin page using in Dutch, or in English if they have been added for translation, but not yet translation.

Because non-English languages are fetched on demand, a freshly loaded page renders in English for a moment before switching to the requested language. On a local server this is usually imperceptible.

This doesn't doesn't work in Storybook.