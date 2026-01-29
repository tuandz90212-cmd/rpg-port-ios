//=============================================================================
// MessageHide.js                                                            
//=============================================================================
 
/*:
@plugindesc v1.1.0 Define a key the player can press to toggle whether the message window is shown.
@author Jatopian

@param key
@desc Key that toggles message window visibility when pressed. See help for list.
@default ctrl

@param show on new page
@desc Whether the message window automatically becomes visible on a new page of dialogue. true / false
@default false

@help
Message window visibility is reset by pressing the key again,
or resetting the game.
Game events can also make it happen with plugin command: ShowMessageWindow
With "show on new page" param true,
visibility is reset for each new message window page.

"key" parameter takes values:
a-z
0-9
tab
enter
shift
ctrl
alt
space
semicolon
comma
period
quote
And also gamepad-compatible values:
ok       //      A
cancel   //      B
shift    //      X
menu     //      Y
pageup   //      LB
pagedown //      RB
up       //      D-pad up
down     //      D-pad down
left     //      D-pad left
right    //      D-pad right

Terms of Use:
- Free for commercial and non-commercial use.
- Please give credit in a trivially accessible place.
- OK to modify, but if you redistribute the modified version,
  please make clear that you modified it, and how.
- If you add features that could be useful to others,
  please at least consider sharing them with me and the community.

Changelog:
1.1.0:
Show/hide now persists between maps and when bringing up the menu.
"show on new page" feature.
*/

(function() {
  var params = PluginManager.parameters("MessageHide");
  var pKey = String(params["key"]).toLowerCase();
  var pNewPage = (function() { 
    var p = String(params["show on new page"]).toLowerCase();
    if (p.match(/true/i)) {
      return true;
    } else if (p.match(/false/i)) {
      return false;
    } else {
      return Utils.isNwjs();
    }
  })();
 
  var key_ids = {
    "tab":9,"enter":13,"shift":16,"ctrl":17,"alt":18,"space":32,
    "0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,
    "a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,
    "n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90,
    "semicolon":186,"comma":188,"period":190,"quote":222,
  };
 
  Input.keyMapper[key_ids[pKey]] = "messageHide";
 
  //global variables!
  MessageHide_messageWindowShowNext = false;
  MessageHide_messageWindowVisible = true; //global to persist between maps
 
  //=============================================================================
  // Window Message
  //=============================================================================
 
  var alias_wm_ud = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    alias_wm_ud.call(this);
    if (MessageHide_messageWindowShowNext === true) {
      MessageHide_messageWindowVisible = true;
      MessageHide_messageWindowShowNext = false;
    } else if (Input.isTriggered("messageHide") === true) {
      MessageHide_messageWindowVisible = !MessageHide_messageWindowVisible;
    }
    this.visible = MessageHide_messageWindowVisible;
  }
 
  var alias_wm_np = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function(textState) {
    alias_wm_np.call(this, textState);
    if (pNewPage) MessageHide_messageWindowVisible = true;
  }
 
  //=============================================================================
  // Game Interpreter
  //=============================================================================
 
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === "ShowMessageWindow") {
        MessageHide_messageWindowShowNext = true;
      }
  }
 
})();