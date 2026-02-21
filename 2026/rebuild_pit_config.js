var config_data = `
{
  "dataFormat": "tsv",
  "title": "Scouting PASS 2026",
  "page_title": "<b>REBUILT</b>",
  "pitConfig": "true",
  "prematch": [

    { "name": "Scouter Name",
      "code": "s",
      "type": "scouter",
      "size": 20,
      "maxSize": 20,
      "required": "true"
    },

    { "name": "Team Number",
      "code": "t",
      "type": "number",
      "required": "true"
    },
    
    { "name": "Length(in) w/bumper",
      "code": "len",
      "type": "number",
      "defaultValue": "0"
    },

    { "name": "Width(in) w/bumper",
      "code": "wid",
      "type": "number",
      "defaultValue": "0"
    },

    { "name": "Weight(lbs) w/battery",
      "code": "wei",
      "type": "number",
      "defaultValue": "0"
    },

    { "name": "Drivetrain",
      "code": "drv",
      "type": "radio",
      "choices": {
        "b": "Butterfly/Grasshopper<br>",      
        "m": "Mecanum<br>",
        "o": "Omni<br>", 
        "s": "Swerve<br>",
        "w": "West Coast/Tank<br>"


      },
      "defaultValue": "o"
    },

    { "name": "Drivetrain Motor",
      "code": "mot",
      "type": "radio",
      "choices": {
        "c": "CIM<br>",
        "f": "Falcon<br>",
        "k44": "Kraken X44<br>",
        "k60": "Kraken X60<br>",
        "n": "Neo<br>",
        "n550": "Neo 550<br>",
        "nv": "Neo Vortex<br>"
      },
      "defaultValue":"c"
    },

    { "name": "Pickup From",
      "code": "pf",
      "type": "checkbox",
      "choices": {
        "d": "Depot<br>",
        "nz": "Neutral Zone<br>",
        "o": "Outpost<br>"
      },
      "defaultValue": ""
    },

    { "name": "Fuel Intake Amount",
     "code": "fia",
     "type": "number",
     "defaultValue": "0"
    },

    { "name": "Is Vision Tracking Used",
      "code": "ivtu",
      "type": "bool"
    },

    { "name": "Go Over Bump",
      "code": "gob",
      "type": "bool"
    },

    { "name": "Can go Under Trench",
     "code": "gut",
     "type": "bool"
    },


    { "name": "Climb Level",
      "code": "dik",
      "type": "radio",
      "choices": {
        "0": "No Climb<br>",
        "1": "Level 1<br>",
        "2": "Level 2<br>",
        "3": "Level 3<br>"
      },
      "defaultValue":"0"
    },

    { "name": "Climb Level",
      "code": "cl",
      "type": "checkbox",
      "choices": {
        "0": "No Climb<br>",
        "1": "Level 1<br>",
        "2": "Level 2<br>",
        "3": "Level 3<br>"
      },
      "defaultValue": "0"
    },


    { "name": "Autos Description",
      "code": "aut",
      "type": "text",
      "size": 20,
      "maxSize": 250
    },

    { "name": "Auto score amount",
     "code": "asa",
     "type": "number",
     "defaultValue": "0"
    },

    { "name": "Comments",
      "code": "co",
      "type": "text",
      "size": 20,
      "maxSize": 250
    }
  ],
  "auton": [
  ],
  "teleop": [
  ],
  "endgame": [
  ],
  "postmatch": [
  ]
}`;
