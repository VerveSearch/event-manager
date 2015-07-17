# vs.EventManager

A JavaScript object-oriented class implementing the observer pattern. The class is intended for extension through prototypal inheritance. 

## Usage 

```javascript

	var Game = function(){
		vs.EventManager.call(this,['GameStarted','TimerTick']); 
	}; 
	vs.inherits(Game,vs.EventManager);
	var _g = Game.prototype;
	_g.start = function(){
		//do some magic here
		//then trigger the 'GameStarted' event 
		this.trigger('GameStarted',{}); 
		//note that this method is defined in the EventManager class. 
	};

	var gameInstance = new Game();  

	var OtherObject = function(){
		gameInstance.addEventListener('GameStarted',this.onGameStarted,this); 
	};

	OtherObject.prototype = {
		//this method will be called when the "GameStarted" event is triggered. 
		onGameStarted:function(){

		}
	}; 

```

