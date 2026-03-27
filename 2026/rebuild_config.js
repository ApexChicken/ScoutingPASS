var config_data = `
{
  "dataFormat": "tsv",
  "title": "Scouting PASS 2026",
  "page_title": "<b>REBUILT</b>",
  "checkboxAs": "TF",
  "prematch": [
    { "name": "Scouter Name",
      "code": "s",
      "type": "scouter",
      "size": 20,
      "maxSize": 20,
      "required": "true"
    },
    { "name": "Event",
      "code": "e",
      "type": "event",
      "defaultValue": "2026mefal",
      "required": "false"
    },
    { "name": "Match Level",
      "code": "l",
      "type": "level",
      "choices": {
        "qm": "Quals<br>",
        "sf": "Semifinals<br>",
        "f": "Finals"
      },
      "defaultValue": "qm",
      "required": "false"
    },
    { "name": "Match #",
      "code": "m",
      "type": "match",
      "min": 1,
      "max": 150,
      "required": "false"
    },
    { "name": "Robot Position",
      "code": "r",
      "type": "robot",
      "choices": {
        "r1": "Red-1",
        "b1": "Blue-1<br>",
        "r2": "Red-2",
        "b2": "Blue-2<br>",
        "r3": "Red-3",
        "b3": "Blue-3"
      },
      "required": "false"
    },
    { "name": "Team #",
      "code": "t",
      "type": "team",
      "min": 1,
      "max": 99999,
      "required": "true"
    }
  ],
  "auton": [
    { "name": "Moved",
      "code": "al",
      "type": "bool"
    },
    { "name": "Pre-Loaded",
      "code": "pl",
      "type": "bool"
    },
    { "name": "Climbed to Level 1",
      "code": "clo",
      "type": "bool"
    },
    { "name": "Collect From Depot",
      "code": "cfd",
      "type": "bool"
    },
    { "name": "Scored Into Hub",
      "code": "sih",
      "type": "bool"
    },

    { "name": "Collect From Neutral Zone",
      "code": "cfna",
      "type": "bool"
    }

  ],
  "teleop": [


    { "name": "Pickup From Neutral Zone",
      "code": "cfn",
      "type": "bool"
    },

    { "name": "Pickup From Depot",
      "code": "pfd",
      "type": "bool"
    },

    { "name": "Can Shoot?",
      "code": "cs",
      "type": "bool"
    }

  ],
  "endgame": [
    { "name": "Did Climb",
      "code": "dc",
      "type": "bool"
    },
    { "name": "Final Position",
      "code": "fp",
      "type": "radio",
      "choices": {
        "nc": "Didn't Climb<br>",
        "pk": "Parked<br>",
        "l1": "Level 1<br>",
        "l2": "Level 2<br>",
        "l3": "Level 3"
      },
      "defaultValue": "nc"
    }
  ],
  "postmatch": [

    { "name": "Defense Status",
      "code": "ds",
      "type": "radio",
      "choices": {
        "n": "No/Normal Defense<br>",
        "s": "Switched to Defense<br>",
        "e": "Entirely Defense"
      },
      "defaultValue": "n"
    },

    { "name": "Accuracy Class",
      "code": "ac",
      "type": "radio",
      "choices": {
        "1": "1 - Low<br>",
        "2": "2 - Medium<br>",
        "3": "3 - High<br>"
      },
      "defaultValue": "1"
    },

    { "name": "Estimated Score Per Volley",
      "code": "espv",
      "type": "number",
      "defaultValue": "0"
    },

    { "name": "Energized",
      "code": "egz",
      "type": "bool"
    },
    { "name": "Supercharged",
      "code": "sch",
      "type": "bool"
    },

    { "name": "Positive Attributes",
      "code": "pa",
      "type": "checkbox",
      "choices": {
        "mes": "Moved efficiently and smoothly<br>",
        "pas": "Prevented other alliance from scoring<br>",
        "ndp": "Did not draw penalties<br>"
      }
    
    },

    { "name": "Negative Attributes",
      "code": "na",
      "type": "checkbox",
      "choices": {
        "tll": "Took too long to line up with AprilTags<br>",
        "rir": "Ran into objects/other robots<br>",
        "bi": "Broke down/immobilized<br>",
        "tu": "Tippy/unstable<br>"
      }
    
    },


    { "name": "Comments",
      "code": "co",
      "type": "text",
      "size": 15,
      "maxSize": 55
    }
  ]
}`;
