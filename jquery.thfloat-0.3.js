/**
 * v0.3 THFloat plugin for jQuery
 * http://rommelsantor.com/jquery/thfloat
 *
 * Author(s): Rommel Santor
 *            http://rommelsantor.com
 *
 * This plugin allows you to float a table's <thead> or <tfoot> keeping it
 * in view when it would normally be scrolled out of view.
 *
 * Copyright (c) 2011 by Rommel Santor <rommel at rommelsantor dot com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
@*/
/**
 * >> Description <<
 *  The THFloat plugin for jQuery allows you to automatically float (or affix)
 *  either a given table's <thead>, <tfoot>, or both at the top or bottom of a
 *  scrolling container parent/ancestor so that they stay in view even though
 *  the table's <tbody> contents have been scrolled out of the visible area.
 *
 *  This was developed and is very handy for long data tables with many columns,
 *  as it allows users to always know which column contains which value without
 *  the column header row having to be included repeatedly throughout the table
 *  (this is often the typical solution).
 *
 * >> Requirements <<
 *  jQuery v1.4 or better
 *
 * >> Version History <<
 *  Ver 0.3 - 2011-04-29 - Rommel Santor
 *              Made some big improvements / fixes: If the container of a
 *              source thfloat table is not visible, the floating block will
 *              no longer be visible; the <tr>, <td>, and <th> elements in
 *              the cloned block were not cloning the styles of the source
 *              elements, but this is fixed now thanks to the help of Keith
 *              Bentrup's jQuery.fn.css override (see below); added "sticky"
 *              option; added method 'refresh' to force the floating block
 *              to update itself
 *  Ver 0.2 - 2011-04-14 - Rommel Santor
 *              Added 'resize' method and made initial resize automatic; also
 *              cleaned up how the floater is sized when scrolling to stay in
 *              sync with the real table; removed widthOffset as it made the
 *              floater look off most of the time
 *  Ver 0.1.1 - 2011-03-07 - Rommel Santor
 *              Fixed "return;" bug in init()
 *  Ver 0.1 - 2011-03-01 - Rommel Santor
 *            Initial Release
 *
 * >> Tested <<
 *  Mozilla (Firefox 3+)
 *  Webkit (Chrome 9+, Safari for Windows 5+)
 *  MSIE 7, 8, 9
 *  Opera 11+
 *
 * >> Known issues <<
 *  - Safari for Mac apparently has some issues with table resizing; thanks to
 *    Adi Fairbank for reporting this issue; unfixable by me for now to due lack of
 *    development access on a Mac
 *  - MSIE 9 ignores the cells' (inner) borders for some reason
 *  - if you have any others, let me know
 */
/**
 * Methods:
 *  .thfloat([options])
 *  .thfloat('init', [options]) - initialize THFloat on a new jQuery object
 *    options : see "Options" below
 *
 *  .thfloat('resize', [side]) - force the floating block to resize itself
 *      and each cell contained within to match the parent table; useful utility
 *      if you modify the original table contents and want to sync it with the floater
 *    side : "head" or "foot"; defaults to both
 *
 *  .thfloat('refresh', [side]) - force the floating block to refresh itself, as if
 *      the container has scrolled; useful for tables in blocks that toggle visibility
 *    side : "head" or "foot"; defaults to both
 *
 *  .thfloat('destroy') - remove THFloat instance from jQuery object
 */
/**
 * Options:
 *  side - the block of the table that is to be floated
 *    default: "head"
 *    "head" for <thead>
 *    "foot" for <tfoot>
 *
 *  attachment - the scrolling container to which the floated block is attached
 *    default: window
 *    string selector, DOM object, or jQuery object; 
 *
 *  sticky - force the floating block visible even when source block is in view
 *            (but not if the table is out of view entirely, of course)
 *    default: false
 *    boolean
 *
 *  onShow - see "Overridable Events" below
 *
 *  onHide - see "Overridable Events" below
 */
/**
 * Overridable Events:
 *  onShow(table, block) - triggered just after a floating block is created
 *    table : the floating <table> holding the block and its content
 *    block : the temporary <thead> or <tfoot> containing the content being floated
 *
 *  onHide(table, block) - triggered as the floating block is about to be destroyed
 *    table : the floating <table> holding the block and its content
 *    block : the temporary <thead> or <tfoot> containing the content being floated
 */
