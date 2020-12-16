# Youtube Live Chat Overlay

Load chat comments from your YouTube Live video and select which ones to show in your live stream video, by using the canvas as a source to your stream.

## Prerequisites

There are a couple of things to take care of before you can use this solution.
First you need to get an API key from Google. You will need to do this only once. Use your Google account to sign in to http://console.developers.google.com. Once signed in, ‘Select a Project’ and name it whatever you want. From the ‘APIs and services’ page enable the '‘YouTube Data API v3’ from the search results. Create new credentials and iIf everything went well, you will get your unique API key. Do not share it with anyone. 

And second you need to create a live streaming. Go to YouTube And click Go Live. For the live chat to work it will have to either be unlisted or public. The rest of the settings can be whatever you want. Type in a few comments in the chat if you want to test it is working.

## Usage

Once installed, pick the “Dashboard” component and drag it in the canvas. Also pick the “List item” and the “Live Message” and drag them just outside the dashboard.

Connect the “Streamable” component to the “Live Message” and the “List item” to the “Chat” component. In the properties of the “Chat” component fill in the YouTube ID of your livestream. This can be found in the url of the livestream we started earlier. 

Eg. In this URL the ID is the XXXXXXXXXXX part: https://studio.youtube.com/video/XXXXXXXXXXX/livestreaming

Also fill in the API key that you obtained earlier. The third input determines the interval in milliseconds before the comment feed refreshes.

If you change the design of the “List item” you can change the Message height so that they appear correctly in the chat list.

Now we need to enable the overrides. Set the show code to always and create a new override file for the “List Item”. Select “ListItem” from the dropdown and proceed to bind the Frames “Clear”, “Streamabble” and “Live Message” to the corresponding override names. 

Run the preview with the Dashboard frame selected. There is a scrollable area that contains all the live comments. By clicking on one, it changes color, so that you know you have already shown it. The comment appears in the lower third which will be the streamable area. If you click on another comment it replaces the previous one. And if you want to hide the comment overlay, click on the corresponding button. 

## Using with a streaming app or hardware

Open the preview in a new chrome tab and cast it as a source. Crop the part above the streamable area. Choose to display it with chroma or luma key. Control it from the preview tab.