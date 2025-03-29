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
                "m": "Mechanum<br>",
                "e": "Else<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Drivetrain Motor",
            "code": "mot",
            "type": "radio",
            "choices": {
                "n": "Neo<br>",
                "f": "Falcon<br>",
                "k": "Kraken<br>",
                "c": "CIM<br>",
                "e": "Else<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Pickup Coral",
            "code": "pc",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Floor Pickup Coral",
            "code": "fpu",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Pickup Algae",
            "code": "pa",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Floor Pickup Algae",
            "code": "fpa",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Able to Climb Deep",
            "code": "acd",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Able to Climb Shallow",
            "code": "acs",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
        },
        {
            "name": "Able to Score Barge",
            "code": "asb",
            "type": "radio",
            "choices": {
                "y": "Yes<br>",
                "n": "No<br>"
            },
            "defaultValue": ""
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
            "defaultValue": ""
        },
        {
            "name": "Build Quality",
            "code": "bq",
            "type": "radio",
            "choices": {
                "1": "Below average<br>",
                "2": "Average<br>",
                "3": "Good<br>",
                "4": "Excellent<br>"
            },
            "defaultValue": ""
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
            "defaultValue": ""
        }
    ],
    "auton": [],
    "teleop": [],
    "endgame": [],
    "postmatch": []
}`;
