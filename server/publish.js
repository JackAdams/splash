Meteor.publish("buttons", function() {
  return Buttons.find();
});