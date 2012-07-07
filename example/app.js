// Example of how to use to create an intent that was not possible with base Titanium sdk

// open a single window
var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

var improvedintent = require('com.electionsoft.improvedintent');
Ti.API.info("module is => " + improvedintent);

label.text = 'This view should launch an intent to create a new calendar event on newer android devices';

if (Ti.Platform.name == "android") {
	var intent = ii.createImprovedIntent({
		data : 'content://com.android.calendar/events',
		action : Ti.Android.ACTION_INSERT
	});
	var end = new Date();
	end.setHours(end.getHours() + 5);
	intent.putExtra('title', 'Awesome event');
	intent.putLongExtra('beginTime', new Date().getTime());
	intent.putLongExtra('endTime', end.getTime());
	intent.putExtra('allDay', false);
	intent.putExtra('eventLocation', '123 Street Rd.\nCity, ST 12345');
	intent.putExtra('description', 'Awesome event is awesome!');
	try {
		Ti.Android.currentActivity.startActivity(intent);
	} catch (e) {
		alert('Calendar not supported');
	}
}
