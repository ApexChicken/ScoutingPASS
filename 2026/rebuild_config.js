var config_data = `
{
  "dataFormat": "tsv",
  "title": "Scouting PASS 2026",
  "page_title": "<b>REBUILT</b>",
  "checkboxAs": "10",
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
    { "name": "Leave Starting Line",
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


    { "name": "Pickup from Neutral Zone",
      "code": "cfn",
      "type": "bool"
    },

    { "name": "Pickup from Depot",
      "code": "pfd",
      "type": "bool"
    },

    { "name": "Goes under Trench",
      "code": "gut",
      "type": "bool"
    },
    { "name": "Goes over Bump",
      "code": "gob",
      "type": "bool"
    },

    { "name": "Cycle Time (# of shooting cycles completed)",
      "code": "ct",
      "type": "counter"
    }

  ],
  "endgame": [
    { "name": "climb timer",
      "code": "clt",
      "type": "timer"
    },
    { "name": "Climb level",
      "code": "cl",
      "type": "radio",
      "choices": {
        "l1": "L1<br>",
        "l2": "L2<br>",
        "l3": "L3<br>",
        "fc": "Failed Climb<br>",
        "bd": "No<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    },

    { "name": "Climb position",
      "code": "clp",
      "type": "radio",
      "choices": {
        "lt": "Left<br>",
        "ct": "Center<br>",
        "rt": "Right<br>",
        "bk": "Back<br>"
      } 
    }


  ],
  "postmatch": [

    { "name": "energized",
      "code": "egz",
      "type": "bool"
    },
    { "name": "supercharged",
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

    { "name": "Negative Atrributes",
      "code": "na",
      "type": "checkbox",
      "choices": {
        "tll": "Took too long to line up wigth april tags<br>",
        "rir": "Ran into objects/other robots<br>",
        "bi": "Broke down/immobilized<br>",
        "tu": "Tippy/unsturdy<br>"
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
