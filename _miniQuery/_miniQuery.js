/*doc
---
title: miniQuery 0.9
name: miniQuery
category: Utils miniQuery
---

miniQuery is a lightweight library with jQuery-like semantics.

It's not intended to replace jQuery but to allow you to use the easy and well known jQuery semantics with a small code footprint as miniQuery weights only 1,5KB gziped.

Code written with miniQuery should be enterily compatible and transferable to any jQuery project but be advised, this may no be the same the other way around and jQuery plugins still need jQuery to work.

You can start a project with miniQuery and change it to jQuery on the fly should you need to use a jQuery third party plugin.

*Inspired by youmightnotneedjquery.com*

# Browser support

- Any modern browser
- IE > 9

## Why the underscore and why is this inside the js file?

miniQuery is a core part of baseCore, a modular, easy to upgrade and high performance HTML framework, in baseCore the undescore means it's not made to be loaded directly but it's to be included trough baseCore's gulp build proccess. You can check baseCore [here](https://github.com/dragoonDorise/baseCore).

You can use miniQuery in any project, don't mind the underscore!

About the documentation, baseCore is intended to be used with [Hologram](https://trulia.github.io/hologram/) to create your online stylesheets so miniQuery also follows baseCore name convention.

## Implemented functions & usage

The usage of miniQuery functions is the same as their jQuery counterpart with some omissions, some functions than can be done better with vanilla javascript or CSS are not implemented. i.e: .animate(), .show('100'), etc.

```js_example
$('selector').function('action');
```

### Functions

.hide()

.show()

.addClass('className')

.removeClass('className')

.next('selector')

.nextall('selector')

.attr('attrName') .attr('attrName','value') 

.remove('selector')

.removeAttr('attrName')

.hasClass('className')

.height(), .height('value')

.width(), .width('value')

.append()

.appendTo()

.html(), .html('html')

.prepend('html')

.prependTo('selector')

.text(), .text('text')

.after()

.before()

.is('filter')

.children(), .children('selector') 

.closest('selector')

.find()

.parent()

.prev()

.prevAll()

.css('property','value')

.on('event',function(){ Your code })

.on('off',function(){ Your code })

.resize()

.scroll()

.trigger('event')

.change(), .change(function(){ Your code })

.focus(), .focus(function(){ Your code })

.submit(), .focus(function(){ Your code })

.keydown(function(){ Your code })

.keypress(function(){ Your code })

.keyup(function(){ Your code })

.toggleClass('className')

.hover(function(){ Your code })

.click(function(){ Your code })

.siblings()


###  Functions yet to be implemented

.clone()

.wrap()
 
.offset()

.position()

.each()

.ajax()

.post()

*/ 

