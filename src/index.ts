import { add } from './utils/add';

import { ScriptPlayer } from 'zep-script';

function openWidget(p: ScriptPlayer) {
  if (p.isMobile)
    //Set the widget's name, anchor position, width, and height.
    p.tag.widget = p.showWidget('widget.html', 'sidebar', 300, 550);
  else p.tag.widget = p.showWidget('widget.html', 'sidebar', 280, 520);

  //Send data to widget
  p.tag.widget.sendMessage({
    isMobile: p.isMobile,
  });

  //Register events for messages sent from widgets
  p.tag.widget.onMessage.Add(function (sender: any, msg: any) {
    switch (msg.type) {
      case 'close':
        if (p.tag.widget) {
          p.tag.widget.destroy();
          p.tag.widget = null;
        }

        break;
      case 'submit':
        break;
    }
  });
}

ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});

ScriptApp.onJoinPlayer.Add(function (p) {
  //Reset the player's tag value
  p.tag = {};
});

// Action when the player clicks the sidebar app
ScriptApp.onSidebarTouched.Add(function (p) {
  openWidget(p);
});
