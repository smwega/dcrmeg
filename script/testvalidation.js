﻿
// JavaScript callback examples

function Log(s, a) {
    if (typeof console != "undefined" && typeof console.debug != "undefined") {
        if (a) {
            console.log(s, a);
        } else {
            console.log(s);
        }
    }
}

// Only for CRM 2015, 2016, and 365
// Add the FormOnloadHandler function to form (where grid is to be displayed) onload using form editor
function FormOnloadHandler(context) {
    window.parent.ValidateDCrmEgGrid = ValidateDCrmEgGrid;
    window.parent.DCrmEgGridSaving = DCrmEgGridSaving;
    window.parent.DCrmEgGridDeleting = DCrmEgGridDeleting;

    window.parent.DCrmEgGridBeforeCreateNewRecord = DCrmEgGridBeforeCreateNewRecord;
    window.parent.DCrmEgGridCreateNewRecord = DCrmEgGridCreateNewRecord;
    window.parent.DCrmEgGridOnload = DCrmEgGridOnload;
    window.parent.DCrmEgGridRowOnload = DCrmEgGridRowOnload;
    window.parent.DCrmEgGridOnBeforeFetchRecords = DCrmEgGridOnBeforeFetchRecords;
    window.parent.DCrmEgGridOnBeforeLookupFetchRecords = DCrmEgGridOnBeforeLookupFetchRecords;

    //setTimeout(function () {
    //    var IFrame = Xrm.Page.getControl("WebResource_AccountsContacts").getObject();
    //    if (IFrame) {
    //        var frameWindow = IFrame.contentWindow;
    //        if (frameWindow) {
    //            if (frameWindow.GetDcrmEgGrid) {
    //                var grid = frameWindow.GetDcrmEgGrid('account');
    //                if (grid) {
    //                    console.log("Got the grid", grid);
    //                } else {
    //                    console.log("No Grid found");
    //                }
    //            } else {
    //                console.log("No GetDcrmEgGrid method");
    //            }
    //        } else {
    //            console.log("No Frame content window");
    //        }
    //    } else {
    //        console.log("No IFRAME");
    //    }
    //}, 5000);

    //// Changing title in 2016
    //// Timer is needed as not all elements may have been added to the document.all collection
    //// may need to adjust the timer duration
    //setTimeout(function () {
    //    console.log("Form loaded. Changing title....");
    //    var allelem = window.parent.document.all;
    //    console.log("All elements length " + allelem.length);
    //    for (var i = 0; i < allelem.length; i++) {
    //        var id = allelem[i].id || allelem[i].getAttribute('id');
    //        if (id == 'FormTitle') {
    //            // H1 element where title is displayed
    //            allelem[i].childNodes[0].innerText = "Hello there";
    //            break;
    //        }
    //    }
    //}, 1000);
}

function ValidateDCrmEgGrid(param, field) {
    var allow = true;
    return allow;

    Log('GridCustomIdentifier [' + field.GridCustomIdentifier + ']');
    Log("FieldSchemaName [" + field.FieldSchemaName + "] FieldLabel [" + field.FieldLabel + "] ParentEntitySchemaName [" + field.ParentEntitySchemaName + "] ParentEntityLabel [" + field.ParentEntityLabel + "]");
    Log("Record Guid [" + param.RecordGuid + "]\r\n\r\n");
    
    switch (param.EditorType) {
        // Text
        case 0:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            if (param.NewValue.length == 0) {
                allow = false;
                Log("not allowed");
            }
            break;

        // Whole Number
        case 1:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Date Picker
        case 2:
            Log("Date - NewDate [" + param.NewValue + "] OriginalDate [" + param.OriginalValue + "]");
            break;

        // Checkbox (two option)
        case 3:
            Log("Checkbox (TwoOption) - NewText [" + param.NewValue + "] OriginalText [" + param.OriginalValue + "] isChecked [" + param.IsChecked + "]");
            break;

        // OptionSet
        case 4:
            Log("OptionSet - NewLabel [" + param.NewLabel + "] NewValue [" + param.NewValue + "] OriginalLabel [" + param.OriginalLabel + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Memo (Description)
        case 5:
            Log("Memo (description) - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Lookup (single)
        case 6:
            Log("Lookup - NewLabel [" + param.NewLabel + "] NewGuid [" + param.NewGuid + "[ NewLogicalName [" + param.NewLogicalName + "] OriginalLabel [" + param.OriginalLabel + "] OriginalGuid [" + param.OriginalGuid + "] OriginalLogicalName [" + param.OriginalLogicalName + "]");
            break;

        // Decimal / Float
        case 7:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Currency
        case 8:
            Log("Text - NewValue [" + param.NewValue + "] OriginalValue [" + param.OriginalValue + "]");
            break;

        // Date Time Picker
        case 9:
            Log("DateTime - NewDateTime [" + param.NewValue + "] OriginalDateTime [" + param.OriginalValue + "]");
            break;

        default:
            break;
    }

    return allow;
}

function DCrmEgGridSaving(data, entityinfo) {
    var allow = true;
    return allow;
    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]\r\n\r\n");

    var item;
    for (var i = 0; i < data.length; i++) {
        item = data[i];
        switch (item.InternalEditorType) {
            // Text
            case 0:
                // Whole Number
            case 1:
                // Date Picker
            case 2:
                // Memo (Description)
            case 5:
                // Decimal / Float
            case 7:
                // Currency
            case 8:
                // Date Time Picker
            case 9:
                Log("Record Guid [" + item.RecGuid +
                    "] ValueToSave [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "] Format [" + item.InternalEditorFormat + "]");
                // Format: url, email, phone, ...
                break;

                // Checkbox (two option)
            case 3:
                Log("Record Guid [" + item.RecGuid +
                    "] ValueToSave [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "]  [" + item.CheckAttribute + "]");
                break;

                // OptionSet
            case 4:
                Log("Record Guid [" + item.RecGuid +
                    "] OptionSetLabel [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "] OptionSetValue [" + item.OptionSetValue + "]");
                break;

                // Lookup (single)
            case 6:
                Log("Record Guid [" + item.RecGuid +
                    "] LookupText [" + item.ValueToSave +
                    "] FieldSchemaName [" + item.FieldSchemaName +
                    "] LookupLogicalName [" + item.LookupLogicalName +
                    "] LookupGuid [" + item.LookupId + "]");
                break;

            default:
                break;
        }
    }

    return allow;
}

function DCrmEgGridDeleting(data, entityinfo) {
    var allow = true;
    return allow;
    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]\r\n\r\n");
    for (var i = 0; i < data.length; i++) {
        Log("Record Guid [" + data[i] + "]");
    }
}

