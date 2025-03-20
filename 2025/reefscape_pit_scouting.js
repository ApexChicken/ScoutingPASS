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
            "type": "number"
        },
        {
            "name": "length",
            "code": "le",
            "type": "number"
        },
        {
            "name": "Weight",
            "code": "wei",
            "type": "number",
            "defaultValue": ""
        },
        {
            "name": "# of cameras",
            "code": "noc",
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
                "o": "Omnidrive<br>",
                "e": "Other"
            },
            "defaultValue": "e"
        },
        {
            "name": "Drivetrain Motor",
            "code": "mot",
            "type": "radio",
            "choices": {
                "n": "Neo<br>",
                "f": "Falcon<br>",
                "c": "Kraken<br>",
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
            "name": "Able to Climb deep",
            "code": "acl",
            "type": "bool"
        },
        {
            "name": "Able to Climb shallow",
            "code": "ach",
            "type": "bool"
        },
        {
            "name": "Able to score Barge",
            "code": "asb",
            "type": "bool"
        },
        {
            "name": "Cycle time",
            "code": "ct",
            "type": "number"
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
                "0": "0 (dosen't work)<br>",
                "1": "1 (very innacurate)<br>",
                "2": "2 <br>",
                "3": "3 <br>",
                "4": "4 (very accurate)<br>"
        },
            "defaultValue": "3"
        },
        {
            "name": "Comments",
            "code": "co",
            "type": "text",
            "size": 20,
            "maxSize": 255
        },
        {
            "name": "Scout Rating",
            "code": "sr",
            "type": "radio",
            "choices": {
                "1": "1 (not reccomended)<br>",
                "2": "2 <br>",
                "3": "3 <br>",
                "4": "4 (Highly Reccomended)<br>"
            },
            "defaultValue": "3"
        }
    ],
    "auton": [],
    "teleop": [],
    "endgame": [],
    "postmatch": []
}`;
