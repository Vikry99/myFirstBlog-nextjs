export interface ITodoModel  {
    id: number;
    text: string;
    done: boolean;
}  

export class Convert {
    public static toITodoModel(json: string): ITodoModel {
        return JSON.parse(json);
    }

    public static iTodoModelToJson(value: ITodoModel): string {
        return JSON.stringify(value);
    }
}