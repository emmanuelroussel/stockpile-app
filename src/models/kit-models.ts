export interface KitModel {
  readonly kitID: number;
  readonly modelID: number;
  readonly model: string;
  readonly brandID: number;
  readonly brand: string;
}

export interface KitModels {
  readonly results: { [kitID: number]: Array<KitModel> };
}