(function () {

	//We use $ to make it jQuery compatible
	var $ = function(data) {
		
		if(typeof data === 'function'){
			document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", data);
		}else{
			return new MiniQuery(data); // Object
		}
	};

	//Creating selector
    var MiniQuery = function (data) {
        
        if ( typeof(data) === 'object' ){

			this.length = 1;
			this[0] = data

	        //Return object
	        return this;        
	      
	    }else if ( typeof(data) === 'string' ){
	        	        
	        var selector = document.querySelectorAll(data);  //Nodelist 		   
	        var    i = 0;

	        this.length = selector.length;	         

			//Converting nodelist to object this
	        for (; i < this.length; i++) {
	            this[i] = selector[i];
	        }

	       //Return object
	        return this;        
		        
        }
        
    };
    
    
    // We extend the object with the usual jQuery functions
    $.fn = MiniQuery.prototype = 
    {
	    
		//.hide()
        hide: function () {
            var len = this.length; // How mane elements do we have?
            while (len--) { // We go trough the Array
                this[len].style.display = 'none';
            }

            // We return the object so we can chain functions
            return this;
        },
 
        //.show()
        show: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'block';
            }
            return this;
        },   
        
        //.addClass
        addClass: function (className) {
            var len = this.length;
            while (len--) {
                el = this[len];
				if (el.classList){
				  el.classList.add(className);
				}else{
				  el.className += ' ' + className;                
                }
            }
            return this;
        },
        
        //.removeClass
        removeClass: function (className) {
            var len = this.length;
            while (len--) {
                el = this[len];
				if (el.classList)
				  el.classList.remove(className);
				else
				  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');                
            }
            return this;
        },
		        
		//.next
        next: function () {
            var len = this.length;
            while (len--) {
                el = this[len];

				this[0] = el.nextElementSibling; 
				
            }
            
            return this;
        },
        
        
		
		//.nextAll
        nextAll: function () {
            var len = this.length;
            while (len--) {
                el = this[len];

				//Crearing array with children
				var siblings = [];
				i = 0;
			    while (elem = el.nextSibling) {
			        if (elem.nodeType === 3) continue; // text node
			        siblings.push(elem);
			    }
				//We turn the array into the this object
				this.length = siblings.length;
				for (; i < this.length; i++) {
				  this[i] = siblings[i];
				}

            }
            return this;
        },
				
		//.attr
        attr: function (attrName,attrProp) {
            var len = this.length;
            while (len--) {
                el = this[len];
				
				//No value? then we are asking for tue current attr, not changing it
                if (attrProp !== undefined){
	                output = this;
	                el.setAttribute(attrName, attrProp);
                }else{
	            	output = el.getAttribute(attrName);    
                }
                
            }
            return output;
        },
		
		//.remove
        remove: function () {
            var len = this.length;
            while (len--) {
                el = this[len];
				el.parentNode.removeChild(el);

            }
            return this;
        },
		
		
		//.removeAttr
        removeAttr: function (attrName) {
            var len = this.length;
            while (len--) {
                el = this[len];
				el.removeAttribute(attrName);    

            }
            return this;
        },
		
		
		//.hasClass
        hasClass: function (className) {
            var len = this.length;
            while (len--) {
                el = this[len];

				output = (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;

            }
            return output;
        },
		
		
		//.height
        height: function (cssHeight) {
            var len = this.length;
            while (len--) {
                el = this[len];
                
				//No value? then we are asking for the current height, not changing it
                if ( className !== undefined ){
					output = this;
					el.style.height = ''+cssHeight+'';
                }else{
	                output = el.offsetHeight;
                }

				
            }
            return output;
        },
		
		
		//.width
        width: function (cssWidth) {
            var len = this.length;
            while (len--) {
                el = this[len];

				//No value? then we are asking for the current width, not changing it
                if ( className !== undefined ){
					output = this;
					el.style.width = ''+cssWidth+'';
                }else{
	                output = el.offsetWidth;
                }

				
            }
            return output;
        },
		
		
		//.clone TO DO
        clone: function () {
            var len = this.length;
            while (len--) {
                el = this[len];
				
				this[0] = el.cloneNode(true);						

            }
            return this;
        },
		
		
		//.wrap  TO DO
        wrap: function () {
            var len = this.length;
            while (len--) {
                el = this[len];


            }
            return this;
        },
		
		//.append
        append: function (htmlString) {
            var len = this.length;
            while (len--) {
                el = this[len];
                
                el.innerHTML +=  ''+htmlString+''    

            }
            return this;
        },
		
		//.appendTo
        appendTo: function (selector) {
            var len = this.length;
            while (len--) {
                el = this[len];
                
                //Source element html
                htmlString = el.outerHTML // Object
			
				//Target element
				target= document.querySelectorAll(selector);    		                   
			
				//We add the target element to the this object
				this[0] = target[0];
				
				//We delete the source element from the DOM
				target[0].parentNode.removeChild(el);

				//We inject the source html element into the target
				this[0].innerHTML +=  ''+htmlString+'';
				

            }
            return this;
        },
		
		//.html
        html: function (htmlString) {
            var len = this.length;
            while (len--) {
                el = this[len];

				el.innerHTML =  ''+htmlString+'';

            }
            return this;
        },
		
		//.prepend
        preppend: function (htmlString) {
            var len = this.length;
            while (len--) {
                el = this[len];

				el.innerHTML = htmlString + el.innerHTML;

            }
            return this;
        },
		
		//.prependTo
        prependTo: function (selector) {
            var len = this.length;
            while (len--) {
                el = this[len];

                //Source element html
                htmlString = el.outerHTML // Object
			
				//Target element
				target= document.querySelectorAll(selector);    		                   
			
				//We add the target element to the this object
				this[0] = target[0];
				
				//We delete the source element from the DOM
				target[0].parentNode.removeChild(el);

				//We inject the source html element into the target
				this[0].innerHTML = htmlString + this[0].innerHTML;


            }
            return this;
        },
		
		//.text
        text: function (textString) {
            var len = this.length;
            while (len--) {
                el = this[len];

				el.innerHTML = textString; 

            }
            return this;
        },
		
		//.after
        after: function (htmlString) {
            var len = this.length;
            while (len--) {
                el = this[len];
				this[0] = el.insertAdjacentHTML('afterend', htmlString);

            }
            return this;
        },
		
		//.before
        before: function (htmlString) {
            var len = this.length;
            while (len--) {
                el = this[len];
				this[0] = el.insertAdjacentHTML('beforebegin', htmlString);

            }
            return this;
        },
		
		//.is
        is: function (selector) {
            var len = this.length;
            while (len--) {
                el = this[len];

				  output = (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);

            }
            return output;
        },
		
		//.children
        children: function (filter) {
            var len = this.length;
            while (len--) {
                el = this[len];
				
				// Array containing children
				var children = [];
				i = 0;
				elem = el.firstChild; // We go trough the children
				do {
				    if (elem.nodeType === 3) continue; // text node
				    
				    //If we include a selector in the call, we only add the ones that match to the Array
				    if( filter !==undefined ){
					    
					    if ( elem.matches(filter) ){
						    children.push(elem);
					    }

				    }else{
					    children.push(elem);
				    }
				    
				} while (elem = elem.nextSibling) // We go to the next sibling
	
				//Array to object
				this.length = children.length;
				for (; i < this.length; i++) {
				  this[i] = children[i];
				}

            }
            return this;
        },
		
		//.closest http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery
        closest: function (tag) {
            var len = this.length;
            while (len--) {
                el = this[len];
                
				this[0] = el.closest(tag)

            }
            return this;
        },
		
		//.find TO DO
        find: function (selector) {
            var len = this.length;
            while (len--) {
                el = this[len];
								
		       var selector = el.querySelectorAll(selector),
		            i = 0;
		        // Get selector length
		        this.length = selector.length;
		        this.version = '0.1.0';
		         
		        // Add selector to object for method chaining
		        for (; i < this.length; i++) {
		            this[i] = selector[i];
		        }
		         					

            }
			return this;
        },
		
		//.parent
        parent: function () {
            var len = this.length;
            while (len--) {
                el = this[len];
                
				parent = el.parentNode.nodeName;
				
		        var selector = document.querySelectorAll(parent),
		            i = 0;
		        // Get selector length
		        this.length = selector.length;
		        this.version = '0.1.0';
		         
		        // Add selector to object for method chaining
		        for (; i < this.length; i++) {
		            this[i] = selector[i];
		        }

            }
            return this;
        },
		
		//.prev
        prev: function () {
            var len = this.length;
            while (len--) {
                el = this[len];
				this[0] = el.previousElementSibling;
				
            }
            return this;
        },
        
        		
		//.prevAll
        prevAll: function () {
            var len = this.length;
            while (len--) {
                el = this[len];
				//Creamos un array con los hijos del padre
				var siblings = [];
				i = 0;
			    while (elem = el.prevSibling) {
			        if (elem.nodeType === 3) continue; // text node
			        siblings.push(elem);
			    }
				//Convertimos ese array en el objeto this
				this.length = siblings.length;
				for (; i < this.length; i++) {
				  this[i] = siblings[i];
				}

            }
            return this;
        },
		
        //.css
		css: function (attr, val) {
		    var len = this.length;
		    
		    if (val !== undefined){
			    
			    while (len--) {
			        this[len].style[attr] = val;
			    }
				 
				return this;
			    
		    }else{
			    
			    if(len > 1){
			    var getterObj = {};
			    while (len--) {
			        getterObj[len] = this[len].style[attr];
			    }
			 
			        return getterObj;
			    }
			    else{
			        return this[--len].style[attr];
			    }
				    
		    }
		    		    
		},
		            
		//.on
        on: function (evt, fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener(evt, fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el. attachEvent("on" + evt, fn);
		        }
		        else{
		          el["on" + evt] = fn;
		        }

            }
            return this;
        },
		
		//.off
        off: function (evt, fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener(evt, fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el. attachEvent("off" + evt, fn);
		        }
		        else{
		          el["on" + evt] = fn;
		        }

            }
            return this;
        },
		
		//.resize
        resize: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

			  window.addEventListener("resize", fn);

            }
            return this;
        },
		
		
		//.scroll
        scroll: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

				window.addEventListener("scroll", fn);
            }
            return this;
        },
		
		//.trigger
        trigger: function (eventName) {
            var len = this.length;
            while (len--) {
                el = this[len];

				var event = document.createEvent('HTMLEvents');
				event.initEvent(eventName, true, false);
				el.dispatchEvent(event);

            }
            return this;
        },
		
		//.change
        change: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener("change", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el. attachEvent("change", fn);
		        }
		        else{
		          el["change"] = fn;
		        }

            }
            return this;
        },
		
		//.focus
        focus: function () {
            var len = this.length;
            while (len--) {
                el = this[len];
				
				el.focus()

            }
            return this;
        },
		
		//.submit
        submit: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener("submit", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el. attachEvent("submit", fn);
		        }
		        else{
		          el["submit"] = fn;
		        }


            }
            return this;
        },
		
		//.keydown
        keydown: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];
                
		        if (document.addEventListener) {
		          el.addEventListener("keydown", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el. attachEvent("keydown", fn);
		        }
		        else{
		          el["keydown"] = fn;
		        }

            }
            return this;
        },
		
		//.keypress
        keypress: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener("keypress", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el.attachEvent("keypress", fn);
		        }
		        else{
		          el["keypress"] = fn;
		        }


            }
            return this;
        },
		
		//.keyup
        keyup: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener("keyup", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el.attachEvent("keyup", fn);
		        }
		        else{
		          el["keyup"] = fn;
		        }

            }
            return this;
        },
		
		//.toggleClass
        toggleClass: function (className) {
            var len = this.length;
            while (len--) {
                el = this[len];
				el.classList.toggle(className);

            }
            return this;
        },
		
		//.hover
        hover: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener("hover", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el.attachEvent("hover", fn);
		        }
		        else{
		          el["hover"] = fn;
		        }

            }
            return this;
        },
		
		//.click
        click: function (fn) {
            var len = this.length;
            while (len--) {
                el = this[len];

		        if (document.addEventListener) {
		          el.addEventListener("click", fn, false);  
		        }
		        else if (document.attachEvent)  {
		          el. attachEvent("click", fn);
		        }
		        else{
		          el["click"] = fn;
		        }


            }
            return this;
        },
		
		        
   		//.offset TO DO
        offset: function () {
            var len = this.length;
            while (len--) {
                el = this[len];


            }
            return this;
        },
		
		
		//.position TO DO
        position: function () {
            var len = this.length;
            while (len--) {
                el = this[len];


            }
            return this;
        },
		
		//.each TO DO
        each: function () {
            var len = this.length;
            while (len--) {
                el = this[len];


            }
            return this;
        },
		
		
 		//.siblings
        siblings: function () {
            var len = this.length;
            while (len--) {
                el = this[len];

				//Creating array with the children
				var siblings = [];
				i = 0;
				elem = el.parentNode.firstChild; //We go trough all of them
				do {
				    if (elem.nodeType === 3) continue; // text node
				    if (elem !== el) siblings.push(elem); // We add every element but the first
				} while (elem = elem.nextSibling) // We go to the next sibling
				//We turn the array into the this object
				this.length = siblings.length;
				for (; i < this.length; i++) {
				  this[i] = siblings[i];
				}

            }
            return this;
        },
		
          
         
    };
    
 
    // We assign the $ object to the global window object.
    if(!window.$) {
        window.$ = $;
    }
	
	
})();	