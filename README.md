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

  1. Navigate to your `jellyfin-web` folder and search for the file index.html. (You can use any code editor — just remember to open it with administrator privileges.)
  2. Search for `</head>`
  3. Just before the `</head>`, plug the below code

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400..700;1,400..700&family=IBM+Plex+Mono:wght@400;600&display=swap"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@6.0.0/slideshowpure.css" />
    <script defer src="https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@6.0.0/slideshowpure.js"></script>
```
</details>

<details>

<summary>Upgrading from v5</summary>

Replace your two old lines with the block above. Three things are different:

- **Fonts.** v6 sets its type in **Archivo Narrow** and **IBM Plex Mono**. The bar still works without the font links — it falls back to Noto Sans and your system monospace — but it will not look the way it is meant to.
- **`async` → `defer`.** `defer` waits for the page to finish parsing and keeps script order predictable; `async` fires whenever the download happens to land.
- **`@latest` → `@6.0.0`.** A pinned version cannot change under you when a new release goes out. Use `@6` instead if you would rather pick up 6.x updates automatically.

</details>

And that is it. Hard refresh your web page (CTRL+Shift+R) twice, and Profit!

# Want a Custom List to be showcased instead of random items??

No worries this got you covered. 

## Steps

1. Create a `list.txt` file inside your `avatars` folder.
2. In line 1 give your list a name.
3. Starting line 2, paste the item IDs you want to be showcased, one ID per line. For Example :

```
Awesome Playlist Name
ItemID1
ItemID2
ItemID3
ItemID4
ItemID5
```
The next time it loads, it will display these items.

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