function DCrmEgGridBeforeCreateNewRecord(newRecStruct, entityinfo) {
    var allow = true;
    return allow;
    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]\r\n\r\n");
    Log("New Record Struct", newRecStruct);
}

function DCrmEgGridCreateNewRecord(data, entityinfo) {
    return;
    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");
    Log("Record Guid [" + data.NewRecordGuid + "]\r\n\r\n");
}

var _MyCounter = 1;
function DCrmEgGridRowOnload(rowData, entityinfo) {
    return;

    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("ParentEntityName [" + entityinfo.ParentEntityName + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaname + "]");
    Log("Record Guid [" + rowData.RecordGuid + "] Row Index [" + rowData.RowIndex + "]");
    if (rowData.InlineCreate) {
        Log("Create inline record is used. One row is being added.");
    }

    if (_MyCounter > 5) {
        _MyCounter = 0;
    }
    if (_MyCounter == 1) {
        rowData.RowBackgroundColor = '#CCCCCC';
    }
    _MyCounter++;

    var CrmFieldTypes = {
        LookupType: "lookup",
        CustomerType: 'customer',
        OwnerType: 'owner',
        BooleanType: "boolean",
        OptionSetType: "picklist",
        DateTimeType: "datetime",
        TextType: "string",
        MemoType: "memo",
        IntegerType: "integer",
        DoubleType: "double",
        DecimalType: "decimal",
        MoneyType: "money",
        State: 'state', // Status statecode
        Status: 'status' // Status Reason statuscode
    };

    for (var i = 0; i < rowData.Fields.length; i++) {
        var field = rowData.Fields[i];
        Log("Field schema name [" + field.SchemaName + "] field.FieldType [" + field.FieldType + "]");

        switch (field.FieldType) {
            case CrmFieldTypes.TextType:
                Log("Field [" + field.Value + "] Format [" + field.Format + "]");
                //// To set a different display value
                //field.NewFormattedValue = 'Custom value';
                break;
            case CrmFieldTypes.MemoType:
                Log("Field [" + field.Value + "] Format [" + field.Format + "]");
                //// To set a different display value
                //field.NewFormattedValue = 'Custom value';
                break;
            case CrmFieldTypes.LookupType:
            case CrmFieldTypes.CustomerType:
            case CrmFieldTypes.OwnerType:
                //// new_myschool parentaccountid
                //var dctl = Xrm.Page.getControl("new_myschool");
                //if ((dctl) && (dctl.addPreSearch)) {
                //    console.log("Have the lookup========>");
                //} else {
                //    console.log("Do not have the lookup============>");
                //}
                Log("Field Lookup Guid ["
                    + field.LookupGuid + "] Lookup LogicalName ["
                    + field.LookupLogicalName + "] Lookup Name ["
                    + field.LookupName + "] Value ["
                    + field.Value + "]");
                break;
            case CrmFieldTypes.IntegerType:
                Log("Field FormattedValue [" + field.FormattedValue + "] Value [" + field.Value + "]");
                // To set a different display value
                //field.NewFormattedValue = 55;
                break;
            case CrmFieldTypes.DoubleType:
            case CrmFieldTypes.DecimalType:
                Log("Field FormattedValue [" + field.FormattedValue + "] Value [" + field.Value + "]");
                //// To set a different display value
                //field.NewFormattedValue = 65.90;
                break;
            case CrmFieldTypes.MoneyType:
                Log("Field FormattedValue [" + field.FormattedValue + "] Value [" + field.Value + "]");
                //// To set a different display value
                //field.NewFormattedValue = $65.900;
                //field.NewValue = 65.90;
                break;
            case CrmFieldTypes.DateTimeType:
                Log("Field FormattedValue ["
                    + field.FormattedValue + "]");
                //field.ReadOnly = true;
                //// Optional, set field (cell) background and forground colors
                //field.BackgroundColor = 'lightyellow';
                //field.ForgroundColor = 'black';

                //// To set a different display value
                //field.NewFormattedValue = '03/25/2017';

                break;
            case CrmFieldTypes.OptionSetType:
                Log("Field FormattedValue [" + field.FormattedValue + "] Value [" + field.Value + "]");
                //// To set a different display value
                //field.NewFormattedValue = 'option three';
                //field.NewValue = 4;
                break;
            case CrmFieldTypes.BooleanType:
                Log("Field FormattedValue [" + field.FormattedValue + "] Value [" + field.Value + "]");
                //field.ReadOnly = true;
                //field.BackgroundColor = '#CCCCCC';
                //field.ForgroundColor = 'blue';

                //// To set a different display value
                //field.NewFormattedValue = 'Yes';
                //field.NewValue = true;
                //// OR
                //field.NewFormattedValue = 'InActive';
                //field.NewValue = false;

                break;
            case CrmFieldTypes.State:
            case CrmFieldTypes.Status:
                Log("Field FormattedValue ["
                    + field.FormattedValue + "] Value [" + field.Value + "]");
            default:
                break;
        }
    }
}

