# rCubed Web Overlay

A web-based overlay for FFR rCubed, based on: https://github.com/Reselim/beat-saber-overlay

![preview](/images/preview.png?raw=true)

## Installation (OBS)

1. Enable HTTP Websocket Server in rCubed in the options under [Other Options].

![rcubed_websocket](/images/rcubed_websocket.png?raw=true)

2. Create a Browser source

![browser_source](/images/browser_source.png?raw=true)

3. Set the URL as `http://flashflashrevolution.github.io/web-stream-overlay/` (HTTP, not HTTPS!) and the size equal to your canvas size (1280x720, etc.)

![browser_url](/images/browser_url.png?raw=true)

4. (Optional) For 1080p canvases, add the `scale` modifier (ex. `http://flashflashrevolution.github.io/web-stream-overlay/?modifiers=scale`) to scale the overlay by 1.5x

## Options

Options are added to the URL query as such:

```
http://flashflashrevolution.github.io/web-stream-overlay/?modifiers=top
```

### `ip` and `port`

Listen to events from another IP and/or port.

### `modifiers`

Multiple modifiers can be seperated with commas.

- `top`
	* Moves the overlay to the top and reverses the layout vertically
- `rtl`
	* Moves the overlay to the right and uses right-to-left text
- `scale`
	* Scales the overlay by 1.5x, for use on 1080p canvases
- `test`
	* Makes the background black, for testing purposes

---

# Example Websocket Response
### response.command:
 - SONG_START
 - SONG_PAUSE
 - SONG_RESUME
 - SONG_END
 - SONG_RESTART
 - NOTE_JUDGE

### response.data
#### player
	{
	  "userid": 0,
	  "name": "Username",
	  "avatar": "http://www.flashflashrevolution.com/avatar_imgembedded.php?uid=0",
	  "game_grand_total": 0,
	  "game_played": 0,
	  "game_rank": 2027506,
	  "skill_level": 0,
	  "skill_rating": 0
	},
#### song
	{
	  "genre": 1,
	  "level": 328,
	  "name": "Free Space (FFR Edit)",
	  "author": "Antinomie",
	  "stepauthor": "Tasselfoot",
	  "style": "Trance",
	  "difficulty": 1,
	  "note_count": 59,
	  "time": "1:09",
	  "time_seconds": 69,
	  "credits": -1,
	  "release_date": 1182401028,
	  "nps_min": 1,
	  "nps_max": 3,
	  "song_rating": 4.15
	},
	
#### score
	{
	  "best_score": {
	    "genre": 1,
	    "rank": 226618,
	    "rawscore": 0,
	    "perfect": 0,
	    "good": 0,
	    "average": 0,
	    "miss": 0,
	    "boo": 0,
	    "score": 0,
	    "maxcombo": 0,
	    "results": "0-0-0-0-0-0"
	  },
	  "amazing": 0,
	  "perfect": 0,
	  "good": 0,
	  "average": 0,
	  "miss": 0,
	  "boo": 0,
	  "score": 0,
	  "combo": 0,
	  "maxcombo": 0,
	  "restarts": 0,
	  "last_hit": null
	}
#### engine
	{
	  "domain": "prawnskunk.com",
	  "config": "http://prawnskunk.com/ffrmania/r3.xml",
	  "id": "ffrmania",
	  "name": "FFRMania Engine"
	}
