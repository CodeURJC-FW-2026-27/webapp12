# ![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/gameline%20peque%C3%B1o.png) GAMELINE : _A web for browsing videogames_
## Project members


| NAME | EMAIL | GITHUB USER |
| ------------- | ------------- | ------------- |
| David González Pato | d.gonzalezp.2025@alumnos.urjc.es | paatiito |
| Leonardo Di Salvo Alonso | l.di.2025@alumnos.urjc.es | Leeo1405 |
| Asier Zapata Fernández-Gallardo |	a.zapata.2025@alumnos.urjc.es |	asierzzzz |
| Aitor Mouzo Navarro |	a.mouzo.2025@alumnos.urjc.es | Aiitoorr |

## App description
***Gameline*** will be an app aimed at all video game enthusiasts. It will offer a wide selection of the best titles from various companies, accompanied by reviews from the industry's most reliable analysts, allowing any player to determine whether a game is worth the investment. You will also be able to see data from each game featured on the website as the date of release and the gaming consoles it launched at.

## Functionality

### Entities
The main entities are going to be the videogames itselves:
| VIDEOGAME | TYPE |
| ------------- | ------------- |
|  `Name` | `String` |
|  `Cover` |`Image`|
| `Price`|`Integer`|
|  `Release date` |`String [DD/MM/YYYY]`|
| `Company` |`String`|
| `Genre` |`[Action (FPS/TPS Shooters, Platforming, Hack and Slash, Fighting, Beat 'em up, Battle Royale) Adventure (Graphic Adventure, Visual Novel, Walking Simulator, Survival Horror) Role-Playing / RPG (JRPG, ARPG, MMORPG, Tactical RPG, Roguelike, Roguelite) Strategy (RTS, TBS, MOBA, Tower Defense, Grand Strategy) Simulation (Life Sim, Vehicle Sim, Management & Construction, Sandbox) Sports & Driving (Sports Sim, Arcade Sports, Racing, Driving Sim) Puzzle & Rhythm (Logic, Riddles, Music Games, Card Games, Digital Board Games)] `|
| `Console` |`String`|

The secondary entities are going to be each game review, which can be uploaded by any user or game reviewer platform like IGN, OpenCritic...
| REVIEW | TYPE |
| ------------- | ------------- |
|  `Score` |`[1..100]`|
|  `Source` |`string`|
|  `Text` |`string`|
|  `Date` |`String [DD/MM/YYYY]`|

### IMAGES
- Each game must have a cover so it can be easily identified by every user.
- The reviews may or may not have an image related to the game.
- The web logo will also be a featured image.

### Extra features
- The web will feature a search engine to look for key words related to the games.
- It will also be possible to filter the games by price or release date.
These features will improve the user experience browsing in our web.

## PRÁCTICA 1
### Screenshots
#### About
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/about1.png "about 1")
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/about2.png "about 2")
#### Index
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/index1.png "index 1")
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/index2.png "index 2")
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/index3.png "index 3")
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/index4.png "index 4")
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/index5.png "index 5")
#### Details Page
![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/Screenshots/Sin%20t%C3%ADtulo.png "details")
###Participacion en la practica
#### Asier Zapata Fernández-Gallardo
- I chose the template, started the index page and helped create all of the other pages and have a common direction.
- The page i worked the most on is `index`, but i also helped in `about` and `new` inserting the header and the footer and helping formatting the pages.  
- My 5 more significative commits are:
  - [added template files for the project](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/62e73b39bd61b65f6a1f8596e73caaefeb47d690)   
  - [edited template to show 9 elements, changed header and footer, and divs dimensions](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/e2eaf5208984b22bd9c613be6677636a1616edd3)
  - [changed the template to have a new game button and linked all of the buttons to the about page](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/c5f61990c1ad4c8598ea3a7f416dcc44c4f256c4)
  - [Changed the header in about and in new to match index and also added a review and updated review system in new so the form to add a new review is on top of the reviews itselves](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/3a95b04636f2a6a1e0163cf18adef54db7128d1c)
  - [added header and footer to the new.html file, and added fonts to the head section of the html file](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/90115f7b264fe1ad8004960fa50387a77b554a87)

### Leonardo Di Salvo Alonso
- I worked primarily on the visual aspects of the page, helping to organize the interface and the presentation.
- The page i worked the most on is 'index'.
- [Added product details on index.html](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/9ab3abed3dc9c9836cfe723fda857efa0c17e6ac)
- [Added all images and game names](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/ac82d814a0f191307cf7955404a0aa327a17ee9c)
- [Changed some buttons and Cart](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/d9d3100744a55f5e01740ae8c8dfbcebc6dc2370)
- [Changed Sales Item's names](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/bb625da485d773ea646c35d91e0321dd69e8d0a3)
- [Removed On Sale badge from the card in index.html](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/576591fcafcae2949edc62c926215465194642c6)

   - ### David González Pato
- I started the page for creating a new item (`New`) and helped finish the remaining pages.
- The page I worked on the most was `New`, but I also collaborated on the `about` and `new` pages by adding various buttons that reference game genres.
- My 5 more significative commits are:
  - [Add the different category types.](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/82f592822b193a152a49cf4b4e7344b921cbe48f)
  - [Creation of fields for adding a new game](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/9f5c9102704b9fe96ea70a51319847ba28e28035)
  - [Add the Save and Cancel buttons, where the Cancel button redirects to the main page when clicked.](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/1b4e2b1a08b908522f93e2ba971867b667da2c61)
  - [Removal of duplicate buttons](https://github.com/CodeURJC-FW-2026-27/webapp12/commit/a5dcc433520c1e3b04e8912b45716b3d6f8d8616)
    
