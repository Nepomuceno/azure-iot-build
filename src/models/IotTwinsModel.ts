export interface Space {
    children?:            Space[];
    sensors?:             Sensor[];
    devices?:             Device[];
    resources?:           Resource[];
    timeZone?:            TimeZone;
    effectiveTimeZone?:   TimeZone;
    users?:               User[];
    parent?:              Space;
    values?:              Value[];
    properties?:          Property[];
    id:                   string;
    name:                 string;
    description?:         string;
    friendlyName?:        string;
    type?:                string;
    typeId?:              number;
    parentSpaceId?:       string;
    subtype?:             string;
    subtypeId?:           number;
    location?:            Location;
    timeZoneId?:          number;
    status?:              string;
    statusId?:            number;
    fullName?:            string;
    spacePaths?:          string[];
    effectiveLocation?:   Location;
    effectiveTimeZoneId?: number;
}

export interface Ontology {
    id?:          number;
    name?:        string;
    loaded?:      boolean;
    description?: string;
    types?:       Type[];
}

export interface Type {
    id?:           number;
    spaceId?:      string;
    space?:        Space;
    category?:     string;
    name?:         string;
    disabled?:     boolean;
    logicalOrder?: number;
    friendlyName?: string;
    description?:  string;
    fullName?:     string;
    spacePaths?:   string[];
    ontologies?:   null[];
}

export interface Location {
    longitude?: number;
    latitude?:  number;
    elevation?: number;
    measure?:   number;
}

export interface Property {
    name?:     string;
    value?:    string;
    dataType?: string;
}

export interface Device {
    name?:                       string;
    friendlyName?:               string;
    description?:                string;
    type?:                       string;
    subtype?:                    string;
    typeId?:                     number;
    subtypeId?:                  number;
    hardwareId?:                 string;
    gatewayId?:                  string;
    spaceId?:                    string;
    status?:                     string;
    location?:                   Location;
    id:                          string;
    connectionState?:            string;
    connectionStateUpdatedTime?: string;
    ioTHubUrl?:                  string;
    deviceKey?:                  string;
    sasToken?:                   string;
    connectionString?:           string;
    space?:                      Space;
    sensors?:                    Sensor[];
    fullName?:                   string;
    spacePaths?:                 string[];
    effectiveLocation?:          Location;
    properties?:                 Property[];
    iotHubResource?:             Resource;
    roleAssignments?:            RoleAssignment[];
}

export interface Resource {
    id:                   string;
    spaceId?:             string;
    type?:                string;
    size?:                string;
    region?:              string;
    isExternallyCreated?: boolean;
    parameters?:          Parameters;
    space?:               Space;
    status?:              string;
    fullName?:            string;
    spacePaths?:          string[];
    lastLog?:             string;
    lastUpdatedUtc?:      string;
    properties?:          Parameters;
    dependentChildren?:   null[];
    dependentAncestors?:  null[];
    instanceNum?:         number;
}

export interface Parameters {
    additionalProp1?: string;
    additionalProp2?: string;
    additionalProp3?: string;
}

export interface RoleAssignment {
    id:            string;
    roleId?:       string;
    objectId?:     string;
    objectIdType?: string;
    tenantId?:     string;
    path?:         string;
}

export interface Sensor {
    port?:              string;
    pollRate?:          number;
    dataType?:          string;
    dataSubtype?:       string;
    type?:              string;
    portType?:          string;
    dataUnitType?:      string;
    spaceId?:           string;
    location?:          Location;
    deviceId?:          string;
    id:                 string;
    portTypeId?:        number;
    dataUnitTypeId?:    number;
    dataTypeId?:        number;
    dataSubtypeId?:     number;
    typeId?:            number;
    space?:             Space;
    properties?:        Property[];
    effectiveLocation?: Location;
    fullName?:          string;
    spacePaths?:        string[];
    value?:             Value;
    hardwareId?:        string;
}

export interface Value {
    type?:             string;
    value?:            string;
    timestamp?:        string;
    historicalValues?: HistoricalValue[];
}

export interface HistoricalValue {
    value?: string;
}

export interface TimeZone {
    id:                 number;
    name?:              string;
    accessControlPath?: string;
    friendlyPath?:      string;
    accessControlType?: string;
}

export interface User {
    id:                 string;
    upn?:               string;
    location?:          Location;
    firstName?:         string;
    lastName?:          string;
    managerName?:       string;
    metadata?:          Parameters;
    effectiveLocation?: Location;
    spaceId?:           string;
    space?:             Space;
    photoUri?:          string;
    fullName?:          string;
    spacePaths?:        string[];
    properties?:        Property[];
    roleAssignments?:   RoleAssignment[];
}
