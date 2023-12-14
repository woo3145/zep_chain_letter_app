import { add } from './utils/add';

import { ScriptPlayer } from 'zep-script';
import { WebSocket } from 'ws';

function openWidget(p: ScriptPlayer) {
  if (p.isMobile)
    p.tag.widget = p.showWidget('widget.html', 'sidebar', 300, 550);
  else p.tag.widget = p.showWidget('widget.html', 'sidebar', 280, 520);

  p.tag.widget.sendMessage({
    isMobile: p.isMobile,
  });

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

      // 메세지 전달 시 ScriptApp.httpPost 요청
    }
  });
}

// 웹소켓 연결
// 유저 입장 시 : spaceId와 userId를 nest에 등록
// 메세지 수신 시 위젯 오픈
// 위젯에서 메세지 전달 -> ZepApp 수신 -> apiKey, letter, userId, spaceId 서버에 전송
// nest에서
//
//
let ws: null | WebSocket = null;

// 소켓 등록
// ScriptApp.onInit.Add(function () {
//   ws = new WebSocket('ws://localhost:8001');
// });

ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});

ScriptApp.onJoinPlayer.Add(function (p) {
  p.tag = {};

  openWidget(p);
});

// Action when the player clicks the sidebar app
ScriptApp.onSidebarTouched.Add(function (p) {
  openWidget(p);
});

ScriptApp.addOnKeyDown(81, function (player) {
  ScriptApp.httpGet(
    process.env.API_URL || 'localhost:3000',
    {
      apiKey: process.env.API_KEY,
    },
    (res) => {
      let response = res; // hello world
      player.name = response;
      player.sendUpdated();
    }
  );
});
