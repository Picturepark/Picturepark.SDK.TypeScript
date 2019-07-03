export default class SchemaField {

    public fieldId: string;
    public schemaId: string;
    public schemaFields: SchemaField[] ;

    constructor(fieldId: string, schemaId: string) {
        this.fieldId = fieldId;
        this.schemaId = schemaId;
    }

}
