# THFloat v0.4 
plugin for jQuery (modified)
http://rommelsantor.com/jquery/thfloat (v0.3)

## Author(s):
 * Rommel Santor (http://rommelsantor.com)
 * Niko Roberts (http://www.nikoroberts.com)

 This plugin allows you to float a table's thead or tfoot keeping it in view when it would normally be scrolled out of view.

## Licence
 Copyright (c) 2011 by Rommel Santor <rommel at rommelsantor dot com>
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.


## Description
   The THFloat plugin for jQuery allows you to automatically float (or affix)
   either a given table's thead, tfoot, or both at the top or bottom of a
   scrolling container parent/ancestor so that they stay in view even though
   the table's tbody contents have been scrolled out of the visible area.
 
   This was developed and is very handy for long data tables with many columns,
   as it allows users to always know which column contains which value without
   the column header row having to be included repeatedly throughout the table
   (this is often the typical solution).
 
## Requirements 
   jQuery v1.4 or better
 
## Version History 
```
   Ver 0.4 - 2012-05-01 - Niko Roberts
              Modified to animate the floating header
              
   Ver 0.3 - 2011-04-29 - Rommel Santor
               Made some big improvements / fixes: If the container of a
               source thfloat table is not visible, the floating block will
               no longer be visible; the <tr>, <td>, and <th> elements in
               the cloned block were not cloning the styles of the source
               elements, but this is fixed now thanks to the help of Keith
               Bentrup's jQuery.fn.css override (see below); added "sticky"
               option; added method 'refresh' to force the floating block
               to update itself
   Ver 0.2 - 2011-04-14 - Rommel Santor
               Added 'resize' method and made initial resize automatic; also
               cleaned up how the floater is sized when scrolling to stay in
               sync with the real table; removed widthOffset as it made the
               floater look off most of the time
   Ver 0.1.1 - 2011-03-07 - Rommel Santor
               Fixed "return;" bug in init()
   Ver 0.1 - 2011-03-01 - Rommel Santor
             Initial Release
```
## Tested 
 *  Mozilla (Firefox 3+)
 *  Webkit (Chrome 9+, Safari for Windows 5+)
 *  MSIE 7, 8, 9
 *  Opera 11+
 
## Known issues
 * Safari for Mac apparently has some issues with table resizing; thanks to Adi Fairbank for reporting this issue; unfixable by me for now to due lack of development access on a Mac
 * MSIE 9 ignores the cells' (inner) borders for some reason
 * if you have any others, let me know


## Methods
```
.thfloat([options])
  .thfloat('init', [options]) // initialize THFloat on a new jQuery object
    options : see "Options" below

.thfloat('resize', [side]) /* force the floating block to resize itself and each cell contained within to match the parent table; useful utility if you modify the original table contents and want to sync it with the floater */
  side : "head" or "foot"; defaults to both

.thfloat('refresh', [side]) /* force the floating block to refresh itself, as if the container has scrolled; useful for tables in blocks that toggle visibility */
  side : "head" or "foot"; defaults to both

.thfloat('destroy') // remove THFloat instance from jQuery object
```

## Options
```
side - the block of the table that is to be floated
   default: "head"
   "head" for thead
   "foot" for tfoot
 
attachment - the scrolling container to which the floated block is attached
   default: window
   string selector, DOM object, or jQuery object; 
 
sticky - force the floating block visible even when source block is in view
         (but not if the table is out of view entirely, of course)
  default: false
  boolean
 
onShow - see "Overridable Events" below
 
onHide - see "Overridable Events" below
```

## Overridable Events
```
onShow(table, block) - triggered just after a floating block is created
  table : the floating table holding the block and its content
  block : the temporary thead or tfoot containing the content being floated
 
onHide(table, block) - triggered as the floating block is about to be destroyed
  table : the floating table holding the block and its content
  block : the temporary thead or tfoot containing the content being floated
```

  CSS Styles:
  
```
.thfloat-table
  class is added to the cloned, floating table holding the cloned thead / tfoot
 
.thfloat
  class is added to each <thead>/<tfoot> while it is floated
 
#thfloat[head|foot]-[table_id] (default; used if source table has an id)
#thfloathead - if side "head" and table has no id
#thfloatfoot - if side "foot" and table has no id
  id is assigned to the floating table holding the fixed thead or tfoot
```

## Example
**HTML**
   
```
<!-- import jQuery from google: http://code.google.com/apis/libraries/devguide.html#jquery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="./jquery.thfloat.js"></script>
 
<div id="scroller" style="height: 100px; overflow: auto;">
   <table id="floater">
      <thead>...a row of header cells...</thead>
      <tbody>...a bunch of content rows...</tbody>
      <tfoot>...a row of footer cells...</tfoot>
   </table>
</div>
```
 
**CSS**
  
```
#thfloathead-floater { border-bottom: 2px solid black; }
#thfloatfoot-floater { border-top: 2px solid black; }
```
 
**Javascript**
  
```
// make both the <thead> and <tfoot> float
$("#floater")
  .thfloat({
     side : "head",
     attachment : "#scroller"
  })
  .thfloat({
     side : "foot",
     attachment : "#scroller"
   });
 
   // ... do some stuff ...
 
// destroy just the <tfoot> floater
$("#floater").thfloat('destroy', 'foot');
 ```