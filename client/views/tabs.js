var jbox_array = [];

Template.tabs.helpers({
	buttons: function (group) {
	  return Buttons.find({group:group});
	},
	buttonGroups: function () {
	  // first find anything where there are ButtonGroups defined by cohort enrollment
	  var cohort = Cohorts.find({members: Meteor.userId()});
	  var owner = Owners.find({id:cohort._id});
	  var buttonGroups = ButtonGroup.find({owner:owner._id});
	  // TODO: output the above somehow
	  return ButtonGroup.find({name:"students"});
	}
});

Meteor.startup(function() {

  WebFontConfig = {
    google: { families: [ 'Roboto Condensed:700,400:latin' ] } //, 'Roboto Slab:700,400:latin', 'Oswald:400', 'Mouse Memoirs' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
});

Template.tabs.onRendered(function () {
	var self = this;

	console.log('tabs onRendered');
	self.$("#tabs").tabs({
		heightStyle: 'content',  //  calculate on resizes
		show: { effect: "fade", duration: 300 }
	});

	
	
	// $("input[name=icon_size]:radio").change(function () {
	//   var value = $(this).val();
	//   if ( value == '+1' ) {
	//     $(".splash_button").toggleClass('smaller');        
	//   } else if ( value == '-1' ) {
	//     $(".splash_button").toggleClass('smaller');
	//   }
	// });

	// $("#new_tab_checkbox").change(function () {
	//       var value = $(this).val();
	//       console.log(value);
	//       value = value == "1" ? "0" : "1";
	//       $(this).val(value);

	//       if (value == "1") {
	//         $('a').each(function(index) {
	//           $(this).attr('target', '_blank_'+index);
	//         });
	//         console.log('added target');
	//       } else {
	//         $('a').removeAttr('target');
	//         console.log('removed target');
	//       }

	//       $.ajax({
	//         type:'POST',
	//         url: 'user_settings',
	//         contentType: 'application/json; charset=utf-8',
	//         success: function(result) {
	//             console.log(result);
	//           },
	//         data: JSON.stringify({'new_tab': value})
	//       });
	// });

  self.$("#edit_button").bootstrapSwitch({
	  labelText: 'Edit Mode',
	  onColor: 'success',
	  labelWidth: 100,
	  inverse: true,
	  onSwitchChange: function (event, state) {
		  $containers = self.$('.splash_button_container');

		  if (state) {  // edit mode on
			  $.each(jbox_array, function (index, value) {
				  value.disable();
			  });
			  console.log('jboxes diabled');

			  // enable drag'n'drop
			  $.each($containers, function (index, value) {
				  var $buttons = $(value).find('.splash_button_item');
				  $buttons.draggable('enable');
				  $buttons.find('.splash_button > a').css('cursor', 'move');  // specificity gets rid of a:-webkit-any-link definition
				  $splash_button_texts = $buttons.find('.splash_button_text');
				  $splash_button_texts.css('cursor', 'text');
				  $splash_button_texts.addClass('editable');
				  $buttons.find('.splash_button_text');
			  });
		  } else {      // edit mode off
			  $.each(jbox_array, function (index, value) {
				  value.enable();
			  });
			  console.log('jboxes enabled');
			  $.each($containers, function (index, value) {
				  var $buttons = $(value).find('.splash_button_item');
				  $buttons.draggable('disable');
				  $buttons.find('.splash_button > a').css('cursor', 'pointer');
				  $splash_button_texts = $buttons.find('.splash_button_text');
				  $splash_button_texts.removeClass('editable');
				  $splash_button_texts.css('cursor', 'pointer');
			  });


		  }

	  }
  });
  
  this.subscribe("buttons",function() {
	// This is a callback that is fired once the subscription to "buttons" is ready (i.e. the buttons data is downloaded)
	self.$('#splash_button_container').isotope({
	  itemSelector: '.splash_button_item',
	  layoutMode: 'fitRows'
	});
  });

});   // end Template.tabs.onRendered



Template.doButtons.onRendered(function () {

	console.log('doButtons');

	// $containers.packery('once', 'layoutComplete', function(loadedItems) {
	// 	self.$('.splash_button_item').draggable();
	// 	$containers.packery('bindUIDraggableEvents', self.$('.splash_button_item'))
	// 	self.$('.splash_button_item').draggable('disable');
		
	//     self.$('.splash_button').each(function (buttonIndex) {
	//     	$thisButton = $(this);
	//     	var jbox = $thisButton.jBox('Tooltip', {
	// 	        position: {
	// 	            y: 'top',
	// 	        },
	// 	        outside: 'x',
	// 	        title: $('#splash_button_title_'+buttonIndex),
	// 	        closeOnMouseleave:true,
	// 	        content: $('#splash_button_submenu_' + buttonIndex),
	// 	        attach: $thisButton
	// 	    });
	// 	    jbox_array.push(jbox);
	//     });			
	//  });

	// $containers.packery();   // don't use $containers!
});

Template.doButtons.events({
	'click .splash_button_text.editable': function (event, template) {
		console.log("clicked!");
		var $target = $(event.target);
		// TODO:
		// var initialValue = $target.text();
		// $target.editable({
		//     type: 'text',
		//     title: initialValue,
		//     success: function(response, newValue) {
		//         console.log(newValue);
		//     }
		// });
	},
});

// columnWidth=115 transitionDuration="0.1s" itemSelector=".splash_button_item" gutter=10 columnWidth=110 rowHeight=60 id="splash_button_container"