function DCrmEgGridOnload(data, entityinfo) {
    return;

    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("Onload - ParentEntityName [" + entityinfo.ParentEntityLabel + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaName + "]");
    //data.Option.readonly = (data.Option.text == "Accounting") || (data.Option.text == "Consulting") || (data.Option.text == "Friday");
    Log("Option set - text [" + data.Option.text + "] value [" + data.Option.value + "] ReadOnly [" + data.Option.readonly + "]\r\n\r\n");
}

function DCrmEgGridOnBeforeFetchRecords(entityinfo) {
    var additions = null;
    return additions;

    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("DCrmEgGridOnBeforeFetchRecords - ParentEntityName [" + entityinfo.ParentEntityLabel + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaName + "]\r\n\r\n");

    //// Add additional conditions
    //if (entityinfo.ParentEntitySchemaName == 'account') {
        //additions = {};

        //// Example for a sinle value condition
        //additional.Condition = '<condition attribute="primarycontactid" operator="eq" value="{76E339A4-1528-E611-80DD-08002738AA19}" />';

        //// Example for multi value condition
        //additions.Condition = '<condition attribute="primarycontactid" operator="in">' +
        //    '<value>{64E339A4-1528-E611-80DD-08002738AA19}</value>' +
        //    '<value>{76E339A4-1528-E611-80DD-08002738AA19}</value>' +
        //'</condition>';

        //// Example for a link entity
        //additions.LinkEntity = '<link-entity name="incident" from="customerid" to="accountid" alias="aa">' +
        //  '<filter type="and">' +
        //    '<condition attribute="primarycontactidname" operator="like" value="fjghg%" />' +
        //  '</filter>' +
        //'</link-entity>';
    //}

    return additions;
}

function DCrmEgGridOnBeforeLookupFetchRecords(entityinfo) {
    var additions = null;
    Log('GridCustomIdentifier [' + entityinfo.GridCustomIdentifier + ']');
    Log("DCrmEgGridOnBeforeLookupFetchRecords - Field Schemname [" + entityinfo.FieldSchemaName + "] ParentEntityName [" + entityinfo.ParentEntityLabel + "] ParentEntitySchemaname [" + entityinfo.ParentEntitySchemaName + "]\r\n\r\n");

    //additions = {};

    //// Example for a sinle value condition
    //additional.Condition = '<condition attribute="primarycontactid" operator="eq" value="{76E339A4-1528-E611-80DD-08002738AA19}" />';

    //// Example for multi value condition
    //additions.Condition = '<condition attribute="primarycontactid" operator="in">' +
    //    '<value>{64E339A4-1528-E611-80DD-08002738AA19}</value>' +
    //    '<value>{76E339A4-1528-E611-80DD-08002738AA19}</value>' +
    //'</condition>';

    //// Example for a link entity
    //additions.LinkEntity = '<link-entity name="incident" from="customerid" to="accountid" alias="aa">' +
    //  '<filter type="and">' +
    //    '<condition attribute="primarycontactidname" operator="like" value="fjghg%" />' +
    //  '</filter>' +
    //'</link-entity>';

    return additions
}