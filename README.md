# miniQuery 0.9

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

### Functions

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

