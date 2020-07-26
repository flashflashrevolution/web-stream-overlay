const commands = {
	SONG_START(data, time) {
		ui.chartfile(data, time);
		ui.score(data);
		ui.show();
	},
	SONG_PAUSE(data, time) {
		ui.timer.pause(data.chartfile.paused + (Date.now() - time));
	},
	SONG_RESUME(data, time) {
		ui.timer.start(data.chartfile.start + (Date.now() - time), data.chartfile.length);
	},
	SONG_END() {
		ui.timer.stop();
		ui.hide();
	},
	SONG_RESTART(data, time) {
		ui.chartfile(data, time);
		ui.show();
	},
	NOTE_JUDGE(data, time) {
		ui.score(data);
	}
}