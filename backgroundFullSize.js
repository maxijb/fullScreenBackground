(function( $ ){


var defaultOptions = {  proportional : true,  //respects image scale 
						fadeTime : 400,   //time to fade in after load
						autoPosition : true  //sets position fixed and top lef
					};
						

var methods = {
	
	init : function(ops) {
		
		
		var settings = $.extend({}, defaultOptions, ops || {}); //settiings
		var $$this = this;
		this.hide();
		
		$(window).resize(function() {
      			methods.resize.apply($$this);
    	});
		//auto position set it's fixed and top left. If you dont want this use autoPosition false
		if (settings.autoPosition) $$this.css({position:'fixed', left: 0, top: 0, margin: 0, padding: 0 });
		
		return this.each(function() {
			$(this).data('settings', settings);	
			var $this = $(this);
			
			
			var img = new Image();   //we are going to preload the image avoiding cache problems
			$(img).attr('src', $this.attr('src'));
			//once it is donde, we are going to resize method
			if (img.complete || img.readyState === 4) {
				// image is cached
				methods.resize.apply($this);
			} else {
				$(img).load(function() {
					// image was not cached, but done loading
					methods.resize.apply($this);
				});
			}
			
			
			
		});
		
	
},

		resize : function() {
			
			
			var settings = this.data('settings');
			
			return this.each(function() {
				  var $this = $(this);
				  var imgwidth = $this.width(),
					   imgheight = $this.height(),
					   winwidth = $(window).width(),
					   winheight = $(window).height(),
					   widthratio = winwidth / imgwidth,
					   heightratio = winheight / imgheight,
					   widthdiff = heightratio * imgwidth,
					   heightdiff = widthratio * imgheight;
				  
				
				if (settings.proportional) // respects the original scale
				  if(heightdiff>winheight) {
					$this.css({
					  width: winwidth+'px',
					  height: heightdiff+'px'
					});
				  } else {
					$this.css({
					  width: widthdiff+'px',
					  height: winheight+'px'
					});
				  }
				 else   //fills the screen without scaled proportion
				 	$this.css({
					  width: winwidth+'px',
					  height: winheight+'px'
					});
 			})
     		.fadeIn(settings.fadeTime);
		
		},
		
		

}; //methods


 $.fn.backgroundFullSize = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.bckgroundFullSize' );
    }    
  
  };


})( jQuery );