/**
 * CSS Styles:
 *  .thfloat-table
 *    class is added to the cloned, floating <table> holding the cloned <thead>/<tfoot>
 *
 *  .thfloat
 *    class is added to each <thead>/<tfoot> while it is floated
 *
 *  #thfloat[head|foot]-[table_id] (default; used if source table has an id)
 *  #thfloathead - if side "head" and table has no id
 *  #thfloatfoot - if side "foot" and table has no id
 *    id is assigned to the floating table holding the fixed <thead> or <tfoot>
$*/
/**
 * Example:
 *  html
 *  ----
 *    <!-- import jQuery from google: http://code.google.com/apis/libraries/devguide.html#jquery -->
 *    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
 *    <script type="text/javascript" src="./jquery.thfloat.js"></script>
 *
 *    <div id="scroller" style="height: 100px; overflow: auto;">
 *      <table id="floater">
 *        <thead>...a row of header cells...</thead>
 *        <tbody>...a bunch of content rows...</tbody>
 *        <tfoot>...a row of footer cells...</tfoot>
 *      </table>
 *    </div>
 *
 *  css
 *  ---
 *  #thfloathead-floater { border-bottom: 2px solid black; }
 *  #thfloatfoot-floater { border-top: 2px solid black; }
 *
 *  javascript
 *  ----------
 *    // make both the <thead> and <tfoot> float
 *    $("#floater")
 *      .thfloat({
 *        side : "head",
 *        attachment : "#scroller"
 *      })
 *      .thfloat({
 *        side : "foot",
 *        attachment : "#scroller"
 *      });
 *
 *    // ... do some stuff ...
 *
 *    // destroy just the <tfoot> floater
 *    $("#floater").thfloat('destroy', 'foot');
 */
