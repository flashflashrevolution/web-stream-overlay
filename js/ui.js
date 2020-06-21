const ui = (() => {
	var main = document.getElementById("overlay");

	const score = (() => {
		var score = document.getElementById("score");
		var combo = document.getElementById("combo");
		var paAmazing = document.getElementById("pa-amazing");
		var paPerfect = document.getElementById("pa-perfect");
		var paGood = document.getElementById("pa-good");
		var paAverage = document.getElementById("pa-average");
		var paMiss = document.getElementById("pa-miss");
		var paBoo = document.getElementById("pa-boo");

		function format(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		return (data) => {
			score.innerText = format(data.score.score);
			combo.innerText = format(data.score.combo);
			paAmazing.innerText = format(data.score.amazing);
			paPerfect.innerText = format(data.score.perfect);
			paGood.innerText = format(data.score.good);
			paAverage.innerText = format(data.score.average);
			paMiss.innerText = format(data.score.miss);
			paBoo.innerText = format(data.score.boo);
		}
	})();

	const timer = (() => {
		const radius = 30;
		const circumference = radius * Math.PI * 2;

		var bar = document.getElementById("progress");
		var text = document.getElementById("progress-text");

		var active = false;

		var began;
		var duration;

		var display;

		function format(time) {
			var minutes = Math.floor(time / 60);
			var seconds = time % 60;

			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			return `${minutes}:${seconds}`;
		}

		function update(time) {
			time = time || Date.now();

			var delta = time - began;

			var progress = Math.floor(delta / 1000);
			var percentage = Math.min(delta / duration, 1);

			bar.setAttribute("style", `stroke-dashoffset: ${(1 - percentage) * circumference}px`);

			// Minor optimization
			if (progress != display) {
				display = progress;
				text.innerText = format(progress);
			}
		}

		function loop() {
			if (active) {
				update();
				requestAnimationFrame(loop);
			}
		}

		return {
			start(time, length) {
				active = true;
				
				began = time;
				duration = length;

				loop();
			},

			pause(time) {
				active = false;

				update(time);
			},

			stop() {
				active = false;
				began = undefined;
				duration = undefined;
			}
		}
	})();

	const chartfile = (() => {
		var title = document.getElementById("title");
		var style = document.getElementById("style");
		var artist = document.getElementById("artist");

		var difficulty = document.getElementById("difficulty");
		var nps = document.getElementById("nps");
		var rating = document.getElementById("rating");
		
		function format(number) {
			if (Number.isNaN(number)) {
				return "NaN";
			}

			if (Math.floor(number) !== number) {
				return number.toFixed(2);
			}

			return number.toString();
		}

		return (data, time) => {
			title.innerText = data.song.name;
			
			if(data.engine != null) {
				style.innerText = `[${data.engine.name}]`;
			} else {
				style.innerText = "";
			}
			
			if(data.song.stepauthor == null || data.song.stepauthor.length == 0) {
				artist.innerText = data.song.author;
			}
			else {
				artist.innerText = `${data.song.author} [${data.song.stepauthor}]`;
			}
			
			difficulty.innerText = data.song.difficulty;
			nps.innerText = `${format(data.song.nps_min | 0)} - ${format(data.song.nps_max | 0)} NPS`;
			rating.innerText = `${format(data.song.song_rating | 0)} Rating`;
			
			timer.start(Date.now(), (data.song.time_seconds * 1000));
		}
	})();

	return {
		hide() {
			main.classList.add("hidden");
		},

		show() {
			main.classList.remove("hidden");
		},

		score,
		timer,
		chartfile
	}
})();
