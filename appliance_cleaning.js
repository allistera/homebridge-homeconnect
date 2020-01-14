// Homebridge plugin for Home Connect home appliances
// Copyright © 2019-2020 Alexander Thoukydides

'use strict';

const ApplianceGeneric = require('./appliance_generic.js');
const HasDoor = require('./has_door.js');
const HasEvents = require('./has_events.js');
const HasActive = require('./has_active.js');
const HasPrograms = require('./has_programs.js');
const HasRemainingTime = require('./has_remainingtime.js');
const HasRemoteControl = require('./has_remotecontrol.js');

// A Homebridge accessory for a Home Connect cleaning robot (Roxxter)
module.exports.CleaningRobot = class ApplianceCleaningRobot
                             extends ApplianceGeneric {
    constructor(...args) {
        super(...args);

        // Customise the appliance as a cleaning robot
        this.mixin(HasActive);
        this.mixin(HasEvents, {
            'BSH.Common.Event.ProgramFinished':
                'program finished',
            'BSH.Common.Event.ProgramAborted':
                'program aborted',
            'ConsumerProducts.CleaningRobot.Event.EmptyDustBoxAndCleanFilter':
                'dust box full',
            'ConsumerProducts.CleaningRobot.Event.RobotIsStuck':
                'stuck',
            'ConsumerProducts.CleaningRobot.Event.DockingStationNotFound':
                'lost'
        });
        this.mixin(HasPrograms);
    }
}

// A Homebridge accessory for a Home Connect dishwasher
module.exports.Dishwasher = class ApplianceDishwasher
                          extends ApplianceGeneric {
    constructor(...args) {
        super(...args);

        // Customise the appliance as a dishwasher
        this.mixin(HasActive);
        this.mixin(HasDoor);
        this.mixin(HasEvents, {
            'BSH.Common.Event.ProgramFinished':     'program finished',
            'BSH.Common.Event.ProgramAborted':      'program aborted'
        });
        this.mixin(HasRemainingTime);
        this.mixin(HasRemoteControl);
        this.mixin(HasPrograms);
    }
}

// A Homebridge accessory for a Home Connect washer and/or dryer
class ApplianceWasherDryer extends ApplianceGeneric {
    constructor(...args) {
        super(...args);

        // Customise the appliance as a washer and/or dryer
        this.mixin(HasActive);
        this.mixin(HasDoor);
        this.mixin(HasEvents, {
            'BSH.Common.Event.ProgramFinished':     'program finished',
            'BSH.Common.Event.ProgramAborted':      'program aborted'
        });
        this.mixin(HasRemainingTime);
        this.mixin(HasRemoteControl);
        this.mixin(HasPrograms);
    }
}

module.exports.WasherDryer = ApplianceWasherDryer;
module.exports.Dryer       = ApplianceWasherDryer;
module.exports.Washer      = ApplianceWasherDryer;
