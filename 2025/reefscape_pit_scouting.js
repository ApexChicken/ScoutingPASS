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
            "name": "Dimensions",
            "code": "di",
            "type": "text",
            "size": 20,
            "maxSize": 250
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
            "code": "ac",
            "type": "radio",
            "choices": {
                "1": "No auto/inconsistent<br>",
                "2": "Hardly working Auto<br>",
                "3": "Semi-functional Auto<br>",
                "4": "Good auto<br>",
                "5": "Great/perfect auto<br>",
                "o": "Other (put in comments)<br>",
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