(function($){
  // essential jQuery css() override by Keith Bentrup for cloning full styles between elements
  // http://stackoverflow.com/questions/1004475/jquery-css-plugin-that-returns-computed-style-of-element-to-pseudo-clone-that-ele
  // (there needs to be a better way to use this portably than overriding jQuery here)
  jQuery.fn.css2 = jQuery.fn.css;
  jQuery.fn.css = function() {
    if (arguments.length) return jQuery.fn.css2.apply(this, arguments);
    var attr = ['font-family','font-size','font-weight','font-style','color',
      'text-transform','text-decoration','letter-spacing','word-spacing',
      'line-height','text-align','vertical-align','direction','background-color',
      'background-image','background-repeat','background-position',
      'background-attachment','opacity','width','height','top','right','bottom',
      'left','margin-top','margin-right','margin-bottom','margin-left',
      'padding-top','padding-right','padding-bottom','padding-left',
      'border-top-width','border-right-width','border-bottom-width',
      'border-left-width','border-top-color','border-right-color',
      'border-bottom-color','border-left-color','border-top-style',
      'border-right-style','border-bottom-style','border-left-style','position',
      'display','visibility','z-index','overflow-x','overflow-y','white-space',
      'clip','float','clear','cursor','list-style-image','list-style-position',
      'list-style-type','marker-offset'];
    var len = attr.length, obj = {};
    for (var i = 0; i < len; i++) 
      obj[attr[i]] = jQuery.fn.css2.call(this, attr[i]);
    return obj;
  }

  var methods = {
    init : function(options) {
      var settings = {
        side : 'head',        // "head" for <thead> or "foot" for <tfoot>
        attachment : window,  // selector, dom object, or jquery object - scrolling parent to attach to
        sticky : false,       // stay floating always, not just when the source block is out of view
        onShow : function(table, block) {}, // called after the floating block (<thead> or <tfoot>) is created
        onHide : function(table, block) {}  // called as the block is about to be hidden (actually deleted)
      };

      if (typeof options === 'object')
        $.extend(settings, options);

      var $this = this,
          side = settings.side == 'foot' ? 'foot' : 'head',
          other = side == 'foot' ? 'head' : 'foot',
          ns = 'thfloat'+side,
          data = $this.data(ns)
      ;

      while (!data) {
        var $src = $("t"+side, this),
            $opp = $("t"+other, this)
        ;

        if (!$src.length)
          break;

        data = {
          settings : settings,
          active : false,
          clonetbl : $(this).clone(true).attr({id:ns+($this.attr('id')?('-'+$this.attr('id')):'')}).addClass('thfloat-table').css({zIndex:'1000',display:'none',position:'absolute'}).appendTo('body'),
          srcblock : $src,
          oppblock : $opp.length ? $opp : null,
          thwidths : [],
          cloneblk : null
        };

        data.clonetbl.children().remove();

        $this.data(ns, data);

        $(window)
          .bind('resize.'+ns, function(){
            $.each(['thfloathead','thfloatfoot'], function(i, ns){
              var data = $this.data(ns);
              if (!data)
                return;

              var thw = [];
              $("tr", data.srcblock).children().each(function(){
                thw.push($(this).width());
              });

              data.thwidths = thw;
              $this.data(ns, data);
              $this.thfloat('_scroll', ns, $(data.settings.attachment));
            });
          })
          .resize()
        ;

        var a = $(settings.attachment).bind('scroll.'+ns, function(){
          $this.thfloat('_scroll', ns, this);
        });

        $this.thfloat('_scroll', ns, a);
        break;
      }

      return $this;
    },

    refresh : function(side) {
      var $this = $(this);

      $.each(['head', 'foot'], function(i, s){
        if (side && side != s)
          return;

        var ns = 'thfloat'+s,
            data = $this.data(ns);

        if (data)
          $this.thfloat('_scroll', ns, data.settings.attachment);
      });
    },

    resize : function(side) {
      var $this = $(this);

      $.each(['head', 'foot'], function(i, s){
        if (side && side != s)
          return;

        var ns = 'thfloat'+s,
            data = $this.data(ns);

        if (!data || !data.active)
          return;

        var thw = [];
        $("tr", data.srcblock).children().each(function(){
          thw.push($(this).width());
        });

        var $el = $(data.settings.attachment),
            heightOffset = $.browser.mozilla || $.browser.opera || $.browser.msie ? -(($this.attr('cellspacing')||0)*2) : 0,
            edgeheight = s == 'foot' ? ((!$el.offset() ? $el.height() : $el.innerHeight()) - data.srcblock.outerHeight() + heightOffset) : 0, 
            edge = !$el.offset() ? ($el.scrollTop() + edgeheight) : ($el.offset().top + edgeheight);

        data.clonetbl.css({top:edge+'px',left:$this.offset().left+"px",width:$this.width()+'px'});
        $('tr', data.cloneblk).children().each(function(i){
          $(this).css({width:thw[i]+'px',maxWidth:thw[i]+'px'});
        });

        data.thwidths = thw;
        $this.data(ns, data);
      });
    },

    destroy : function(side) {
      var $this = this;

      $.each(['thfloathead','thfloatfoot'], function(i, ns){
        var data = $this.data(ns);

        if (!data || (side && ('thfloat'+side) != ns))
          return;

        $(data.settings.attachment).unbind('.'+ns);
        $(window).unbind('.'+ns);

        data.clonetbl.remove();
        data.cloneblk && data.cloneblk.remove();
        $this.removeData(ns);
      });
      
      return $this;
    },

    _scroll : function(ns, element) {
      var $this = this,
          $el = $(element);

      var data = $this.data(ns);
      if (!data)
        return;

      var heightOffset = $.browser.mozilla || $.browser.opera || $.browser.msie ? -(($this.attr('cellspacing')||0)*2) : 0,
          edgeheight = data.settings.side == 'foot' ? ((!$el.offset() ? $el.height() : $el.innerHeight()) - data.srcblock.outerHeight() + heightOffset) : 0,
          edge = !$el.offset() ? ($el.scrollTop() + edgeheight) : ($el.offset().top + edgeheight),
          beyond = data.settings.side == 'foot' ?
            ((!data.settings.sticky && data.srcblock.offset().top < edge) || (!data.oppblock ? false : (data.oppblock.offset().top + data.oppblock.outerHeight() >= edge))) :
            ((!data.settings.sticky && data.srcblock.offset().top > edge) || (!data.oppblock ? false : (data.oppblock.offset().top <= edge + data.srcblock.outerHeight())))
      ;

      if (!data.active) {
        if (!beyond) {
          data.active = true;
          data.clonetbl.css({display:($this.is(':visible')?'table':'none'),top:edge+'px',left:$this.offset().left+"px",marginTop:'0',marginBottom:'0',width:$this.width()+'px'});
          data.cloneblk = data.srcblock.clone(true);
          data.cloneblk.addClass('thfloat');

          // we need to not only clone the block and rows and cells, but
          // the CSS of each of those
          data.cloneblk.css(data.srcblock.css());
          data.cloneblk.children().remove();
          // copy each row and its styles
          $("tr", data.srcblock).each(function(){
            // for each row, copy each cell and its styles
            var tr = $(this).clone(true).css($(this).css());
            tr.children().remove();

            $("td,th", this).each(function(){
              tr.append($(this).clone(true).css($(this).css()));
            });

            // finally add the new cloned row and cloned columns to our thead/tfoot block
            data.cloneblk.append(tr);
          });
          data.cloneblk.appendTo(data.clonetbl);

          $this.thfloat('resize',data.settings.side);

          data.settings.onShow && data.settings.onShow.apply(this, [data.clonetbl, data.cloneblk]);
        }
      }
      else {
        if (data.clonetbl.is(':visible') != $this.is(':visible'))
          data.clonetbl.css({display:($this.is(':visible')?'table':'none')});

        if (beyond) {
          data.settings.onHide && data.settings.onHide.apply(this, [data.clonetbl, data.cloneblk]);

          data.active = false;
          data.cloneblk.remove();
          data.cloneblk = null;
          data.clonetbl.css({display:'none'});
        }
        else
          $this.thfloat('resize',data.settings.side);
      }

      $this.data(ns, data);
    }
  };

  $.fn.thfloat = function(method) {
    if (methods[method])
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method)
      return methods.init.apply(this, arguments);
    else
      $.error('Method ' +  method + ' does not exist on jQuery.thfloat');
  };
})(jQuery);