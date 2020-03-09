	var ffmpeg = require('ffmpeg');
	
	try {
		var process = new ffmpeg('input/SampleVideo_1280x720_1mb.mp4');
		process.then(function (video) {

			video.addCommand('-hide_banner -y')
			video.addCommand('-c:a', 'aac')
			video.addCommand('-c:v libx264 -profile:v main -crf 25 -b:a 64k -vf fps=fps=25')    //240 27   360  25
			video.setVideoAspectRatio('16:9').setVideoSize('?x240').setAudioQuality(128)
			video.addCommand('-g 150 -force_key_frames 3 -qmin 0 -qmax 50 -preset slow -segment_times 3 -segment_time_delta 0.1 -hls_playlist_type vod -hls_segment_filename input/240/240p_%03d.ts')
			video.save('input/240p.m3u8', function (error, file, outputBitrate) {
				if (!error)
					console.log('Video file: ' + file +' '+ outputBitrate);
				else
					console.log(error);
			});

		}, function (err) {
			console.log('Error: ' + err);
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}