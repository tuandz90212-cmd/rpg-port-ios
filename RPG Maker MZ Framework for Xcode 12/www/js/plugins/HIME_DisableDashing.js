/*:
-------------------------------------------------------------------------
@title Disable Dashing
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 10, 2016
@filename HIME_DisableDashing.js
@url http://himeworks.com/2016/01/disable-dashing/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.0 - Allows you to disable dashing using events
@help 
-------------------------------------------------------------------------------
== Description ==

By default, you can press the shift button to dash.
Maps support the option to disable dashing when you're on that map.

However, there isn't a solution to disable dashing manually during the game,
for example during a cut-scene you want to prevent the player from dashing.

With this plugin you can use a simple command to disable or enable dashing for
the player.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Jan 10, 2016
 - initial release

== Usage ==

Use the following plugin commands

  enable_dashing
  disable_dashing
  
To enable or disable dashing.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_DisableDashing = 1;
TH.DisableDashing = TH.DisableDashing || {};

(function ($) {

  var TH_GameCharacter_initMembers = Game_Character.prototype.initMembers;
  Game_Character.prototype.initMembers = function() {
    TH_GameCharacter_initMembers.call(this);
    this._th_canDash = true;
  };

  Game_Character.prototype.setDashingEnabled = function(bool) {
    this._th_canDash = bool;
  }

  var TH_GamePlayer_updateDashing = Game_Player.prototype.updateDashing;
  Game_Player.prototype.updateDashing = function() {
    if (!this._th_canDash) {
      this._dashing = false;
      return;
    };
    TH_GamePlayer_updateDashing.call(this);
  };
  
  var TH_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    var cmd = command.toLowerCase();
    if (cmd === "disable_dashing") {
      $gamePlayer.setDashingEnabled(false)
    }
    else if (cmd === "enable_dashing") {
      $gamePlayer.setDashingEnabled(true)
    }
    else {
      TH_GameInterpreter_pluginCommand.call(this, command, args);
    }
  };


})(TH.DisableDashing);