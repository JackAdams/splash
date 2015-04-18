Meteor.startup(function () {

	if (Buttons.find().count() === 0) {
	  Buttons.insert({
	  	icon: 'user', 
	  	display: "Initial button",
	  	href: "#",
	  	index: 0,
	  	initialDisplay: true,
	  	group: "Group"
	  });
	  Buttons.insert({
	  	icon: 'plus', 
	  	display: "Add",
	  	href: "#",
	  	index: 9999,
	  	group: "Group",
	  	initialDisplay: false
	  });
	}

	if (Cohorts.find().count() === 0) {
	  Cohorts.insert({
	  	name: "students",
	  	display: "Students",
	  	members: [],
	  });
	  Cohorts.insert({
	  	name: "teachers",
	  	display: "Teachers",
	  	members: [],
	  });
	}

	//studentsCohort = db.cohorts.find({name:"students"});
	if (Owners.find().count() === 0) {
		Owners.insert({
			kind:'cohort',
			//id:studentsCohort._id,
		})
	}

	//initialButton = db.buttons.find({display:"Initial button"});
	if (ButtonGroup.find().count() === 0) {
		ButtonGroup.insert({
			name: "students",
			display: "Students",
			buttons: [],
		});
	}
});