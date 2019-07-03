export default class ParsedData {

    public columns: [];
    public data: {}[];

    constructor(columns: [], data: {}[]) {
      this.columns = columns;
      this.data = data;
    }
}
