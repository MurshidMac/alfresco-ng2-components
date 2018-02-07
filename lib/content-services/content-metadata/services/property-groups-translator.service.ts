/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import {
    CardViewItemProperties,
    CardViewItem,
    CardViewTextItemModel,
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewDatetimeItemModel,
    CardViewIntItemModel,
    CardViewFloatItemModel,
    LogService
} from '@alfresco/adf-core';
import { Property, CardViewGroup, PropertyGroup } from '../interfaces/content-metadata.interfaces';

const D_TEXT = 'd:text';
const D_MLTEXT = 'd:mltext';
const D_DATE = 'd:date';
const D_DATETIME = 'd:datetime';
const D_INT = 'd:int';
const D_LONG = 'd:long';
const D_FLOAT = 'd:float';
const D_DOUBLE = 'd:double';
const D_BOOLEAN = 'd:boolean';

@Injectable()
export class PropertyGroupTranslatorService {

    static readonly RECOGNISED_ECM_TYPES = [ D_TEXT, D_MLTEXT, D_DATE, D_DATETIME, D_INT, D_LONG , D_FLOAT, D_DOUBLE, D_BOOLEAN ];

    constructor(private logService: LogService) {}

    public translateToCardViewGroups(propertyGroups: PropertyGroup[], propertyValues): CardViewGroup[] {
        return propertyGroups.map(propertyGroup => {
            const translatedPropertyGroup: any = Object.assign({}, propertyGroup);
            translatedPropertyGroup.properties = this.translateProperties(propertyGroup.properties, propertyValues);
            return translatedPropertyGroup;
        });
    }

    private translateProperties(properties: Property[], propertyValues: any): CardViewItem[] {
        return properties.map(property => {
            return this.translateProperty(property, propertyValues[property.name]);
        });
    }

    private translateProperty(property: Property, propertyValue: any): CardViewItem {
        this.checkECMTypeValidity(property.dataType);

        let propertyDefinition: CardViewItemProperties = {
            label: property.title,
            value: propertyValue,
            key: `properties.${property.name}`,
            default: property.defaultValue,
            editable: true
        };
        let cardViewItemProperty;

        switch (property.dataType) {

            case D_MLTEXT:
                cardViewItemProperty = new CardViewTextItemModel(Object.assign(propertyDefinition, {
                    multiline: true
                }));
                break;

            case D_INT:
            case D_LONG:
                cardViewItemProperty = new CardViewIntItemModel(propertyDefinition);
                break;

            case D_FLOAT:
            case D_DOUBLE:
                cardViewItemProperty = new CardViewFloatItemModel(propertyDefinition);
                break;

            case D_DATE:
                cardViewItemProperty = new CardViewDateItemModel(propertyDefinition);
                break;

            case D_DATETIME:
                cardViewItemProperty = new CardViewDatetimeItemModel(propertyDefinition);
                break;

            case D_BOOLEAN:
                cardViewItemProperty = new CardViewBoolItemModel(propertyDefinition);
                break;

            case D_TEXT:
            default:
                cardViewItemProperty = new CardViewTextItemModel(Object.assign(propertyDefinition, {
                    multiline: false
                }));
        }

        return cardViewItemProperty;
    }

    private checkECMTypeValidity(ecmPropertyType) {
        if (PropertyGroupTranslatorService.RECOGNISED_ECM_TYPES.indexOf(ecmPropertyType) === -1) {
            this.logService.error(`Unknown type for mapping: ${ecmPropertyType}`);
        }
    }
}