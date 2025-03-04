var config_data = `
{
    "dataFormat": "tsv",
    "title": "4564 SCOUTING 2025",
    "page_title": "REEFSCAPE",
    "pitConfig": "true",
    "prematch": [
        {
            "name": "Team Number",
            "code": "t",
            "type": "number"
        },
        {
            "name": "Width",
            "code": "wi",
            "type": "number",
        },
        {
            "name": "length",
            "code": "le",
            "type": "number",
        },
        {
            "name": "Weight",
            "code": "wei",
            "type": "number",
            "defaultValue": ""
        },
        {
            "name": "Drivetrain",
            "code": "drv",
            "type": "radio",
            "choices": {
                "s": "Swerve<br>",
                "w": "West Coast/Tank<br>",
                "o": "Other"
            },
            "defaultValue": "o"
        },
        {
            "name": "Drivetrain Motor",
            "code": "mot",
            "type": "radio",
            "choices": {
                "n": "Neo<br>",
                "f": "Falcon<br>",
                "c": "CIM<br>",
                "x": "Other<br>"
            },
            "defaultValue": "x"
        },
        {
            "name": "Pickup Coral",
            "code": "pc",
            "type": "bool"
        },
        {
            "name": "Floor pickup Coral",
            "code": "fpu",
            "type": "bool"
        },
        {
            "name": "Pickup Algae",
            "code": "pa",
            "type": "bool"
        },
        {
            "name": "Floor pickup Algae",
            "code": "fpa",
            "type": "bool"
        },
        {
            "name": "Able to Climb / hang",
            "code": "atc",
            "type": "bool"
        },
        {
            "name": "Autos",
            "code": "aut",
            "type": "text",
            "size": 20,
            "maxSize": 250
        },
        {
            "name": "Auto Consistency",
            "code": "auc",
            "type": "radio",
            "choices": {
                "1": "No auto/consistently bad auto<br>",
                "2": "Poor auto, misses often<br>",
                "3": "Decent auto, 50/50<br>",
                "4": "Good auto, lands mostly<br>",
                "5": "Perfect auto<br>",
                "o": "Other"
            },
            "defaultValue": "o"
        },
        {
            "name": "Comments",
            "code": "co",
            "type": "text",
            "size": 20,
            "maxSize": 255
        }
    ],
    "auton": [],
    "teleop": [],
    "endgame": [],
    "postmatch": []
}`;
