(function($W,$D){
	function inherits(childCtor,parentCtor){
		function tempCtor() { }
		tempCtor.prototype = parentCtor.prototype;
		childCtor.prototype = new tempCtor();
		childCtor.prototype.constructor = childCtor.constructor;
	}

	function proxy(fn,ctx){
		var c = ctx || this,
			args = Array.prototype.slice.call(arguments,2); 
		return function(){
			var a = Array.prototype.slice.call(arguments,0); 
			fn.apply(ctx,args.concat(a)); 
		};
	}

	/**
	 * @name vs.EventManager
	 * @constructor
	 * @param {Array<string>} events the events to listen to. 
	 */
	var EventManager = function(events){
		/**
		 * @name events
		 * @propertyOf vs.EventManager 
		 * @type {Array<String>} 
		 * @description the events to listen to. 
		 */
		this.events = events || [];
		/**
		 * @name listeners 
		 * @propertyOf vs.EventManager
		 * @type {object}
		 * @description the listeners registered with the manager 
		 */
		this.listeners = {};
	};

	EventManager.prototype = {
		/**
		 * @name vs.EventManager#addEventListener
		 * @methodOf vs.EventManager
		 * @param {string} evtName the event name (or type)
		 * @param {function} listener the listener function to call when the event is triggered. 
		 * @param {object} [ctx] the object on which the listener should be called. 
		 * @description 
		 * Add an event listener to a given event type. 
		 */
		addEventListener:function(evtName,listener,ctx){
			if (this.events.indexOf(evtName) === -1){
				throw new Error('The object does not support the event "'+evtName+'".');
			}
			this.listeners = this.listeners || {};
			this.listeners[evtName] = this.listeners[evtName] || [];
			var fn = ctx?proxy(listener,ctx):listener;
			fn.fn = listener;
			this.listeners[evtName].push(fn);
		},

		/**
		 * @name vs.EventManager#removeEventListener
		 * @methodOf vs.EventManager
		 * @param {string} evtName the event name (or type)
		 * @param {function} listener the listener function to to remove. 
		 * @description 
		 * Removes an event listener from a given event.  
		 */
		removeEventListener:function(evtName,listener){
			if (!this.listeners[evtName]){
				throw new Error("Event '"+evtName+"' is not registered.");
			}
			var i=0,list=this.listeners[evtName],l=list.length,idx =-1;
			for(;i<l;i++){
				if (list[i].fn === listener){
					idx = i;
					break;
				}
			}
			if (i !== -1){
				this.listeners[evtName].splice(i,1);
			}
		},

		/**
		 * @name vs.EventManager#trigger
		 * @methodOf vs.EventManager
		 * @param {string} evtName the event name (or type) of the triggered event
		 * @param {object} e the event object to pass to the listeners
		 * @description
		 * Triggers a given event by calling all event listeners. 
		 */
		trigger:function(evtName,e){
			if (this.listeners[evtName]){
				var list = this.listeners[evtName],i,l;
				for(i=0,l=list.length;i<l;i++){
					list[i](e);
				}
			}
		},
		/**
		 * @name vs.EventManager#on 
		 * @methodOf vs.EventManager
		 * @param {string} evtName the event name or type to listen to.
		 * @param {function} fn the function to call. 
		 * @param {object} [ctx] the context on which the function should be called. 
		 * @description 
		 * Registers a listener 
		 */ 
		on:function(evt,fn,ctx){
			return this.addEventListener(evt,fn,ctx);
		}
	};

	$W.vs = $W.vs || {};
	$W.vs.inherits = $W.vs.inherits || inherits;
	$W.vs.proxy = $W.vs.proxy || proxy;
	$W.vs.EventManager = EventManager; 
})(window,document);