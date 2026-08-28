# Jellyfin-Media-Bar - Now with Play Now Function

![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/makd/Jellyfin-Media-Bar?style=for-the-badge&logo=javascript&logoColor=white&labelColor=F0DB4F&color=323330&cacheSeconds=3600)



**IMP UPDATE — We have dropped support for the normal CSS version (for now). _(It still works, but there will be no further updates till the fullscreen mode is stabilized)_** 

The fullscreen version has a new look (in beta), and support for different screen sizes has been added. For any visual goof-ups, please open a bug report, including the device being used and whether it is encountered in portrait or landscape mode.


Thanks to the Man, the Legend [BobHasNoSoul](https://github.com/BobHasNoSoul) for his work on the [jellyfinfeatured](https://github.com/BobHasNoSoul/jellyfin-featured) and [SethBacon](https://forum.jellyfin.org/u-sethbacon) and [TedHinklater](https://github.com/tedhinklater) for their take on the [Jellyfin-Featured-Content-Bar](https://github.com/tedhinklater/Jellyfin-Featured-Content-Bar). 

Here I present my version with some code improvements, loading optimizations, and security enhancements. Works best with the [Zombie theme](https://github.com/MakD/zombie-release) (_Shameless Plug_ `@import url(https://cdn.jsdelivr.net/gh/MakD/zombie-release@latest/zombie_revived.css);`, visit the repo for more color schemes).


> <ins>**Before Installing, please take a backup of your index.html file**<ins>

<details>
<summary> Desktop Layout </summary>
  
![Jellyfin Desktop Layout](https://raw.githubusercontent.com/MakD/Jellyfin-Media-Bar/refs/heads/main/img/Jelly-Web%20-%20Fullscreen%20Mode.png)
  
</details>

<details>

<summary> Mobile Layout </summary>
  
![Jellyfin Mobile Layout](https://raw.githubusercontent.com/MakD/Jellyfin-Media-Bar/refs/heads/main/img/Jelly-Mobile-Fullscreen.png)

</details>


# Prepping the files
<details>
  
<summary>index.html</summary>

  1. Navigate to your `jellyfin-web` folder and search for the file index.html. (You can use any code editor, just remember to open it with administrator privileges.)
  2. Search for `</head>`
  3. Just before the `</head>`, plug the below code

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400..700;1,400..700&family=IBM+Plex+Mono:wght@400;600&display=swap"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@6/slideshowpure.css" />
    <script defer src="https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@6/slideshowpure.js"></script>
```
</details>

<details>

<summary>Upgrading from v5</summary>

Swap your two old lines for the block above. Three things changed:

- **Fonts.** v6 uses Archivo Narrow and IBM Plex Mono. It still runs without the font links, it just falls back to Noto Sans and whatever your system uses for monospace, and it will not look right.
- **`async` became `defer`.** `defer` waits for the page to finish parsing and runs scripts in order. `async` fires whenever the download happens to land, which is less predictable.
- **`@latest` became `@6`.** `@latest` follows the newest tag, so a future v7 would land on your server without warning. `@6` keeps you on the 6.x line and still picks up fixes. If you want it frozen, pin an exact version like `@6.1.0`.

</details>

And that is it. Hard refresh your web page (CTRL+Shift+R) twice, and Profit!

# Want a Custom List to be showcased instead of random items??

No worries this got you covered. 

## Steps

1. Create a `list.txt` file inside your `avatars` folder.
2. Paste the item IDs you want to be showcased, one ID per line.
3. If you want to give the list a name, put a `#` in front of it so the bar skips that line.

```
# Awesome Playlist Name
ItemID1
ItemID2
ItemID3
ItemID4
ItemID5
```
The next time it loads, it will display these items.

## Filters

Pasting IDs works, but the list goes stale the moment you add something new to your library. If you would rather it kept itself up to date, use a filter line instead of an ID:

```
# Christmas
tag:Christmas
genre:Family
```

Whatever matches gets pulled in when the page loads, so you set it up once and leave it alone. Handy for seasonal stuff you would otherwise have to rebuild every year.

Keys you can use:

| Key | Matches on |
| --- | --- |
| `genre:` | Genre |
| `tag:` | Tag |
| `studio:` | Studio |
| `year:` | Release year |
| `person:` | Anyone in the cast or crew |
| `rating:` | Official rating, so PG-13, TV-MA and friends |

A few things worth knowing:

- Commas mean "or". `genre:Action, Comedy` gets you both.
- Every line is its own filter and the results get added together. Two lines will not narrow each other down, so there is no way to ask for action films that are also from 2024.
- Feel free to mix filter lines and item IDs in the same file.
- Watch your spelling. If the bar does not recognise a line it skips it and tells you why in the browser console (F12), along with the keys it was expecting.
- If nothing at all matches, you get the usual random items rather than an empty bar.

# Settings

Click the gear on the bar and pick what you want. Whatever you choose is saved in your own browser, so everyone on the server can set it up how they like without stepping on each other. Nothing to install and no files to edit.

Running the server and want to set the defaults for everybody, or stop people changing something? You can do that from `index.html`.

<details>

<summary> Server-wide defaults </summary>

Drop this in above the script tag you added earlier:

```html
<script>
  window.SlideshowConfig = {
    libraries: ["Movies", "4K Movies"],
    trailerLibraries: ["4K Movies"],
    lock: ["libraries"],
  };
</script>
```

It has to sit before the `<script defer ...>` line. Put it after and the bar has already started by the time it runs.

- `libraries` limits which libraries the bar pulls from. Use the names exactly as they show up in your sidebar. Leave it out and it uses all of them.
- `trailerLibraries` decides which of those are allowed to autoplay a trailer. Everything else gets a still backdrop. Useful if you want trailers on films but not on the kids library.
- `lock` greys those settings out in the gear panel so nobody can change them. Drop it if you only meant to set a starting point.

Any setting works in here, not just these three. Get a library name wrong and the console will tell you, listing the names it actually found, which is usually enough to spot the typo.

</details>

# Uninstall the Bar

<details>
  
<summary> Roll Back </summary>

Restore the `index.html` file / remove the lines added and you are good to go!!!

</details>


## License

[![Custom: DBAD License](https://img.shields.io/badge/License-Don't_Be_A_Dick-red)](LICENSE)


This project is licensed under a DBAD license prohibiting any commercial use or redistribution.  
All modifications must be contributed back to this repository.  
Attribution to the original author (MakD) is required in any use or derivative work.

Please take a look at the [LICENSE](LICENSE) file for full terms.
