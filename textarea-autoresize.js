/*
 * Textarea AutoSize plugin
 * Based on http://javierjulio.github.io/textarea-autosize/
 * Licensed under the MIT license
 *
 * The plugin will automatically take all textarea's with the class "textarea-auto-resize"
 * So just include the script at the bottom of your page, give the textarea that you want to resize the class "textarea-auto-resize" and profit
 *
 */

(function(window, document, undefined){

	var containsText = function (value) {
	   return (value.replace(/\s/g, '').length > 0);
	};

	function outerHeight(elem){
	    var curStyle = elem.currentStyle || window.getComputedStyle(elem);
	    var outerHeight = elem.offsetHeight;
	    	outerHeight += parseInt(curStyle.marginTop);
	    	outerHeight += parseInt(curStyle.marginBottom);

	    return outerHeight 
	}

	function getStyle(oElm, strCssRule){
	    var strValue = "";
	    if(document.defaultView && document.defaultView.getComputedStyle){
	        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	    }
	    else if(oElm.currentStyle){
	        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
	            return p1.toUpperCase();
	        });
	        strValue = oElm.currentStyle[strCssRule];
	    }
	    return strValue;
	}

	function Plugin(element) {
    	    this.element = element;
    	    this.init();
 	}

 	Plugin.prototype =  {
 		init: function () {
 			var height  = outerHeight(this.element),
		    	    diff    = parseInt(getStyle(this.element, "padding-bottom")) +
		                      parseInt(getStyle(this.element, "padding-top"));

		    if (this.element.scrollHeight + diff <= height) {
		       diff = 0;
		    }

		    if (containsText(this.element.value)) {
		       this.element.style.height(this.element.scrollHeight);
		    }

		    this.element.style.overflowY = 'hidden';
		    this.element.style.minHeight = height + diff + 'px'

		    this.element.onchange = setTextareaHeight;
		    this.element.onkeyup = setTextareaHeight;
		    this.element.oninput = setTextareaHeight;

		    function setTextareaHeight( event ) {
		    	var target = event.target || event.srcElement;
		    	target.style.height = 'auto';
		    	target.style.height =  target.scrollHeight + diff + 'px';
		    }
 		}
 	};

 	var getAllElements = document.querySelectorAll('.textarea-auto-resize');
 	for (var i = 0; i < getAllElements.length; i++) {
 		new Plugin(getAllElements[i]);
 	}

})(window, document);
