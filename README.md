# ![alt text](https://github.com/CodeURJC-FW-2026-27/webapp12/blob/main/IMAGES/gameline%20peque%C3%B1o.png) GAMELINE : _A web for browsing videogames_
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
