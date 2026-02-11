var config_data = `
{
  "dataFormat": "tsv",
  "title": "Scouting PASS 2024",
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
        "k60p": "Kraken X60<br>",
        "n": "Neo<br>",
        "n550": "Neo 550<br>",
        "nv": "Neo Vortex<br>"
      },
      "defaultValue":"c"
    },

    { "name": "Pickup from",
      "code": "pfd",
      "type": "checkbox",
      "choices": {
        "d": "Depot<br>",
        "n": "Neutral Zone<br>",
        "o": "Outpost<br>"
      }
    },


    { "name": "fuel intake amount",
     "code": "fia",
     "type": "number",
     "defaultValue": "0"
    },

    { "name": "Robot Has Limelight",
     "code": "rhl",
     "type": "bool;"
    },

    { "name": "Go over bump",
      "code": "gob",
      "type": "bool"
    },

    { "name": "can go under trench",
     "code": "gut",
     "type": "bool"
    },



    { "name": "climb level",
     "code": "cl",
     "type": "checkbox",
        "choices": {
            "0": "No climb<br>",
            "1": "Level 1<br>",
            "2": "Level 2<br>",
            "3": "Level 3<br>"
        }
    },

        { "name": "Climb Sides",
     "code": "cs",
     "type": "checkbox",
        "choices": {
            "l": "Left<br>",
            "c": "Center<br>",
            "r": "Right<br>"
        }
    },


    { "name": "Autos Description",
      "code": "aut",
      "type": "text",
      "size": 20,
      "maxSize": 250
    },

    { "name": "auto score amount",
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
