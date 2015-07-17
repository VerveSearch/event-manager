describe("event emitter suite", function() {
	var EventManager,Util,Task,eee;
	beforeEach(function(){
		EventManager = vs.EventManager;
		Task = function(){
			EventManager.call(this,['TaskAdded']);
		};
		vs.inherits(Task,EventManager); 
		Task.prototype.go = function(){
			this.trigger('TaskAdded',eee);
		};
	});
	it("should throw error if event name is registered", function() {
		var p = new Task();
		expect(p.go).toBeDefined();
		expect(p.addEventListener).toBeDefined();
		spyOn(p,'addEventListener').and.callThrough();
		expect(p.addEventListener).toThrowError();
	});

	it("should callback all listeners for a given event", function() {
		var p = new Task(),t = {
			callback:function(e){
				console.log('hey');
			}
		};
			
		var spy = spyOn(t,'callback'); 
		p.addEventListener('TaskAdded',t.callback,t);
		p.addEventListener
		p.go(); 
		p.removeEventListener('TaskAdded',t.callback);
		t.callback.calls.reset();
		p.go();
		expect(t.callback).not.toHaveBeenCalled();
		
	});


	
});