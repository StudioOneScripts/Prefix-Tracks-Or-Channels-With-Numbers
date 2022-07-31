// include_file("resource://{main}/sdk/cclapp.js");
const kPackageID="prefix.tracks";

function userFunction()
{
	this.interfaces =  [Host.Interfaces.IEditTask]

	this.prepareEdit = function (context)
	{
		return Host.Results.kResultOk;
	}

	// -----------------------------------------------------------------

	this.performEdit = function (context)
	{
		let trackList = context.mainTrackList
		let functions = context.functions

		for(i=0;i < trackList.numTracks; i++)
		{
			var track = trackList.getTrack(i)
			var index = (i+1)

			if (index.toString().length == 1)
				index = ("00" + index)

			if (index.toString().length == 2)
				index = ("0" + index)

			functions.renameEvent(track, index + "-" + track.name)
		}

		return Host.Results.kResultOk;
	}

}

// ---------------------------------------------------------------------

// entry function
function createInstance()
{
	return new userFunction();
}

// ---------------------------------------------------------------------

// messaging shortcuts
function print  (msg) { Host.Console.writeLine(msg.toString()) }
function alert  (msg) { Host.GUI.alert(msg.toString()) }

// parse object properties
function getAllPropertyNames(obj)
{
	var props = [];
	do
	{
		props = props.concat(Object.getOwnPropertyNames(obj));
	} while (obj = Object.getPrototypeOf(obj));
	for (i in props)
		print(props[i])
}
