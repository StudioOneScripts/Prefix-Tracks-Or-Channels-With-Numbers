function userFunction()
{
	this.interfaces =  [Host.Interfaces.IEditTask]

	this.prepareEdit = function (context)
	{
		var parameters = context.parameters;
		this.target = parameters.addString("Target")

		return Host.Results.kResultOk;
	}

	this.performEdit = function (context)
	{
		// ---------- TRACKS -----------------------------------------

		if (this.target.string.toLowerCase().trim() == "tracks")
		{
			let trackList = context.mainTrackList
			let functions = context.functions

			for(i=0;i < trackList.numTracks; i++)
			{
				var track = trackList.getTrack(i)
				var num = (i+1).toString().padStart(3, '0')
				functions.renameEvent(track, num + "-" + track.name)
			}
		}

		// -- CHANNELS: THIS DOES NOT GO INTO UNDO SYSTEM FOR SOME REASON? ---

		if (this.target.string.toLowerCase().trim() == "channels" || this.target.string.trim() == "")
		{
			var environment = context.functions.root.environment;
			var console = environment.find ("MixerConsole");
			var channelList = console.getChannelList(1);

			for(i=0;i < channelList.numChannels; i++)
			{
				var channel = channelList.getChannel(i)
				var num = (i+1).toString().padStart(3, '0')
				channel.label = (num + "-" + channel.label)
			}
		}

		return Host.Results.kResultOk;
	}
}

// ---------------------------------------------------------------------
function createInstance()
{
	return new userFunction();
}



